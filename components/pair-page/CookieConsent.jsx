'use client';

// Ported from the app repo's src/components/CookieConsent.jsx — same
// structure/style (banner chrome, expandable details, Accept all / Necessary
// only). Real differences, both driven by this being a static multi-page
// site rather than a single-locale SPA:
//   - No detectBannerLang()/legalI18n browser-language detection: each page
//     here is already fully localized, so the banner just reads
//     content.cookie_consent (this page's own language) directly — no lang
//     state, no supported-locale allowlist.
//   - The privacy-policy link points at this site's own /datenschutz/ page
//     (migrated here — see components/legal/) instead of app.langsi.app.
//     /privacy-settings stays on the app (that page is dynamic — GA4
//     consent revocation — and deliberately wasn't migrated).
// localStorage key/version and loadGoogleAnalytics() itself are unchanged —
// langsi.app and app.langsi.app are different origins so there's no actual
// storage sharing, but keeping the same key name keeps the two consent
// systems conceptually (not literally) in sync.

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { loadGoogleAnalytics } from '../../lib/ga4';

const CONSENT_KEY = 'langsi_cookie_consent';
export const CONSENT_VERSION = '1'; // Bump when policy changes to re-prompt

export function getCookieConsent() {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setCookieConsent(analytics) {
  const consent = {
    version: CONSENT_VERSION,
    analytics,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  window.dispatchEvent(new CustomEvent('langsi_consent_updated', { detail: consent }));
  return consent;
}

export function hasValidConsent() {
  const c = getCookieConsent();
  return c && c.version === CONSENT_VERSION;
}

export default function CookieConsent({ content }) {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const s = content.cookie_consent;

  useEffect(() => {
    if (!hasValidConsent()) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    } else if (getCookieConsent()?.analytics) {
      // Consent was already granted on an earlier visit — load GA right away.
      loadGoogleAnalytics();
    }
  }, []);

  const acceptAll = () => {
    setCookieConsent(true);
    setVisible(false);
    loadGoogleAnalytics();
  };

  const rejectOptional = () => {
    setCookieConsent(false);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 120, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
        role="dialog"
        aria-label={s.title}
      >
        <div className="max-w-3xl mx-auto bg-[#1C3A27] border border-[#50C878]/30 rounded-2xl shadow-2xl p-5 md:p-6">
          <div className="flex items-start gap-3 mb-4">
            <Cookie className="w-6 h-6 text-[#50C878] shrink-0 mt-0.5" />
            <div className="flex-1">
              <h2 className="text-white font-bold text-base mb-1" style={{ fontFamily: 'Poppins' }}>
                {s.title}
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">{s.intro}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-1 text-xs text-[#50C878]/70 hover:text-[#50C878] mb-4 transition-colors"
          >
            {showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            {showDetails ? s.hide_details : s.show_details}
          </button>

          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mb-4"
              >
                <div className="space-y-3 text-xs text-white/60 bg-white/5 rounded-xl p-4">
                  <div>
                    <p className="text-white font-semibold mb-1">{s.necessary_title}</p>
                    <p>{s.necessary_text}</p>
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-1">{s.analytics_title}</p>
                    <p>{s.analytics_text}</p>
                  </div>
                </div>
                <p className="text-xs text-white/40 mt-2">
                  {s.more_info}{' '}
                  <a href="/datenschutz/" className="text-[#50C878] hover:underline">
                    {s.privacy_policy}
                  </a>
                  .
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={rejectOptional}
              className="flex-1 py-2.5 px-4 rounded-xl border border-white/20 text-white/60 hover:text-white hover:border-white/40 text-sm transition-colors"
            >
              {s.necessary_only}
            </button>
            <button
              type="button"
              onClick={acceptAll}
              className="flex-1 py-2.5 px-4 rounded-xl bg-[#50C878] text-[#1C3A27] font-bold text-sm hover:bg-[#3eb865] transition-colors flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" />
              {s.accept_all}
            </button>
          </div>

          <p className="text-xs text-white/30 mt-3 text-center">
            {s.change_anytime}{' '}
            <a href="https://app.langsi.app/privacy-settings" className="text-[#50C878]/60 hover:text-[#50C878]">
              {s.privacy_settings}
            </a>
            {s.change_anytime2}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
