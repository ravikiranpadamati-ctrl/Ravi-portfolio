import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Check, Sparkles, Terminal, Cpu, Zap, Shield, Globe, Layers } from 'lucide-react'

/**
 * Phased3DLanding Component
 * Modern high-conversion landing page with:
 * - Phase 1 (0.0s – 1.2s): Name & Headline kinetic typography reveal
 * - Phase 2 (1.0s – 2.2s): 3D Hero Visual landing with spring physics & shockwave
 * - Phase 3 (Continuous): Interactive pointer tracking, dynamic lighting, and secondary UI
 * - Value proposition 3-column grid
 * - Interactive product terminal with live telemetry stream
 * - Social proof metric counters & minimalist cyber footer
 */
export default function Phased3DLanding({ onBack }) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  
  // Phase state tracking
  const [phase, setPhase] = useState(1)
  const [activeTab, setActiveTab] = useState('consensus')
  const [throughput, setThroughput] = useState(142890)
  const [latency, setLatency] = useState(3.82)
  const [blockHeight, setBlockHeight] = useState(4912834)
  const [sprintDispatched, setSprintDispatched] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [email, setEmail] = useState('')

  // Sequence phases timer
  useEffect(() => {
    const timer1 = setTimeout(() => setPhase(2), 1050)
    const timer2 = setTimeout(() => setPhase(3), 1850)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  // 3D Interactive Canvas Implementation
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    let animationFrameId
    const ctx = canvas.getContext('2d')
    let width = (canvas.width = container.clientWidth * window.devicePixelRatio)
    let height = (canvas.height = container.clientHeight * window.devicePixelRatio)
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    let mouseX = 0
    let mouseY = 0
    let targetRotX = 0
    let targetRotY = 0
    let currentRotX = 0
    let currentRotY = 0
    let baseAngle = 0

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      mouseX = (e.clientX - cx) / (rect.width / 2)
      mouseY = (e.clientY - cy) / (rect.height / 2)
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Generate 3D Geodesic Icosahedron Vertices
    const phi = (1 + Math.sqrt(5)) / 2
    const baseVertices = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
    ].map(([x, y, z]) => {
      const len = Math.sqrt(x * x + y * y + z * z)
      return [x / len, y / len, z / len]
    })

    const edges = [
      [0, 11], [0, 5], [0, 1], [0, 7], [0, 10],
      [1, 5], [1, 7], [1, 9], [1, 8],
      [2, 11], [2, 10], [2, 4], [2, 6], [2, 3],
      [3, 9], [3, 8], [3, 4], [3, 6],
      [4, 5], [4, 9], [4, 11],
      [5, 9],
      [6, 7], [6, 8], [6, 10],
      [7, 8],
      [8, 9],
      [10, 11]
    ]

    // Floating Particles (160 points)
    const particles = Array.from({ length: 160 }, () => ({
      x: (Math.random() - 0.5) * 4,
      y: (Math.random() - 0.5) * 4,
      z: (Math.random() - 0.5) * 4,
      size: Math.random() * 1.8 + 0.6,
      speed: Math.random() * 0.008 + 0.002
    }))

    const render = () => {
      baseAngle += 0.008
      targetRotX = mouseY * 0.45
      targetRotY = mouseX * 0.65

      // Smooth spring lerp physics
      currentRotX += (targetRotX - currentRotX) * 0.06
      currentRotY += (targetRotY - currentRotY) * 0.06

      const rotX = currentRotX + Math.sin(baseAngle * 0.8) * 0.1
      const rotY = currentRotY + baseAngle

      const displayW = container.clientWidth
      const displayH = container.clientHeight
      ctx.clearRect(0, 0, displayW, displayH)

      const centerX = displayW / 2
      const centerY = displayH / 2
      const radius = Math.min(displayW, displayH) * 0.28

      // Rotate point in 3D
      const project = ([x, y, z]) => {
        // Y rotation
        const cosY = Math.cos(rotY)
        const sinY = Math.sin(rotY)
        const x1 = x * cosY - z * sinY
        const z1 = z * cosY + x * sinY

        // X rotation
        const cosX = Math.cos(rotX)
        const sinX = Math.sin(rotX)
        const y2 = y * cosX - z1 * sinX
        const z2 = z1 * cosX + y2 * sinX

        const fov = 450
        const distance = 4.2 + z2
        const scale = fov / distance
        return {
          px: centerX + x1 * scale * (radius / 100),
          py: centerY + y2 * scale * (radius / 100),
          depth: z2
        }
      }

      // Draw Orbiting Dust Particles
      particles.forEach((p) => {
        p.z -= p.speed
        if (p.z < -2) p.z = 2
        const proj = project([p.x, p.y, p.z])
        const alpha = Math.max(0.1, (proj.depth + 1.5) / 3)
        ctx.fillStyle = `rgba(0, 240, 255, ${alpha * 0.7})`
        ctx.beginPath()
        ctx.arc(proj.px, proj.py, p.size, 0, Math.PI * 2)
        ctx.fill()
      })

      // Project vertices
      const projected = baseVertices.map(project)

      // Dynamic light vector from mouse
      const lightX = mouseX * 2
      const lightY = -mouseY * 2
      const lightZ = 2.5

      // Draw Edges with chromatic luminescence
      ctx.lineWidth = 1.6
      edges.forEach(([i, j]) => {
        const p1 = projected[i]
        const p2 = projected[j]
        const avgDepth = (p1.depth + p2.depth) / 2
        const intensity = Math.max(0.2, (avgDepth + 1.2) / 2.4)

        const gradient = ctx.createLinearGradient(p1.px, p1.py, p2.px, p2.py)
        gradient.addColorStop(0, `rgba(0, 240, 255, ${intensity * 0.9})`)
        gradient.addColorStop(1, `rgba(124, 58, 237, ${intensity * 0.9})`)

        ctx.strokeStyle = gradient
        ctx.beginPath()
        ctx.moveTo(p1.px, p1.py)
        ctx.lineTo(p2.px, p2.py)
        ctx.stroke()
      })

      // Draw Vertex nodes with glow
      projected.forEach((p) => {
        const glow = Math.max(0.3, (p.depth + 1.2) / 2.4)
        ctx.fillStyle = `rgba(255, 255, 255, ${glow})`
        ctx.beginPath()
        ctx.arc(p.px, p.py, 3.2, 0, Math.PI * 2)
        ctx.fill()

        ctx.strokeStyle = `rgba(0, 240, 255, ${glow * 0.8})`
        ctx.lineWidth = 1.2
        ctx.beginPath()
        ctx.arc(p.px, p.py, 5.5, 0, Math.PI * 2)
        ctx.stroke()
      })

      // Central core pulsing glow
      const gradCenter = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, radius * 0.8)
      gradCenter.addColorStop(0, 'rgba(0, 240, 255, 0.18)')
      gradCenter.addColorStop(0.5, 'rgba(124, 58, 237, 0.12)')
      gradCenter.addColorStop(1, 'transparent')
      ctx.fillStyle = gradCenter
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius * 0.8, 0, Math.PI * 2)
      ctx.fill()

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    const handleResize = () => {
      width = canvas.width = container.clientWidth * window.devicePixelRatio
      height = canvas.height = container.clientHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  const handleInject = () => {
    setSprintDispatched(true)
    setThroughput((prev) => prev + Math.floor(Math.random() * 25000 + 10000))
    setLatency((prev) => Number((Math.max(2.1, prev - 0.2)).toFixed(2)))
    setBlockHeight((prev) => prev + 1)
    setTimeout(() => setSprintDispatched(false), 2000)
  }

  const handleNewsletter = (e) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 4000)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#f4f4f6] font-sans selection:bg-[#00f0ff] selection:text-black relative overflow-x-hidden">
      
      {/* Ambient background bloom */}
      <div className="fixed top-[-100px] left-[15%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed top-[30%] right-[10%] w-[650px] h-[650px] bg-purple-600/10 rounded-full blur-[110px] pointer-events-none" />
      
      {/* Subtle Grid */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      {/* Floating Mode Switcher (Return to Portfolio) */}
      {onBack && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={onBack}
            className="px-4 py-2.5 rounded-full bg-neutral-900/90 border border-neutral-700/80 text-xs font-mono text-neutral-300 hover:text-white hover:border-cyan-400 flex items-center gap-2 shadow-xl backdrop-blur-md transition-all hover:scale-105"
          >
            <span>← Return to Portfolio</span>
          </button>
        </div>
      )}

      {/* STICKY GLASSMORPHIC NAVBAR (Reveals smoothly in Phase 3) */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${
          phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6 pointer-events-none'
        } bg-[#0a0a0c]/80 backdrop-blur-xl border-b border-white/[0.08]`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 to-purple-600 p-[1.5px]">
              <div className="w-full h-full bg-[#0a0a0c] rounded-[6px] flex items-center justify-center text-cyan-400 font-bold text-sm">
                ⬡
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold tracking-wider text-sm font-mono text-white">AETHER</span>
              <span className="text-[9px] text-cyan-400 font-mono tracking-widest uppercase">SPATIAL COMPUTE</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs font-mono">
            <a href="#features" className="px-3 py-1 rounded-full text-neutral-400 hover:text-white hover:bg-white/[0.05] transition-all">01 Architecture</a>
            <a href="#preview" className="px-3 py-1 rounded-full text-neutral-400 hover:text-white hover:bg-white/[0.05] transition-all">02 Terminal</a>
            <a href="#metrics" className="px-3 py-1 rounded-full text-neutral-400 hover:text-white hover:bg-white/[0.05] transition-all">03 Consensus</a>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>MAINNET v2.6 // NOMINAL</span>
            </div>
            <a 
              href="#preview"
              className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-mono text-xs font-bold hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] transition-all transform hover:-translate-y-0.5"
            >
              Launch App ↗
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION (100vh) */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-6">
        <div className="max-w-5xl w-full mx-auto flex flex-col items-center text-center relative z-10">
          
          {/* Phase 1 Top Eyebrow Badge */}
          <div className="overflow-hidden mb-4">
            <motion.div 
              initial={{ y: 30, opacity: 0, filter: 'blur(10px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md text-xs font-mono text-neutral-300 uppercase tracking-widest"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>AETHER // 01 · SPATIAL COMPUTE SUBSTRATE</span>
            </motion.div>
          </div>

          {/* Phase 1 Master Kinetic Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] uppercase max-w-4xl mb-6">
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: 90, opacity: 0, filter: 'blur(14px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="block text-white"
              >
                ARCHITECTING
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: 90, opacity: 0, filter: 'blur(14px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.0, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="block bg-gradient-to-r from-white via-cyan-400 to-purple-500 bg-clip-text text-transparent"
              >
                BEYOND DIMENSIONS
              </motion.span>
            </div>
          </h1>

          {/* Phase 1 Subtitle */}
          <div className="overflow-hidden max-w-2xl mb-6">
            <motion.p
              initial={{ y: 40, opacity: 0, filter: 'blur(8px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-neutral-400 leading-relaxed font-light"
            >
              A zero-latency, deterministic execution plane for multi-agent autonomous intelligence and high-throughput spatial 3D rendering.
            </motion.p>
          </div>

          {/* Phase 2: 3D Visual Landing Container */}
          <div 
            ref={containerRef}
            className={`relative w-full max-w-[680px] h-[340px] sm:h-[400px] my-2 flex items-center justify-center transition-all duration-1000 ${
              phase >= 2 ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-8'
            }`}
          >
            {/* Visual shockwave pulse on landing */}
            <div 
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-cyan-400/60 shadow-[0_0_50px_rgba(0,240,255,0.4)] pointer-events-none transition-all duration-1000 ${
                phase >= 2 ? 'scale-150 opacity-0' : 'scale-50 opacity-80'
              }`} 
            />

            <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />

            <div className="absolute bottom-3 left-3 pointer-events-none font-mono text-[10px] text-cyan-400/80 bg-black/60 px-2.5 py-1.5 rounded border border-cyan-500/20 backdrop-blur-md">
              <span>CORE: GEODESIC_POLYHEDRON // 0x9AF4</span><br />
              <span>LIGHTING: DUAL_SPECULAR_TRACKING</span>
            </div>

            <div className="absolute bottom-3 right-3 pointer-events-none font-mono text-[10px] text-purple-400/80 bg-black/60 px-2.5 py-1.5 rounded border border-purple-500/20 backdrop-blur-md text-right">
              <span>RENDER_ENGINE: WEBGL_2D_PROJECTED</span><br />
              <span>INTERACTION: POINTER_GRAVITY</span>
            </div>
          </div>

          {/* Phase 3: Secondary CTAs & Social Proof Metrics Reveal */}
          <div 
            className={`flex flex-col items-center gap-6 mt-4 transition-all duration-700 ${
              phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'
            }`}
          >
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <a
                href="#preview"
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-mono text-xs font-bold uppercase tracking-wider hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <span>Initialize Node</span>
                <ArrowUpRight size={14} />
              </a>

              <a
                href="#features"
                className="px-8 py-3.5 rounded-full bg-white/[0.04] border border-white/10 text-white font-mono text-xs uppercase tracking-wider hover:bg-white/[0.08] hover:border-cyan-400/40 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <span>Explore Architecture</span>
                <span className="text-cyan-400 font-bold">⬡</span>
              </a>
            </div>

            <div className="flex items-center gap-6 flex-wrap justify-center font-mono text-xs text-neutral-400 pt-2 border-t border-white/[0.06]">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <b>142,890</b> OPS/SEC
              </span>
              <span className="text-neutral-700">|</span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                <b>0.002s</b> FINALITY
              </span>
              <span className="text-neutral-700">|</span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <b>124</b> GLOBAL REGIONS
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* VALUE PROPOSITION: 3-COLUMN FEATURE GRID */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/[0.06] relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="font-mono text-cyan-400 text-xs uppercase tracking-widest mb-2">01 // COMPUTATIONAL SUBSTRATE</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase text-white tracking-tight">
              Engineered for <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Extreme Fidelity.</span>
            </h2>
          </div>
          <p className="text-neutral-400 text-sm max-w-md font-light leading-relaxed">
            Every layer is optimized from bare metal kernels up to browser runtime for continuous spatial synchronization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-[#111116]/80 border border-white/[0.08] backdrop-blur-md hover:border-cyan-400/40 hover:-translate-y-1 transition-all flex flex-col justify-between min-h-[320px]">
            <div>
              <div className="flex justify-between items-center mb-6 font-mono">
                <span className="text-xs text-cyan-400 font-bold">[01]</span>
                <span className="text-[10px] text-neutral-500 uppercase">LATENCY ENGINE</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6">
                <Zap size={22} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 uppercase">Sub-Millisecond Routing</h3>
              <p className="text-neutral-400 text-sm leading-relaxed font-light">
                Direct peer-to-peer UDP communication pipelines delivering deterministic state updates under 4 milliseconds across 124 edge clusters worldwide.
              </p>
            </div>
            <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between font-mono text-xs text-neutral-500">
              <span>BENCHMARK: 3.8ms</span>
              <span className="text-cyan-400 font-bold">P99_OPTIMAL</span>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-[#111116]/80 border border-white/[0.08] backdrop-blur-md hover:border-purple-400/40 hover:-translate-y-1 transition-all flex flex-col justify-between min-h-[320px]">
            <div>
              <div className="flex justify-between items-center mb-6 font-mono">
                <span className="text-xs text-purple-400 font-bold">[02]</span>
                <span className="text-[10px] text-neutral-500 uppercase">STATE MACHINE</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6">
                <Shield size={22} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 uppercase">Autonomous Consensus</h3>
              <p className="text-neutral-400 text-sm leading-relaxed font-light">
                Self-healing state synchronizers executing multi-agent transactions with zero-knowledge cryptographic proofs and crash-safe rollback guarantees.
              </p>
            </div>
            <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between font-mono text-xs text-neutral-500">
              <span>CONSENSUS: BYZANTINE</span>
              <span className="text-purple-400 font-bold">PROVEN_100%</span>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-[#111116]/80 border border-white/[0.08] backdrop-blur-md hover:border-emerald-400/40 hover:-translate-y-1 transition-all flex flex-col justify-between min-h-[320px]">
            <div>
              <div className="flex justify-between items-center mb-6 font-mono">
                <span className="text-xs text-emerald-400 font-bold">[03]</span>
                <span className="text-[10px] text-neutral-500 uppercase">GRAPHICS PIPELINE</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                <Cpu size={22} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 uppercase">Neural Mesh Acceleration</h3>
              <p className="text-neutral-400 text-sm leading-relaxed font-light">
                WebGPU compute shaders streaming procedural geometries and photorealistic radiance fields straight into standard client viewports at 120 FPS.
              </p>
            </div>
            <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between font-mono text-xs text-neutral-500">
              <span>FRAME_BUDGET: 8.3ms</span>
              <span className="text-emerald-400 font-bold">120_FPS_SYNC</span>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE PRODUCT PREVIEW CARD (SPATIAL RUNTIME CONSOLE) */}
      <section id="preview" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/[0.06] relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="font-mono text-cyan-400 text-xs uppercase tracking-widest mb-2">02 // INTERACTIVE PREVIEW</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase text-white tracking-tight">
              Spatial Runtime <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Console.</span>
            </h2>
          </div>
          <button
            onClick={handleInject}
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-mono text-xs font-bold uppercase hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all"
          >
            {sprintDispatched ? 'Sprint Dispatched! ✓' : 'Inject Synthetic Sprint ⚡'}
          </button>
        </div>

        <div className="bg-[#0d0d12] border border-white/[0.09] rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 bg-[#14141c] border-b border-white/[0.07]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <span className="font-mono text-xs text-neutral-400 ml-4 hidden sm:inline">aether-node://terminal-session-0849</span>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs">
              <button 
                onClick={() => setActiveTab('consensus')}
                className={`px-3 py-1 rounded transition-colors ${activeTab === 'consensus' ? 'bg-white/[0.08] text-cyan-400 border border-cyan-500/30' : 'text-neutral-400 hover:text-white'}`}
              >
                Consensus Stream
              </button>
              <button 
                onClick={() => setActiveTab('graph')}
                className={`px-3 py-1 rounded transition-colors hidden sm:inline ${activeTab === 'graph' ? 'bg-white/[0.08] text-cyan-400 border border-cyan-500/30' : 'text-neutral-400 hover:text-white'}`}
              >
                Node Graph
              </button>
            </div>

            <div className="font-mono text-xs text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> LIVE
            </div>
          </div>

          <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="space-y-4 font-mono">
                <div className="text-xs text-neutral-500 uppercase tracking-wider">TELEMETRY_GAUGES // REGION_AP_SOUTH</div>
                
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-neutral-400 block">TOTAL COMPUTE THROUGHPUT</span>
                    <span className="text-2xl font-bold text-white font-sans">{throughput.toLocaleString()} ops/s</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-emerald-400 font-bold">+14.2%</span>
                    <span className="text-[10px] text-neutral-500 block">vs baseline</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-neutral-400 block">PEER NETWORK LATENCY</span>
                    <span className="text-2xl font-bold text-cyan-400 font-sans">{latency} ms</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-cyan-400 font-bold">OPTIMAL</span>
                    <span className="text-[10px] text-neutral-500 block">124 peer mesh</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-neutral-400 block">ZERO-KNOWLEDGE BATCH</span>
                    <span className="text-2xl font-bold text-purple-400 font-sans">#{blockHeight.toLocaleString()}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-purple-400 font-bold">FINALIZED</span>
                    <span className="text-[10px] text-neutral-500 block">0.002s ago</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 font-mono">
                <span className="text-xs text-cyan-300 font-bold block mb-1">CLIENT SDK INTEGRATION</span>
                <code className="text-xs text-neutral-300 block bg-black/40 p-2.5 rounded border border-white/[0.06]">
                  import &#123; AetherCluster &#125; from '@aether/spatial';<br />
                  const node = await AetherCluster.connect(&#123; mesh: 'global' &#125;);
                </code>
              </div>
            </div>

            <div className="lg:col-span-7 bg-black/60 rounded-xl border border-white/[0.06] p-5 font-mono text-xs flex flex-col justify-between h-[360px] overflow-hidden">
              <div className="flex justify-between items-center pb-2 border-b border-white/[0.06] text-neutral-500 text-[11px]">
                <span>SYSTEM CONSOLE LOG // REALTIME DAEMON</span>
                <span>UTC ACTIVE</span>
              </div>

              <div className="flex-1 overflow-y-auto py-3 space-y-1.5 text-neutral-300 leading-relaxed">
                <div className="text-neutral-500">[0.001s] AETHER_CORE: Initializing quantum consensus substrate...</div>
                <div className="text-cyan-400">[0.003s] MESH_SYNC: 124 global edge validators synchronized.</div>
                <div className="text-neutral-400">[0.006s] WEBGPU_KERNEL: Compiling spatial radiance field shaders.</div>
                <div className="text-emerald-400">[0.010s] MEMORY_ALLOC: Zero-latency ring buffer attached at 0x7FFE990.</div>
                <div className="text-purple-400">[0.014s] ZK_PROOFS: Batch #{blockHeight} successfully attested with 100% quorum.</div>
                <div className="text-neutral-300">[0.018s] AGENT_ORCHESTRATOR: 480,000 autonomous threads executing smoothly.</div>
                {sprintDispatched && (
                  <div className="text-cyan-300 font-bold">[+0.022s] INJECT: 10,000 synthetic agent transactions attested in {latency}ms.</div>
                )}
                <div className="text-cyan-400">[0.024s] STREAM_READY: Real-time telemetry feed active on port 8443.</div>
              </div>

              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-neutral-400 text-[11px]">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" /> Listening on ws://mesh.aether.network
                </span>
                <span className="text-cyan-400">AUTO-SCROLL: ON</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METRIC COUNTERS & SOCIAL PROOF */}
      <section id="metrics" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/[0.06] relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="font-mono text-cyan-400 text-xs uppercase tracking-widest mb-2">03 // PROVEN RELIABILITY</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase text-white tracking-tight">
            Trusted Across <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Autonomous Horizons.</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-[#111116] border border-white/[0.07] text-center hover:border-cyan-500/30 transition-all">
            <div className="text-4xl sm:text-5xl font-black text-white mb-2">99.999%</div>
            <div className="font-mono text-xs text-cyan-400 font-bold uppercase mb-1">FAULT-TOLERANT UPTIME</div>
            <p className="text-xs text-neutral-500">Autonomous failover within 12 milliseconds</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#111116] border border-white/[0.07] text-center hover:border-purple-500/30 transition-all">
            <div className="text-4xl sm:text-5xl font-black text-white mb-2">&lt; 3.8ms</div>
            <div className="font-mono text-xs text-purple-400 font-bold uppercase mb-1">AVERAGE EDGE LATENCY</div>
            <p className="text-xs text-neutral-500">Global median P99 packet roundtrip</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#111116] border border-white/[0.07] text-center hover:border-cyan-500/30 transition-all">
            <div className="text-4xl sm:text-5xl font-black text-white mb-2">$4.2B+</div>
            <div className="font-mono text-xs text-cyan-400 font-bold uppercase mb-1">VALUE SETTLED</div>
            <p className="text-xs text-neutral-500">Cryptographically guaranteed state</p>
          </div>

          <div className="p-6 rounded-2xl bg-[#111116] border border-white/[0.07] text-center hover:border-emerald-500/30 transition-all">
            <div className="text-4xl sm:text-5xl font-black text-white mb-2">480k+</div>
            <div className="font-mono text-xs text-emerald-400 font-bold uppercase mb-1">AUTONOMOUS AGENTS</div>
            <p className="text-xs text-neutral-500">Concurrently orchestrating workflows</p>
          </div>
        </div>
      </section>

      {/* MINIMALIST CYBER FOOTER */}
      <footer className="pt-20 pb-16 px-6 max-w-7xl mx-auto border-t border-white/[0.06] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-400 p-[1.5px]">
                <div className="w-full h-full bg-[#0a0a0c] rounded-[6px] flex items-center justify-center text-cyan-400 font-bold text-sm">
                  ⬡
                </div>
              </div>
              <span className="font-bold text-lg tracking-wider text-white font-mono">AETHER SYSTEMS</span>
            </div>

            <p className="text-neutral-400 text-sm max-w-md font-light leading-relaxed">
              Receive core protocol releases, cryptographic verification benchmarks, and spatial compute engineering whitepapers.
            </p>

            <form onSubmit={handleNewsletter} className="flex items-center gap-2 max-w-md">
              <input
                type="email"
                placeholder="architect@domain.dev"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-full bg-white/[0.04] border border-white/[0.1] text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-400 font-mono transition-all"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-mono text-xs font-bold uppercase tracking-wider whitespace-nowrap hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all"
              >
                Subscribe
              </button>
            </form>
            {subscribed && (
              <span className="font-mono text-xs text-emerald-400">✓ Subscribed. Welcome to the Aether dispatch.</span>
            )}
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8 font-mono text-xs">
            <div>
              <span className="text-white font-bold block mb-4 uppercase">Substrate</span>
              <ul className="space-y-2.5 text-neutral-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Core Geometry</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Neural Mesh</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Zero-Knowledge</a></li>
              </ul>
            </div>

            <div>
              <span className="text-white font-bold block mb-4 uppercase">Developers</span>
              <ul className="space-y-2.5 text-neutral-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">GitHub Repo</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Whitepaper</a></li>
              </ul>
            </div>

            <div>
              <span className="text-white font-bold block mb-4 uppercase">Ecosystem</span>
              <ul className="space-y-2.5 text-neutral-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Network Status</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Discord Community</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">X / Twitter</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-4 font-mono text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>ALL 124 EDGE VALIDATORS NOMINAL (100% QUORUM)</span>
          </div>
          <div>
            <span>© 2026 AETHER SPATIAL SYSTEMS INC. // RESTRICTED ACCESS</span>
          </div>
        </div>
      </footer>

    </div>
  )
}
