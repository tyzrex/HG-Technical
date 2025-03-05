import FeaturedPeople from "@/components/sections/featured-people";
import HeroSection from "@/components/sections/hero-section";
import TopOffers from "@/components/sections/top-offers";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedPeople />
      <TopOffers />
    </>
  );
}
