'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { fadeUp } from './fadeUp';

export default function RealPricing({ content }) {
  const P = content.pricing;

  const PLANS = [
    {
      key: 'free',
      label: P.free_label,
      price: '0 $',
      sub: P.free_sub,
      features: [P.free_f1, P.free_f2, P.free_f3],
      cta: P.free_cta,
      highlight: false,
    },
    {
      key: 'single',
      label: P.single_label,
      badge: P.single_badge,
      price: '3,99 $',
      sub: P.single_sub,
      features: [P.single_f1, P.single_f2, P.single_f3, P.single_f4, P.single_f5],
      cta: P.single_cta,
      highlight: true,
    },
    {
      key: 'bundle',
      label: P.bundle_label,
      price: '7,99 $',
      sub: P.bundle_sub,
      features: [P.bundle_f1, P.bundle_f2, P.bundle_f3],
      cta: P.bundle_cta,
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 px-5" style={{ background: '#1a251d' }}>
      <div className="max-w-5xl mx-auto">
        <motion.div {...fadeUp(0)} className="text-center mb-12">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#50C878] bg-[#50C878]/10 border border-[#50C878]/20 rounded-full px-4 py-1.5 mb-4">
            {P.tag}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'Poppins' }}>
            {P.h2}
          </h2>
          <p className="text-white/45 text-sm max-w-md mx-auto">{P.sub}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 items-start">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.key}
              {...fadeUp(i * 0.1)}
              className={`rounded-2xl p-7 relative border ${plan.highlight ? 'border-[#50C878]/50' : 'border-white/8'}`}
              style={{
                background: 'linear-gradient(135deg, #1e3325 0%, #192a20 100%)',
                boxShadow: plan.highlight ? '0 0 40px 0 rgba(80,200,120,0.1)' : 'none',
              }}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#50C878] text-[#1C3A27] text-[10px] font-bold rounded-full px-3 py-1 whitespace-nowrap">
                  {plan.badge}
                </div>
              )}
              <p className={`text-xs font-semibold tracking-widest uppercase mb-3 mt-1 ${plan.highlight ? 'text-[#50C878]' : 'text-white/35'}`}>
                {plan.label}
              </p>
              <div className="text-3xl font-extrabold text-white mb-0.5" style={{ fontFamily: 'Poppins' }}>
                {plan.price}
              </div>
              <p className="text-white/35 text-xs mb-6">{plan.sub}</p>
              <ul className="space-y-2.5 mb-7">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-white/65">
                    <Check className="w-3.5 h-3.5 text-[#50C878] flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <a
                href={content.app_deep_link}
                className={`block text-center w-full py-3 rounded-xl text-sm font-bold transition-all ${
                  plan.highlight
                    ? 'bg-[#50C878] text-[#1C3A27] hover:bg-[#3eb865]'
                    : 'border border-[#50C878]/20 text-white/75 hover:border-[#50C878]/40 hover:text-white'
                }`}
                style={{ fontFamily: 'Poppins' }}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp(0.4)} className="mt-8 flex flex-wrap justify-center gap-5">
          {[P.trust1, P.trust2, P.trust3].map((t) => (
            <span key={t} className="flex items-center gap-1.5 text-xs text-white/35">
              <Check className="w-3 h-3 text-[#50C878]" /> {t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
