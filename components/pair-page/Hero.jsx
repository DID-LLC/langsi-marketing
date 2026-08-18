'use client';

import { motion } from 'framer-motion';
import { fadeUp } from './fadeUp';

const IMG_FLASHCARD_FRONT =
  'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69080f3002a1f3579a154b61/4beac42fd_langsi2026-03-0615-04-48_karteikarte_vorne.png';
const IMG_FLASHCARD_BACK =
  'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69080f3002a1f3579a154b61/778036cb7_langsi2026-03-0615-05-10_karteikarte_hinten.png';
const IMG_CHOICE =
  'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69080f3002a1f3579a154b61/2441e38dd_langsi2026-03-0615-14-12_auswahl.png';
const IMG_LISTEN =
  'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69080f3002a1f3579a154b61/1f86f087a_langsi2026-03-0615-15-04_horen.png';

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

        <motion.div {...fadeUp(0.4)} className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {[IMG_FLASHCARD_FRONT, IMG_FLASHCARD_BACK, IMG_CHOICE, IMG_LISTEN].map((src) => (
            <div
              key={src}
              className="rounded-xl overflow-hidden border border-white/8"
              style={{ background: 'linear-gradient(135deg, #1e3325 0%, #192a20 100%)' }}
            >
              <img src={src} alt="" className="w-full h-auto" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
