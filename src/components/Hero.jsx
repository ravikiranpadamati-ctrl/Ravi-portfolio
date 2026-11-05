import { ArrowDown, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { profile } from '../data'
import MagneticButton from './MagneticButton'
import TiltCard from './TiltCard'
import CharacterAvatar from './CharacterAvatar'

/**
 * Hero Component
 * - Large editorial background watermark.
 * - Monospace live availability metadata pill.
 * - Bold Syne Display headline with Instrument Serif italic accent.
 * - Character avatar placeholder with subtle 3D tilt and ambient aura glow.
 * - Magnetic CTA button.
 */
export default function Hero() {
  return (
    <section className="hero" id="top">
      {/* Editorial Watermark */}
      <div className="hero-watermark" aria-hidden="true">
        {profile.watermark[0]}
        <br />
        {profile.watermark[1]}
      </div>

      {/* Monospace Metadata Row */}
      <div className="hero-meta font-mono-micro">
        <span className="meta-badge">
          <span className="dot-live" /> Based in {profile.location}
        </span>
        <span className="meta-badge">
          Available for select projects <i className="meta-pulse" />
        </span>
      </div>

      {/* Main Editorial Headline */}
      <div className="hero-copy">
        <p className="eyebrow font-mono-micro">{profile.eyebrow}</p>
        <h1 className="hero-headline">
          {profile.headline[0]}
          <br />
          <em className="hero-headline-italic">{profile.headline[1]}</em>
        </h1>
      </div>

      {/* Character Avatar Stage with 3D Mouse Tracking Tilt */}
      <div className="video-stage" aria-label="Ravi character avatar">
        <div className="video-ambient-glow" aria-hidden="true" />
        <div className="video-ring" aria-hidden="true" />

        <TiltCard maxRotation={8} className="hero-avatar-tilt-wrap">
          <div className="hero-avatar-card">
            <CharacterAvatar className="hero-avatar-svg" framed={false} />
            <div className="hero-avatar-badge font-mono-micro">
              <span className="dot-live" /> RAVI · CREATIVE TECHNOLOGIST
            </div>
          </div>
        </TiltCard>
      </div>

      {/* Magnetic Primary CTA */}
      <div className="hero-actions">
        <MagneticButton href="#work" className="dark-button">
          Explore work <ArrowDown size={15} aria-hidden="true" />
        </MagneticButton>
      </div>
    </section>
  )
}
