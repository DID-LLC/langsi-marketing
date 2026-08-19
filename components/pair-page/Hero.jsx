'use client';

import { motion } from 'framer-motion';
import { fadeUp } from './fadeUp';

export default function Hero({ content }) {
  return (
    <section className="px-5 pt-16 pb-14" style={{ background: '#1a251d' }}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          {...fadeUp(0)}
          className="inline-block text-xs font-semibold tracking-widest uppercase text-[#50C878] bg-[#50C878]/10 border border-[#50C878]/20 rounded-full px-4 py-1.5 mb-6"
        >
          {content.hero_badge}
        </motion.p>

        <motion.h1
          {...fadeUp(0.1)}
          className="text-4xl md:text-5xl font-bold leading-tight mb-5"
          style={{ fontFamily: 'Poppins' }}
        >
          <span className="text-white">{content.hero_h1_1}</span>
          <br />
          <span style={{ color: '#50C878' }}>{content.hero_h1_2}</span>
        </motion.h1>

        <motion.p {...fadeUp(0.2)} className="text-white/55 text-base md:text-lg max-w-xl mx-auto mb-8">
          {content.hero_sub}
        </motion.p>

        <motion.div {...fadeUp(0.3)}>
          <a
            href={content.app_deep_link}
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
