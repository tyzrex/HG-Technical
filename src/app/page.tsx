import PromotionalBanner from "@/components/reusables/promotional-banner";
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
      <PromotionalBanner
        title="SMART WEARABLE"
        subtitle="UP TO 50% OFF"
        image="/placeholder.svg?height=200&width=200"
        bgColor="bg-blue-950"
        link="/promotions/wearables"
      />
    </>
  );
}
