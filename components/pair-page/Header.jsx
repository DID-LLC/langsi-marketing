'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

const LOGO_URL =
  'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69080f3002a1f3579a154b61/13ecfd47d_langsi_logo_leitner1.png';

// Flags/native names from the app repo's canonical src/components/config/
// languages.jsx registry — the 11 source languages this marketing site
// actually has a /{code}/th/ page for.
const SOURCE_LANGS = [
  { code: 'de', flag: '🇩🇪', name: 'Deutsch' },
  { code: 'en', flag: '🇬🇧', name: 'English' },
  { code: 'es', flag: '🇪🇸', name: 'Español' },
  { code: 'fr', flag: '🇫🇷', name: 'Français' },
  { code: 'it', flag: '🇮🇹', name: 'Italiano' },
  { code: 'ru', flag: '🇷🇺', name: 'Русский' },
  { code: 'zh', flag: '🇨🇳', name: '简体中文' },
  { code: 'hi', flag: '🇮🇳', name: 'हिन्दी' },
  { code: 'ur', flag: '🇵🇰', name: 'اردو' },
  { code: 'ar', flag: '🇸🇦', name: 'العربية' },
  { code: 'ja', flag: '🇯🇵', name: '日本語' },
];

// Styled after the app repo's src/components/landing/LandingAdsHeader.jsx
// target-language picker (same dropdown chrome: #1C3A27 panel, #50C878/20
// border, active-row highlight) — pure styling reference, no live data need:
// all 11 target pages already exist statically, so each entry is a plain
// next/link to its own /{code}/th/ route.
export default function Header({ content }) {
  const [langOpen, setLangOpen] = useState(false);
  const currentLang = SOURCE_LANGS.find((l) => l.code === content.base_language);

  return (
    <header style={{ background: '#1a251d', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <nav className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <img src={LOGO_URL} alt="Langsi" className="w-8 h-8 rounded-lg" />
            <span className="text-white font-bold text-lg" style={{ fontFamily: 'Poppins' }}>
              Langsi
            </span>
          </div>

          <div className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              aria-expanded={langOpen}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white text-sm font-semibold transition-colors"
            >
              <span className="text-base leading-none">{currentLang?.flag || '🌐'}</span>
              <span className="hidden sm:inline truncate max-w-[6rem]">{currentLang?.name || ''}</span>
              <ChevronDown className="w-3.5 h-3.5 flex-shrink-0 opacity-70" />
            </button>

            {langOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                <div className="absolute top-11 left-0 z-50 w-52 max-h-80 overflow-y-auto rounded-2xl border border-[#50C878]/20 bg-[#1C3A27] shadow-2xl">
                  {SOURCE_LANGS.map((lang) => (
                    <Link
                      key={lang.code}
                      href={`/${lang.code}/th/`}
                      onClick={() => setLangOpen(false)}
                      className={`flex items-center gap-2 px-4 py-2.5 text-sm transition-colors border-b border-white/5 last:border-b-0 ${
                        lang.code === content.base_language ? 'text-[#50C878] bg-[#50C878]/10' : 'text-white hover:bg-[#50C878]/10'
                      }`}
                    >
                      <span className="text-base leading-none">{lang.flag}</span>
                      <span className="truncate">{lang.name}</span>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-5">
          <a href="#method" className="hidden md:inline text-white/60 hover:text-white text-sm transition-colors">
            {content.method_tag}
          </a>
          <a href="#pricing" className="hidden md:inline text-white/60 hover:text-white text-sm transition-colors">
            {content.pricing.tag}
          </a>
          <a href="#faq" className="hidden md:inline text-white/60 hover:text-white text-sm transition-colors">
            FAQ
          </a>
          <a href="https://app.langsi.app/login" className="text-white/60 hover:text-white text-sm transition-colors">
            {content.nav_login}
          </a>
          <a
            href={content.app_deep_link}
            className="text-sm font-bold rounded-xl px-4 py-2 transition-colors"
            style={{ background: '#50C878', color: '#1C3A27', fontFamily: 'Poppins' }}
          >
            {content.nav_cta}
          </a>
        </div>
      </nav>
    </header>
  );
}
