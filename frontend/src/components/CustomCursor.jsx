import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * CustomCursor
 * High-end creative technologist fluid magnetic cursor.
 * - Central precision dot tracking cursor instantly without latency.
 * - Outer elastic spring ring with smooth lag (stiffness: 450, damping: 28).
 * - Expands dynamically on hover over links, buttons, and interactive elements.
 * - Centered via margin offsets (-19px, -4px) to avoid transform conflicts.
 * - Bulletproof on desktop, trackpads, and touchscreen-hybrid Windows laptops.
 */
export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  // Direct mouse coordinates
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Smooth spring physics for outer trailing ring
  const springConfig = { stiffness: 450, damping: 28, mass: 0.35 }
  const ringX = useSpring(mouseX, springConfig)
  const ringY = useSpring(mouseY, springConfig)

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const handlePointerMove = (e) => {
      // Don't show cursor for touch taps
      if (e.pointerType === 'touch') {
        setIsVisible(false)
        return
      }

      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setIsVisible(true)

      // Detect if cursor is over interactive elements
      const target = e.target
      if (target instanceof Element) {
        const isInteractive = Boolean(
          target.closest(
            'a, button, [role="button"], input, select, textarea, .project-card, .element, .id-card, .tilt-card, .audio-toggle-pill, .filter-row button, .keycap-tile, .cert-row, .moment-card, .stat-card'
          )
        )
        setIsHovered(isInteractive)
      }
    }

    const handlePointerDown = (e) => {
      if (e.pointerType !== 'touch') setIsPressed(true)
    }
    const handlePointerUp = () => setIsPressed(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)
    const handleTouchStart = () => setIsVisible(false)

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointerup', handlePointerUp)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('touchstart', handleTouchStart, { passive: true })

    document.documentElement.classList.add('has-custom-cursor')

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointerup', handlePointerUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('touchstart', handleTouchStart)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [mouseX, mouseY])

  return (
    <div
      className={`custom-cursor-root ${isVisible ? 'visible' : ''}`}
      aria-hidden="true"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.22s ease'
      }}
    >
      {/* Outer Spring Trailing Ring */}
      <motion.div
        className="cursor-outer-ring"
        style={{
          x: ringX,
          y: ringY
        }}
        animate={{
          scale: isPressed ? 0.75 : isHovered ? 1.65 : 1,
          borderColor: isHovered ? '#141414' : 'rgba(20, 20, 20, 0.45)',
          backgroundColor: isHovered ? 'rgba(217, 255, 79, 0.35)' : 'rgba(249, 248, 243, 0.15)'
        }}
        transition={{ duration: 0.16, ease: 'easeOut' }}
      />

      {/* Center Instant Precision Dot */}
      <motion.div
        className="cursor-inner-dot"
        style={{
          x: mouseX,
          y: mouseY
        }}
        animate={{
          scale: isPressed ? 1.3 : isHovered ? 0.4 : 1
        }}
        transition={{ duration: 0.12 }}
      />
    </div>
  )
}
