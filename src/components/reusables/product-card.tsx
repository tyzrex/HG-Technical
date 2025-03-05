"use client";

import type React from "react";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/store/cart/cart-slice";
import { toast } from "sonner";

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    rating: {
      rate: number;
      count: number;
    };
    discount?: number;
  };
  featured?: boolean;
}

export default function ProductCard({
  product,
  featured = false,
}: ProductCardProps) {
  const { id, title, image, price, originalPrice, rating, discount } = product;
  const dispatch = useDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success("Added to cart");
  };

  return (
    <div
      className={`group relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden border hover:shadow-md transition-shadow ${
        featured ? "col-span-2 row-span-2" : ""
      }`}
    >
      {discount && (
        <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
          {discount}% OFF
        </div>
      )}
      <div className="absolute top-2 right-2 z-10">
        <button className="bg-white/80 p-1.5 rounded-full hover:bg-white transition-colors">
          <Heart size={16} className="text-gray-600" />
        </button>
      </div>
      <Link href={`/product/${id}`}>
        <div
          className={`relative ${
            featured ? "aspect-square md:aspect-[4/3]" : "aspect-square"
          } bg-white`}
        >
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-contain p-4 transition-transform group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/product/${id}`} className="block">
          <h3
            className={`font-medium line-clamp-2 ${
              featured ? "text-lg" : "text-sm"
            } mb-1`}
          >
            {title}
          </h3>
        </Link>
        <div className="flex items-center mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={
                i < Math.round(rating.rate)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">
            ({rating.rate})
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-bold text-blue-600">${price.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-muted-foreground line-through text-sm ml-2">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <Button
            size="icon"
            className="bg-blue-600 text-white hover:bg-blue-700 rounded-full h-8 w-8"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
