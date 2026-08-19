import content from '../content/pairs/en-th.json';
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
  description: 'Learn vocabulary in context with Langsi — real sentences, audio, and word-for-word analysis instead of flat flashcard lists.',
  alternates: {
    canonical: '/',
    languages: {
      'x-default': '/',
    },
  },
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
