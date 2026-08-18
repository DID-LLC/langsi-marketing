// Shared fade-up-on-scroll animation preset, ported verbatim from the app
// repo's src/components/landing/*.jsx (LandingFeaturePillars.jsx,
// LandingPricing.jsx, LandingFaqSection.jsx all define this identically).
export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay },
});
