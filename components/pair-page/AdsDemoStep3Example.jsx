'use client';

// Ported from the app repo's src/components/landing/LandingDemoStep3Example.jsx,
// kept as close to the original as possible. Only real change: speak() comes
// from ./speak.js instead of @/lib/tts/webSpeechService.

import { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { speak } from './speak';

// order_index 0/1/2 -> easy/medium/advanced tier. Colors are fixed regardless
// of T/sourceLang; only the label text is resolved per-language via T.
function tierBadges(T) {
  return [
    { label: T.ads_tier_easy, color: '#50C878' },
    { label: T.ads_tier_medium, color: '#F5C842' },
    { label: T.ads_tier_advanced, color: '#f87171' },
  ];
}

// Splits sentence on the exact substring highlight_word. highlight_word
// itself -> white (it IS the target-language vocabulary), the rest of the
// sentence -> light green (surrounding grammar/context). Falls back to plain
// light-green text if highlight_word is absent or isn't found verbatim.
function renderHighlightedSentence(sentence, highlightWord) {
  if (!highlightWord || sentence.indexOf(highlightWord) === -1) {
    return <span className="text-[#50C878]/70">{sentence}</span>;
  }
  const idx = sentence.indexOf(highlightWord);
  return (
    <>
      <span className="text-[#50C878]/70">{sentence.slice(0, idx)}</span>
      <span className="text-white font-bold">{highlightWord}</span>
      <span className="text-[#50C878]/70">{sentence.slice(idx + highlightWord.length)}</span>
    </>
  );
}

function SentenceRow({ sentence, ttsLocale, T }) {
  const [playing, setPlaying] = useState(false);
  const badges = tierBadges(T);
  const tier = badges[sentence.order_index] || badges[0];

  const handlePlay = () => {
    if (playing || !sentence?.sentence) return;
    setPlaying(true);
    speak(sentence.sentence, ttsLocale || 'en-US', () => setPlaying(false));
  };

  return (
    <div className="rounded-2xl border p-4" style={{ borderColor: `${tier.color}33`, background: 'rgba(28,58,39,0.4)' }}>
      <div className="flex items-center justify-between mb-2.5">
        <span
          className="inline-block text-[10px] font-semibold uppercase tracking-wide rounded-full px-2 py-0.5 border"
          style={{ color: tier.color, borderColor: `${tier.color}55`, background: `${tier.color}1a` }}
        >
          {tier.label}
        </span>
        <button
          onClick={handlePlay}
          title={T.ads_listen_title}
          className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            playing ? 'bg-[#50C878]/30 text-[#50C878] cursor-default' : 'bg-[#50C878] text-[#1C3A27] hover:bg-[#3eb865]'
          }`}
        >
          <Volume2 className={`w-4 h-4 ${playing ? 'animate-pulse' : ''}`} />
        </button>
      </div>
      <div className="text-left min-w-0">
        <div className="text-base font-semibold leading-snug break-words">
          {renderHighlightedSentence(sentence.sentence, sentence.highlight_word)}
        </div>
        {sentence.phonetic_display && (
          <div className="text-white/70 text-xs font-mono mt-0.5 break-words">{sentence.phonetic_display}</div>
        )}
        <div className="text-white/50 text-sm mt-0.5 break-words">{sentence.translation}</div>
      </div>
    </div>
  );
}

// Shows all curated example sentences (order_index 0/1/2, basic -> advanced)
// for the resolved demo vocabulary. Opens with the raw vocabulary word itself
// (+ its own phonetic/audio) — distinct from the translation-first opening,
// and distinct from Step 2's flashcard.
export default function AdsDemoStep3Example({ T, vocabulary, exampleSentences, ttsLocale }) {
  const [wordPlaying, setWordPlaying] = useState(false);
  const sorted = [...(exampleSentences || [])].sort((a, b) => a.order_index - b.order_index);

  const handleWordPlay = () => {
    if (wordPlaying || !vocabulary?.word) return;
    setWordPlaying(true);
    speak(vocabulary.word, ttsLocale || 'en-US', () => setWordPlaying(false));
  };

  return (
    <div
      className="w-full max-w-sm mx-auto rounded-2xl border overflow-hidden p-7 flex flex-col"
      style={{
        background: 'linear-gradient(135deg, #1e3325 0%, #192a20 100%)',
        border: '1px solid rgba(80,200,120,0.25)',
        boxShadow: '0 4px 40px 0 rgba(80,200,120,0.1)',
      }}
    >
      <div className="flex items-center gap-2.5 mb-1">
        <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Poppins' }}>
          {vocabulary.word}
        </div>
        <button
          onClick={handleWordPlay}
          title={T.ads_listen_title}
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            wordPlaying ? 'bg-[#50C878]/30 text-[#50C878] cursor-default' : 'bg-[#50C878] text-[#1C3A27] hover:bg-[#3eb865]'
          }`}
        >
          <Volume2 className={`w-3.5 h-3.5 ${wordPlaying ? 'animate-pulse' : ''}`} />
        </button>
      </div>
      {vocabulary.phonetic_display && <div className="text-white/70 text-xs font-mono mb-3">{vocabulary.phonetic_display}</div>}

      <div className="rounded-xl bg-[#50C878]/8 border border-[#50C878]/20 p-4 text-center mb-3">
        <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Poppins' }}>
          {vocabulary.translation}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {sorted.map((sentence) => (
          <SentenceRow key={sentence.order_index} sentence={sentence} ttsLocale={ttsLocale} T={T} />
        ))}
      </div>
    </div>
  );
}
