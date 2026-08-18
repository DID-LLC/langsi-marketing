'use client';

import { motion } from 'framer-motion';
import { fadeUp } from './fadeUp';

export default function FinalCTA({ content }) {
  return (
    <section className="py-24 px-5 text-center" style={{ background: '#1a251d' }}>
      <motion.div {...fadeUp(0)} className="max-w-xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'Poppins' }}>
          <span className="text-white">{content.final_h2_1}</span>{' '}
          <span style={{ color: '#50C878' }}>{content.final_h2_2}</span>
        </h2>
        <p className="text-white/55 text-sm mb-8">{content.final_sub}</p>
        <a
          href={content.app_deep_link}
          className="inline-block text-sm font-bold rounded-xl px-7 py-3.5 transition-colors"
          style={{ background: '#50C878', color: '#1C3A27', fontFamily: 'Poppins' }}
        >
          {content.final_cta}
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
