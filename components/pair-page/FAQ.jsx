'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { fadeUp } from './fadeUp';

export default function FAQ({ content }) {
  return (
    <section id="faq" className="py-24 px-5" style={{ background: '#161f19' }}>
      <div className="max-w-5xl mx-auto">
        <motion.h2
          {...fadeUp(0)}
          className="text-2xl font-bold text-white text-center mb-12"
          style={{ fontFamily: 'Poppins' }}
        >
          {content.faq_heading}
        </motion.h2>
        <div className="space-y-5">
          {(content.pair_faq || []).map((item, i) => (
            <motion.details
              key={item.q}
              {...fadeUp(Math.min(i * 0.05, 0.3))}
              className="group rounded-2xl border border-white/8 px-5 py-4"
              style={{ background: 'linear-gradient(135deg, #1e3325 0%, #192a20 100%)' }}
            >
              <summary className="flex items-center justify-between gap-3 cursor-pointer list-none">
                <h3 className="text-white font-semibold text-sm">{item.q}</h3>
                <ChevronDown className="w-4 h-4 text-[#50C878] flex-shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <p className="text-white/55 text-sm leading-relaxed mt-3">{item.a}</p>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
}
