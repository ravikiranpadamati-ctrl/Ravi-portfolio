import { useState } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import { profile } from '../data'
import CharacterAvatar from './CharacterAvatar'
import TiltCard from './TiltCard'
import MagneticButton from './MagneticButton'

export default function Intro() {
  const [speaking, setSpeaking] = useState(true)

  return (
    <section className="intro-grid section-pad" id="about">
      <div className="intro-copy">
        <p className="eyebrow font-mono-micro">01 — A little about me</p>
        <h2 className="section-title-syne">
          {profile.introTitle[0]} <em className="serif-italic-accent">{profile.introTitle[1]}</em>
        </h2>
        <p className="body-large">{profile.about}</p>

        <div className={`about-intro${speaking ? ' speaking' : ''}`}>
          <div className="about-portrait">
            <CharacterAvatar />
          </div>
          <div>
            <span className="font-mono-micro">{speaking ? 'PORTRAIT ANIMATION ACTIVE' : 'ANIMATION PAUSED'}</span>
            <p>{profile.about}</p>
            <button
              type="button"
              className="about-intro-toggle font-mono-micro"
              aria-pressed={speaking}
              onClick={() => setSpeaking((value) => !value)}
            >
              {speaking ? 'Pause animation' : 'Play animation'} <ArrowUpRight size={14} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Magnetic Social Links Row */}
        <div className="social-row">
          <MagneticButton href="#contact" className="social-magnetic-pill">
            Resume <ArrowUpRight size={14} aria-hidden="true" />
          </MagneticButton>
          {profile.github ? (
            <MagneticButton href={profile.github} target="_blank" rel="noreferrer" className="social-magnetic-pill">
              GitHub <ArrowUpRight size={13} aria-hidden="true" />
            </MagneticButton>
          ) : null}
          {profile.linkedin ? (
            <MagneticButton href={profile.linkedin} target="_blank" rel="noreferrer" className="social-magnetic-pill">
              LinkedIn <ArrowUpRight size={13} aria-hidden="true" />
            </MagneticButton>
          ) : null}
        </div>
      </div>

      {/* Hanging ID-Badge Card with Framer Motion 3D Tilt (stiffness: 300, damping: 20) */}
      <div className="id-card-wrap">
        <div className="lanyard" />
        <TiltCard maxRotation={15} className="id-card-tilt-container">
          <div className="id-card">
            <div className="clip" />
            <div className="id-top font-mono-micro">
              <span>DEVELOPER PASS</span>
              <span>NO. 0108</span>
            </div>
            <div className="id-photo">
              <div className="photo-shape font-mono-micro">{profile.monogram}</div>
            </div>
            <div className="id-name">
              {profile.idLines[0]}
              <br />
              {profile.idLines[1]}
            </div>
            <div className="id-role font-mono-micro">FULL STACK · AI · WEB</div>
            <div className="barcode font-mono-micro">|||| ||| |||| | ||| || ||||</div>
          </div>
        </TiltCard>
      </div>

      <div className="facts">
        <p className="eyebrow font-mono-micro">What I am</p>
        <ul>
          {profile.traits.map((trait) => (
            <li key={trait}>
              <Check size={15} aria-hidden="true" />
              {trait}
            </li>
          ))}
        </ul>
        <blockquote className="serif-quote">“{profile.quote}”</blockquote>
      </div>
    </section>
  )
}
