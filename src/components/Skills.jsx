import { useMemo, useState } from 'react'
import { skills } from '../data'
import TiltCard from './TiltCard'

const filters = ['All', 'Languages', 'Frontend', 'Backend', 'Tools']

export default function Skills() {
  const [filter, setFilter] = useState('All')
  const [selectedId, setSelectedId] = useState(skills[0].id)

  const visible = useMemo(
    () => (filter === 'All' ? skills : skills.filter((skill) => skill.category === filter)),
    [filter]
  )

  const selected = visible.find((skill) => skill.id === selectedId) || visible[0]

  return (
    <section className="skills-section section-pad" id="skills">
      <div className="section-heading">
        <div>
          <p className="eyebrow font-mono-micro">02 — The toolkit</p>
          <h2 className="section-title-syne">
            The periodic table
            <br />
            of my <em className="serif-italic-accent">stack.</em>
          </h2>
        </div>
        <span className="counter font-mono-micro">
          {visible.length} / {skills.length} elements
        </span>
      </div>

      <div className="filter-row font-mono-micro">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            className={filter === item ? 'active' : ''}
            aria-pressed={filter === item}
            onClick={() => {
              setFilter(item)
              const nextVisible =
                item === 'All' ? skills : skills.filter((skill) => skill.category === item)
              setSelectedId(nextVisible[0].id)
            }}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="skills-layout">
        <div className="element-grid">
          {visible.map((skill) => (
            <button
              key={skill.id}
              type="button"
              className={`element${selected.id === skill.id ? ' selected' : ''}`}
              aria-pressed={selected.id === skill.id}
              onClick={() => setSelectedId(skill.id)}
            >
              <span className="font-mono-micro">{skill.id}</span>
              <strong className="font-mono-micro">{skill.symbol}</strong>
              <small>{skill.name}</small>
              <i className="font-mono-micro">{skill.category}</i>
            </button>
          ))}
        </div>

        <TiltCard maxRotation={8} className="skill-detail-tilt-wrap">
          <aside className="skill-detail">
            <span className="detail-symbol font-mono-micro">{selected.symbol}</span>
            <p className="eyebrow font-mono-micro">Selected element · {selected.category}</p>
            <h3 className="font-display">{selected.name}</h3>
            <div className="level-row font-mono-micro">
              <span>Proficiency</span>
              <b>{selected.level}</b>
            </div>
            <div className="meter">
              <i style={{ width: `${selected.percent}%` }} />
            </div>
            <p className="skill-blurb-text">{selected.blurb}</p>
          </aside>
        </TiltCard>
      </div>
    </section>
  )
}
