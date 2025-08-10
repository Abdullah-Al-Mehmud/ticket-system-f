import TrendingEvent from "./Home/TrendingEvent";
import Hero from "./Home/Hero";
import Trusted from "./Home/Trusted";
import Newsletter from "./Home/Newsletter";
import FAQ from "./Home/FAQ";

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
