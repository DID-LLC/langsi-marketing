'use client';

// Ported from the app repo's src/components/landing/LandingAdsScrollytelling.jsx
// as closely as possible: same pinned-scroll mechanism (position: sticky,
// 4×100vh container, framer-motion opacity crossfade over scroll progress),
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

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import AdsDemoStep2Flashcard from './AdsDemoStep2Flashcard';
import AdsDemoStep3Example from './AdsDemoStep3Example';
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

const STEP2_TO_STEP3_PROGRESS = 0.5;

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

  const containerRef = useRef(null);
  const step3Ref = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const stepCount = 4;

  const step1Opacity = useTransform(scrollYProgress, [0, 0.2, 0.25], [1, 1, 0]);
  const step2Opacity = useTransform(scrollYProgress, [0.2, 0.25, 0.45, 0.5], [0, 1, 1, 0]);
  const step3Opacity = useTransform(scrollYProgress, [0.45, 0.5, 0.7, 0.75], [0, 1, 1, 0]);
  const step4Opacity = useTransform(scrollYProgress, [0.7, 0.75, 1], [0, 1, 1]);

  const step1Pointer = useTransform(step1Opacity, (v) => (v > 0.5 ? 'auto' : 'none'));
  const step2Pointer = useTransform(step2Opacity, (v) => (v > 0.5 ? 'auto' : 'none'));
  const step3Pointer = useTransform(step3Opacity, (v) => (v > 0.5 ? 'auto' : 'none'));
  const step4Pointer = useTransform(step4Opacity, (v) => (v > 0.5 ? 'auto' : 'none'));

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
          onAnswer={() => {
            const el = step3Ref.current;
            if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY);
          }}
        />
        <div ref={step3Ref}>
          <AdsDemoStep3Example T={T} vocabulary={vocabulary} exampleSentences={exampleSentences} ttsLocale={TTS_LOCALE} />
        </div>
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
            onAnswer={() => scrollWindowToContainerProgress(containerRef, STEP2_TO_STEP3_PROGRESS)}
          />
        </motion.div>

        <motion.div style={{ opacity: step3Opacity, pointerEvents: step3Pointer }} className="absolute inset-0 flex items-center justify-center px-5">
          <AdsDemoStep3Example T={T} vocabulary={vocabulary} exampleSentences={exampleSentences} ttsLocale={TTS_LOCALE} />
        </motion.div>

        <motion.div style={{ opacity: step4Opacity, pointerEvents: step4Pointer }} className="absolute inset-0 flex items-center justify-center px-5">
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
