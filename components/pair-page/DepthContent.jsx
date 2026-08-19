'use client';

import { motion } from 'framer-motion';
import { fadeUp } from './fadeUp';

// Only used on /en/th/ for now — a template for the same treatment on the
// other 10 pair pages later. Reads content.depth_h2 (heading) and
// content.depth_content (array of paragraph strings), rendered as real
// <p> paragraphs rather than cards or a bullet list.
export default function DepthContent({ content }) {
  if (!content.depth_content?.length) return null;

  return (
    <section className="py-20 px-5" style={{ background: '#161f19' }}>
      <div className="max-w-2xl mx-auto">
        <motion.h2
          {...fadeUp(0)}
          className="text-2xl md:text-3xl font-bold text-white text-center mb-8"
          style={{ fontFamily: 'Poppins' }}
        >
          {content.depth_h2}
        </motion.h2>
        <div className="space-y-5">
          {content.depth_content.map((paragraph, i) => (
            <motion.p
              key={i}
              {...fadeUp(Math.min(i * 0.08, 0.3))}
              className="text-white/65 text-sm md:text-base leading-relaxed"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
