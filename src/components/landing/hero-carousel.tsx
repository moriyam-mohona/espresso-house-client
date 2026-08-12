"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRightOutlined } from "@ant-design/icons";

interface Slide {
  id: number;
  scriptTitle: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  badge?: string;
}

const slides: Slide[] = [
  {
    id: 1,
    scriptTitle: "Made with passion",
    subtitle: "Meet Beach Babe Frapino",
    description: "Passion fruit, mango and strawberry in one sip.",
    imageSrc: "/frapino_passion.png",
    badge: "New Summer Edition",
  },
  {
    id: 2,
    scriptTitle: "Crafted for warmth",
    subtitle: "Artisanal Cold Brew & Espresso",
    description: "Slow-steeped for 18 hours with rich caramel notes.",
    imageSrc: "/coffee-shop.jpg",
    badge: "Barista Favorite",
  },
  {
    id: 3,
    scriptTitle: "Pure refreshment",
    subtitle: "Sparkling Citrus Iced Tea",
    description: "Freshly squeezed lemons with organic mint leaf infusion.",
    imageSrc: "/iced_offer.png",
    badge: "Limited Offer",
  },
];

export const HeroCarousel: React.FC<{ onTryHereClick?: () => void }> = ({ onTryHereClick }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <div className="mx-4 md:mx-auto md:max-w-7xl my-6">
      <div className="relative overflow-hidden rounded-3xl h-95 sm:h-110 shadow-lg group">
        {/* Slide Image Background */}
        <Image
          src={slide.imageSrc}
          alt={slide.subtitle}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-cover object-center transition-transform duration-700 scale-105 group-hover:scale-100"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-black/20" />

        {/* Top Badge */}
        {slide.badge && (
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
            <span className="bg-brand-sage text-[#1e3932] text-xs font-extrabold px-3 py-1 rounded-full shadow-xs tracking-wide uppercase">
              {slide.badge}
            </span>
          </div>
        )}

        {/* Overlay Content matching Screenshot 2 */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 sm:p-10 text-white">
          <div className="max-w-lg space-y-2">
            {/* Italic Script Header matching "Made with passion" */}
            <h2 className="font-serif-italic text-4xl sm:text-5xl md:text-6xl text-amber-100 drop-shadow-md leading-tight">
              {slide.scriptTitle}
            </h2>

            <p className="text-xs sm:text-sm font-semibold tracking-wider text-emerald-200 uppercase">
              {slide.subtitle}
            </p>

            <p className="text-base sm:text-xl font-bold text-white leading-snug drop-shadow-xs">
              {slide.description}
            </p>

            {/* Try It Here CTA */}
            <div className="pt-3">
              <button
                onClick={onTryHereClick}
                className="inline-flex items-center gap-2 text-white border-b-2 border-white pb-1 font-bold text-base sm:text-lg hover:text-amber-200 hover:border-amber-200 transition-all group/btn"
              >
                <span>Try It Here</span>
                <ArrowRightOutlined className="text-sm group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Carousel Pagination Dots */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "w-8 bg-white"
                    : "w-2.5 bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
