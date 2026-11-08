import { useEffect, useRef, useState } from 'react'

const defaultClassName =
  'text-3xl font-semibold tracking-tight transition-colors duration-500 sm:text-4xl md:text-5xl'

export default function AnimatedHeading({
  as: Heading = 'h3',
  lines,
  className = '',
  ...props
}) {
  const headingRef = useRef(null)
  const [isVisible, setIsVisible] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true)
      return
    }

    const heading = headingRef.current
    if (!heading) return

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 }
    )

    observer.observe(heading)
    return () => observer.disconnect()
  }, [])

  const accessibleText = lines.map(({ text }) => text).join(' ')
  let letterIndex = 0

  return (
    <Heading
      {...props}
      ref={headingRef}
      aria-label={accessibleText}
      className={`${defaultClassName} ${className}${isVisible ? ' is-visible' : ''}`}
    >
      {lines.map(({ text, emphasis = false }, lineIndex) => (
        <span className="animated-heading-line" aria-hidden="true" key={`${lineIndex}-${text}`}>
          {[...text].map((letter, index) => {
            const delay = letterIndex++ * 24
            return (
              <span
                className={`animated-heading-letter transition-colors duration-500${emphasis ? ' serif-italic-accent' : ''}`}
                style={{ animationDelay: `${delay}ms` }}
                key={`${index}-${letter}`}
              >
                {letter}
              </span>
            )
          })}
        </span>
      ))}
    </Heading>
  )
}
