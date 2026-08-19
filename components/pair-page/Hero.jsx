'use client';

import { motion } from 'framer-motion';
import { fadeUp } from './fadeUp';
import { trackLandingCTAClicked, trackEvent } from '../../lib/ga4';

export default function Hero({ content }) {
  const handleCtaClick = () => {
    trackLandingCTAClicked({ ctaLocation: 'hero', ctaLabel: content.hero_cta });
    trackEvent('generate_lead', { lead_type: 'landing_cta_click', cta_location: 'hero' });
  };

  return (
    <section
      data-track-section="hero"
      className="min-h-[100dvh] flex items-center px-5 py-24"
      style={{ background: '#1a251d' }}
    >
      <div className="max-w-5xl mx-auto text-center w-full">
        <motion.p
          {...fadeUp(0)}
          className="inline-block text-xs font-semibold tracking-widest uppercase text-[#50C878] bg-[#50C878]/10 border border-[#50C878]/20 rounded-full px-4 py-1.5 mb-4"
        >
          {content.hero_badge}
        </motion.p>

        <motion.h1
          {...fadeUp(0.1)}
          className="text-4xl md:text-5xl font-bold leading-tight mb-3"
          style={{ fontFamily: 'Poppins' }}
        >
          <span className="text-white">{content.hero_h1_1}</span>
          {content.hero_h1_2 && (
            <>
              <br />
              <span style={{ color: '#50C878' }}>{content.hero_h1_2}</span>
            </>
          )}
        </motion.h1>

        <motion.p {...fadeUp(0.2)} className="text-white/55 text-base md:text-lg max-w-xl mx-auto mb-12">
          {content.hero_sub}
        </motion.p>

        <motion.div {...fadeUp(0.3)}>
          <a
            href={content.app_deep_link}
            onClick={handleCtaClick}
            className="inline-block text-sm font-bold rounded-xl px-7 py-3.5 transition-colors"
            style={{ background: '#50C878', color: '#1C3A27', fontFamily: 'Poppins' }}
          >
            {content.hero_cta}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
