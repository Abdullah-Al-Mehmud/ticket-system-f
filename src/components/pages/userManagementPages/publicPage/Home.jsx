import TrendingEvent from "./HomePage/TrendingEvent";
import Hero from "./HomePage/Hero";
import Trusted from "./HomePage/Trusted";
import Newsletter from "./HomePage/Newsletter";
import FAQ from "./HomePage/FAQ";

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
