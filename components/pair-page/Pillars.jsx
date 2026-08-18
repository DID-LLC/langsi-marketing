'use client';

import { motion } from 'framer-motion';
import { Volume2, Mic, Brain, Flame, Target } from 'lucide-react';
import { fadeUp } from './fadeUp';

export default function Pillars({ content }) {
  const P = content.pillars;

  const PILLARS = [
    { icon: Volume2, title: P.listen_title, desc: P.listen_desc, color: '#50C878' },
    { icon: Mic, title: P.speak_title, desc: P.speak_desc, color: '#F5C842' },
    { icon: Brain, title: P.understand_title, desc: P.understand_desc, color: '#7C9FFF' },
  ];

  const STATS = [
    { icon: Flame, label: P.streak_label, sub: P.streak_sub },
    { icon: Target, label: P.goal_label, sub: P.goal_sub },
    { icon: Brain, label: P.leitner_label, sub: P.leitner_sub },
  ];

  return (
    <section className="py-20 px-5" style={{ background: '#1a251d' }}>
      <div className="max-w-4xl mx-auto">
        <motion.div {...fadeUp(0)} className="text-center mb-12">
          <p className="text-white/40 text-sm font-semibold tracking-widest uppercase mb-3">{P.why}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-snug" style={{ fontFamily: 'Poppins' }}>
            {P.h2}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              {...fadeUp(i * 0.1)}
              className="rounded-2xl border border-white/8 p-7 flex flex-col gap-4"
              style={{ background: 'linear-gradient(135deg, #1e3325 0%, #192a20 100%)' }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${p.color}18` }}>
                <p.icon className="w-5 h-5" style={{ color: p.color }} />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1.5" style={{ fontFamily: 'Poppins' }}>
                  {p.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mini stats */}
        <motion.div {...fadeUp(0.35)} className="mt-12 flex flex-wrap justify-center gap-8">
          {STATS.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3 text-sm">
              <div className="w-9 h-9 rounded-xl bg-[#50C878]/10 flex items-center justify-center">
                <Icon className="w-4 h-4 text-[#50C878]" />
              </div>
              <div>
                <p className="text-white font-semibold leading-none mb-0.5">{label}</p>
                <p className="text-white/35 text-xs">{sub}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
