import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * MagneticButton
 * Interactive magnetic pull micro-interaction for primary CTAs and social links.
 * Pulls subtly toward cursor on hover and springs back smoothly on leave.
 */
export default function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  target,
  rel,
  ariaLabel,
  pullStrength = 0.35,
  as = 'a'
}) {
  const ref = useRef(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring physics for smooth magnetic return
  const springConfig = { stiffness: 350, damping: 20, mass: 0.5 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = (e.clientX - centerX) * pullStrength
    const distanceY = (e.clientY - centerY) * pullStrength

    x.set(distanceX)
    y.set(distanceY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const Component = as === 'button' ? motion.button : motion.a

  return (
    <Component
      ref={ref}
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: xSpring,
        y: ySpring,
        display: 'inline-flex'
      }}
      className={className}
    >
      {children}
    </Component>
  )
}
