import content from '../../../content/pairs/fr-th.json';
import Header from '../../../components/pair-page/Header';
import Hero from '../../../components/pair-page/Hero';
import AdsScrollytelling from '../../../components/pair-page/AdsScrollytelling';
import Progress from '../../../components/pair-page/Progress';
import Video from '../../../components/pair-page/Video';
import RealPricing from '../../../components/pair-page/RealPricing';
import FAQ from '../../../components/pair-page/FAQ';
import FinalCTA from '../../../components/pair-page/FinalCTA';
import Footer from '../../../components/pair-page/Footer';

export const metadata = {
  title: `${content.hero_h1_1} ${content.hero_h1_2}`,
  description: content.hero_sub,
};

export default function Page() {
  return (
    <>
      <Header content={content} />
      <Hero content={content} />
      <AdsScrollytelling content={content} />
      <Progress content={content} />
      <Video content={content} />
      <RealPricing content={content} />
      <FAQ content={content} />
      <FinalCTA content={content} />
      <Footer content={content} />
    </>
  );
}
