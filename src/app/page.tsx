import FeaturedPeople from "@/components/sections/featured-people";
import HeroSection from "@/components/sections/hero-section";
import TopOffers from "@/components/sections/top-offers";
import TopProducts from "@/components/sections/top-products";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedPeople />
      <TopOffers />
      <TopProducts />
    </>
  );
}
