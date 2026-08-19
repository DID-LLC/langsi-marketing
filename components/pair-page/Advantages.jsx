'use client';

import { motion } from 'framer-motion';
import { fadeUp } from './fadeUp';

export default function Advantages({ content }) {
  return (
    <section className="py-20 px-5" style={{ background: '#1a251d' }}>
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {(content.advantages || []).map((item, i) => (
            <motion.div
              key={item.title}
              {...fadeUp(i * 0.08)}
              className="rounded-2xl border border-white/8 p-6"
              style={{ background: 'linear-gradient(135deg, #1e3325 0%, #192a20 100%)' }}
            >
              <h3 className="text-white font-bold text-lg mb-2" style={{ fontFamily: 'Poppins' }}>
                {item.title}
              </h3>
              <p className="text-white/55 text-sm leading-relaxed">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
