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

// English default, independent of detected visitor language — the redirect
// to a locale-specific /{code}/th/ variant happens client-side only (see
// LanguageRedirect below), so '/' itself always serves this exact English
// title/description to crawlers.
export const metadata = {
  title: 'Vocabulary App · Langsi',
  description: 'Learn any language through real sentences, not flashcard lists. Free to start.',
  alternates: {
    canonical: '/',
    languages: {
      'x-default': '/',
    },
  },
};

// Reuses en-th.json for everything (English is the root's identity, and the
// interactive demo is explicitly specified to keep showing the real en->th
// demo data) EXCEPT the fields that literally name Thai as a fixed target —
// hero_badge, hero_cta (read by both Hero and AdsScrollytelling's own CTA
// buttons) and final_cta_h2 — since '/' has no fixed target language.
// video_title_root is root-only (the 11 pair pages never read it) — passed
// straight to Video's titleOverride prop below rather than stored in any
// committed template.json, since it has no meaning on the actual /en/th/ page.
const content = {
  ...enThContent,
  hero_badge: 'Multiple Languages Available',
  hero_cta: 'Start for free',
  final_cta_h2: 'Truly understand every new word.',
  video_title_root: 'Our philosophy',
};

export default function RootPage() {
  return (
    <>
      <LanguageRedirect />
      <Header content={content} showFaq={false} />
      <Hero content={content} />
      <AdsScrollytelling content={content} />
      <Progress content={content} />
      <Video content={content} titleOverride={content.video_title_root} />
      <RealPricing content={content} />
      <FinalCTA content={content} />
      <Footer content={content} />
    </>
  );
}
