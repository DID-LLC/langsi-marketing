'use client';

// New step 3 of the scrollytelling demo: shown right after the flashcard
// answer (step 2), explains what Langsi does with that answer behind the
// scenes before moving on to a real example sentence (step 4). Point 1 is
// two sentences: T.ads_memory_point_1 (fixed) followed by whichever of
// T.ads_memory_point_1_yes/_no matches the user's flashcard answer.

import { Check } from 'lucide-react';

export default function AdsDemoStepMemoryExplainer({ T, knewWord }) {
  const point1 = `${T.ads_memory_point_1} ${knewWord ? T.ads_memory_point_1_yes : T.ads_memory_point_1_no}`;
  const points = [point1, T.ads_memory_point_2, T.ads_memory_point_3];

  return (
    <div
      className="w-full max-w-sm mx-auto rounded-2xl border overflow-hidden p-7 flex flex-col gap-5"
      style={{
        background: 'linear-gradient(135deg, #1e3325 0%, #192a20 100%)',
        border: '1px solid rgba(80,200,120,0.25)',
        boxShadow: '0 4px 40px 0 rgba(80,200,120,0.1)',
      }}
    >
      <div className="flex flex-col gap-3">
        {points.map((point, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#50C878]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5 text-[#50C878]" />
            </div>
            <p className="text-white/80 text-sm leading-relaxed">{point}</p>
          </div>
        ))}
      </div>
      <p className="text-[#50C878] text-sm font-semibold text-center" style={{ fontFamily: 'Poppins' }}>
        {T.ads_memory_transition}
      </p>
      <p className="text-white/40 text-xs text-center">{T.ads_scroll_hint}</p>
    </div>
  );
}
