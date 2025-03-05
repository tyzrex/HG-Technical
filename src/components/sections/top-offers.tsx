"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "../reusables/product-card";

export default function TopOffers() {
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 6;

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    select: (data) => {
      // Filter products with a discount (we'll simulate this since FakeStore API doesn't have discounts)
      return data.map((product) => ({
        ...product,
        originalPrice:
          Math.round(product.price * (1 + Math.random() * 0.5) * 100) / 100,
        discount: Math.floor(Math.random() * 40) + 10,
      }));
    },
  });

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
  };

  const displayedProducts = products.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );

  if (isLoading) {
    return (
      <section className="py-8 container">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold mb-4 borde border-b-4 border-b-green-500 w-fit">
            Top Offers of the Month
          </h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" disabled>
              <ChevronLeft size={20} />
            </Button>
            <Button variant="outline" size="icon" disabled>
              <ChevronRight size={20} />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="aspect-square rounded-lg" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 container">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold mb-4 borde border-b-4 border-b-green-500 w-fit">
          Top Offers of the Month
        </h2>
        <div className="flex items-center space-x-2">
          <Button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            variant="outline"
            size="icon"
            className="border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-50"
            aria-label="Previous page"
          >
            <ChevronLeft size={20} />
          </Button>
          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
            variant="outline"
            size="icon"
            className="border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-50"
            aria-label="Next page"
          >
            <ChevronRight size={20} />
          </Button>
        </div>
      </div>

      <div
        key={currentPage}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
