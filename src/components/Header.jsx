import { useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { profile } from '../data'
import MagneticButton from './MagneticButton'

const links = [
  ['About', '#about'],
  ['Skills', '#skills'],
  ['Work', '#work'],
  ['Experience', '#experience'],
  ['Achievements', '#achievements'],
  ['Contact', '#contact']
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className="nav-wrap" aria-label="Primary navigation">
        <MagneticButton href="#top" className="monogram font-mono-micro" ariaLabel="Go to top">
          {profile.monogram}
        </MagneticButton>

        <div className="nav-pill font-mono-micro">
          {links.map(([label, href]) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </div>

        <MagneticButton className="talk-button font-mono-micro" href="#contact">
          Let's talk <ArrowUpRight size={14} aria-hidden="true" />
        </MagneticButton>

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
