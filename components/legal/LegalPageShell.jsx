'use client';

// Adapted from the Base44 app's src/components/LegalPageShell.jsx (app
// "langsi", 69080f3002a1f3579a154b61) — read-only reference, nothing there
// was changed. Real differences, both required by this being a static
// multi-page Next.js site rather than a client-only SPA route:
//   - react-router-dom <Link> → next/link <Link>; the back-link and footer
//     nav (impressum/datenschutz/agb/back-to-home) all point at real static
//     routes on THIS domain now, so they stay plain relative Next links.
//     /delete-account is the one footer link that stays on the app (see
//     DELETE_ACCOUNT_URL below) — that page is dynamic (Base44 function +
//     Turnstile captcha + email-token confirmation), not migrated here.
//   - useLegalLang() must be SSR/static-export-safe: reading localStorage or
//     navigator.language during the build-time (Node) render would throw.
//     The hook now always initializes to 'en' (matching every other
//     language-detection mechanism already in this repo, e.g.
//     LanguageRedirect.jsx) and only reads localStorage/navigator client-side
//     inside a useEffect after mount — same "no server-side redirect/switch"
//     principle used sitewide.
//   - Visual chrome (background, header/footer bar) is restyled to this
//     site's own solid dark-green look (#1a251d, the same tone Hero/Video/
//     FinalCTA already use) instead of the app's own gradient shell, so the
//     transition from the rest of langsi.app feels like one site. Accent
//     color (#50C878) and Poppins headings are unchanged — already shared
//     between both.
import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { LEGAL_LANGUAGES } from '../../content/legal/legalI18n';

const LOGO_URL =
  'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69080f3002a1f3579a154b61/13ecfd47d_langsi_logo_leitner1.png';

// The one legal-adjacent link that intentionally stays on the app — see
// file header comment.
export const DELETE_ACCOUNT_URL = 'https://app.langsi.app/delete-account';

/** Detects a reasonable default language from the browser. Client-only. */
export function detectLang() {
  const nav = navigator.language?.split('-')[0] ?? 'en';
  return LEGAL_LANGUAGES.find((l) => l.code === nav)?.code ?? 'en';
}

/**
 * Hook that persists the selected legal-page language in localStorage.
 * Always starts at 'en' (the only value safe to render during the
 * static-export build) and corrects itself client-side after mount.
 */
export function useLegalLang() {
  const [lang, setLangState] = React.useState('en');

  React.useEffect(() => {
    const stored = localStorage.getItem('langsi_legal_lang');
    setLangState(stored ?? detectLang());
  }, []);

  const setLang = (code) => {
    localStorage.setItem('langsi_legal_lang', code);
    setLangState(code);
  };
  return [lang, setLang];
}

/**
 * Shared shell for all legal pages.
 * Props:
 *   lang, setLang  – from useLegalLang()
 *   labels         – { back, impressum, datenschutz, agb, deleteAccount, backToHome } per-language label objects (legalI18n.shared)
 *   children       – page body
 */
export default function LegalPageShell({ lang, setLang, labels: s, children }) {
  return (
    <div className="min-h-screen" style={{ background: '#1a251d' }}>
      {/* Header */}
      <div
        className="sticky top-0 z-10 backdrop-blur-sm"
        style={{ background: 'rgba(26,37,29,0.9)', borderBottom: '1px solid rgba(80,200,120,0.2)' }}
      >
        <div className="max-w-4xl mx-auto px-5 py-4 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">{s.back[lang] ?? s.back.en}</span>
          </Link>

          {/* Language switcher */}
          <div className="flex items-center gap-1 ml-4">
            {LEGAL_LANGUAGES.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => setLang(l.code)}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  lang === l.code ? 'bg-[#50C878] text-[#1C3A27]' : 'text-white/40 hover:text-white/70'
                }`}
              >
                {l.code.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <img src={LOGO_URL} alt="Langsi" className="h-7 w-7 object-contain rounded" />
            <span className="font-bold text-sm text-white" style={{ fontFamily: 'Poppins' }}>
              Langsi
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-5 py-16">
        {children}

        {/* Footer links */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-6 text-sm text-white/40">
          <Link href="/impressum/" className="hover:text-white/70 transition-colors">
            {s.impressum[lang] ?? s.impressum.en}
          </Link>
          <Link href="/datenschutz/" className="hover:text-white/70 transition-colors">
            {s.datenschutz[lang] ?? s.datenschutz.en}
          </Link>
          <Link href="/agb/" className="hover:text-white/70 transition-colors">
            {s.agb[lang] ?? s.agb.en}
          </Link>
          <a href={DELETE_ACCOUNT_URL} className="hover:text-white/70 transition-colors">
            {s.deleteAccount[lang] ?? s.deleteAccount.en}
          </a>
          <Link href="/" className="hover:text-white/70 transition-colors">
            {s.backToHome[lang] ?? s.backToHome.en}
          </Link>
        </div>
      </div>
    </div>
  );
}
