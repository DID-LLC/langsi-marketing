'use client';

import { motion } from 'framer-motion';
import { fadeUp } from './fadeUp';
import { trackLandingCTAClicked, trackEvent } from '../../lib/ga4';

export default function FinalCTA({ content }) {
  const handleCtaClick = () => {
    trackLandingCTAClicked({ ctaLocation: 'final_cta', ctaLabel: content.hero_cta });
    trackEvent('generate_lead', { lead_type: 'landing_cta_click', cta_location: 'final_cta' });
  };

  return (
    <section data-track-section="final_cta" className="py-24 px-5 text-center" style={{ background: '#1a251d' }}>
      <motion.div {...fadeUp(0)} className="max-w-5xl mx-auto">
        <p className="inline-block text-xs font-semibold tracking-widest uppercase text-[#50C878] bg-[#50C878]/10 border border-[#50C878]/20 rounded-full px-4 py-1.5 mb-4">
          {content.hero_badge}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12" style={{ fontFamily: 'Poppins' }}>
          {content.final_cta_h2}
        </h2>
        <a
          href={content.app_deep_link}
          onClick={handleCtaClick}
          className="inline-block text-sm font-bold rounded-xl px-7 py-3.5 transition-colors"
          style={{ background: '#50C878', color: '#1C3A27', fontFamily: 'Poppins' }}
        >
          {content.hero_cta}
        </a>
        <div className="mt-6 flex flex-wrap justify-center gap-5">
          {[content.trust_no_card, content.trust_free, content.trust_cancel, content.trust_instant].map((t) => (
            <span key={t} className="text-xs text-white/35">
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
