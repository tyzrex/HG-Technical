"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface Franchise {
  id: number;
  name: string;
  logo: string;
  description: string;
}

// Mock API function to fetch a single franchise
const fetchFranchise = async (id: string): Promise<Franchise> => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Mock data for different franchises
      const franchises: Record<string, Franchise> = {
        "1": {
          id: 1,
          name: "Nike",
          logo: "/nike.png?height=120&width=240",
          description:
            "Nike, Inc. is an American multinational corporation that is engaged in the design, development, manufacturing, and worldwide marketing and sales of footwear, apparel, equipment, accessories, and services. The company is headquartered near Beaverton, Oregon, in the Portland metropolitan area. It is the world's largest supplier of athletic shoes and apparel and a major manufacturer of sports equipment.",
        },
        "2": {
          id: 2,
          name: "Adidas",
          logo: "/adidas.png?height=120&width=240",
          description:
            "Adidas AG is a German multinational corporation, founded and headquartered in Herzogenaurach, Germany, that designs and manufactures shoes, clothing and accessories. It is the largest sportswear manufacturer in Europe, and the second largest in the world, after Nike.",
        },
        "3": {
          id: 3,
          name: "Puma",
          logo: "/puma.png?height=120&width=240",
          description:
            "Puma SE, branded as PUMA, is a German multinational corporation that designs and manufactures athletic and casual footwear, apparel and accessories, which is headquartered in Herzogenaurach, Bavaria, Germany. Puma is the third largest sportswear manufacturer in the world.",
        },
        "4": {
          id: 4,
          name: "Louis Vuitton",
          logo: "/lv.png?height=120&width=240",
          description:
            "Louis Vuitton Malletier, commonly known as Louis Vuitton or shortened to LV, is a French fashion house and luxury goods company founded in 1854 by Louis Vuitton. The label's LV monogram appears on most of its products, ranging from luxury bags and leather goods to ready-to-wear, shoes, watches, jewelry, accessories, sunglasses and books.",
        },
        "5": {
          id: 5,
          name: "Samsung",
          logo: "/samsung.png?height=120&width=240",
          description:
            "Samsung Electronics Co., Ltd. is a South Korean multinational electronics company headquartered in the Yeongtong District of Suwon. It is the pinnacle of the Samsung chaebol, accounting for 70% of the group's revenue in 2012. Samsung Electronics has played a key role in the group's corporate governance due to circular ownership.",
        },
        "6": {
          id: 6,
          name: "Dell",
          logo: "/dell.png?height=120&width=240",
          description:
            "Dell Technologies Inc. is an American multinational technology company headquartered in Round Rock, Texas. It was formed as a result of the September 2016 merger of Dell and EMC Corporation. The company is known for its personal computers, servers, data storage devices, network switches, software, computer peripherals, HDTVs, cameras, printers, and electronics.",
        },
      };

      const franchise = franchises[id];

      if (franchise) {
        resolve(franchise);
      } else {
        reject(new Error("Franchise not found"));
      }
    }, 800);
  });
};

export default function FranchisePage() {
  const { id } = useParams();
  const franchiseId = Array.isArray(id) ? id[0] : id || "";

  const {
    data: franchise,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["franchise", franchiseId],
    queryFn: () => fetchFranchise(franchiseId),
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Skeleton className="h-8 w-40" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Skeleton className="aspect-square md:aspect-[3/2] rounded-lg" />
          </div>
          <div className="md:col-span-2 space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !franchise) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Franchise Not Found</h1>
        <p className="mb-6">
          Sorry, we couldn&apos;t find the franchise you&apos;re looking for.
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

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-sm">
          <div className="relative aspect-square md:aspect-[3/2] mb-4">
            <Image
              src={franchise.logo || "/placeholder.svg"}
              alt={franchise.name}
              fill
              className="object-contain"
            />
          </div>

          <h1 className="text-2xl font-bold text-center">{franchise.name}</h1>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">
              About {franchise.name}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {franchise.description}
            </p>

            <h3 className="text-lg font-semibold mb-3">Featured Products</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 aspect-square flex items-center justify-center"
                >
                  <Image
                    src="https://picsum.photos/1000/1000"
                    alt={`${franchise.name} product ${item}`}
                    width={400}
                    height={400}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Button className="w-full md:w-auto">View All Products</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">
          Special Offers from {franchise.name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((offer) => (
            <div
              key={offer}
              className="border rounded-lg overflow-hidden group"
            >
              <div className="relative aspect-video bg-gray-100 dark:bg-gray-700">
                <Image
                  src="https://picsum.photos/1000/1000"
                  alt={`Offer ${offer}`}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-2">Special Offer #{offer}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Limited time offer from {franchise.name}. Get amazing
                  discounts on selected products.
                </p>
                <Button variant="outline" size="sm" className="mt-3">
                  View Offer
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
