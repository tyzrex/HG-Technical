"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { fetchProductById } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, ShoppingCart, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { addToCart } from "@/store/cart/cart-slice";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

export default function ProductDetail() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id as unknown as number),
  });

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ ...product, quantity: 1 }));
      toast.success("Product added to cart");
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="h-[400px] w-full rounded-md" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-12 w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-500">
          Error fetching product: {error.message || "An error occurred"}
        </p>
        <Link
          href="/"
          className="text-primary hover:underline mt-4 inline-block"
        >
          Return to home
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Product not found</p>
        <Link
          href="/"
          className="text-primary hover:underline mt-4 inline-block"
        >
          Return to home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="flex items-center text-primary hover:underline mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-[400px] bg-white p-4 rounded-lg flex items-center justify-center">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            width={300}
            height={300}
            className="object-contain max-h-[350px]"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>

          <div className="flex items-center">
            <div className="flex mr-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.round(product.rating.rate)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.rating.rate}) {product.rating.count} reviews
            </span>
          </div>

          <p className="text-xl font-bold">${product.price.toFixed(2)}</p>

          <div className="border-t border-b py-4 my-4">
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <div className="pt-4">
            <p className="text-sm mb-2">
              Category: <span className="capitalize">{product.category}</span>
            </p>
          </div>

          <Button
            onClick={handleAddToCart}
            className="w-full md:w-auto bg-blue-600"
            size="lg"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
