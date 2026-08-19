'use client';

// Ported from the app repo's src/components/landing/LandingDemoStep2Flashcard.jsx,
// kept as close to the original as possible. Only real change: speak() comes
// from ./speak.js (a local Web Speech API helper) instead of
// @/lib/tts/webSpeechService, and uses a callback instead of a Promise.

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import { speak } from './speak';

export default function AdsDemoStep2Flashcard({ T, vocabulary, ttsLocale, onAnswer }) {
  const [answered, setAnswered] = useState(false);
  const [playing, setPlaying] = useState(false);

  const handleAnswer = (knewIt) => {
    if (answered) return;
    setAnswered(true);
    onAnswer(knewIt);
  };

  const handlePlay = () => {
    if (playing || !vocabulary?.word) return;
    setPlaying(true);
    speak(vocabulary.word, ttsLocale || 'en-US', () => setPlaying(false));
  };

  return (
    <div
      className="w-full max-w-sm mx-auto rounded-2xl border overflow-hidden p-8 flex flex-col items-center text-center gap-6"
      style={{
        background: 'linear-gradient(135deg, #1e3325 0%, #192a20 100%)',
        border: '1px solid rgba(80,200,120,0.25)',
        boxShadow: '0 4px 40px 0 rgba(80,200,120,0.1)',
      }}
    >
      <div className="text-[#50C878]/70 text-xs font-semibold tracking-widest uppercase">{T.ads_flashcard_label}</div>
      <div className="flex items-center justify-center gap-2.5">
        <div className="text-4xl font-bold text-white leading-tight" style={{ fontFamily: 'Poppins' }}>
          {vocabulary.word}
        </div>
        <button
          onClick={handlePlay}
          title={T.ads_listen_title}
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            playing ? 'bg-[#50C878]/30 text-[#50C878] cursor-default' : 'bg-[#50C878] text-[#1C3A27] hover:bg-[#3eb865]'
          }`}
        >
          <Volume2 className={`w-3.5 h-3.5 ${playing ? 'animate-pulse' : ''}`} />
        </button>
      </div>
      {vocabulary.phonetic_display && (
        <div className="text-white/70 text-sm font-mono tracking-wide">{vocabulary.phonetic_display}</div>
      )}
      <div className="text-[#50C878]/70 text-sm">{T.ads_know_word}</div>
      {/* Both buttons share the same neutral outline treatment — no filled/outline
          asymmetry, so neither reads as the pre-selected default. */}
      <div className="flex gap-3">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => handleAnswer(true)}
          disabled={answered}
          className="rounded-full px-6 py-2.5 text-sm font-bold border border-white/15 text-[#50C878] hover:border-[#50C878]/40 hover:bg-[#50C878]/10 transition-colors disabled:opacity-50"
          style={{ fontFamily: 'Poppins' }}
        >
          {T.ads_yes}
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => handleAnswer(false)}
          disabled={answered}
          className="rounded-full px-6 py-2.5 text-sm font-bold border border-white/15 text-[#50C878] hover:border-[#50C878]/40 hover:bg-[#50C878]/10 transition-colors disabled:opacity-50"
          style={{ fontFamily: 'Poppins' }}
        >
          {T.ads_no}
        </motion.button>
      </div>
    </div>
  );
}
