import { useState } from 'react'
import { ArrowUpRight, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react'
import { projects } from '../data'
import TiltCard from './TiltCard'
import MagneticButton from './MagneticButton'
import ElasticFrame from './ElasticFrame'

function GithubIcon({ size = 14, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

/**
 * Projects Component with Scrolltide Elastic Frame
 * - 03 / Selected Case Studies
 * - Featured Showcase wrapped in ElasticFrame with interactive pluckable border and glowing veil
 * - macOS browser mockup with live preview
 */
export default function Projects() {
  const [openId, setOpenId] = useState(projects[0].number)
  const featured = projects.find((project) => project.number === openId) || projects[0]

  return (
    <section className="work-section section-pad relative z-10" id="work">
      {/* Section Header */}
      <div className="section-heading">
        <div>
          <p className="eyebrow font-mono-micro">03 — Selected Case Studies</p>
          <h2 className="section-title-syne">
            Things I've <em className="serif-italic-accent">architected.</em>
          </h2>
        </div>
        <MagneticButton href="#contact" className="text-link font-mono-micro">
          Inquire about a project <ArrowUpRight size={15} aria-hidden="true" />
        </MagneticButton>
      </div>

      {/* Featured Case Study Spotlight Card with Scrolltide Elastic Frame */}
      <ElasticFrame
        borderRadius={28}
        maxStretch={26}
        threshold={42}
        stiffness={290}
        damping={14}
        accentGlow="rgba(0, 240, 255, 0.45)"
        veilGlow="rgba(124, 58, 237, 0.28)"
        borderColor="rgba(255, 255, 255, 0.12)"
        activeBorderColor="rgba(0, 240, 255, 0.85)"
        className="w-full mb-12"
      >
        <div className={`featured-showcase ${featured.accent}`}>
          {/* Left Column: Narrative, Metrics & CTAs */}
          <div className="showcase-copy">
            <div className="showcase-status-badge font-mono-micro">
              <span className={`status-dot ${featured.statusDot || 'live'}`} />
              <span>{featured.status}</span>
            </div>

            <h3 className="showcase-title-syne">{featured.title}</h3>
            <p className="showcase-headline-lead">{featured.headline}</p>
            <p className="showcase-description">{featured.description}</p>

            {/* Key Features Checklist */}
            {featured.features && (
              <ul className="showcase-features-list font-mono-micro">
                {featured.features.map((feat) => (
                  <li key={feat}>
                    <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Metrics & Tool Count */}
            <div className="showcase-meta font-mono-micro">
              <span>
                <b>{featured.metric}</b> {featured.metricLabel}
              </span>
              <span>
                <b>{featured.tags.length}</b> Tech Stack
              </span>
            </div>

            {/* Action Buttons */}
            <div className="showcase-actions-row">
              {featured.code && (
                <MagneticButton
                  href={featured.code}
                  target="_blank"
                  rel="noreferrer"
                  className="dark-button font-mono-micro"
                >
                  <GithubIcon size={14} /> View Repository <ArrowUpRight size={14} />
                </MagneticButton>
              )}
              {featured.demo && (
                <MagneticButton
                  href={featured.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="light-button font-mono-micro"
                >
                  <ExternalLink size={14} /> Live System <ArrowUpRight size={14} />
                </MagneticButton>
              )}
            </div>
          </div>

          {/* Right Column: High-End macOS Browser Mockup */}
          <div className="showcase-screen" aria-label={`${featured.title} interface preview`}>
            {/* macOS Browser Header */}
            <div className="screen-top font-mono-micro">
              <div className="window-dots">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <div className="browser-url-pill">
                https://{featured.previewUrl || 'workspace.system.dev'}
              </div>
              <span className="browser-live-chip">LIVE</span>
            </div>

            {/* Mockup Canvas */}
            <div className="screen-body">
              <div className="screen-sidebar">
                <b className="font-mono-micro">RV</b>
                <i /><i /><i /><i />
              </div>
              <div className="screen-content">
                <div className="screen-kicker font-mono-micro">
                  <span>SYSTEM OVERVIEW</span>
                  <span>v1.0.4</span>
                </div>
                <strong className="font-display screen-display-title">{featured.title}</strong>
                
                {/* Visual Architecture Chart Preview */}
                <div className="screen-chart">
                  <i style={{ height: '60%' }} />
                  <i style={{ height: '85%' }} />
                  <i style={{ height: '45%' }} />
                  <i style={{ height: '95%' }} />
                  <i style={{ height: '70%' }} />
                  <i style={{ height: '80%' }} />
                  <i style={{ height: '100%' }} />
                </div>

                <div className="screen-cards font-mono-micro">
                  {featured.tags.slice(0, 3).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ElasticFrame>

      {/* Accordion Switcher Cards */}
      <div className="project-list">
        {projects.map((project) => {
          const isOpen = openId === project.number
          return (
            <TiltCard key={project.number} maxRotation={4} className="project-card-tilt-wrap">
              <article className={`project-card ${project.accent}${isOpen ? ' open' : ''}`}>
                <div className="project-index font-mono-micro">{project.number}</div>
                <div className="project-main">
                  <p className="eyebrow font-mono-micro">{project.category}</p>
                  <button
                    type="button"
                    className="project-toggle"
                    aria-expanded={isOpen}
                    aria-controls={`project-details-${project.number}`}
                    onClick={() => setOpenId(isOpen ? '' : project.number)}
                  >
                    <h3 className="project-title-syne">{project.title}</h3>
                    <ArrowUpRight className="project-arrow" size={20} aria-hidden="true" />
                  </button>

                  {isOpen ? (
                    <div className="project-details" id={`project-details-${project.number}`}>
                      <p className="project-desc">{project.description}</p>
                      <div className="tag-row font-mono-micro">
                        {project.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                      <div className="project-links">
                        {project.code && (
                          <MagneticButton
                            href={project.code}
                            target="_blank"
                            rel="noreferrer"
                            className="project-magnetic-link font-mono-micro"
                          >
                            Repository <ArrowUpRight size={14} />
                          </MagneticButton>
                        )}
                        {project.demo && (
                          <MagneticButton
                            href={project.demo}
                            target="_blank"
                            rel="noreferrer"
                            className="project-magnetic-link font-mono-micro"
                          >
                            Live Demo <ArrowUpRight size={14} />
                          </MagneticButton>
                        )}
                      </div>
                    </div>
                  ) : null}
                </div>
              </article>
            </TiltCard>
          )
        })}
      </div>
    </section>
  )
}
