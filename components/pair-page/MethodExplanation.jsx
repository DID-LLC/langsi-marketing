'use client';

import { motion } from 'framer-motion';
import { fadeUp } from './fadeUp';

const IMG_METHOD =
  'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69080f3002a1f3579a154b61/83de1d477_langsi2026-03-0615-06-00-langsi-methode.png';

export default function MethodExplanation({ content }) {
  const bullets = [content.method_b1, content.method_b2, content.method_b3, content.method_b4];

  return (
    <section className="py-20 px-5" style={{ background: '#1a251d' }}>
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <motion.div {...fadeUp(0)} className="rounded-2xl overflow-hidden border border-white/8">
          <img src={IMG_METHOD} alt="" className="w-full h-auto" />
        </motion.div>

        <motion.div {...fadeUp(0.1)}>
          <p className="text-white/40 text-sm font-semibold tracking-widest uppercase mb-3">{content.method_tag}</p>
          <h2 className="text-3xl font-bold leading-snug mb-4" style={{ fontFamily: 'Poppins' }}>
            <span className="text-white">{content.method_h2_1}</span>{' '}
            <span style={{ color: '#50C878' }}>{content.method_h2_2}</span>
          </h2>
          <p className="text-white/55 text-sm mb-6">{content.method_sub}</p>
          <ul className="space-y-2.5">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-white/70">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#50C878' }} />
                {b}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
