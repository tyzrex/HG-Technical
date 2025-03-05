"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

interface Franchise {
  id: number;
  name: string;
  logo: string;
}

// Mock API function
const fetchFranchises = async (): Promise<Franchise[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Nike", logo: "/nike.png" },
        { id: 2, name: "Adidas", logo: "/adidas.png" },
        { id: 3, name: "Puma", logo: "/samsung.png" },
        {
          id: 4,
          name: "Louis Vuitton",
          logo: "/nike.png",
        },
        {
          id: 5,
          name: "Samsung",
          logo: "/adidas.png",
        },
        { id: 6, name: "Dell", logo: "/samsung.png" },
      ]);
    }, 600);
  });
};

export default function Franchise() {
  const { data: franchises = [], isLoading } = useQuery({
    queryKey: ["franchises"],
    queryFn: fetchFranchises,
  });

  if (isLoading) {
    return (
      <section className="py-8 container">
        <h2 className="text-2xl font-bold mb-4 borde border-b-4 border-b-green-500 w-fit">
          Top Franchise of the Month
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} className="aspect-square rounded-lg" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 container">
      <h2 className="text-2xl font-bold mb-4  border-b-4 border-b-green-500 w-fit">
        Top Franchise of the Month
      </h2>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {franchises.map((franchise) => (
          <div key={franchise.id}>
            <Link href={`/franchise/${franchise.id}`} className="block">
              <div className="bg-white rounded-lg p-4 aspect-square flex items-center justify-center hover:shadow-md transition-shadow border">
                <Image
                  src={franchise.logo || "/placeholder.svg"}
                  alt={franchise.name}
                  width={150}
                  height={40}
                  className="object-contain"
                />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
