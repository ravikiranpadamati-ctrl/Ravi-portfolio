/**
 * GrainOverlay
 * High performance SVG noise texture overlay (opacity 0.025)
 * Gives the entire canvas an organic, tactile paper grain feel.
 */
export default function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="grain-overlay pointer-events-none fixed inset-0 z-50 select-none"
    />
  )
}
