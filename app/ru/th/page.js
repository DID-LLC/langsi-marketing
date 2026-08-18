import content from '../../../content/pairs/ru-th.json';
import Header from '../../../components/pair-page/Header';
import Hero from '../../../components/pair-page/Hero';
import Problem from '../../../components/pair-page/Problem';
import Demo from '../../../components/pair-page/Demo';
import MethodExplanation from '../../../components/pair-page/MethodExplanation';
import LanguageChallenges from '../../../components/pair-page/LanguageChallenges';
import Features from '../../../components/pair-page/Features';
import Progress from '../../../components/pair-page/Progress';
import Video from '../../../components/pair-page/Video';
import Pricing from '../../../components/pair-page/Pricing';
import FAQ from '../../../components/pair-page/FAQ';
import FinalCTA from '../../../components/pair-page/FinalCTA';
import Footer from '../../../components/pair-page/Footer';

export const metadata = {
  title: content.hero_headline,
  description: content.hero_subline,
};

export default function Page() {
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
