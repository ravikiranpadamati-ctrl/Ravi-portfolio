import { ArrowUpRight, Sparkles, Layers, Cpu, Eye } from 'lucide-react'
import { profile } from '../data'
import MagneticButton from './MagneticButton'
import TiltCard from './TiltCard'

/**
 * Senior Designer Intro Component
 * - 01 / Philosophy & Ethos
 * - 3 Strategic Pillars (Architectural Rigor, Sensory UI, AI-Native Workflows)
 * - Authentic quote card with 3D tilt
 * - Magnetic social links
 */
export default function Intro() {
  const pillarIcons = [<Layers size={20} />, <Eye size={20} />, <Cpu size={20} />]

  return (
    <section className="intro-senior-section section-pad" id="about">
      {/* Section Header */}
      <div className="section-heading">
        <div>
          <p className="eyebrow font-mono-micro">01 — Philosophy & Ethos</p>
          <h2 className="section-title-syne">
            Driven by <em className="serif-italic-accent">curiosity</em>,
            <br />
            grounded in <em className="serif-italic-accent">practice.</em>
          </h2>
        </div>
        <div className="quote-pill font-mono-micro">
          <Sparkles size={13} className="text-[#141414]" />
          <span>&ldquo;{profile.quote}&rdquo;</span>
        </div>
      </div>

      {/* 3 Core Architecture Pillars */}
      <div className="pillars-grid">
        {profile.pillars.map((pillar, idx) => (
          <TiltCard key={pillar.title} maxRotation={6} className="pillar-tilt-wrap">
            <div className="pillar-card">
              <div className="pillar-header font-mono-micro">
                <span className="pillar-num">{pillar.num}</span>
                <span className="pillar-tag">{pillar.tag}</span>
                <span className="pillar-icon" aria-hidden="true">{pillarIcons[idx]}</span>
              </div>
              <h3 className="pillar-title font-syne">{pillar.title}</h3>
              <p className="pillar-desc">{pillar.description}</p>
            </div>
          </TiltCard>
        ))}
      </div>

      {/* Narrative Synthesis & Links Bar */}
      <div className="intro-synthesis-bar">
        <div className="traits-cluster font-mono-micro">
          {profile.traits.map((trait) => (
            <span key={trait} className="trait-tag">
              #{trait.toLowerCase().replace(/\s+/g, '-')}
            </span>
          ))}
        </div>

        <div className="social-links-row font-mono-micro">
          {profile.github && (
            <MagneticButton href={profile.github} target="_blank" rel="noreferrer" className="social-magnetic-pill">
              GitHub <ArrowUpRight size={13} aria-hidden="true" />
            </MagneticButton>
          )}
          {profile.linkedin && (
            <MagneticButton href={profile.linkedin} target="_blank" rel="noreferrer" className="social-magnetic-pill">
              LinkedIn <ArrowUpRight size={13} aria-hidden="true" />
            </MagneticButton>
          )}
          {profile.email && (
            <MagneticButton href={`mailto:${profile.email}`} className="social-magnetic-pill">
              Email <ArrowUpRight size={13} aria-hidden="true" />
            </MagneticButton>
          )}
        </div>
      </div>
    </section>
  )
}
