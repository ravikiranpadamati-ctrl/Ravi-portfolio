import { useState } from 'react'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Layers3,
  Menu,
  PanelsTopLeft,
  Sparkles,
  X
} from 'lucide-react'
import { profile, projects } from '../data'
import RevealUp from './RevealUp'

const navigation = [
  ['About', '#about'],
  ['Services', '#services'],
  ['Selected work', '#work']
]

const serviceIcons = [Layers3, PanelsTopLeft, Bot]

const projectImages = [
  {
    src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=85',
    alt: 'Developer workspace with a laptop and code editor'
  },
  {
    src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85',
    alt: 'Light-filled collaborative studio workspace'
  },
  {
    src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=85',
    alt: 'Creative team collaborating around a laptop'
  }
]

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="st-header">
      <nav className="st-nav" aria-label="Primary navigation">
        <a className="st-wordmark" href="#top" aria-label={`${profile.name} home`}>
          {profile.name} <span>· DEVELOPER</span>
        </a>

        <div className="st-nav-links">
          {navigation.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </div>

        <a className="st-nav-cta" href="#contact">
          Let&apos;s talk <ArrowUpRight size={14} aria-hidden="true" />
        </a>

        <button
          type="button"
          className="st-menu-toggle"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="st-mobile-menu"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <div id="st-mobile-menu" className={`st-mobile-menu${isMenuOpen ? ' is-open' : ''}`}>
        {navigation.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setIsMenuOpen(false)}>{label}</a>
        ))}
        <a href="#contact" onClick={() => setIsMenuOpen(false)}>Let&apos;s talk</a>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="st-hero st-container" id="top">
      <div className="st-hero-copy">
        <RevealUp as="p" className="st-kicker">
          {profile.role} <span>·</span> {profile.location}
        </RevealUp>
        <RevealUp as="h1" className="st-hero-title">
          <span>Engineering</span>
          <span>future tools</span>
          <em>with {profile.headline[1]}</em>
        </RevealUp>
        <RevealUp as="p" className="st-hero-description">
          {profile.about}
        </RevealUp>
        <RevealUp as="a" className="st-text-link" href="#work">
          Explore selected work <ArrowDownRight size={18} aria-hidden="true" />
        </RevealUp>
      </div>

      <RevealUp className="st-hero-visual">
        <div className="st-hero-photo">
          <img
            src="https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=1600&q=90"
            alt="A designer's hands working across a warm, sunlit studio desk"
            fetchPriority="high"
          />
        </div>
        <div className="st-hero-image-caption">
          <span>Ideas into interfaces</span>
          <span>12° 58&apos; N — 77° 35&apos; E</span>
        </div>
        <div className="st-concierge-badge" aria-label="One of one: thoughtful by design">
          <span className="st-badge-number">01</span>
          <span>Thoughtful<br />by design</span>
        </div>
      </RevealUp>

      <div className="st-hero-index" aria-hidden="true">
        <span>SCROLL TO EXPLORE</span>
        <span className="st-index-line" />
        <span>01 — 04</span>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section className="st-services" id="services">
      <div className="st-container">
        <RevealUp className="st-section-heading">
          <p className="st-kicker">How I work</p>
          <h2>Thoughtful by<br /><em>design.</em></h2>
        </RevealUp>

        <div className="st-service-grid">
          {profile.pillars.map((service, index) => {
            const Icon = serviceIcons[index]
            return (
            <RevealUp as="article" className="st-service-card" key={service.num} style={{ transitionDelay: `${index * 100}ms` }}>
              <div className="st-service-meta">
                <span>{service.num} / 03</span>
                <Icon size={34} strokeWidth={1.5} aria-hidden="true" />
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ArrowUpRight className="st-service-arrow" size={18} aria-hidden="true" />
            </RevealUp>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Portfolio() {
  return (
    <section className="st-work st-container" id="work">
      <RevealUp className="st-work-heading">
        <div>
          <p className="st-kicker">Selected work · 2024—26</p>
          <h2>Things I&apos;ve<br /><em>built.</em></h2>
        </div>
        <p>A few explorations in building technology that feels clear, useful, and distinctly human.</p>
      </RevealUp>

      <div className="st-project-grid">
        {projects.map((project, index) => (
          <RevealUp
            as="article"
            className={`st-project-card${index % 2 === 1 ? ' st-project-offset' : ''}`}
            key={project.number}
            style={{ transitionDelay: `${index * 120}ms` }}
          >
            <a
              className="st-project-image-link"
              href={project.code || '#contact'}
              target={project.code ? '_blank' : undefined}
              rel={project.code ? 'noreferrer' : undefined}
              aria-label={`View ${project.title} project`}
            >
              <div className="st-project-image">
                <img
                  src={projectImages[index % projectImages.length].src}
                  alt={projectImages[index % projectImages.length].alt}
                  loading="lazy"
                />
                <span className="st-view-case">View<br />case <ArrowUpRight size={14} aria-hidden="true" /></span>
                <span className="st-project-number">{project.number}</span>
              </div>
            </a>
            <div className="st-project-info">
              <p className="st-project-category">{project.category}</p>
              <h3>{project.title}</h3>
              <div className="st-project-tags">
                {project.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </div>
          </RevealUp>
        ))}
      </div>

      <RevealUp className="st-work-footer">
        <span>Curiosity, craft, and a little bit of code.</span>
        <a href="#contact">Have a good one? Let&apos;s talk <ArrowRight size={16} aria-hidden="true" /></a>
      </RevealUp>
    </section>
  )
}

function Footer() {
  return (
    <footer className="st-footer" id="contact">
      <div className="st-container">
        <RevealUp className="st-footer-main">
          <div className="st-footer-brand">
            <a className="st-wordmark" href="#top">{profile.name} <span>· DEVELOPER</span></a>
            <p>
              {profile.about}
            </p>
            <a className="st-footer-email" href={`mailto:${profile.email}`}>
              {profile.email} <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>

          <div className="st-footer-column">
            <h2>Explore</h2>
            <a href="#about">About Ravi</a>
            <a href="#services">What I do</a>
            <a href="#work">Selected work</a>
            <a href="#contact">Get in touch</a>
          </div>

          <div className="st-footer-column">
            <h2>Find me</h2>
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={12} /></a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={12} /></a>
            <a href={`mailto:${profile.email}`}>Email <ArrowUpRight size={12} /></a>
          </div>

          <div className="st-footer-column">
            <h2>Based in</h2>
            <p>{profile.location}</p>
            <p>Working everywhere</p>
            <span className="st-footer-note"><Sparkles size={13} /> Open to thoughtful collaborations</span>
          </div>
        </RevealUp>

        <div className="st-footer-bottom">
          <span>© {new Date().getFullYear()} {profile.name} KIRAN</span>
          <span>Made with intention in Bengaluru</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  )
}

export default function SuperTravelLanding() {
  return (
    <div className="super-travel-page" id="about">
      <Navigation />
      <main>
        <Hero />
        <Services />
        <Portfolio />
      </main>
      <Footer />
    </div>
  )
}
