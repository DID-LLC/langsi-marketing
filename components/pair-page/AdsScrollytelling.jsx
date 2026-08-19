'use client';

// Ported from the app repo's src/components/landing/LandingAdsScrollytelling.jsx
// as closely as possible: same pinned-scroll mechanism (position: sticky,
// N×100vh container, framer-motion opacity crossfade over scroll progress),
// same fixed scroll-along CTA button, same prefers-reduced-motion fallback
// (stacked instead of pinned). Real adaptations for this static site:
//   - `language`/`sourceLang`-driven target-language resolution
//     (getTargetLanguageDisplayName) is replaced by a fixed "Thai" flag —
//     every page on this site targets Thai, there's no dynamic target to
//     resolve.
//   - `level` (URL ?level= on the real app) and `onStepView` (GA4) don't
//     apply here — no query-param levels or analytics wiring on this static
//     site, so the level badge simply never renders (same as the source
//     component's own behavior when no level is passed) and onStepView is
//     just omitted.
//   - Step 1's headline is an <h2>, not the source's <h1> — Hero.jsx (which
//     renders before this component on every page) already owns the page's
//     one real <h1>. Renders T.ads_intro_heading (a fixed, non-interpolated
//     string) instead of the source's {ads_hero_prefix}{targetLangName}
//     {ads_hero_suffix} concatenation — with a single fixed target language,
//     there's nothing left to interpolate.
// Data source is content.demo (vocabulary/sentences/analysis), built at
// prebuild time by scripts/fetchBuildTimeContent.mjs — unchanged by this
// component, only the presentation layer is new.
//
// Six-step version: intro -> flashcard -> memory explainer -> example ->
// listen/repeat tip -> analysis. Steps 3 (AdsDemoStepMemoryExplainer) and 5
// (AdsDemoStepListenRepeatTip) are new; the opacity/pointer-events crossfade
// for all N steps is generated from the STEPS array via stepBreakpoints()
// instead of N separate hardcoded useTransform breakpoint arrays, so adding
// or removing a step only means editing STEPS — but useTransform/useScroll
// themselves stay literal top-level hook calls (one pair per step), since
// hook calls can't be looped.

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import AdsDemoStep2Flashcard from './AdsDemoStep2Flashcard';
import AdsDemoStepMemoryExplainer from './AdsDemoStepMemoryExplainer';
import AdsDemoStep3Example from './AdsDemoStep3Example';
import AdsDemoStepListenRepeatTip from './AdsDemoStepListenRepeatTip';
import AdsDemoStep4Analysis from './AdsDemoStep4Analysis';

const TARGET_FLAG = '🇹🇭';
// Every page on this site targets Thai, so its TTS locale is fixed too —
// matches the app repo's own th-TH convention for Thai audio.
const TTS_LOCALE = 'th-TH';

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

const STEPS = ['intro', 'flashcard', 'memory', 'example', 'listenTip', 'analysis'];
const N = STEPS.length;
// Width (in scroll-progress fraction) of each step's fade transition,
// shared by every step regardless of N.
const FADE_WIDTH = 0.2 / N;

// For 1-based step index i: [slotStart, slotEnd) is that step's fraction of
// total scroll progress. Fades in from slotStart-FADE_WIDTH (unless it's the
// first step — nothing to fade in from) and fades out into slotEnd (unless
// it's the last step — stays visible through the end). Returns the
// [input, output] breakpoint arrays useTransform expects.
function stepBreakpoints(i) {
  const slotStart = (i - 1) / N;
  const slotEnd = i / N;
  const input = [];
  const output = [];
  if (i > 1) {
    input.push(slotStart - FADE_WIDTH);
    output.push(0);
  }
  input.push(slotStart);
  output.push(1);
  input.push(slotEnd - FADE_WIDTH);
  output.push(1);
  if (i < N) {
    input.push(slotEnd);
    output.push(0);
  }
  return [input, output];
}

// Slot start of step 3 (the new memory-explainer step) — where the flashcard
// answer jumps to, in both the pinned and reduced-motion layouts.
const STEP2_TO_STEP3_PROGRESS = (3 - 1) / N;

