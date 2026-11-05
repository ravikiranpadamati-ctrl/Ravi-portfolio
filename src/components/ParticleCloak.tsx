import React, { useEffect, useRef } from 'react'

/**
 * ParticleCloak
 * A plate of content hidden under a cloak of particles that parts wherever the pointer goes
 * and knits itself back together with spring-and-damp physics.
 */
export default function ParticleCloak(): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    interface Particle {
      homeX: number
      homeY: number
      x: number
      y: number
      vx: number
      vy: number
      radius: number
    }

    let particles: Particle[] = []
    let step = 16
    let R = 200

    const targetPointer = { x: width * 0.5, y: height * 0.5 }
    const easedPointer = { x: width * 0.5, y: height * 0.5 }
    let hasUserEntered = false
    let isTouchDevice = false
    let lissajousTime = 0
    let animationFrameId: number

    function resize() {
      if (!canvas || !ctx) return
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.scale(dpr, dpr)

      R = 0.34 * Math.min(width, height)
      step = Math.max(9, Math.min(width, height) / 22)

      particles = []
      const cols = Math.ceil(width / step) + 2
      const rows = Math.ceil(height / step) + 2
      const startX = (width - (cols - 1) * step) * 0.5
      const startY = (height - (rows - 1) * step) * 0.5

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const homeX = startX + i * step
          const homeY = startY + j * step
          particles.push({
            homeX,
            homeY,
            x: homeX,
            y: homeY,
            vx: 0,
            vy: 0,
            radius: 1.0 + Math.random() * 1.6
          })
        }
      }
    }

    const onPointerMove = (e: PointerEvent) => {
      hasUserEntered = true
      targetPointer.x = e.clientX
      targetPointer.y = e.clientY
    }

    const onPointerLeave = () => {
      if (!isTouchDevice) hasUserEntered = false
    }

    const onTouchStart = (e: TouchEvent) => {
      isTouchDevice = true
      if (e.touches && e.touches.length > 0) {
        targetPointer.x = e.touches[0].clientX
        targetPointer.y = e.touches[0].clientY
      }
    }

    const onTouchMove = (e: TouchEvent) => {
      isTouchDevice = true
      if (e.touches && e.touches.length > 0) {
        targetPointer.x = e.touches[0].clientX
        targetPointer.y = e.touches[0].clientY
      }
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('resize', resize)

    resize()

    function render() {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)

      // Lissajous autonomous drift
      lissajousTime += 0.013
      const ampX = width * 0.28
      const ampY = height * 0.23
      const lissajousX = width * 0.5 + Math.sin(lissajousTime * 0.9) * ampX
      const lissajousY = height * 0.5 + Math.sin(lissajousTime * 1.35) * ampY

      if (!hasUserEntered) {
        targetPointer.x = lissajousX
        targetPointer.y = lissajousY
      } else if (isTouchDevice) {
        targetPointer.x += (lissajousX - targetPointer.x) * 0.04
        targetPointer.y += (lissajousY - targetPointer.y) * 0.04
      }

      // Lerp pointer at 0.16
      easedPointer.x += (targetPointer.x - easedPointer.x) * 0.16
      easedPointer.y += (targetPointer.y - easedPointer.y) * 0.16

      const epX = easedPointer.x
      const epY = easedPointer.y
      const pLen = particles.length

      for (let i = 0; i < pLen; i++) {
        const p = particles[i]
        const dx = p.x - epX
        const dy = p.y - epY
        const d = Math.sqrt(dx * dx + dy * dy)

        if (d < R) {
          const ratio = 1 - d / R
          const f = ratio * ratio * 3.4
          const safeDist = d > 0.0001 ? d : 0.0001
          p.vx += (dx / safeDist) * f
          p.vy += (dy / safeDist) * f
        }

        // Always pull home: v += (home - pos) * 0.024
        p.vx += (p.homeX - p.x) * 0.024
        p.vy += (p.homeY - p.y) * 0.024

        // Damp: v *= 0.86
        p.vx *= 0.86
        p.vy *= 0.86

        // Integrate: pos += v
        p.x += p.vx
        p.y += p.vy

        // Fade by displacement: alpha = max(0, 0.72 - distanceFromHome / 70)
        const distHomeX = p.x - p.homeX
        const distHomeY = p.y - p.homeY
        const distFromHome = Math.sqrt(distHomeX * distHomeX + distHomeY * distHomeY)
        const alpha = Math.max(0, 0.72 - distFromHome / 70)

        if (alpha > 0.004) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius, 0, 6.2831853)
          ctx.fillStyle = `rgba(226, 232, 240, ${alpha})`
          ctx.fill()
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="relative w-screen h-screen overflow-hidden flex items-center justify-center bg-[#06070a] select-none">
      {/* Subtle ambient under-glow */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none filter blur-[70px]"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(236, 72, 153, 0.06) 45%, transparent 70%)'
        }}
      />

      {/* UNDERNEATH: The Content Plate */}
      <div className="absolute z-10 flex flex-col items-center justify-center text-center p-8 max-w-4xl pointer-events-none">
        <h1
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold uppercase leading-[0.92] tracking-tighter mb-6 bg-clip-text text-transparent"
          style={{
            backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 25%, #818cf8 50%, #c084fc 75%, #f472b6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Beyond<br />The Veil
        </h1>
        <p className="font-mono text-xs sm:text-sm tracking-[0.26em] uppercase text-slate-400 inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8] animate-pulse" />
          <span>Wavefunction Unveiled &middot; Kinetic Mesh</span>
        </p>
      </div>

      {/* THE CLOAK: Canvas 2D overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-20 pointer-events-none"
      />

      {/* Status HUD pill */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 font-mono text-[11px] tracking-widest text-slate-400/60 bg-slate-900/60 border border-white/10 px-4 py-1.5 rounded-full pointer-events-none backdrop-blur-md whitespace-nowrap">
        MOVE CURSOR TO DISPERSE &middot; SPRING 0.024 &middot; DAMP 0.86
      </div>
    </div>
  )
}
