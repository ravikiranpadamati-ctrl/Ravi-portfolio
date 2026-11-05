import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * TiltCard
 * Framer Motion 3D tilt component.
 * Perspective: 1000px
 * Spring physics: stiffness 300, damping 20
 */
export default function TiltCard({
  children,
  className = '',
  maxRotation = 12,
  style = {},
  onClick
}) {
  const ref = useRef(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring physics: stiffness 300, damping 20 as specified
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [maxRotation, -maxRotation])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-maxRotation, maxRotation])

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
        rotateX,
        rotateY,
        ...style
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
