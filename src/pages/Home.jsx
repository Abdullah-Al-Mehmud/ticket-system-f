import React, { useState } from "react";
import {
  Users,
  Shield,
  Award,
  Zap,
} from "lucide-react";
import TrendingEvent from "./Home/TrendingEvent";
import Hero from "./Home/Hero";
import Trusted from "./Home/Trusted";
import Statistics from "./Home/Statistics";
import Newsletter from "./Home/Newsletter";

const Home = () => {

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <TrendingEvent />
      <Trusted />
      <Statistics />
      <Newsletter />
    </div>
  );
};

export default Home;
