'use client';

// New step 5 of the scrollytelling demo: a plain text/icon screen between
// the example sentences (step 4) and the analysis breakdown (step 6) —
// no interactive mic element, just a pronunciation tip.

import { Headphones } from 'lucide-react';

export default function AdsDemoStepListenRepeatTip({ T }) {
  return (
    <div
      className="w-full max-w-sm mx-auto rounded-2xl border overflow-hidden p-8 flex flex-col items-center text-center gap-4"
      style={{
        background: 'linear-gradient(135deg, #1e3325 0%, #192a20 100%)',
        border: '1px solid rgba(80,200,120,0.25)',
        boxShadow: '0 4px 40px 0 rgba(80,200,120,0.1)',
      }}
    >
      <div className="w-12 h-12 rounded-full bg-[#50C878]/15 flex items-center justify-center">
        <Headphones className="w-6 h-6 text-[#50C878]" />
      </div>
      <p className="text-white text-base leading-relaxed" style={{ fontFamily: 'Poppins' }}>
        {T.ads_listen_tip}
      </p>
      <p className="text-white/40 text-xs">{T.ads_scroll_hint}</p>
    </div>
  );
}
