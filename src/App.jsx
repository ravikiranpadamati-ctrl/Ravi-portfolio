import { useState } from 'react'
import MeshGradient from './components/MeshGradient'
import ParticleCloak from './components/ParticleCloak'
import SkyEliteHero from './components/SkyEliteHero'
import { useScrollReveal } from './hooks/useScrollReveal'
import Header from './components/Header'
import Hero from './components/Hero'
import Intro from './components/Intro'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Education from './components/Education'
import Achievements from './components/Achievements'
import Footer from './components/Footer'
import GrainOverlay from './components/GrainOverlay'
import CustomCursor from './components/CustomCursor'

export default function App() {
  const [currentView, setCurrentView] = useState('gradient') // 'gradient' | 'cloak' | 'skyelite' | 'portfolio'

  // Scroll reveal only active on portfolio view
  useScrollReveal()

  return (
    <>
      {/* View Switcher Floating Navigation Bar in Bottom Corner */}
      <div className="fixed bottom-5 right-5 z-50 flex items-center gap-1.5 p-1 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/10 shadow-2xl text-xs font-medium">
        <button
          type="button"
          onClick={() => setCurrentView('gradient')}
          className={`px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
            currentView === 'gradient'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-white'
          }`}
          title="GPU Mesh Gradient with Seamless Loop and Bayer Dithering"
        >
          🎨 Mesh Gradient
        </button>
        <button
          type="button"
          onClick={() => setCurrentView('cloak')}
          className={`px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
            currentView === 'cloak'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-white'
          }`}
          title="Physics Particulate Cloak Canvas"
        >
          🌌 Particle Cloak
        </button>
        <button
          type="button"
          onClick={() => setCurrentView('skyelite')}
          className={`px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
            currentView === 'skyelite'
              ? 'bg-sky-700 text-white shadow-xs'
              : 'text-slate-400 hover:text-white'
          }`}
          title="SkyElite Private Jet Landing Hero"
        >
          ✈️ SkyElite
        </button>
        <button
          type="button"
          onClick={() => setCurrentView('portfolio')}
          className={`px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
            currentView === 'portfolio'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-400 hover:text-white'
          }`}
          title="Full Creative Technologist Portfolio"
        >
          👤 Portfolio
        </button>
      </div>

      {currentView === 'gradient' && <MeshGradient />}
      {currentView === 'cloak' && <ParticleCloak />}
      {currentView === 'skyelite' && <SkyEliteHero />}
      {currentView === 'portfolio' && (
        <div className="portfolio-shell">
          <CustomCursor />
          <GrainOverlay />
          <Header />
          <main>
            <Hero />
            <Intro />
            <Skills />
            <Projects />
            <Education />
            <Achievements />
          </main>
          <Footer />
        </div>
      )}
    </>
  )
}
