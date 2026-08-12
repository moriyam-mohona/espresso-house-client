"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRightOutlined,
  LeftOutlined,
  RightOutlined,
  ClockCircleOutlined,
  CloseOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Modal, App } from "antd";
import { ROUTES } from "@/constants/routes";
import { DUMMY_CHALLENGES, ChallengeItem } from "@/constants/challenges-data";

export const ExpressoFun: React.FC = () => {
  const { message } = App.useApp();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
  const [selectedChallenge, setSelectedChallenge] = useState<ChallengeItem | null>(null);

  // Check scroll position to toggle Left / Right arrows
  const checkScrollPosition = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 15);
  };

  useEffect(() => {
    checkScrollPosition();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScrollPosition);
      window.addEventListener("resize", checkScrollPosition);
    }
    return () => {
      if (el) el.removeEventListener("scroll", checkScrollPosition);
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  const handleOrderAtCoffeeShop = () => {
    message.success("Opening Pre-Order menu...");
    setSelectedChallenge(null);
  };

  return (
    <div id="fika-fun" className="mx-4 md:mx-auto md:max-w-5xl my-6">
      <div className="bg-brand-sage rounded-2xl p-5 sm:p-6 border border-[#d6e3d3] shadow-xs relative">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#16302b] tracking-tight flex items-center gap-2">
            <span>Expresso Fun</span>
            <span className="text-xs text-gray-500 font-normal hidden sm:inline">
              (Fika Fun Challenges)
            </span>
          </h2>

          {/* View Details link pointing to /challenges */}
          <Link
            href={ROUTES.CHALLENGES}
            className="text-[#1e3932] hover:text-primary-hover p-1 transition-transform hover:translate-x-1 flex items-center gap-1 text-sm font-semibold"
          >
            <span>View Details</span>
            <ArrowRightOutlined className="text-xs" />
          </Link>
        </div>

        {/* Cards Carousel Container with Arrows Aligned Along With Cards */}
        <div className="relative group/carousel">
          {/* Left Arrow Button (Only visible when scrolled right) */}
          {canScrollLeft && (
            <button
              onClick={() => handleScroll("left")}
              className="absolute -left-2 sm:-left-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/95 text-[#1e3932] border border-[#1e3932]/30 shadow-md flex items-center justify-center hover:bg-[#1e3932] hover:text-white transition-all active:scale-95"
              aria-label="Scroll Left"
            >
              <LeftOutlined className="text-sm font-bold" />
            </button>
          )}

          {/* Right Arrow Button (Visible initially & when more cards exist on right) */}
          {canScrollRight && (
            <button
              onClick={() => handleScroll("right")}
              className="absolute -right-2 sm:-right-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/95 text-[#1e3932] border border-[#1e3932]/30 shadow-md flex items-center justify-center hover:bg-[#1e3932] hover:text-white transition-all active:scale-95"
              aria-label="Scroll Right"
            >
              <RightOutlined className="text-sm font-bold" />
            </button>
          )}

          {/* Horizontal Scrollable Challenge Cards List */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-2 pt-1 snap-x snap-mandatory scrollbar-none scroll-smooth"
          >
            {DUMMY_CHALLENGES.map((challenge) => (
              <div
                key={challenge.id}
                onClick={() => setSelectedChallenge(challenge)}
                className="snap-start shrink-0 w-[82vw] sm:w-85 md:w-90 bg-brand-cream hover:bg-white transition-all duration-200 rounded-2xl border-2 border-[#1e3932] shadow-xs cursor-pointer group relative overflow-hidden flex flex-col justify-between p-4 sm:p-5"
              >
                {/* Top-Left Tag & Top-Right Points */}
                <div className="flex items-start justify-between w-full mb-3">
                  {challenge.badge ? (
                    <span className="bg-[#1e3932] text-white text-xs font-bold px-3 py-1 rounded-tl-xl rounded-br-xl shadow-2xs -mt-4 -ml-4">
                      {challenge.badge}
                    </span>
                  ) : (
                    <span />
                  )}
                  <span className="text-base sm:text-lg font-black text-[#1e3932]">
                    {challenge.points}p
                  </span>
                </div>

                {/* Card Body */}
                <div className="flex items-center gap-4">
                  {/* Progress Meter Circle */}
                  <div className="relative shrink-0 flex items-center justify-center">
                    <div className="h-16 w-16 rounded-full border-4 border-[#1e3932] flex flex-col items-center justify-center bg-brand-cream group-hover:bg-white transition-colors relative">
                      <ClockCircleOutlined className="text-xs text-[#1e3932] mb-0.5" />
                      <span className="text-xs font-extrabold text-[#1e3932]">
                        {challenge.currentProgress}/{challenge.totalRequired}
                      </span>
                    </div>
                  </div>

                  {/* Text details */}
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-extrabold text-[#16302b] leading-tight group-hover:text-[#1e3932] transition-colors line-clamp-2">
                      {challenge.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                      {challenge.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Modal popping up directly on homepage when card is clicked */}
      {selectedChallenge && (
        <Modal
          open={!!selectedChallenge}
          onCancel={() => setSelectedChallenge(null)}
          footer={null}
          centered
          closeIcon={<CloseOutlined className="text-gray-700 text-base" />}
          className="rounded-3xl overflow-hidden max-w-md"
          modalRender={(modalContent) => (
            <div className="rounded-3xl overflow-hidden shadow-2xl bg-white">
              {modalContent}
            </div>
          )}
        >
          <div className="text-[#16302b]">
            {/* Top Sage Header */}
            <div className="bg-brand-sage p-6 text-center flex flex-col items-center justify-center relative border-b border-[#d6e3d3]">
              <span className="text-xs font-bold text-[#16302b] uppercase tracking-wider mb-4">
                Description
              </span>

              {/* Large Progress Ring with Points Badge */}
              <div className="relative my-2">
                <div className="h-28 w-28 rounded-full border-4 border-[#1e3932] bg-white flex flex-col items-center justify-center shadow-xs">
                  <ClockCircleOutlined className="text-2xl text-[#1e3932] mb-1" />
                </div>

                {/* Points Badge */}
                <div className="absolute top-0 right-0 bg-[#1e3932] text-white text-xs font-extrabold px-2.5 py-0.5 rounded-full shadow-xs">
                  {selectedChallenge.points}p
                </div>
              </div>

              {/* Progress Fraction */}
              <span className="text-3xl font-extrabold text-[#16302b] mt-2">
                {selectedChallenge.currentProgress}/{selectedChallenge.totalRequired}
              </span>

              {/* Challenge Title */}
              <h3 className="text-base sm:text-lg font-extrabold text-[#16302b] mt-2 max-w-xs leading-snug">
                {selectedChallenge.title}
              </h3>
              <p className="text-xs text-gray-600 mt-1 font-medium">
                {selectedChallenge.subtitle}
              </p>
            </div>

            {/* Bottom Description Content */}
            <div className="p-6 space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
              <p className="font-medium text-gray-800">
                {selectedChallenge.descriptionHeader}
              </p>

              <p className="text-gray-600">
                {selectedChallenge.descriptionBody}
              </p>

              {/* Action Button */}
              <div className="pt-4">
                <button
                  onClick={handleOrderAtCoffeeShop}
                  className="w-full bg-white hover:bg-gray-50 border-2 border-[#1e3932] text-[#1e3932] py-3.5 rounded-full font-bold text-sm transition-all flex items-center justify-center gap-2 active:scale-98 shadow-2xs"
                >
                  <ShoppingOutlined className="text-base" />
                  <span>Order at our coffee shop</span>
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
