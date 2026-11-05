import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'

/**
 * SkyEliteHero
 * Premium Private Jet Landing Page Hero Section
 * 
 * Technical Setup:
 * - React with TypeScript
 * - Tailwind CSS
 * - Lucide React for responsive navigation icons
 * - useState hook for mobile menu toggle
 * - Full screen height (h-screen) with responsive breakpoints
 * - Inter font applied via CSS
 */
export default function SkyEliteHero(): React.JSX.Element {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)

  const navItems: string[] = ['Start', 'Story', 'Rates', 'Benefits', 'FAQ']

  // Reliable hosted private jet & aviation video URLs
  const videoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-clouds-from-an-airplane-window-41857-large.mp4'
  const fallbackVideoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-flying-over-the-clouds-in-an-airplane-window-31804-large.mp4'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Video Background (Autoplay, Muted, Loop, playsInline, covers 100vh) */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videoUrl} type="video/mp4" />
          <source src={fallbackVideoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Content Wrapper */}
        <div className="relative h-full flex flex-col z-10">
          {/* Navigation Bar */}
          <header className="w-full">
            <nav className="max-w-7xl mx-auto px-8 py-6 relative">
              <div className="flex items-center justify-between">
                {/* Brand Name on the Left */}
                <a
                  href="#start"
                  className="text-2xl font-semibold text-gray-900 tracking-tight"
                >
                  SkyElite
                </a>

                {/* Desktop Menu (hidden on mobile, visible md:flex) */}
                <ul className="hidden md:flex items-center space-x-8">
                  {navItems.map((item: string) => (
                    <li key={item}>
                      <a
                        href={`#${item.toLowerCase()}`}
                        className="text-gray-900 hover:text-gray-700 transition-colors font-medium text-base"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>

                {/* Mobile Hamburger Menu Button (Lucide React Menu/X) */}
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                  className="md:hidden p-2 text-gray-900 hover:text-gray-700 transition-colors focus:outline-none"
                  aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={isMobileMenuOpen}
                >
                  {isMobileMenuOpen ? (
                    <X className="w-7 h-7" aria-hidden="true" />
                  ) : (
                    <Menu className="w-7 h-7" aria-hidden="true" />
                  )}
                </button>
              </div>

              {/* Mobile Menu Dropdown (white/95 opacity, backdrop blur, rounded corners, shadow) */}
              {isMobileMenuOpen && (
                <div className="absolute top-full left-8 right-8 mt-2 p-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 flex flex-col space-y-4 md:hidden z-50 transition-all duration-200">
                  {navItems.map((item: string) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-gray-900 hover:text-gray-700 transition-colors font-medium text-lg py-1 border-b border-gray-100/60 last:border-b-0"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              )}
            </nav>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 flex items-center justify-center">
            {/* Hero Content (centered, -mt-80 to pull up) */}
            <div className="-mt-80 flex flex-col items-center text-center px-4">
              {/* Small uppercase label */}
              <p className="text-sm font-semibold text-gray-600 tracking-wider mb-4 uppercase">
                PRIVATE JETS
              </p>

              {/* Large two-line heading with overlapping effect */}
              <h1 className="flex flex-col items-center">
                {/* Line 1: Premium. */}
                <span className="text-6xl md:text-7xl lg:text-8xl font-normal text-gray-500 leading-none tracking-tighter">
                  Premium.
                </span>
                {/* Line 2: Accessible. (color #202A36, negative margin-top -12px for overlap) */}
                <span className="text-6xl md:text-7xl lg:text-8xl font-normal text-[#202A36] leading-none tracking-tighter -mt-[12px]">
                  Accessible.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-2xl mt-4">
                Your dedication deserves recognition.
              </p>

              {/* Two call-to-action buttons (gap-4, centered) */}
              <div className="flex items-center justify-center gap-4">
                <button
                  type="button"
                  className="px-4 py-2 rounded-full bg-gray-300 text-gray-800 font-medium hover:bg-gray-400 transition-colors cursor-pointer"
                >
                  Discover
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded-full text-white bg-[#202A36] hover:bg-[#1a2229] transition-colors cursor-pointer shadow-sm"
                >
                  Book Now
                </button>
              </div>
            </div>
          </main>
        </div>
      </section>
    </div>
  )
}