function animateScrollTo(targetY, duration = 500) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  if (Math.abs(distance) < 1) return;
  const startTime = performance.now();
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
  function step(now) {
    const elapsed = now - startTime;
    const t = Math.min(1, elapsed / duration);
    window.scrollTo(0, startY + distance * easeOutCubic(t));
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function scrollWindowToContainerProgress(containerRef, progress) {
  const el = containerRef.current;
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const containerTop = rect.top + window.scrollY;
  const scrollableDistance = el.offsetHeight - window.innerHeight;
  animateScrollTo(containerTop + progress * scrollableDistance);
}

export default function AdsScrollytelling({ content }) {
  const T = { ...content.ads_t, hero_cta: content.hero_cta, method_tag: content.method_tag, method_h2_1: content.method_h2_1 };
  const vocabulary = content.demo.vocabulary;
  const exampleSentences = content.demo.sentences;
  const explanation = content.demo.analysis;
  const onCta = () => {
    window.location.href = content.app_deep_link;
  };

  // Set by Step 2's onAnswer, read by AdsDemoStepMemoryExplainer (Step 3) to
  // pick the ads_memory_point_1_yes/no variant.
  const [knewWord, setKnewWord] = useState(null);

  const containerRef = useRef(null);
  // step3Ref keeps wrapping the Example section (unchanged from before);
  // memoryRef is the new second ref — Step 2's onAnswer now scrolls there
  // instead, since the memory explainer is the new immediate next step.
  const step3Ref = useRef(null);
  const memoryRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const stepCount = N;

  const [step1In, step1Out] = stepBreakpoints(1);
  const [step2In, step2Out] = stepBreakpoints(2);
  const [step3In, step3Out] = stepBreakpoints(3);
  const [step4In, step4Out] = stepBreakpoints(4);
  const [step5In, step5Out] = stepBreakpoints(5);
  const [step6In, step6Out] = stepBreakpoints(6);

  const step1Opacity = useTransform(scrollYProgress, step1In, step1Out);
  const step2Opacity = useTransform(scrollYProgress, step2In, step2Out);
  const step3Opacity = useTransform(scrollYProgress, step3In, step3Out);
  const step4Opacity = useTransform(scrollYProgress, step4In, step4Out);
  const step5Opacity = useTransform(scrollYProgress, step5In, step5Out);
  const step6Opacity = useTransform(scrollYProgress, step6In, step6Out);

  const step1Pointer = useTransform(step1Opacity, (v) => (v > 0.5 ? 'auto' : 'none'));
  const step2Pointer = useTransform(step2Opacity, (v) => (v > 0.5 ? 'auto' : 'none'));
  const step3Pointer = useTransform(step3Opacity, (v) => (v > 0.5 ? 'auto' : 'none'));
  const step4Pointer = useTransform(step4Opacity, (v) => (v > 0.5 ? 'auto' : 'none'));
  const step5Pointer = useTransform(step5Opacity, (v) => (v > 0.5 ? 'auto' : 'none'));
  const step6Pointer = useTransform(step6Opacity, (v) => (v > 0.5 ? 'auto' : 'none'));

  const ctaOpacity = useTransform(scrollYProgress, [0.95, 1], [1, 0]);
  const ctaPointer = useTransform(ctaOpacity, (v) => (v > 0.5 ? 'auto' : 'none'));

  if (reducedMotion) {
    return (
      <div ref={containerRef} className="flex flex-col gap-10 py-16 px-5" style={{ background: '#1a251d' }}>
        <div className="text-center">
          <div className="text-5xl mb-3">{TARGET_FLAG}</div>
          <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Poppins' }}>
            {T.ads_intro_heading}
          </h2>
          <p className="text-[#50C878] text-sm font-semibold tracking-wide mt-2">{T.ads_hero_tag}</p>
          <p className="text-white/40 text-sm mt-3">{T.ads_scroll_hint}</p>
        </div>
        <AdsDemoStep2Flashcard
          T={T}
          vocabulary={vocabulary}
          ttsLocale={TTS_LOCALE}
          onAnswer={(knewIt) => {
            setKnewWord(knewIt);
            const el = memoryRef.current;
            if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY);
          }}
        />
        <div ref={memoryRef}>
          <AdsDemoStepMemoryExplainer T={T} knewWord={knewWord} />
        </div>
        <div ref={step3Ref}>
          <AdsDemoStep3Example T={T} vocabulary={vocabulary} exampleSentences={exampleSentences} ttsLocale={TTS_LOCALE} />
        </div>
        <AdsDemoStepListenRepeatTip T={T} />
        <AdsDemoStep4Analysis T={T} explanation={explanation} loading={false} onCtaClick={onCta} />

        <motion.div style={{ opacity: ctaOpacity }} className="fixed bottom-4 left-0 right-0 z-40 flex justify-center px-5 pointer-events-none">
          <motion.button
            onClick={onCta}
            style={{ fontFamily: 'Poppins', boxShadow: '0 4px 20px rgba(80,200,120,0.4)', pointerEvents: ctaPointer }}
            className="flex items-center gap-1.5 rounded-full bg-[#50C878] text-[#1C3A27] font-bold text-sm px-5 py-2.5 shadow-lg"
          >
            {T.hero_cta} <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ height: `${stepCount * 100}vh`, background: '#1a251d' }} className="relative">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-5">
        <motion.div style={{ opacity: step1Opacity, pointerEvents: step1Pointer }} className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-5">
          <div className="text-6xl">{TARGET_FLAG}</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center" style={{ fontFamily: 'Poppins' }}>
            {T.ads_intro_heading}
          </h2>
          <p className="text-[#50C878] text-sm font-semibold tracking-wide">{T.ads_hero_tag}</p>
          <p className="text-white/40 text-sm">{T.ads_scroll_hint}</p>
        </motion.div>

        <motion.div style={{ opacity: step2Opacity, pointerEvents: step2Pointer }} className="absolute inset-0 flex items-center justify-center px-5">
          <AdsDemoStep2Flashcard
            T={T}
            vocabulary={vocabulary}
            ttsLocale={TTS_LOCALE}
            onAnswer={(knewIt) => {
              setKnewWord(knewIt);
              scrollWindowToContainerProgress(containerRef, STEP2_TO_STEP3_PROGRESS);
            }}
          />
        </motion.div>

        <motion.div style={{ opacity: step3Opacity, pointerEvents: step3Pointer }} className="absolute inset-0 flex items-center justify-center px-5">
          <AdsDemoStepMemoryExplainer T={T} knewWord={knewWord} />
        </motion.div>

        <motion.div style={{ opacity: step4Opacity, pointerEvents: step4Pointer }} className="absolute inset-0 flex items-center justify-center px-5">
          <AdsDemoStep3Example T={T} vocabulary={vocabulary} exampleSentences={exampleSentences} ttsLocale={TTS_LOCALE} />
        </motion.div>

        <motion.div style={{ opacity: step5Opacity, pointerEvents: step5Pointer }} className="absolute inset-0 flex items-center justify-center px-5">
          <AdsDemoStepListenRepeatTip T={T} />
        </motion.div>

        <motion.div style={{ opacity: step6Opacity, pointerEvents: step6Pointer }} className="absolute inset-0 flex items-center justify-center px-5">
          <AdsDemoStep4Analysis T={T} explanation={explanation} loading={false} onCtaClick={onCta} />
        </motion.div>
      </div>

      <motion.div style={{ opacity: ctaOpacity }} className="fixed bottom-4 left-0 right-0 z-40 flex justify-center px-5 pointer-events-none">
        <motion.button
          onClick={onCta}
          style={{ fontFamily: 'Poppins', boxShadow: '0 4px 20px rgba(80,200,120,0.4)', pointerEvents: ctaPointer }}
          className="flex items-center gap-1.5 rounded-full bg-[#50C878] text-[#1C3A27] font-bold text-sm px-5 py-2.5 shadow-lg"
        >
          {T.hero_cta} <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>
      </motion.div>
    </div>
  );
}
