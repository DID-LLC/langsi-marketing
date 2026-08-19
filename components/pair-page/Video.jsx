'use client';

import { motion } from 'framer-motion';
import { fadeUp } from './fadeUp';

// content.video.source_lang_name comes from Language.english_name (always
// English, e.g. "German") — not suitable to display directly on a non-English
// page. This maps base_language -> the native name AND the translated
// headline template together, so both stay consistent per language.
const VIDEO_HEADLINE = {
  de: (native) => `Kurze ${native} → Thai-Demonstration`,
  en: (native) => `A short ${native} → Thai demo`,
  es: (native) => `Una breve demostración de ${native} → tailandés`,
  fr: (native) => `Une courte démonstration ${native} → thaï`,
  it: (native) => `Una breve dimostrazione ${native} → thailandese`,
  ru: (native) => `Короткая демонстрация ${native} → тайский`,
  zh: (native) => `简短的${native} → 泰语演示`,
  hi: (native) => `एक संक्षिप्त ${native} → थाई डेमो`,
  ur: (native) => `ایک مختصر ${native} → تھائی ڈیمو`,
  ar: (native) => `عرض قصير ${native} → التايلاندية`,
  ja: (native) => `${native} → タイ語の短いデモ`,
};

const NATIVE_NAME = {
  de: 'Deutsch', en: 'English', es: 'Español', fr: 'Français', it: 'Italiano',
  ru: 'Русский', zh: '中文', hi: 'हिन्दी', ur: 'اردو', ar: 'العربية', ja: '日本語',
};

// titleOverride: used only by the root page ('/'), which has no fixed
// source/target pair to build the usual "{source} → Thai demo" headline
// from — passes its own fixed "Our philosophy" title instead. The 11
// pair pages never pass this, so they keep their existing path-specific
// headline unchanged.
export default function Video({ content, titleOverride }) {
  const { url } = content.video;

  if (!url) return null;

  const lang = content.base_language;
  const headline = titleOverride || (VIDEO_HEADLINE[lang] || VIDEO_HEADLINE.en)(NATIVE_NAME[lang] || lang);

  return (
    <section data-track-section="video" className="py-24 px-5" style={{ background: '#1a251d' }}>
      <div className="max-w-5xl mx-auto">
        <motion.h2
          {...fadeUp(0)}
          className="text-2xl font-bold text-white text-center mb-12"
          style={{ fontFamily: 'Poppins' }}
        >
          {headline}
        </motion.h2>
        <motion.div {...fadeUp(0.1)} className="rounded-2xl overflow-hidden border border-white/8">
          <video src={url} controls preload="metadata" className="w-full h-auto" />
        </motion.div>
      </div>
    </section>
  );
}
