'use client';

// Section 4 — interactive product demo, driven entirely by content.demo
// (built at prebuild time from live Vocabulary/ExampleSentence/getLandingDemo
// data — see scripts/fetchBuildTimeContent.mjs). TTS is fully client-side via
// the Web Speech API (window.speechSynthesis) — no Base44 call at runtime.
// Visual pattern ported from the app repo's src/components/landing/
// LandingDemoStep2Flashcard.jsx / LandingDemoStep3Example.jsx /
// LandingDemoStep4Analysis.jsx (word-play button styling, sentence tier
// cards, analysis table), combined into one 4-part reveal instead of those
// three separate scroll-triggered cards, per this component's spec.

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, Check, X } from 'lucide-react';
import { fadeUp } from './fadeUp';

const TIER_COLORS = ['#50C878', '#F5C842', '#f87171'];

const GUESS_LABELS = {
  de: { know: 'Kenne ich', dontKnow: 'Weiß ich nicht' },
  en: { know: 'I know this', dontKnow: "I don't know" },
  es: { know: 'Lo sé', dontKnow: 'No lo sé' },
  fr: { know: 'Je connais', dontKnow: 'Je ne sais pas' },
  it: { know: 'Lo conosco', dontKnow: 'Non lo so' },
  ru: { know: 'Я знаю', dontKnow: 'Не знаю' },
  zh: { know: '我知道', dontKnow: '不知道' },
  hi: { know: 'मुझे पता है', dontKnow: 'पता नहीं' },
  ur: { know: 'مجھے پتا ہے', dontKnow: 'پتا نہیں' },
  ar: { know: 'أعرفها', dontKnow: 'لا أعرفها' },
  ja: { know: '知っている', dontKnow: '知らない' },
};

function getBestVoice(langCode) {
  const voices = window.speechSynthesis.getVoices();
  const base = langCode.split('-')[0];
  const langVoices = voices.filter((v) => v.lang.startsWith(base));
  const priority = ['Google', 'Enhanced', 'Premium'];
  for (const keyword of priority) {
    const match = langVoices.find((v) => v.name.includes(keyword));
    if (match) return match;
  }
  return langVoices[0] || null;
}

function speak(text, langCode, onDone) {
  if (!text || !('speechSynthesis' in window)) {
    onDone?.();
    return;
  }
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = langCode;
  u.rate = 0.85;

  const doSpeak = () => {
    const voice = getBestVoice(langCode);
    if (voice) u.voice = voice;
    u.onend = () => onDone?.();
    u.onerror = () => onDone?.();
    window.speechSynthesis.speak(u);
  };

  if (window.speechSynthesis.getVoices().length > 0) {
    doSpeak();
  } else {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.onvoiceschanged = null;
      doSpeak();
    };
  }
}

function PlayButton({ text, size = 'sm' }) {
  const [playing, setPlaying] = useState(false);
  const dims = size === 'sm' ? 'w-8 h-8' : 'w-9 h-9';
  const iconDims = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';

  const handlePlay = () => {
    if (playing || !text) return;
    setPlaying(true);
    speak(text, 'th-TH', () => setPlaying(false));
  };

  return (
    <button
      onClick={handlePlay}
      className={`flex-shrink-0 ${dims} rounded-full flex items-center justify-center transition-all ${
        playing ? 'bg-[#50C878]/30 text-[#50C878] cursor-default' : 'bg-[#50C878] text-[#1C3A27] hover:bg-[#3eb865]'
      }`}
    >
      <Volume2 className={`${iconDims} ${playing ? 'animate-pulse' : ''}`} />
    </button>
  );
}

