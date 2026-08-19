import content from '../../../content/pairs/en-th.json';
import Header from '../../../components/pair-page/Header';
import Hero from '../../../components/pair-page/Hero';
import AdsScrollytelling from '../../../components/pair-page/AdsScrollytelling';
import Progress from '../../../components/pair-page/Progress';
import DepthContent from '../../../components/pair-page/DepthContent';
import Video from '../../../components/pair-page/Video';
import RealPricing from '../../../components/pair-page/RealPricing';
import FAQ from '../../../components/pair-page/FAQ';
import FinalCTA from '../../../components/pair-page/FinalCTA';
import Footer from '../../../components/pair-page/Footer';
import SoftwareApplicationSchema from '../../../components/pair-page/SoftwareApplicationSchema';
import FAQPageSchema from '../../../components/pair-page/FAQPageSchema';
import CookieConsent from '../../../components/pair-page/CookieConsent';
import AnalyticsTracker from '../../../components/pair-page/AnalyticsTracker';

// Title/description are hand-tuned for this page specifically (not derived
// from hero_h1_1/hero_h1_2/hero_sub like the other 10 pair pages) — this is
// the deep-dive template page for the /en/th/ pair, meant to be carried over
// to the other 10 once proven out.
export const metadata = {
  title: 'Thai Vocabulary App — Learn Real Thai Words in Context | Langsi',
  description:
    "Learn Thai vocabulary the way it's really spoken — real sentences, live pronunciation, word-by-word breakdowns. Free Thai vocabulary app, no install needed.",
};

export default function Page() {
  return (
    <>
      <SoftwareApplicationSchema content={content} />
      <FAQPageSchema content={content} />
      <CookieConsent content={content} />
      <AnalyticsTracker pageVariant="pair" />
      <Header content={content} />
      <Hero content={content} />
      <AdsScrollytelling content={content} />
      <Progress content={content} />
      <DepthContent content={content} />
      <Video content={content} />
      <RealPricing content={content} />
      <FAQ content={content} />
      <FinalCTA content={content} />
      <Footer content={content} />
    </>
  );
}
