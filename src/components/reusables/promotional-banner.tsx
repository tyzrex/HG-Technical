"use client";

import Image from "next/image";
import Link from "next/link";

interface PromotionalBannerProps {
  title: string;
  subtitle: string;
  image: string;
  bgColor: string;
  link: string;
}

export default function PromotionalBanner({
  title,
  subtitle,
  image,
  bgColor,
  link,
}: PromotionalBannerProps) {
  return (
    <section className="py-8 container">
      <Link href={link} className="block">
        <div className={`${bgColor} rounded-lg overflow-hidden`}>
          <div className="px-32">
            <div className="flex flex-col min-h-[350px] md:flex-row items-center justify-between">
              <div className="text-white mt-10 md:mt-0 mb-4 md:mb-0">
                <h2 className="text-xl md:text-2xl lg:text-5xl font-bold">
                  {title}
                </h2>
                <p className="text-lg md:text-xl">{subtitle}</p>
              </div>
              <div className="relative w-64 md:w-96 h-64 md:h-96">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={title}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
