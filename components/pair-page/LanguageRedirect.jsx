'use client';

import { useEffect } from 'react';
import { trackAutoRedirectFired } from '../../lib/ga4';

// Client-side only (no server/middleware redirect) so '/' still responds
// with the crawlable English default content directly — search engines and
// anyone landing on '/' without JS never get redirected. Checks
// navigator.languages in the browser's own preference order; the first
// entry that matches one of the 11 supported source-language codes decides:
// redirect if it's not 'en', stay on '/' if it is (or if nothing matches).
const SUPPORTED_SOURCE_LANGS = ['de', 'en', 'es', 'fr', 'it', 'ru', 'zh', 'hi', 'ur', 'ar', 'ja'];

export default function LanguageRedirect() {
  useEffect(() => {
    const langs = window.navigator.languages?.length ? window.navigator.languages : [window.navigator.language || 'en'];
    for (const raw of langs) {
      const code = String(raw).split('-')[0].toLowerCase();
      if (SUPPORTED_SOURCE_LANGS.includes(code)) {
        if (code !== 'en') {
          const toPath = `/${code}/th/`;
          trackAutoRedirectFired({ fromPath: window.location.pathname, toPath });
          window.location.replace(toPath);
        }
        return;
      }
    }
  }, []);

  return null;
}