function renderHighlighted(sentence, highlightWord) {
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

export default function MicroDemo({ content }) {
  const { vocabulary, sentences, analysis } = content.demo;
  const [revealed, setRevealed] = useState(false);
  const [guess, setGuess] = useState(null); // true | false | null
  const labels = GUESS_LABELS[content.base_language] || GUESS_LABELS.en;

  const sorted = [...(sentences || [])].sort((a, b) => a.order_index - b.order_index);

  const handleGuess = (knewIt) => {
    if (guess !== null) return;
    setGuess(knewIt);
    setTimeout(() => setRevealed(true), 500);
  };

  return (
    <section id="demo" className="py-20 px-5" style={{ background: '#1a251d' }}>
      <div className="max-w-lg mx-auto">
        {/* Step 1+2: guess, then reveal translation + audio */}
        <motion.div
          {...fadeUp(0)}
          className="rounded-2xl border overflow-hidden p-8 flex flex-col items-center text-center gap-5"
          style={{
            background: 'linear-gradient(135deg, #1e3325 0%, #192a20 100%)',
            border: '1px solid rgba(80,200,120,0.25)',
            boxShadow: '0 4px 40px 0 rgba(80,200,120,0.1)',
          }}
        >
          <div className="flex items-center justify-center gap-2.5">
            <div className="text-4xl font-bold text-white leading-tight">{vocabulary.word}</div>
            <PlayButton text={vocabulary.word} />
          </div>
          {vocabulary.phonetic_display && (
            <div className="text-white/70 text-sm font-mono tracking-wide">{vocabulary.phonetic_display}</div>
          )}

          {!revealed && (
            <div className="flex gap-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleGuess(true)}
                disabled={guess !== null}
                className={`flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-bold border transition-colors disabled:opacity-50 ${
                  guess === true ? 'bg-[#50C878] text-[#1C3A27] border-[#50C878]' : 'border-white/15 text-[#50C878] hover:border-[#50C878]/40 hover:bg-[#50C878]/10'
                }`}
              >
                <Check className="w-4 h-4" /> {labels.know}
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleGuess(false)}
                disabled={guess !== null}
                className={`flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-bold border transition-colors disabled:opacity-50 ${
                  guess === false ? 'bg-white/10 text-white border-white/20' : 'border-white/15 text-white/70 hover:border-white/30'
                }`}
              >
                <X className="w-4 h-4" /> {labels.dontKnow}
              </motion.button>
            </div>
          )}

          {revealed && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="w-full">
              <div className="rounded-xl bg-[#50C878]/8 border border-[#50C878]/20 p-4 text-center mb-2">
                <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Poppins' }}>
                  {vocabulary.translation}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Step 3: three example sentences */}
        {revealed && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex flex-col gap-3">
            {sorted.map((sentence, i) => (
              <div
                key={sentence.order_index}
                className="rounded-2xl border p-4"
                style={{ borderColor: `${TIER_COLORS[i] || TIER_COLORS[0]}33`, background: 'rgba(28,58,39,0.4)' }}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <span
                    className="inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold rounded-full border"
                    style={{
                      color: TIER_COLORS[i] || TIER_COLORS[0],
                      borderColor: `${TIER_COLORS[i] || TIER_COLORS[0]}55`,
                      background: `${TIER_COLORS[i] || TIER_COLORS[0]}1a`,
                    }}
                  >
                    {i + 1}
                  </span>
                  <PlayButton text={sentence.sentence} size="md" />
                </div>
                <div className="text-left min-w-0">
                  <div className="text-base font-semibold leading-snug break-words">
                    {renderHighlighted(sentence.sentence, sentence.highlight_word)}
                  </div>
                  {sentence.phonetic_display && (
                    <div className="text-white/70 text-xs font-mono mt-0.5 break-words">{sentence.phonetic_display}</div>
                  )}
                  <div className="text-white/50 text-sm mt-0.5 break-words">{sentence.translation}</div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Step 4: word-for-word analysis — only if getLandingDemo returned one */}
        {revealed && analysis && analysis.rows && analysis.rows.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 rounded-2xl border overflow-hidden p-6"
            style={{
              background: 'linear-gradient(135deg, #1e3325 0%, #192a20 100%)',
              border: '1px solid rgba(80,200,120,0.25)',
            }}
          >
            <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-[#50C878] bg-[#50C878]/10 border border-[#50C878]/25 rounded-full px-3 py-1 mb-4">
              {content.method_tag}
            </span>
            <div className="rounded-xl border border-[#50C878]/25 overflow-hidden">
              <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
                <table className="w-full min-w-[260px] table-fixed">
                  <tbody>
                    {analysis.rows.map((row, i) => (
                      <tr key={i} className="border-b border-white/5 last:border-b-0">
                        <td className="p-2 text-xs text-white font-semibold align-top break-words">{row.word}</td>
                        <td className="p-2 text-xs text-white/80 align-top break-words">{row.transliteration}</td>
                        <td className="p-2 text-xs text-white/80 align-top break-words">{row.gloss}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {revealed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-center">
            <a
              href={content.app_deep_link}
              className="inline-block text-sm font-bold rounded-full px-7 py-3 transition-colors"
              style={{ background: '#50C878', color: '#1C3A27', fontFamily: 'Poppins', boxShadow: '0 4px 24px rgba(80,200,120,0.3)' }}
            >
              {content.hero_cta}
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
