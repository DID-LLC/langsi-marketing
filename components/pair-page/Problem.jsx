'use client';

import { motion } from 'framer-motion';
import { Languages, BookOpenText, ArrowRightCircle } from 'lucide-react';
import { fadeUp } from './fadeUp';
import PROBLEM_POINTS from './problemPoints.json';

const ICONS = [Languages, BookOpenText, ArrowRightCircle];

export default function Problem({ content }) {
  const points = PROBLEM_POINTS[content.base_language] || PROBLEM_POINTS.en;

  return (
    <section className="py-20 px-5" style={{ background: '#161f19' }}>
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-5">
          {points.map((point, i) => (
            <motion.div
              key={point.title}
              {...fadeUp(i * 0.1)}
              className="rounded-2xl border border-white/8 p-7 flex flex-col gap-4"
              style={{ background: 'linear-gradient(135deg, #1e3325 0%, #192a20 100%)' }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-[#50C878]/10">
                {(() => {
                  const Icon = ICONS[i];
                  return <Icon className="w-5 h-5" style={{ color: '#50C878' }} />;
                })()}
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1.5" style={{ fontFamily: 'Poppins' }}>
                  {point.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">{point.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
