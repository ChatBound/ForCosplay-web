import React from "react";
import Hero from "../component/home/Hero";
import LatestCollection from "../component/home/LatestCollection";
import BestSeller from "../component/home/BestSeller";
import OurPolicy from "../component/home/OurPolicy";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
    </div>
  );
};

export default Home;
