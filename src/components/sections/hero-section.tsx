"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <div className="container">
      <div className="relative bg-orange-500 my-5 overflow-hidden rounded-lg px-10">
        <div className="py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-white space-y-4 z-10">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                Lorem Ipsum is simply dummy
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="pt-2">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-white/90"
                >
                  <Link href="/shop">Shop Now</Link>
                </Button>
              </div>
            </div>

            <div className="relative hidden md:flex justify-end w-full h-64 md:h-80 lg:h-96">
              <Image
                src="/hero.jpg?height=400&width=400"
                alt="Person shopping"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-700 rounded-full opacity-50"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-orange-700 rounded-full opacity-30"></div>
      </div>
    </div>
  );
}
