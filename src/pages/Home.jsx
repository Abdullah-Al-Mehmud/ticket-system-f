import TrendingEvent from "./Public/Home/TrendingEvent";
import Hero from "./Public/Home/Hero";
import Trusted from "./Public/Home/Trusted";
import Newsletter from "./Public/Home/Newsletter";
import FAQ from "./Public/Home/FAQ";

const Home = () => {

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <TrendingEvent />
      <Trusted />
      <FAQ />
      <Newsletter />
    </div>
  );
};

export default Home;
