'use client';

// Page-level analytics wiring, mounted once per page (root/hub/pair). Four
// concerns, all consent-gated (no-ops until gtag is loaded — see lib/ga4.js):
//   1. A single `page_view` GA4 event.
//   2. `landing_page_viewed`, once per page load, tagged with pageVariant.
//   3. `landing_section_viewed` via IntersectionObserver over every
//      [data-track-section] element on the page, once each.
//   4. `landing_scroll_depth` at 25/50/75/100% of document scroll, once each.
//
// Detection is fully decoupled from reporting: most visitors scroll around
// and read *before* the cookie banner's "Accept all" is clicked, so
// sections may already be scrolled past — and no longer intersecting — by
// the time gtag actually loads. The IntersectionObserver and scroll
// listener below always record what happened (state.intersectedSections,
// state.maxScrollPercent), completely independent of consent state; flush()
// is the only thing that's consent-gated, and it's called after every
// detection AND on langsi_ga_ready, so anything already true when consent
// finally arrives gets reported immediately instead of being lost (ported
// in spirit from the app repo's NavigationTracker.jsx page_view catch-up,
// extended here to every event this component owns).
//
// checkInitialVisibility() runs its own getBoundingClientRect() pass right
// after observe() rather than relying solely on the browser firing
// IntersectionObserver's initial synchronous callback for already-visible
// targets — most browsers do fire it immediately per spec, but this is
// cheap insurance against any environment where that initial callback is
// delayed until the next real scroll/resize.
import { useEffect, useRef } from 'react';
import { trackLandingPageViewed, trackLandingSectionViewed, trackLandingScrollDepth } from '../../lib/ga4';

const SCROLL_THRESHOLDS = [25, 50, 75, 100];

function currentScrollPercent() {
  const doc = document.documentElement;
  const scrollable = doc.scrollHeight - window.innerHeight;
  if (scrollable <= 0) return 100;
  return (window.scrollY / scrollable) * 100;
}

function isElementVisible(el) {
  const rect = el.getBoundingClientRect();
  if (rect.height <= 0) return false;
  const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
  return visibleHeight >= rect.height * 0.5;
}

export default function AnalyticsTracker({ pageVariant }) {
  const stateRef = useRef({
    pageViewSent: false,
    landingViewedSent: false,
    intersectedSections: new Set(), // detected, independent of consent
    reportedSections: new Set(), // actually sent to GA
    maxScrollPercent: 0, // detected, independent of consent
    reportedThresholds: new Set(), // actually sent to GA
  });

  useEffect(() => {
    const state = stateRef.current;

    function flush() {
      if (typeof window.gtag !== 'function') return;

      if (!state.pageViewSent) {
        window.gtag('event', 'page_view', {
          page_title: document.title,
          page_location: window.location.href,
          page_path: window.location.pathname,
        });
        state.pageViewSent = true;
      }

      if (!state.landingViewedSent) {
        trackLandingPageViewed({ pageVariant });
        state.landingViewedSent = true;
      }

      state.intersectedSections.forEach((name) => {
        if (state.reportedSections.has(name)) return;
        state.reportedSections.add(name);
        trackLandingSectionViewed({ sectionName: name });
      });

      for (const threshold of SCROLL_THRESHOLDS) {
        if (state.maxScrollPercent >= threshold && !state.reportedThresholds.has(threshold)) {
          state.reportedThresholds.add(threshold);
          trackLandingScrollDepth({ depthPercent: threshold });
        }
      }
    }

    const sectionEls = [...document.querySelectorAll('[data-track-section]')];

    function markSection(el) {
      const name = el.getAttribute('data-track-section');
      if (state.intersectedSections.has(name)) return;
      state.intersectedSections.add(name);
      flush();
    }

    flush();
    window.addEventListener('langsi_ga_ready', flush);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) markSection(entry.target);
        }
      },
      { threshold: 0.5 }
    );
    sectionEls.forEach((el) => observer.observe(el));
    // Explicit initial pass — see file header comment.
    sectionEls.forEach((el) => {
      if (isElementVisible(el)) markSection(el);
    });

    function handleScroll() {
      const percent = currentScrollPercent();
      if (percent > state.maxScrollPercent) {
        state.maxScrollPercent = percent;
      }
      flush();
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Same reasoning as the IntersectionObserver initial pass — make sure
    // an already-scrolled-past-the-fold reload (e.g. hash navigation, or a
    // resumed scroll position) doesn't wait for the next scroll event.
    handleScroll();

    return () => {
      window.removeEventListener('langsi_ga_ready', flush);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [pageVariant]);

  return null;
}
