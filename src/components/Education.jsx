import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { credentials, timeline } from '../data'
import TiltCard from './TiltCard'

/**
 * Education & Coursework Component
 * - Verified credentials & coursework with intent.
 * - Manually controlled timeline with smooth sliding transitions.
 */
export default function Education() {
  const [active, setActive] = useState(timeline.length - 1)
  const current = timeline[active]

  return (
    <section className="experience-grid section-pad" id="experience">
      {/* 1. Verified Coursework & Credentials Card */}
      <TiltCard maxRotation={5} className="cert-card-tilt">
        <div className="cert-card">
          <p className="eyebrow font-mono-micro">04 — Always learning</p>
          <h2 className="section-title-syne">
            Coursework
            <br />
            <em className="serif-italic-accent">& credentials.</em>
          </h2>
          {credentials.length === 0 ? (
            <p className="cert-empty">
              Formal certificates will live here as they are earned. Until then, the work is the proof.
            </p>
          ) : (
            <div className="cert-list">
              {credentials.map((item, index) => (
                <motion.div
                  className="cert-row"
                  key={item.title}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.18 }}
                >
                  <span className="font-mono-micro">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <small className="font-mono-micro">{item.issuer}</small>
                  </div>
                  {item.href ? (
                    <a href={item.href} aria-label={`View details for ${item.title}`}>
                      <ArrowUpRight size={14} />
                    </a>
                  ) : null}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </TiltCard>

      {/* 2. Manually controlled timeline with smooth animated transitions */}
      <TiltCard maxRotation={5} className="timeline-card-tilt">
        <div className="timeline-card">
          <div className="timeline-header-row">
            <p className="eyebrow font-mono-micro">Education & progression</p>
          </div>

          <div className="timeline-years font-mono-micro">
            {timeline.map((item, index) => (
              <button
                key={item.year}
                type="button"
                className={index === active ? 'active' : ''}
                onClick={() => setActive(index)}
              >
                {item.year}
              </button>
            ))}
          </div>

          <input
            type="range"
            min="0"
            max={timeline.length - 1}
            aria-label="Experience timeline slider"
            value={active}
            onChange={(event) => setActive(Number(event.target.value))}
          />

          {/* Animated Course / Experience Timeline Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.year}
              initial={{ opacity: 0, x: 22 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -22 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="timeline-content"
            >
              <div className="timeline-badge font-mono-micro">Milestone · {current.year}</div>
              <h3 className="font-display">{current.title}</h3>
              <p>{current.text}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </TiltCard>
    </section>
  )
}
