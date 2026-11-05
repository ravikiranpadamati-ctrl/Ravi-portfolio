import { useState, useEffect, useRef } from 'react'

/**
 * CountUpNumber
 * Animates a number from 0 to target using requestAnimationFrame with easeOutQuad interpolation
 * when the element scrolls into view. Supports suffix (e.g. '+', '%') and reduced-motion fallback.
 */
export default function CountUpNumber({ target, suffix = '', duration = 1400 }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setCount(target)
      setHasAnimated(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            let startTimestamp = null
            const step = (timestamp) => {
              if (!startTimestamp) startTimestamp = timestamp
              const progress = Math.min((timestamp - startTimestamp) / duration, 1)
              // Ease-out quad interpolation
              const easeOut = 1 - (1 - progress) * (1 - progress)
              setCount(Math.floor(easeOut * target))
              if (progress < 1) {
                window.requestAnimationFrame(step)
              } else {
                setCount(target)
              }
            }
            window.requestAnimationFrame(step)
          }
        })
      },
      { threshold: 0.25 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [target, duration, hasAnimated])

  return (
    <span ref={elementRef} className="tabular-nums">
      {count}
      {suffix}
    </span>
  )
}
