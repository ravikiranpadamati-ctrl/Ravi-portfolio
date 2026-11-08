import { useEffect, useRef, useState } from 'react'

export default function RevealUp({ as: Element = 'div', className = '', children, ...props }) {
  const elementRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true)
      return
    }

    const element = elementRef.current
    if (!element) return

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <Element
      {...props}
      ref={elementRef}
      className={`reveal-up${isVisible ? ' is-revealed' : ''}${className ? ` ${className}` : ''}`}
    >
      {children}
    </Element>
  )
}
