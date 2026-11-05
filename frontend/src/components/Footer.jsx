import { Mail } from 'lucide-react'
import { profile } from '../data'
import MagneticButton from './MagneticButton'

export default function Footer() {
  const mailHref = profile.email ? `mailto:${profile.email}` : '#contact'

  return (
    <footer className="footer section-pad" id="contact">
      <div>
        <p className="eyebrow font-mono-micro">06 — Your turn</p>
        <h2 className="section-title-syne">
          Have a good idea?
          <br />
          <em className="serif-italic-accent">Let's make it real.</em>
        </h2>
      </div>

      <MagneticButton className="contact-orb" href={mailHref}>
        <Mail size={22} aria-hidden="true" />
        <span className="font-mono-micro">
          Say hello
          <br />
          ↗
        </span>
      </MagneticButton>

      <div className="footer-bottom font-mono-micro">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Designed & built with creative craft</span>
        <MagneticButton href="#top" className="back-to-top-link">
          Back to top ↑
        </MagneticButton>
      </div>
    </footer>
  )
}
