'use client';

// Ported from the app repo's src/components/landing/LandingDemoStep4Analysis.jsx,
// unchanged in structure/logic. Table layout (word / transliteration / meaning
// columns) mirrors the real logged-in-user Langsi Method table in the app's
// LangsiModal.jsx. Header reuses T.method_tag/T.method_h2_1 exactly as the
// source does — these are the only two `method_*` template fields kept once
// the standalone "Langsi-Methode" section was removed, precisely because this
// component still needs them.

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function AdsDemoStep4Analysis({ T, explanation, loading, onCtaClick }) {
  const rows = explanation?.rows || [];

  return (
    <div
      className="w-full max-w-sm mx-auto rounded-2xl border overflow-hidden p-7 flex flex-col gap-4"
      style={{
        background: 'linear-gradient(135deg, #1e3325 0%, #192a20 100%)',
        border: '1px solid rgba(80,200,120,0.25)',
        boxShadow: '0 4px 40px 0 rgba(80,200,120,0.1)',
        minHeight: 260,
      }}
    >
      <div>
        <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-[#50C878] bg-[#50C878]/10 border border-[#50C878]/25 rounded-full px-3 py-1">
          {T.method_tag}
        </span>
        <h3 className="text-2xl font-bold text-white leading-snug mt-3" style={{ fontFamily: 'Poppins' }}>
          {T.method_h2_1}
        </h3>
      </div>

      {loading && !explanation && (
        <div className="flex-1 flex items-center justify-center text-[#50C878]/70 text-sm py-8">{T.ads_analysis_loading}</div>
      )}

      {!loading && !explanation && (
        <div className="flex-1 flex items-center justify-center text-[#50C878]/70 text-sm py-8 text-center">
          {T.ads_analysis_unavailable}
        </div>
      )}

      {explanation && rows.length > 0 && (
        <>
          <div className="rounded-xl border border-[#50C878]/25 overflow-hidden" style={{ boxShadow: '0 4px 24px 0 rgba(80,200,120,0.15)' }}>
            <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
              <table className="w-full min-w-[260px] table-fixed">
                <colgroup>
                  <col className="w-[26%]" />
                  <col className="w-[32%]" />
                  <col className="w-[42%]" />
                </colgroup>
                <thead>
                  <tr className="bg-[#50C878]/10 border-b border-[#50C878]/20">
                    <th className="text-left p-2 text-[#50C878]/80 font-semibold text-[10px] uppercase tracking-wide">{T.ads_table_word}</th>
                    <th className="text-left p-2 text-[#50C878]/80 font-semibold text-[10px] uppercase tracking-wide">{T.ads_table_transliteration}</th>
                    <th className="text-left p-2 text-[#50C878]/80 font-semibold text-[10px] uppercase tracking-wide">{T.ads_table_meaning}</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={i} className="border-b border-white/5 last:border-b-0">
                      <td className="p-2 text-xs text-white font-semibold align-top break-words" style={{ wordBreak: 'break-word' }}>
                        {row.word}
                      </td>
                      <td className="p-2 text-xs text-white/80 align-top break-words" style={{ wordBreak: 'break-word' }}>
                        {row.transliteration}
                      </td>
                      <td className="p-2 text-xs text-white/80 align-top break-words" style={{ wordBreak: 'break-word' }}>
                        {row.gloss}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-white/70 text-sm leading-relaxed">{T.ads_step4_intro}</p>

          {/* Teaser: a few blurred, non-readable placeholder rows behind a
              translucent overlay carrying T.ads_step4_teaser — suggests more
              analysis content exists in the full course. Purely decorative
              (no real data), sits above the CTA button as its own block, so
              the CTA itself never has pointer-events disabled. */}
          <div className="relative rounded-xl overflow-hidden border border-white/10">
            <div className="p-3 space-y-2" style={{ filter: 'blur(4px)', opacity: 0.5 }} aria-hidden="true">
              <div className="h-3 bg-white/20 rounded w-3/4" />
              <div className="h-3 bg-white/20 rounded w-1/2" />
              <div className="h-3 bg-white/20 rounded w-2/3" />
            </div>
            <div
              className="absolute inset-0 flex items-center justify-center text-center px-4"
              style={{ background: 'rgba(20,35,26,0.6)' }}
            >
              <p className="text-white text-xs font-semibold leading-snug">{T.ads_step4_teaser}</p>
            </div>
          </div>
        </>
      )}

      <motion.button
        onClick={onCtaClick}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="w-full rounded-full bg-[#50C878] text-[#1C3A27] font-bold py-3 text-sm flex items-center justify-center gap-2 mt-1"
        style={{ fontFamily: 'Poppins', boxShadow: '0 4px 24px rgba(80,200,120,0.3)' }}
      >
        {T.hero_cta} <ArrowRight className="w-4 h-4" />
      </motion.button>
    </div>
  );
}
