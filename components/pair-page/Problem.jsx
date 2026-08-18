'use client';

import { motion } from 'framer-motion';
import { Layers, ListChecks, Headphones } from 'lucide-react';
import { fadeUp } from './fadeUp';

export default function Problem({ content }) {
  const MODES = [
    { icon: Layers, title: content.mode_fc_title, desc: content.mode_fc_desc },
    { icon: ListChecks, title: content.mode_mc_title, desc: content.mode_mc_desc },
    { icon: Headphones, title: content.mode_listen_title, desc: content.mode_listen_desc },
  ];

  return (
    <section className="py-20 px-5" style={{ background: '#161f19' }}>
      <div className="max-w-4xl mx-auto">
        <motion.div {...fadeUp(0)} className="text-center mb-12">
          <p className="text-white/40 text-sm font-semibold tracking-widest uppercase mb-3">
            {content.mode_tag}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-snug mb-3" style={{ fontFamily: 'Poppins' }}>
            {content.mode_h2}
          </h2>
          <p className="text-white/50 text-sm max-w-md mx-auto">{content.mode_sub}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {MODES.map((mode, i) => (
            <motion.div
              key={mode.title}
              {...fadeUp(i * 0.1)}
              className="rounded-2xl border border-white/8 p-7 flex flex-col gap-4"
              style={{ background: 'linear-gradient(135deg, #1e3325 0%, #192a20 100%)' }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-[#50C878]/10">
                <mode.icon className="w-5 h-5" style={{ color: '#50C878' }} />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1.5" style={{ fontFamily: 'Poppins' }}>
                  {mode.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">{mode.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
