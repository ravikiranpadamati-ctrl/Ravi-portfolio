import { useState, useEffect } from 'react'
import { ArrowDown, Copy, Check, ArrowUpRight } from 'lucide-react'
import { profile } from '../data'
import MagneticButton from './MagneticButton'
import ElasticFrame from './ElasticFrame'
import AnimatedHeading from './AnimatedHeading'

function GithubIcon({ size = 14, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

function LinkedinIcon({ size = 14, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

/**
 * Hero Component with Scrolltide Elastic Frame & Dark Luxury Aesthetics
 * - Asymmetric editorial layout with Syne + Instrument Serif typography
 * - Live real-time location clock (IST · UTC+5:30)
 * - One-click interactive email copy pill
 * - Scrolltide #c-elastic-frame: tensioned elastic string border that plucks outward into a glowing veil
 */
export default function Hero() {
  const [copied, setCopied] = useState(false)
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const updateClock = () => {
      try {
        const now = new Date()
        const formatted = now.toLocaleTimeString('en-US', {
          timeZone: profile.timezone || 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
        setCurrentTime(formatted)
      } catch (e) {
        setCurrentTime('10:00 AM IST')
      }
    }
    updateClock()
    const interval = setInterval(updateClock, 1000)
    return () => clearInterval(interval)
  }, [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2400)
    } catch (err) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2400)
    }
  }

  return (
    <section className="hero-senior-container section-pad relative z-10" id="hero">
      
      {/* Background Editorial Watermark */}
      <div className="hero-editorial-watermark" aria-hidden="true">
        <span>CRAFT</span>
        <span>SYSTEMS</span>
      </div>

      <div className="hero-grid-layout">
        
        {/* Left Column: Clean Editorial Narrative */}
        <div className="hero-lead-column">
          
          {/* Top Metadata Badges */}
          <div className="hero-meta-bar font-mono-micro">
            <span className="meta-pill live-pill">
              <span className="pulse-beacon" />
              <span>Available for New Roles</span>
            </span>
            <span className="meta-pill time-pill">
              <span className="dot-gray" />
              <span>{profile.location} · {currentTime || 'IST'}</span>
            </span>
          </div>

          {/* Master Display Headline */}
          <AnimatedHeading
            as="h1"
            className="hero-master-headline text-[clamp(3.2rem,6.8vw,6.8rem)] leading-[0.98] tracking-[-0.078em] max-[980px]:text-[clamp(3.1rem,7vw,4.8rem)] max-[760px]:text-[clamp(3.2rem,13vw,5.2rem)]"
            lines={[
              { text: profile.headline[0] },
              { text: profile.headline[1], emphasis: true }
            ]}
          />

          {/* Positioning Bio Copy */}
          <p className="hero-positioning-copy">
            {profile.about}
          </p>

          {/* Interactive Action Hub */}
          <div className="hero-actions-cluster">
            <MagneticButton href="#work" className="dark-button hero-cta-btn">
              Explore Selected Work <ArrowDown size={15} aria-hidden="true" />
            </MagneticButton>

            <button
              type="button"
              onClick={copyEmail}
              className="copy-email-pill font-mono-micro"
              aria-label="Copy email address"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Email Copied! ✓</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>{profile.email}</span>
                </>
              )}
            </button>
          </div>

          {/* Core Capability Chips */}
          <div className="hero-capability-chips font-mono-micro">
            <span>[01] Full-Stack Architecture</span>
            <span>[02] Autonomous AI Agents</span>
            <span>[03] Sensory UI/UX Motion</span>
          </div>

        </div>

        {/* Right Column: Scrolltide Elastic Frame Profile Card */}
        <div className="hero-pass-column">
          <ElasticFrame
            borderRadius={24}
            maxStretch={26}
            threshold={42}
            stiffness={290}
            damping={14}
            accentGlow="rgba(0, 240, 255, 0.45)"
            veilGlow="rgba(124, 58, 237, 0.28)"
            borderColor="rgba(255, 255, 255, 0.12)"
            activeBorderColor="rgba(0, 240, 255, 0.85)"
            className="w-full max-w-[390px]"
          >
            <div className="simple-profile-card">
              
              {/* Card Header */}
              <div className="profile-card-top font-mono-micro">
                <span className="text-neutral-400">01 // ELASTIC FRAME</span>
                <span className="simple-live-tag">
                  <span className="dot-live" /> ACTIVE BUILDER
                </span>
              </div>

              {/* Identity Row */}
              <div className="simple-profile-body">
                <div className="simple-avatar-orb">
                  <span className="font-syne text-2xl font-black text-white">{profile.monogram}</span>
                </div>
                <div className="simple-avatar-meta">
                  <strong className="font-syne text-xl text-white">{profile.name}</strong>
                  <span className="font-mono-micro text-neutral-400 text-xs block">{profile.role}</span>
                </div>
              </div>

              {/* Bio Highlights & Interactive Hint */}
              <div className="simple-profile-specs font-mono-micro">
                <div className="spec-item">
                  <span className="spec-label">EDUCATION</span>
                  <span className="spec-val">Master of Computer Applications</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">FOCUS</span>
                  <span className="spec-val">AI Systems · React & Python</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">INTERACTION</span>
                  <span className="spec-val text-cyan-400 font-bold">Pluck border with cursor ⚡</span>
                </div>
              </div>

              {/* Quick Connect Links */}
              <div className="simple-profile-actions font-mono-micro">
                {profile.github && (
                  <a href={profile.github} target="_blank" rel="noreferrer" className="simple-card-link">
                    <GithubIcon size={13} /> GitHub
                  </a>
                )}
                {profile.linkedin && (
                  <a href={profile.linkedin} target="_blank" rel="noreferrer" className="simple-card-link">
                    <LinkedinIcon size={13} /> LinkedIn
                  </a>
                )}
                {profile.email && (
                  <a href={`mailto:${profile.email}`} className="simple-card-link">
                    Contact ↗
                  </a>
                )}
              </div>

            </div>
          </ElasticFrame>
        </div>

      </div>
    </section>
  )
}
