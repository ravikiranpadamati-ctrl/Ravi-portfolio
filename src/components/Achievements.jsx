import { useState, useEffect } from 'react'
import { ArrowDown, ArrowUp, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { moments, stats } from '../data'
import TiltCard from './TiltCard'
import CountUpNumber from './CountUpNumber'

/**
 * Achievements Component
 * - Verified count-up number animations on scroll (0 -> target with easeOutQuad).
 * - High-impact metric grid showing craft, prototypes, and production focus.
 * - Interactive and auto-advancing moments carousel with Framer Motion spring physics.
 */
export default function Achievements() {
  const [offset, setOffset] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const rotate = (direction) => {
    setOffset((value) => (value + direction + moments.length) % moments.length)
  }

  // Auto-advance carousel smoothly if not hovered
  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1) % moments.length)
    }, 4500)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const ordered = moments.map((_, index) => moments[(index + offset) % moments.length])

  return (
    <section className="moments section-pad" id="achievements">
      {/* 1. Header with Eyebrow and Carousel Controls */}
      <div className="section-heading">
        <div>
          <p className="eyebrow font-mono-micro">05 — Proud moments & metrics</p>
          <h2 className="section-title-syne">
            Small wins,
            <br />
            <em className="serif-italic-accent">big energy.</em>
          </h2>
        </div>
        <div className="carousel-controls font-mono-micro">
          <button
            type="button"
            aria-label="Previous moment"
            onClick={() => {
              setIsAutoPlaying(false)
              rotate(-1)
            }}
          >
            <ArrowUp size={16} />
          </button>
          <button
            type="button"
            aria-label="Next moment"
            onClick={() => {
              setIsAutoPlaying(false)
              rotate(1)
            }}
          >
            <ArrowDown size={16} />
          </button>
        </div>
      </div>

      {/* 2. Key Statistical Metrics with Live Count-Up Animation on Scroll */}
      <div className="stats-metric-grid">
        {stats.map((stat, idx) => (
          <TiltCard key={stat.label} maxRotation={5} className="stat-card-tilt">
            <div className="stat-card">
              <div className="stat-number-wrap font-display">
                <CountUpNumber target={stat.target} suffix={stat.suffix} duration={1600 + idx * 200} />
              </div>
              <h3 className="stat-label font-mono-micro">{stat.label}</h3>
              <p className="stat-detail">{stat.detail}</p>
            </div>
          </TiltCard>
        ))}
      </div>

      {/* 3. Moments Row with Spring Rotation Physics */}
      <div
        className="moments-container"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <motion.div layout className="moments-row">
          {ordered.map((moment) => (
            <motion.div
              layout
              key={moment.note}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="moment-tilt-wrap"
            >
              <TiltCard maxRotation={6}>
                <div className={`moment-card ${moment.tone}`}>
                  <span className="font-mono-micro">{moment.year}</span>
                  <strong className="font-display">{moment.title}</strong>
                  <small className="font-mono-micro">{moment.note}</small>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
