'use client';

import { motion } from 'framer-motion';
import { fadeUp } from './fadeUp';

export default function Progress({ content }) {
  const leitnerFeature = (content.feature_highlights || []).find((f) => f.title.includes('Leitner'));

  if (!leitnerFeature) return null;

  return (
    <section className="py-16 px-5" style={{ background: '#161f19' }}>
      <motion.div {...fadeUp(0)} className="max-w-xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: 'Poppins' }}>
          {leitnerFeature.title}
        </h2>
        <p className="text-white/55 text-sm">{leitnerFeature.body}</p>
      </motion.div>
    </section>
  );
}
