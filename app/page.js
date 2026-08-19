import enThContent from '../content/pairs/en-th.json';
import Header from '../components/pair-page/Header';
import Hero from '../components/pair-page/Hero';
import Problem from '../components/pair-page/Problem';
import MicroDemo from '../components/pair-page/MicroDemo';
import MethodExplanation from '../components/pair-page/MethodExplanation';
import Progress from '../components/pair-page/Progress';
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
// interactive demo in section 4 is explicitly specified to keep showing the
// real en->th demo data) EXCEPT the three fields that literally name Thai as
// a fixed target — hero_badge, hero_cta (read by both Hero and MicroDemo's
// own CTA button) and final_cta_h2 — since '/' has no fixed target language.
const content = {
  ...enThContent,
  hero_badge: 'Multiple Languages Available',
  hero_cta: 'Start for free',
  final_cta_h2: 'Truly understand every new word.',
};

export default function RootPage() {
  return (
    <>
      <LanguageRedirect />
      <Header content={content} />
      <Hero content={content} />
      <Problem content={content} />
      <MicroDemo content={content} />
      <MethodExplanation content={content} />
      <Progress content={content} />
      <RealPricing content={content} />
      <FinalCTA content={content} />
      <Footer content={content} />
    </>
  );
}
