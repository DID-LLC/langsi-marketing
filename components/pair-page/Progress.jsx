'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { fadeUp } from './fadeUp';

export default function Progress({ content }) {
  const P = content.progress;

  return (
    <section data-track-section="progress" className="py-24 px-5" style={{ background: '#161f19' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp(0)} className="text-center mb-12">
          <p className="text-white/40 text-sm font-semibold tracking-widest uppercase mb-4">{P.tag}</p>
          <h2 className="text-3xl font-bold text-white leading-snug mb-3" style={{ fontFamily: 'Poppins' }}>
            {P.h2}
          </h2>
          <p className="text-white/50 text-sm">{P.sub}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {(P.points || []).map((point, i) => (
            <motion.div
              key={point}
              {...fadeUp(i * 0.08)}
              className="rounded-xl border border-white/8 p-4 flex items-start gap-3"
              style={{ background: 'rgba(28,58,39,0.4)' }}
            >
              <div className="w-6 h-6 rounded-full bg-[#50C878]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5 text-[#50C878]" />
              </div>
              <p className="text-white/75 text-sm leading-relaxed">{point}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
