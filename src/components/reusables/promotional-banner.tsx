"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface PromotionalBanner {
  id: number;
  title: string;
  slug: string;
  subtitle: string;
  image: string;
  description: string;
  discount: number;
  endDate: string;
  bannerImage: string;
  bgColor: string;
  link: string;
}

interface PromotionalBannerCarouselProps {
  banners: PromotionalBanner[];
  autoPlay?: boolean;
  interval?: number;
}

export default function PromotionalBannerCarousel({
  banners,
  autoPlay = true,
  interval = 5000,
}: PromotionalBannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      handleNext();
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, currentIndex]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  if (banners.length === 0) {
    return null;
  }

  return (
    <section className="py-8 relative container">
      <div className="relative overflow-hidden rounded-lg ">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            <Link href={banners[currentIndex].link} className="block">
              <div
                className={`h-[300px] flex items-center justify-between ${banners[currentIndex].bgColor} rounded-lg overflow-hidden`}
              >
                <div className="container mx-auto px-16 py-6 md:py-8">
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="text-white mb-4 md:mb-0">
                      <h2 className="text-xl md:text-2xl font-bold">
                        {banners[currentIndex].title}
                      </h2>
                      <p className="text-lg md:text-xl">
                        {banners[currentIndex].subtitle}
                      </p>
                    </div>
                    <div className="relative w-48 h-48 md:w-64 md:h-64">
                      <motion.div
                        animate={{
                          y: [0, -10, 0],
                        }}
                        transition={{
                          repeat: Number.POSITIVE_INFINITY,
                          duration: 2,
                          ease: "easeInOut",
                        }}
                      >
                        <Image
                          src={
                            banners[currentIndex].image || "/placeholder.svg"
                          }
                          alt={banners[currentIndex].title}
                          className="object-contain"
                          width={250}
                          height={250}
                        />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>

        {banners.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-black/30 text-white hover:bg-black/50"
              onClick={handlePrev}
              aria-label="Previous banner"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-black/30 text-white hover:bg-black/50"
              onClick={handleNext}
              aria-label="Next banner"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>

            <div className="absolute bottom-2 left-0 right-0 z-10 flex justify-center space-x-2">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-white scale-125"
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to banner ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
