import { useState, useEffect } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { profile } from '../data'
import MagneticButton from './MagneticButton'

const links = [
  ['About', '#about'],
  ['Skills', '#skills'],
  ['Work', '#work'],
  ['Experience', '#experience'],
  ['Metrics', '#achievements'],
  ['Contact', '#contact']
]

/**
 * Senior Designer Navigation Header
 * - Frosted glassmorphism bar
 * - Real-time scroll reading progress bar
 * - Active section tracking
 * - Magnetic CTAs
 */
export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('')

  // Scroll progress and section spy
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = totalScroll > 0 ? (window.scrollY / totalScroll) * 100 : 0
      setScrollProgress(currentProgress)

      // Section spy
      const sections = links.map(([_, href]) => href.replace('#', ''))
      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Top 2px Scroll Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[2.5px] bg-[#141414] z-[100000] transition-all duration-75 ease-out"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <header className="nav-fixed-container">
        <nav className="nav-wrap" aria-label="Primary navigation">
          {/* Brand Monogram Logo */}
          <MagneticButton href="#top" className="monogram font-mono-micro" ariaLabel="Go to top">
            {profile.monogram}
          </MagneticButton>

          {/* Center Navigation Pill */}
          <div className="nav-pill font-mono-micro">
            {links.map(([label, href]) => {
              const secId = href.replace('#', '')
              const isActive = activeSection === secId
              return (
                <a
                  key={label}
                  href={href}
                  className={isActive ? 'active-nav-link' : ''}
                >
                  {label}
                </a>
              )
            })}
          </div>

          {/* Right Action Button */}
          <MagneticButton className="talk-button font-mono-micro" href="#contact">
            Let's talk <ArrowUpRight size={14} aria-hidden="true" />
          </MagneticButton>

          {/* Mobile Menu Toggle Button */}
          <button
            className="menu-toggle"
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <div id="mobile-navigation" className={`mobile-drawer font-mono-micro${open ? ' open' : ''}`}>
        {links.map(([label, href]) => (
          <a key={label} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </div>
    </>
  )
}
