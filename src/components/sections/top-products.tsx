"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "../reusables/product-card";

export default function TopProducts() {
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 6;

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    select: (data) => {
      // Sort by rating to get "top" products
      return [...data].sort((a, b) => b.rating.rate - a.rating.rate);
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
          <h2 className="text-xl font-bold">Top Products of the Month</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" disabled>
              <ChevronLeft size={20} />
            </Button>
            <Button variant="outline" size="icon" disabled>
              <ChevronRight size={20} />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="aspect-square md:aspect-[4/3] rounded-lg" />
          <div className="grid grid-cols-2 gap-4 md:col-span-2">
            {[...Array(4)].map((_, index) => (
              <Skeleton key={index} className="aspect-square rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 container">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Top Products of the Month</h2>
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
      <div key={currentPage} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {displayedProducts.slice(0, 2).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        <div className="grid w-full grid-cols-2 gap-4 md:col-span-1">
          {displayedProducts.slice(2).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
