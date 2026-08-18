'use client';

import { motion } from 'framer-motion';
import { fadeUp } from './fadeUp';

export default function LanguageChallenges({ content }) {
  return (
    <section className="py-20 px-5" style={{ background: '#161f19' }}>
      <div className="max-w-3xl mx-auto">
        <motion.p {...fadeUp(0)} className="text-white/55 text-sm text-center mb-10 max-w-xl mx-auto">
          {content.romanization_method}
        </motion.p>
        <div className="space-y-4">
          {(content.language_specific_challenges || []).map((challenge, i) => (
            <motion.div
              key={challenge}
              {...fadeUp(i * 0.1)}
              className="rounded-2xl border border-white/8 p-5 text-white/70 text-sm leading-relaxed"
              style={{ background: 'linear-gradient(135deg, #1e3325 0%, #192a20 100%)' }}
            >
              {challenge}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
