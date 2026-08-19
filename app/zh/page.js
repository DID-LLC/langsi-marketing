import pairContent from '../../content/pairs/zh-th.json';
import Header from '../../components/pair-page/Header';
import Hero from '../../components/pair-page/Hero';
import AdsScrollytelling from '../../components/pair-page/AdsScrollytelling';
import Progress from '../../components/pair-page/Progress';
import Video from '../../components/pair-page/Video';
import RealPricing from '../../components/pair-page/RealPricing';
import FinalCTA from '../../components/pair-page/FinalCTA';
import Footer from '../../components/pair-page/Footer';
import SoftwareApplicationSchema from '../../components/pair-page/SoftwareApplicationSchema';
import FAQPageSchema from '../../components/pair-page/FAQPageSchema';
import CookieConsent from '../../components/pair-page/CookieConsent';
import AnalyticsTracker from '../../components/pair-page/AnalyticsTracker';
import FAQ from '../../components/pair-page/FAQ';

// Same hreflang set on every /{source}/ hub page and on root (see
// app/page.js) — kept as a literal copy rather than a shared import so each
// route stays a plain, independently readable static-export page.
const HREFLANG_LANGUAGES = {
  en: '/',
  de: '/de/',
  es: '/es/',
  fr: '/fr/',
  it: '/it/',
  ru: '/ru/',
  zh: '/zh/',
  hi: '/hi/',
  ur: '/ur/',
  ar: '/ar/',
  ja: '/ja/',
  'x-default': '/',
};

export const metadata = {
  title: pairContent.hub.title,
  description: pairContent.hub.meta_description,
  alternates: {
    canonical: '/zh/',
    languages: HREFLANG_LANGUAGES,
  },
};

// Generic, non-Thai-specific hub page for this source language — same
// component tree as root (app/page.js), reusing this language's own
// content/pairs/zh-th.json for everything EXCEPT the fields that name
// Thai as a fixed target: hero_h1_1/hero_h1_2/hero_sub come from hub.h1/
// hub.sub instead (hero_h1_2 stays '' — Hero.jsx renders a single white H1
// line when it's empty), hero_badge/hero_cta/final_cta_h2 are overridden
// with the generic hub.badge/hub.final_cta_h2 and the language's own
// already-generic final_cta ("start for free", no "{lang} → Thai" prefix).
// The interactive AdsScrollytelling demo still uses this language's real
// Thai-target demo data (content.demo) — that's unchanged, matching the
// task spec: the demo itself stays a real, working example of the app, only
// the surrounding page copy loses its Thai-specific framing.
const content = {
  ...pairContent,
  hero_h1_1: pairContent.hub.h1,
  hero_h1_2: '',
  hero_sub: pairContent.hub.sub,
  hero_badge: pairContent.hub.badge,
  hero_cta: pairContent.final_cta,
  final_cta_h2: pairContent.hub.final_cta_h2,
  pair_faq: pairContent.hub_faq,
};

export default function Page() {
  return (
    <>
      <SoftwareApplicationSchema content={content} />
      <FAQPageSchema content={content} />
      <CookieConsent content={content} />
      <AnalyticsTracker pageVariant="hub" />
      <Header content={content} showFaq hubLinks />
      <Hero content={content} />
      <AdsScrollytelling content={content} />
      <Progress content={content} />
      <Video content={content} titleOverride={content.hub.video_title} />
      <RealPricing content={content} />
      <FAQ content={content} />
      <FinalCTA content={content} />
      <Footer content={content} />
    </>
  );
}
