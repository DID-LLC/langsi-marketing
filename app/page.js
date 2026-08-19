import enThContent from '../content/pairs/en-th.json';
import Header from '../components/pair-page/Header';
import Hero from '../components/pair-page/Hero';
import AdsScrollytelling from '../components/pair-page/AdsScrollytelling';
import Progress from '../components/pair-page/Progress';
import Video from '../components/pair-page/Video';
import RealPricing from '../components/pair-page/RealPricing';
import FinalCTA from '../components/pair-page/FinalCTA';
import Footer from '../components/pair-page/Footer';
import LanguageRedirect from '../components/pair-page/LanguageRedirect';
import SoftwareApplicationSchema from '../components/pair-page/SoftwareApplicationSchema';
import FAQPageSchema from '../components/pair-page/FAQPageSchema';
import CookieConsent from '../components/pair-page/CookieConsent';
import AnalyticsTracker from '../components/pair-page/AnalyticsTracker';
import FAQ from '../components/pair-page/FAQ';

// Same hreflang set as every /{source}/ hub page (see app/*/page.js) — '/'
// is the English entry point, so it's self-canonical here and en's own
// hreflang entry points back at it too.
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

// English default, independent of detected visitor language — the redirect
// to a locale-specific /{code}/th/ variant happens client-side only (see
// LanguageRedirect below), so '/' itself always serves this exact English
// title/description to crawlers.
export const metadata = {
  title: 'Vocabulary App · Langsi',
  description:
    'Langsi is a vocabulary app that teaches real words in real sentences — not flashcards. Learn any language in context. Free to start.',
  alternates: {
    canonical: '/',
    languages: HREFLANG_LANGUAGES,
  },
};

// Reuses en-th.json for everything (English is the root's identity, and the
// interactive demo is explicitly specified to keep showing the real en->th
// demo data) EXCEPT the fields that literally name Thai as a fixed target —
// hero_h1_1/hero_h1_2/hero_sub, hero_badge, hero_cta (read by both Hero and
// AdsScrollytelling's own CTA buttons) and final_cta_h2 — since '/' has no
// fixed target language. hero_h1_2 is deliberately '' (Hero.jsx renders the
// H1 as a single white line when it's empty, skipping the <br/> + green
// second line used on the Thai-specific pair pages).
// video_title_root is root-only (the 11 pair pages never read it) — passed
// straight to Video's titleOverride prop below rather than stored in any
// committed template.json, since it has no meaning on the actual /en/th/ page.
const content = {
  ...enThContent,
  hero_h1_1: 'Understand Vocabulary. Actually Use It.',
  hero_h1_2: '',
  hero_sub:
    "Langsi is a vocabulary app that teaches you in context, not with flashcards: real sentences instead of isolated words, so you learn any language the way it's actually spoken. Unlike Anki, you don't have to build your own learning system — and unlike Duolingo, there are no games, leagues, or endless learning paths to distract you. You focus on what matters: understanding vocabulary, using it in context, and actually retaining it long-term.",
  hero_badge: 'Multiple Languages Available',
  hero_cta: 'Start for free',
  final_cta_h2: 'Truly understand every new word.',
  video_title_root: 'Our philosophy',
  pair_faq: enThContent.hub_faq,
};

export default function RootPage() {
  return (
    <>
      <SoftwareApplicationSchema content={content} />
      <FAQPageSchema content={content} />
      <CookieConsent content={content} />
      <AnalyticsTracker pageVariant="root" />
      <LanguageRedirect />
      <Header content={content} showFaq hubLinks />
      <Hero content={content} />
      <AdsScrollytelling content={content} />
      <Progress content={content} />
      <Video content={content} titleOverride={content.video_title_root} />
      <RealPricing content={content} />
      <FAQ content={content} />
      <FinalCTA content={content} />
      <Footer content={content} />
    </>
  );
}
