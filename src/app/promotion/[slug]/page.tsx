"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Tag, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchProducts } from "@/services/api";
import ProductCard from "@/components/reusables/product-card";

interface Promotion {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  discount: number;
  endDate: string;
  bannerImage: string;
  bgColor: string;
}

// Mock API function to fetch promotion details
const fetchPromotion = async (slug: string): Promise<Promotion> => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Mock data for different promotions
      const promotions: Record<string, Promotion> = {
        wearables: {
          id: 1,
          slug: "wearables",
          title: "SMART WEARABLE",
          subtitle: "UP TO 50% OFF",
          description:
            "Discover our collection of cutting-edge smart wearables. From fitness trackers to smartwatches, find the perfect device to enhance your lifestyle. Limited time offer with discounts up to 50% off on selected items.",
          discount: 50,
          endDate: "2024-04-30T23:59:59",
          bannerImage: "https://picsum.photos/1000/1000",
          bgColor: "bg-indigo-600",
        },
        electronics: {
          id: 2,
          slug: "electronics",
          title: "PREMIUM ELECTRONICS",
          subtitle: "NEW ARRIVALS",
          description:
            "Explore our latest collection of premium electronics. From high-end audio equipment to state-of-the-art displays, we've got everything you need to upgrade your tech setup. Check out our new arrivals with special introductory prices.",
          discount: 30,
          endDate: "2024-05-15T23:59:59",

          bannerImage: "https://picsum.photos/1000/1000",
          bgColor: "bg-purple-600",
        },
        summer: {
          id: 3,
          slug: "summer",
          title: "SUMMER COLLECTION",
          subtitle: "STARTING AT $29.99",
          description:
            "Get ready for summer with our latest collection. From beach essentials to outdoor gear, find everything you need for the perfect summer. Prices starting at just $29.99 for a limited time.",
          discount: 25,
          endDate: "2024-06-21T23:59:59",

          bannerImage: "https://picsum.photos/1000/1000",
          bgColor: "bg-blue-600",
        },
        exclusive: {
          id: 4,
          slug: "exclusive",
          title: "EXCLUSIVE DEALS",
          subtitle: "MEMBERS ONLY",
          description:
            "Special deals exclusively for our members. Sign up or log in to access these limited-time offers on premium products across all categories. Members get additional benefits including free shipping and extended warranties.",
          discount: 40,
          endDate: "2024-05-31T23:59:59",

          bannerImage: "https://picsum.photos/1000/1000",
          bgColor: "bg-green-600",
        },
        "flash-sale": {
          id: 5,
          slug: "flash-sale",
          title: "FLASH SALE",
          subtitle: "24 HOURS ONLY",
          description:
            "Don't miss our 24-hour flash sale! Incredible discounts on selected items across all categories. These deals won't last long, so shop now before time runs out.",
          discount: 60,
          endDate: "2024-04-15T23:59:59",

          bannerImage: "https://picsum.photos/1000/1000",
          bgColor: "bg-red-600",
        },
      };

      const promotion = promotions[slug];

      if (promotion) {
        resolve(promotion);
      } else {
        reject(new Error("Promotion not found"));
      }
    }, 800);
  });
};

// Helper function to format date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Helper function to calculate time remaining
const getTimeRemaining = (endDate: string) => {
  const total = Date.parse(endDate) - Date.now();
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / 1000 / 60) % 60);

  return {
    total,
    days,
    hours,
    minutes,
    isExpired: total <= 0,
  };
};

export default function PromotionPage() {
  const { slug } = useParams();
  const promotionSlug = Array.isArray(slug) ? slug[0] : slug;

  const {
    data: promotion,
    isLoading: isLoadingPromotion,
    isError: isPromotionError,
  } = useQuery({
    queryKey: ["promotion", promotionSlug],
    queryFn: () => fetchPromotion(promotionSlug as string),
    enabled: !!promotionSlug,
  });

  const { data: products = [], isLoading: isLoadingProducts } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    select: (data) => {
      // Filter and transform products for this promotion
      // In a real app, you would filter based on promotion criteria
      return data.slice(0, 8).map((product) => ({
        ...product,
        originalPrice: product.price,
        price: product.price * (1 - (promotion?.discount || 0) / 100),
      }));
    },
    enabled: !!promotion, // Only fetch products when promotion data is available
  });

  if (isLoadingPromotion) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Skeleton className="h-8 w-40" />
        </div>

        <Skeleton className="w-full h-[400px] rounded-lg mb-8" />

        <div className="space-y-4 mb-8">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="aspect-square rounded-lg" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isPromotionError || !promotion) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Promotion Not Found</h1>
        <p className="mb-6">
          Sorry, we couldn&&apos;t find the promotion you&apos;re looking for.
        </p>
        <Button asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    );
  }

  const timeRemaining = getTimeRemaining(promotion.endDate);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-8">
        <Image
          src={promotion.bannerImage || "/placeholder.svg"}
          alt={promotion.title}
          fill
          className="object-cover"
          priority
        />
        <div
          className={`absolute inset-0 ${promotion.bgColor} opacity-60`}
        ></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">
            {promotion.title}
          </h1>
          <p className="text-xl md:text-2xl mb-6">{promotion.subtitle}</p>

          {!timeRemaining.isExpired && (
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <Clock className="h-5 w-5" />
              <span>
                Ends in: {timeRemaining.days}d {timeRemaining.hours}h{" "}
                {timeRemaining.minutes}m
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full">
            <Tag className="h-4 w-4 mr-1" />
            <span>Special Offer</span>
          </div>
          <div className="flex items-center bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-3 py-1 rounded-full">
            <Percent className="h-4 w-4 mr-1" />
            <span>Up to {promotion.discount}% Off</span>
          </div>
          {!timeRemaining.isExpired ? (
            <div className="flex items-center bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 px-3 py-1 rounded-full">
              <Clock className="h-4 w-4 mr-1" />
              <span>Ends {formatDate(promotion.endDate)}</span>
            </div>
          ) : (
            <div className="flex items-center bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 px-3 py-1 rounded-full">
              <Clock className="h-4 w-4 mr-1" />
              <span>Expired</span>
            </div>
          )}
        </div>

        <h2 className="text-2xl font-bold mb-4">
          {promotion.title} - {promotion.subtitle}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {promotion.description}
        </p>

        {!timeRemaining.isExpired && <Button size="lg">Shop Now</Button>}
      </div>

      <h2 className="text-2xl font-bold mb-6">Featured Products</h2>

      {isLoadingProducts ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="aspect-square rounded-lg" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id}>
              <ProductCard
                product={{
                  ...product,
                  originalPrice:
                    product.price * (100 / (100 - promotion.discount)),
                  discount: promotion.discount,
                }}
              />
            </div>
          ))}
        </div>
      )}

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["wearables", "electronics", "summer"]
            .filter((s) => s !== promotionSlug)
            .slice(0, 3)
            .map((slug) => (
              <Link
                href={`/promotions/${slug}`}
                key={slug}
                className="block group"
              >
                <div className="relative h-[200px] rounded-lg overflow-hidden">
                  <Image
                    src="https://picsum.photos/1000/1000"
                    alt={`${slug} promotion`}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-6">
                    <h3 className="text-white text-xl font-bold capitalize">
                      {slug.replace("-", " ")}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
