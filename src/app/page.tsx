import PromotionalBannerCarousel from "@/components/reusables/promotional-banner";
import FeaturedPeople from "@/components/sections/featured-people";
import Franchise from "@/components/sections/franchise-section";
import HeroSection from "@/components/sections/hero-section";
import PatternsEvents from "@/components/sections/patterns-events";
import TopMembers from "@/components/sections/top-memebers";
import TopOffers from "@/components/sections/top-offers";
import TopProducts from "@/components/sections/top-products";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedPeople />
      <TopOffers />
      <TopProducts />
      <PromotionalBannerCarousel
        banners={[
          {
            id: 1,
            slug: "wearables",
            title: "SMART WEARABLE",
            subtitle: "UP TO 50% OFF",
            description:
              "Discover our collection of cutting-edge smart wearables. From fitness trackers to smartwatches, find the perfect device to enhance your lifestyle.",
            discount: 50,
            endDate: "2024-04-30T23:59:59",
            bannerImage: `https://source.unsplash.com/random/800x400/?smartwatch,wearable`,
            bgColor: "bg-indigo-600",
            image: "/smart.webp",
            link: "/promotion/wearables",
          },
          {
            id: 2,
            slug: "electronics",
            title: "PREMIUM ELECTRONICS",
            subtitle: "NEW ARRIVALS",
            description:
              "Explore our latest collection of premium electronics. From high-end audio equipment to state-of-the-art displays, we've got everything you need.",
            discount: 30,
            endDate: "2024-05-15T23:59:59",
            bannerImage: `https://source.unsplash.com/random/800x400/?electronics,gadgets`,
            bgColor: "bg-purple-600",
            image: "/smart.webp",
            link: "/promotion/electronics",
          },
          {
            id: 3,
            slug: "summer",
            title: "SUMMER COLLECTION",
            subtitle: "STARTING AT $29.99",
            description:
              "Get ready for summer with our latest collection. From beach essentials to outdoor gear, find everything you need for the perfect summer.",
            discount: 25,
            endDate: "2024-06-21T23:59:59",
            bannerImage: `https://source.unsplash.com/random/800x400/?summer,beach`,
            bgColor: "bg-blue-600",
            image: "/smart.webp",
            link: "/promotion/summer",
          },
          {
            id: 4,
            slug: "exclusive",
            title: "EXCLUSIVE DEALS",
            subtitle: "MEMBERS ONLY",
            description:
              "Special deals exclusively for our members. Sign up or log in to access these limited-time offers on premium products across all categories.",
            discount: 40,
            endDate: "2024-05-31T23:59:59",
            bannerImage: `https://source.unsplash.com/random/800x400/?exclusive,premium`,
            bgColor: "bg-green-600",
            image: "/smart.webp",
            link: "/promotion/exclusive",
          },
          {
            id: 5,
            slug: "flash-sale",
            title: "FLASH SALE",
            subtitle: "24 HOURS ONLY",
            description:
              "Don't miss our 24-hour flash sale! Incredible discounts on selected items across all categories. These deals won't last long, so shop now.",
            discount: 60,
            endDate: "2024-04-15T23:59:59",
            bannerImage: `https://source.unsplash.com/random/800x400/?sale,discount`,
            bgColor: "bg-red-600",
            image: "/smart.webp",
            link: "/promotion/flash-sale",
          },
        ]}
        autoPlay={true}
      />
      <PatternsEvents />
      <Franchise />
      <TopMembers />
    </>
  );
}
