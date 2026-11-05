# RAVI — Tactile Animated Single-Page Portfolio

An animated, single-page developer portfolio built with **React**, **Vite**, **Tailwind CSS**, and **Lucide Icons**. Designed around an editorial cream-and-navy aesthetic, tactile mechanical keyboard keycaps, an interactive hanging conference ID-badge pass, and scroll-triggered animations.

---

## 🎨 Design System & Palette

- **Base Background**: `#FAF7F2` (Warm, fine-paper cream)
- **Section Tint**: `#F3EFE6` (Subtle alternate card and section tint)
- **Primary Typography**: Deep Navy `#0B192C` (Clean, high-contrast text)
- **Accent Navy**: `#1E3E62` (Links, badge ribbons, and serif italic accents)
- **Muted Slate**: `#53647B` (Subtext, metadata, descriptions)
- **Border Lines**: `#E6DFD3` (Soft warm borders)
- **Typography Mix**:
  - **Headings & Body**: Bold Sans (`Plus Jakarta Sans` / system geometric sans)
  - **Editorial Accents**: Serif Italic (`Playfair Display` / Georgia)
  - **Keycaps & Code**: Monospace (`JetBrains Mono`)

---

## ⚡ Core Sections & Features

1. **Hero Section**:
   - Oversized, faded watermark typography (`DEVELOPER • AI BUILDER`).
   - Live availability status pill (`● AVAILABLE TO BUILD & COLLABORATE`).
   - Stylized SVG character illustration placeholder with glasses, headset, and developer lanyard.
   - Floating micro-badges and quick action buttons.

2. **Intro Section & Hanging ID-Badge Pass**:
   - Narrative copy with serif-italic accent words.
   - **Hanging ID-Badge Card**: Conference lanyard strap, metallic clip ring, punch slot cutout, barcode strip, gold microchip simulation, and interactive 3D mouse tilt.

3. **Skills Matrix (Tactile Mechanical Keyboard Keys)**:
   - 3D raised keycaps with top bevels, corner legends (`F1`–`F12`, `Py`, `⚛`, `TS`, `⌘`), and tactile press feedback.
   - Scroll-triggered entry animation staggered by **80ms** per tile.
   - Category filter pills (Backend, Frontend, Workflow, Database, Design).

4. **Projects Showcase**:
   - Large cards with smooth hover lift (`translateY(-8px)`) and soft shadow expansion.
   - Interactive mockup preview canvas frame with macOS window buttons.
   - Status indicators (`Active Build`, `In Progress`) and keyboard-style tech tags.

5. **Education Section**:
   - Clean, minimalist timeline list with period badges, institutions, and coursework chips.

6. **Achievements Counter**:
   - 4-card milestone grid featuring animated count-up numbers (`12+`, `100%`, `500+`, `15+`) driven by native `IntersectionObserver` with smooth ease-out interpolation.

7. **Contact & Footer**:
   - High-contrast navy container with one-click email copying, feedback indicators, and social links.

---

## 📂 Project Architecture

```
ravi-portfolio/
├── index.html                 # HTML shell with Google Fonts & favicon
├── package.json               # Scripts & dependencies
├── vite.config.js             # Vite configuration with relative base
├── public/
│   └── favicon.svg            # Custom vector favicon
├── src/
│   ├── main.jsx               # React DOM entry point
│   ├── App.jsx                # Root orchestrator component
│   ├── index.css              # Design tokens, keycap 3D styles, lanyard & animations
│   ├── data.js                # Profile, skills, projects, education & milestones data
│   ├── hooks/
│   │   └── useScrollReveal.js # Native IntersectionObserver with 80ms stagger
│   └── components/
│       ├── Header.jsx         # Sticky glass navigation & mobile menu
│       ├── Hero.jsx           # Watermark text & character card
│       ├── CharacterAvatar.jsx# Vector developer avatar illustration
│       ├── Intro.jsx          # Intro narrative & 3D hanging ID badge
│       ├── Skills.jsx         # Keyboard keycap tiles with categories
│       ├── Projects.jsx       # Large showcase cards with hover lift
│       ├── Education.jsx      # Clean minimalist academic list
│       ├── Achievements.jsx   # Count-up number animation grid
│       ├── CountUpNumber.jsx  # Reusable count-up counter component
│       ├── Contact.jsx        # Navy contact card with copy email
│       └── Footer.jsx         # Clean footer with social links
└── frontend/                  # Mirror of codebase for frontend package workflows
```

---

## 🚀 Running Locally

### Development Server
```powershell
npm.cmd run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```powershell
npm.cmd run build
```

### Preview Production Build
```powershell
npm.cmd run preview
```

---

## ♿ Accessibility & Motion
- Native CSS and `IntersectionObserver` only (no heavy external libraries).
- Complete support for `prefers-reduced-motion`: all animations and transitions are disabled or set to instant when reduced motion is preferred by the user.
- Mobile-first responsive grid across all screen sizes.
