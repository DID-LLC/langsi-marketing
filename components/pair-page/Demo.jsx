'use client';

import { motion } from 'framer-motion';
import { fadeUp } from './fadeUp';

export default function Demo({ content }) {
  const demo = content.demo_vocabulary || {};

  if (!demo.word_th) {
    // content/pairs/{source}-th.json's demo_vocabulary is populated at build
    // time by scripts/fetchBuildTimeContent.mjs (the `prebuild` step). If
    // this renders, prebuild hasn't run — not fabricated placeholder data.
    return (
      <section className="py-16 px-5" style={{ background: '#1a251d' }}>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-white/40 text-sm">Demo-Vokabel wird beim Build geladen.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-5" style={{ background: '#1a251d' }}>
      <div className="max-w-2xl mx-auto">
        <motion.div
          {...fadeUp(0)}
          className="rounded-2xl border border-white/8 p-8"
          style={{ background: 'linear-gradient(135deg, #1e3325 0%, #192a20 100%)' }}
        >
          <p className="text-3xl text-white mb-1" style={{ fontFamily: 'Poppins' }}>
            {demo.word_th}
          </p>
          <p className="text-[#50C878] text-sm mb-1">{demo.romanization}</p>
          <p className="text-white/60 text-sm mb-6">{demo.translation_de}</p>

          {(demo.example_sentences || []).map((s) => (
            <div key={s.sentence_variant_key} className="mt-4 pt-4 border-t border-white/8">
              <p className="text-white/85 mb-1">{s.sentence_th}</p>
              <p className="text-white/40 text-sm mb-1">{s.transliteration}</p>
              <p className="text-white/60 text-sm">{s.translation_de}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
