import { useState, useRef, useEffect, useCallback } from 'react'

/**
 * ElasticFrame (Scrolltide #c-elastic-frame reference)
 * - Container edge behaves like a tensioned, elastic string
 * - When pointer approaches any edge, it plucks outward into a glowing veil
 * - When cursor releases or leaves, it springs back with realistic physical wobble
 * - Fully guarded against zero-dimension layout or gradient anomalies
 */
export default function ElasticFrame({
  children,
  className = '',
  borderRadius = 24,
  maxStretch = 26,
  threshold = 40,
  stiffness = 280,
  damping = 14,
  accentGlow = 'rgba(0, 240, 255, 0.4)',
  veilGlow = 'rgba(124, 58, 237, 0.25)',
  borderColor = 'rgba(255, 255, 255, 0.12)',
  activeBorderColor = 'rgba(0, 240, 255, 0.8)'
}) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)

  // Physics state for 4 edges: 0: top, 1: right, 2: bottom, 3: left
  const edgesRef = useRef([
    { displacement: 0, velocity: 0, target: 0, pluckT: 0.5, active: false },
    { displacement: 0, velocity: 0, target: 0, pluckT: 0.5, active: false },
    { displacement: 0, velocity: 0, target: 0, pluckT: 0.5, active: false },
    { displacement: 0, velocity: 0, target: 0, pluckT: 0.5, active: false }
  ])

  const animFrameRef = useRef(null)
  const lastTimeRef = useRef(performance.now())

  // Handle pointer tracking
  const handleMouseMove = useCallback((e) => {
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    if (!rect || rect.width <= 0 || rect.height <= 0) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const w = rect.width
    const h = rect.height

    const edges = edgesRef.current

    // 0: TOP EDGE
    if (x >= 0 && x <= w && Math.abs(y) < threshold && y > -threshold) {
      const dist = Math.max(0, threshold - Math.abs(y))
      const factor = dist / threshold
      edges[0].target = -factor * maxStretch
      edges[0].pluckT = Math.max(0.15, Math.min(0.85, x / w))
      edges[0].active = true
    } else {
      edges[0].target = 0
      edges[0].active = false
    }

    // 1: RIGHT EDGE
    const distRight = Math.abs(x - w)
    if (y >= 0 && y <= h && distRight < threshold) {
      const dist = Math.max(0, threshold - distRight)
      const factor = dist / threshold
      edges[1].target = factor * maxStretch
      edges[1].pluckT = Math.max(0.15, Math.min(0.85, y / h))
      edges[1].active = true
    } else {
      edges[1].target = 0
      edges[1].active = false
    }

    // 2: BOTTOM EDGE
    const distBottom = Math.abs(y - h)
    if (x >= 0 && x <= w && distBottom < threshold) {
      const dist = Math.max(0, threshold - distBottom)
      const factor = dist / threshold
      edges[2].target = factor * maxStretch
      edges[2].pluckT = Math.max(0.15, Math.min(0.85, x / w))
      edges[2].active = true
    } else {
      edges[2].target = 0
      edges[2].active = false
    }

    // 3: LEFT EDGE
    if (y >= 0 && y <= h && Math.abs(x) < threshold && x > -threshold) {
      const dist = Math.max(0, threshold - Math.abs(x))
      const factor = dist / threshold
      edges[3].target = -factor * maxStretch
      edges[3].pluckT = Math.max(0.15, Math.min(0.85, y / h))
      edges[3].active = true
    } else {
      edges[3].target = 0
      edges[3].active = false
    }
  }, [maxStretch, threshold])

  const handleMouseLeave = useCallback(() => {
    edgesRef.current.forEach(edge => {
      edge.target = 0
      edge.active = false
    })
  }, [])

  // Canvas render and physics simulation loop
  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let dpr = window.devicePixelRatio || 1

    const updateSize = () => {
      if (!container || !canvas) return
      const rect = container.getBoundingClientRect()
      if (rect.width <= 0 || rect.height <= 0) return

      dpr = window.devicePixelRatio || 1
      canvas.width = (rect.width + maxStretch * 4) * dpr
      canvas.height = (rect.height + maxStretch * 4) * dpr
      canvas.style.width = `${rect.width + maxStretch * 4}px`
      canvas.style.height = `${rect.height + maxStretch * 4}px`
    }

    updateSize()
    const resizeObserver = new ResizeObserver(updateSize)
    resizeObserver.observe(container)

    const renderLoop = (time) => {
      const dt = Math.min((time - lastTimeRef.current) / 1000, 0.05)
      lastTimeRef.current = time

      const rect = container.getBoundingClientRect()
      const w = rect.width
      const h = rect.height

      if (w <= 0 || h <= 0) {
        animFrameRef.current = requestAnimationFrame(renderLoop)
        return
      }

      const offset = maxStretch * 2
      const r = Math.max(1, Math.min(borderRadius, w / 4, h / 4))

      // Clear Canvas
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.scale(dpr, dpr)
      ctx.translate(offset, offset)

      // Update Spring Physics for each edge
      edgesRef.current.forEach((edge) => {
        const force = -stiffness * (edge.displacement - edge.target) - damping * edge.velocity
        edge.velocity += force * dt
        edge.displacement += edge.velocity * dt
      })

      const edges = edgesRef.current

      // Corner anchor points
      const pTopLeft = { x: r, y: 0 }
      const pTopRight = { x: w - r, y: 0 }
      const pRightTop = { x: w, y: r }
      const pRightBottom = { x: w, y: h - r }
      const pBottomRight = { x: w - r, y: h }
      const pBottomLeft = { x: r, y: h }
      const pLeftBottom = { x: 0, y: h - r }
      const pLeftTop = { x: 0, y: r }

      // Deformed edge control points
      const topCtrl = {
        x: r + (w - 2 * r) * edges[0].pluckT,
        y: edges[0].displacement
      }
      const rightCtrl = {
        x: w + edges[1].displacement,
        y: r + (h - 2 * r) * edges[1].pluckT
      }
      const bottomCtrl = {
        x: r + (w - 2 * r) * edges[2].pluckT,
        y: h + edges[2].displacement
      }
      const leftCtrl = {
        x: edges[3].displacement,
        y: r + (h - 2 * r) * edges[3].pluckT
      }

      // 1. Draw Glowing Veils for actively plucked edges
      edges.forEach((edge, idx) => {
        if (Math.abs(edge.displacement) > 0.8) {
          ctx.save()
          ctx.beginPath()

          if (idx === 0) { // Top veil
            ctx.moveTo(pTopLeft.x, pTopLeft.y)
            ctx.quadraticCurveTo(topCtrl.x, topCtrl.y, pTopRight.x, pTopRight.y)
            ctx.lineTo(pTopRight.x, 0)
            ctx.lineTo(pTopLeft.x, 0)
            ctx.closePath()

            const endY = Math.max(topCtrl.y + 15, 35)
            const grad = ctx.createLinearGradient(0, topCtrl.y, 0, endY)
            grad.addColorStop(0, accentGlow)
            grad.addColorStop(0.5, veilGlow)
            grad.addColorStop(1, 'transparent')
            ctx.fillStyle = grad
            ctx.fill()
          } else if (idx === 1) { // Right veil
            ctx.moveTo(pRightTop.x, pRightTop.y)
            ctx.quadraticCurveTo(rightCtrl.x, rightCtrl.y, pRightBottom.x, pRightBottom.y)
            ctx.lineTo(w, pRightBottom.y)
            ctx.lineTo(w, pRightTop.y)
            ctx.closePath()

            const endX = Math.min(rightCtrl.x - 15, w - 35)
            const grad = ctx.createLinearGradient(rightCtrl.x, 0, endX, 0)
            grad.addColorStop(0, accentGlow)
            grad.addColorStop(0.5, veilGlow)
            grad.addColorStop(1, 'transparent')
            ctx.fillStyle = grad
            ctx.fill()
          } else if (idx === 2) { // Bottom veil
            ctx.moveTo(pBottomRight.x, pBottomRight.y)
            ctx.quadraticCurveTo(bottomCtrl.x, bottomCtrl.y, pBottomLeft.x, pBottomLeft.y)
            ctx.lineTo(pBottomLeft.x, h)
            ctx.lineTo(pBottomRight.x, h)
            ctx.closePath()

            const endY = Math.min(bottomCtrl.y - 15, h - 35)
            const grad = ctx.createLinearGradient(0, bottomCtrl.y, 0, endY)
            grad.addColorStop(0, accentGlow)
            grad.addColorStop(0.5, veilGlow)
            grad.addColorStop(1, 'transparent')
            ctx.fillStyle = grad
            ctx.fill()
          } else if (idx === 3) { // Left veil
            ctx.moveTo(pLeftBottom.x, pLeftBottom.y)
            ctx.quadraticCurveTo(leftCtrl.x, leftCtrl.y, pLeftTop.x, pLeftTop.y)
            ctx.lineTo(0, pLeftTop.y)
            ctx.lineTo(0, pLeftBottom.y)
            ctx.closePath()

            const endX = Math.max(leftCtrl.x + 15, 35)
            const grad = ctx.createLinearGradient(leftCtrl.x, 0, endX, 0)
            grad.addColorStop(0, accentGlow)
            grad.addColorStop(0.5, veilGlow)
            grad.addColorStop(1, 'transparent')
            ctx.fillStyle = grad
            ctx.fill()
          }
          ctx.restore()
        }
      })

      // 2. Draw Continuous Elastic String Path
      ctx.save()
      ctx.beginPath()

      // Start at top-left after corner
      ctx.moveTo(pTopLeft.x, pTopLeft.y)

      // Top Edge (Plucked)
      ctx.quadraticCurveTo(topCtrl.x, topCtrl.y, pTopRight.x, pTopRight.y)

      // Top-Right Corner
      ctx.arcTo(w, 0, pRightTop.x, pRightTop.y, r)

      // Right Edge (Plucked)
      ctx.quadraticCurveTo(rightCtrl.x, rightCtrl.y, pRightBottom.x, pRightBottom.y)

      // Bottom-Right Corner
      ctx.arcTo(w, h, pBottomRight.x, pBottomRight.y, r)

      // Bottom Edge (Plucked)
      ctx.quadraticCurveTo(bottomCtrl.x, bottomCtrl.y, pBottomLeft.x, pBottomLeft.y)

      // Bottom-Left Corner
      ctx.arcTo(0, h, pLeftBottom.x, pLeftBottom.y, r)

      // Left Edge (Plucked)
      ctx.quadraticCurveTo(leftCtrl.x, leftCtrl.y, pLeftTop.x, pLeftTop.y)

      // Top-Left Corner
      ctx.arcTo(0, 0, pTopLeft.x, pTopLeft.y, r)

      ctx.closePath()

      // Stroke with dynamic glow
      const anyActive = edges.some(e => Math.abs(e.displacement) > 1.2)
      ctx.strokeStyle = anyActive ? activeBorderColor : borderColor
      ctx.lineWidth = anyActive ? 1.8 : 1.2

      if (anyActive) {
        ctx.shadowColor = accentGlow
        ctx.shadowBlur = 12
      } else {
        ctx.shadowBlur = 0
      }

      ctx.stroke()
      ctx.restore()

      animFrameRef.current = requestAnimationFrame(renderLoop)
    }

    animFrameRef.current = requestAnimationFrame(renderLoop)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
      resizeObserver.disconnect()
    }
  }, [borderRadius, maxStretch, stiffness, damping, accentGlow, veilGlow, borderColor, activeBorderColor])

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
    >
      {/* Elastic Canvas Layer (Positions exactly around container with overflow for pluck stretch) */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute z-20"
        style={{
          top: `-${maxStretch * 2}px`,
          left: `-${maxStretch * 2}px`
        }}
      />

      {/* Internal Content (Kept cleanly inside) */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  )
}
