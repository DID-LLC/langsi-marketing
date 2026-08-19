/**
 * GA4 loading + event tracking for the marketing site.
 *
 * Ported from the app repo's src/lib/ga4.js (trackEvent, trackViewStep,
 * loadGoogleAnalytics from src/components/CookieConsent.jsx) and
 * src/components/analytics.jsx (the landing_* helpers) — same Measurement
 * ID, same consent-gated loading, same event names/params, so GA4 keeps
 * seeing one consistent event vocabulary across app.langsi.app and
 * langsi.app. trackLandingAuthenticatedRedirect is NOT ported: this site
 * has no authenticated state to redirect from. trackFaqExpanded,
 * trackLanguageSwitcherUsed and trackAutoRedirectFired are new — this
 * static site has interactions (collapsible FAQ, language switcher,
 * client-side auto-redirect) the original single-page app doesn't.
 */

const GA_ID = 'G-Q961MH6SWB';

function isGtagAvailable() {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
}

/** Call this once consent is granted (from CookieConsent's "Accept all"). */
export function loadGoogleAnalytics() {
  if (window._gaLoaded) return;
  window._gaLoaded = true;
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { send_page_view: false, anonymize_ip: true });
  // Lets any already-mounted tracker (page_view catch-up, deferred events)
  // know gtag is now callable — see AnalyticsTracker.jsx.
  window.dispatchEvent(new Event('langsi_ga_ready'));
}

/**
 * Push a GA4 event. No-op (never throws, never blocks the caller) if gtag
 * isn't loaded yet — i.e. before consent, or "Necessary only" was chosen.
 */
export function trackEvent(eventName, params = {}) {
  if (!isGtagAvailable()) return;
  try {
    window.gtag('event', eventName, params);
  } catch (e) {
    console.warn('[GA4] trackEvent failed:', e);
  }
}

/**
 * Fires once per scrollytelling step reached (view_step_1 … view_step_6).
 * Dedup (once per step per page load) is the caller's responsibility — see
 * AdsScrollytelling.jsx.
 */
export function trackViewStep(stepNumber, options) {
  const { target_lang, level } = options || {};
  trackEvent(`view_step_${stepNumber}`, {
    target_lang: target_lang || null,
    level: level || null,
  });
}

// ─── Landing-page event helpers (ported from analytics.jsx) ───────────────

function safeString(value, fallback = 'unknown') {
  if (value === null || value === undefined || value === '') return fallback;
  return String(value);
}

export function trackLandingPageViewed({ userStatus = 'anonymous', pageVariant = 'default' } = {}) {
  trackEvent('landing_page_viewed', {
    user_status: safeString(userStatus),
    page_variant: safeString(pageVariant),
  });
}

export function trackLandingCTAClicked({ ctaLocation = 'unknown', ctaLabel = 'unknown', userStatus = 'anonymous' } = {}) {
  trackEvent('landing_cta_clicked', {
    cta_location: safeString(ctaLocation),
    cta_label: safeString(ctaLabel),
    user_status: safeString(userStatus),
  });
}

export function trackLandingSectionViewed({ sectionName = 'unknown', userStatus = 'anonymous' } = {}) {
  trackEvent('landing_section_viewed', {
    section_name: safeString(sectionName),
    user_status: safeString(userStatus),
  });
}

export function trackLandingPricingPlanClicked({ planId = 'unknown', ctaLocation = 'pricing', userStatus = 'anonymous' } = {}) {
  trackEvent('landing_pricing_plan_clicked', {
    plan_id: safeString(planId),
    cta_location: safeString(ctaLocation),
    user_status: safeString(userStatus),
  });
}

export function trackLandingScrollDepth({ depthPercent = 0, userStatus = 'anonymous' } = {}) {
  trackEvent('landing_scroll_depth', {
    depth_percent: Number.isFinite(Number(depthPercent)) ? Number(depthPercent) : 0,
    user_status: safeString(userStatus),
  });
}

// ─── New, marketing-site-only event helpers ────────────────────────────────

/** Fires when the FAQ "show all questions" button expands the full list. */
export function trackFaqExpanded({ location = 'faq_section' } = {}) {
  trackEvent('faq_expanded', { location: safeString(location) });
}

/** Fires when a visitor picks a different source language from the header dropdown. */
export function trackLanguageSwitcherUsed({ fromLanguage, toLanguage, context = 'unknown' } = {}) {
  trackEvent('language_switcher_used', {
    from_language: safeString(fromLanguage),
    to_language: safeString(toLanguage),
    context: safeString(context),
  });
}

/** Fires immediately before LanguageRedirect.jsx replaces the URL. */
export function trackAutoRedirectFired({ fromPath, toPath } = {}) {
  trackEvent('auto_redirect_fired', {
    from_path: safeString(fromPath),
    to_path: safeString(toPath),
  });
}
