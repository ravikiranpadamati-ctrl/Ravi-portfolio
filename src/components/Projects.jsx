import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '../data'
import TiltCard from './TiltCard'
import MagneticButton from './MagneticButton'

export default function Projects() {
  const [openId, setOpenId] = useState(projects[0].number)
  const featured = projects.find((project) => project.number === openId) || projects[0]

  return (
    <section className="work-section section-pad" id="work">
      <div className="section-heading">
        <div>
          <p className="eyebrow font-mono-micro">03 — Selected work</p>
          <h2 className="section-title-syne">
            Things I've <em className="serif-italic-accent">built.</em>
          </h2>
        </div>
        <MagneticButton href="#contact" className="text-link font-mono-micro">
          Start a project <ArrowUpRight size={15} aria-hidden="true" />
        </MagneticButton>
      </div>

      {/* Featured Showcase with Framer Motion 3D Tilt */}
      <TiltCard maxRotation={6} className="featured-tilt-wrap">
        <div className={`featured-showcase ${featured.accent}`}>
          <div className="showcase-copy">
            <p className="eyebrow font-mono-micro">Featured case study · {featured.category}</p>
            <h3 className="showcase-title-syne">{featured.title}</h3>
            <p>{featured.description}</p>
            <div className="showcase-meta font-mono-micro">
              <span>
                <b>{featured.metric}</b> {featured.metricLabel}
              </span>
              <span>
                <b>{featured.tags.length}</b> core tools
              </span>
            </div>
            <MagneticButton href={featured.code || '#contact'} className="dark-button">
              View case study <ArrowUpRight size={15} aria-hidden="true" />
            </MagneticButton>
          </div>
          <div className="showcase-screen" aria-label={`${featured.title} interface preview`}>
            <div className="screen-top font-mono-micro">
              <span>●</span>
              <span>●</span>
              <span>●</span>
              <small>workspace / overview</small>
            </div>
            <div className="screen-body">
              <div className="screen-sidebar">
                <b className="font-mono-micro">RV</b>
                <i />
                <i />
                <i />
                <i />
              </div>
              <div className="screen-content">
                <span className="screen-kicker font-mono-micro">{featured.category}</span>
                <strong className="font-display">{featured.title}</strong>
                <div className="screen-chart">
                  <i /><i /><i /><i /><i /><i /><i />
                </div>
                <div className="screen-cards">
                  <span /><span /><span />
                </div>
              </div>
            </div>
          </div>
        </div>
      </TiltCard>

      {/* Project Accordion List with 3D Tilt Cards */}
      <div className="project-list">
        {projects.map((project) => {
          const isOpen = openId === project.number
          return (
            <TiltCard key={project.number} maxRotation={5} className="project-card-tilt-wrap">
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
                        {project.code ? (
                          <MagneticButton
                            href={project.code}
                            target="_blank"
                            rel="noreferrer"
                            className="project-magnetic-link font-mono-micro"
                          >
                            View on GitHub <ArrowUpRight size={14} />
                          </MagneticButton>
                        ) : null}
                        {project.demo ? (
                          <MagneticButton
                            href={project.demo}
                            target="_blank"
                            rel="noreferrer"
                            className="project-magnetic-link font-mono-micro"
                          >
                            Live preview <ArrowUpRight size={14} />
                          </MagneticButton>
                        ) : null}
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
