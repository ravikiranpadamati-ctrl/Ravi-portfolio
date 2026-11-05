import { useEffect } from 'react'

export function useCustomCursor(cursorRef) {
  useEffect(() => {
    const cursor = cursorRef.current
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (!cursor || !finePointer.matches || reducedMotion.matches) return

    const root = document.documentElement
    root.classList.add('has-custom-cursor')

    const moveCursor = (event) => {
      if (event.pointerType !== 'mouse') return

      cursor.style.left = `${event.clientX}px`
      cursor.style.top = `${event.clientY}px`
      cursor.classList.add('visible')
      cursor.classList.toggle(
        'interactive',
        event.target instanceof Element &&
          Boolean(event.target.closest('a, button, [role="button"], input, select, textarea'))
      )
    }

    const hideCursor = () => cursor.classList.remove('visible', 'pressed', 'interactive')
    const pressCursor = (event) => {
      if (event.pointerType === 'mouse') cursor.classList.add('pressed')
    }
    const releaseCursor = () => cursor.classList.remove('pressed')

    window.addEventListener('pointermove', moveCursor)
    window.addEventListener('pointerdown', pressCursor)
    window.addEventListener('pointerup', releaseCursor)
    document.addEventListener('pointerleave', hideCursor)

    return () => {
      root.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', moveCursor)
      window.removeEventListener('pointerdown', pressCursor)
      window.removeEventListener('pointerup', releaseCursor)
      document.removeEventListener('pointerleave', hideCursor)
    }
  }, [cursorRef])
}
