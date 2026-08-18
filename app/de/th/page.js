import content from '../../../content/pairs/de-th.json';
import Header from './components/Header';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Demo from './components/Demo';
import MethodExplanation from './components/MethodExplanation';
import LanguageChallenges from './components/LanguageChallenges';
import Features from './components/Features';
import Progress from './components/Progress';
import Video from './components/Video';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

export const metadata = {
  title: content.hero_headline,
  description: content.hero_subline,
};

export default function DeThPage() {
  return (
    <>
      <Header content={content} />
      <Hero content={content} />
      <Problem content={content} />
      <Demo content={content} />
      <MethodExplanation content={content} />
      <LanguageChallenges content={content} />
      <Features content={content} />
      <Progress content={content} />
      <Video content={content} />
      <Pricing content={content} />
      <FAQ content={content} />
      <FinalCTA content={content} />
      <Footer content={content} />
    </>
  );
}
