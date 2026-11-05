import { useEffect } from 'react'

/**
 * useScrollReveal
 * Observes sections and elements with .reveal-init or section tags
 * Smooth enter/exit view transitions with IntersectionObserver
 * Subtly fades and slides up as the user scrolls into view.
 */
export function useScrollReveal() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const targetElements = document.querySelectorAll(
      '.reveal-init, section, .hero-copy, .intro-grid > div, .skills-layout, .featured-showcase, .project-card, .cert-card, .timeline-card, .moments-row, .footer > div'
    )

    if (prefersReducedMotion) {
      targetElements.forEach((el) => {
        el.classList.add('is-visible')
      })
      return
    }

    // Immediately trigger any element already visible in initial viewport
    targetElements.forEach((el) => {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('is-visible')
      }
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          } else {
            // Smooth exit transition when scrolled far out of view
            const rect = entry.target.getBoundingClientRect()
            if (rect.top > window.innerHeight * 1.25 || rect.bottom < -window.innerHeight * 0.25) {
              entry.target.classList.remove('is-visible')
            }
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    targetElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}
