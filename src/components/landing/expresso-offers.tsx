"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  InfoCircleOutlined,
  CheckOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { App, Modal } from "antd";

interface Offer {
  id: string;
  tag: string;
  title: string;
  expiresIn: string;
  imageSrc: string;
  description: string;
  instruction: string;
  terms: string;
}

const offersList: Offer[] = [
  {
    id: "offer-1",
    tag: "Offer",
    title: "50% off your favourite drink from the menu!",
    expiresIn: "Expires in 25 days",
    imageSrc: "/iced_offer.png",
    description:
      "How much coffee is enough coffee? We haven't reached our limit yet! Use this to add an extra shot of espresso to your drink of choice.",
    instruction: "Press Activate to use the coupon for your upcoming purchase.",
    terms: "Valid once per member. Applicable on all sizes.",
  },
  {
    id: "offer-2",
    tag: "Bakery Offer",
    title: "Buy 1 Get 1 Free on all fresh bakery items after 4 PM",
    expiresIn: "Expires in 12 days",
    imageSrc: "/coffee-shop.jpg",
    description:
      "Pair your evening handcrafted coffee with complimentary croissants, muffins, or cinnamon rolls fresh from our oven.",
    instruction: "Press Activate to claim your bakery offer at any branch counter.",
    terms: "Valid at participating branches from 4:00 PM until closing.",
  },
  {
    id: "offer-3",
    tag: "Member Exclusive",
    title: "Double Loyalty Points on Beach Babe Frapino",
    expiresIn: "Expires in 5 days",
    imageSrc: "/frapino_passion.png",
    description:
      "Earn double points on every purchase of our new passionfruit, mango, and strawberry iced frapino.",
    instruction: "Press Activate to enable 2x points logging at checkout.",
    terms: "Automatic bonus point calculation at checkout.",
  },
  {
    id: "offer-4",
    tag: "Customization",
    title: "Free Extra Espresso Shot with any Large Latte",
    expiresIn: "Expires in 18 days",
    imageSrc: "/espresso_shot.png",
    description:
      "Need an extra boost? Enjoy a complimentary additional espresso shot added to any large latte or iced beverage.",
    instruction: "Press Activate to redeem your extra espresso shot voucher.",
    terms: "Valid once per day per account.",
  },
  {
    id: "offer-5",
    tag: "Specialty Brew",
    title: "20% off all Oat Milk & Specialty Brews",
    expiresIn: "Expires in 30 days",
    imageSrc: "/iced_offer.png",
    description:
      "Enjoy 20% discount on all plant-based oat milk lattes, cold brew coffee infusions, and specialty teas.",
    instruction: "Press Activate to apply discount to your cart.",
    terms: "Valid on all size options.",
  },
  {
    id: "offer-6",
    tag: "Morning Delight",
    title: "Free Croissant with any Morning Cappuccino",
    expiresIn: "Expires in 15 days",
    imageSrc: "/coffee-shop.jpg",
    description:
      "Start your day right with a warm butter croissant on us when you purchase a cappuccino before 11:00 AM.",
    instruction: "Press Activate to redeem morning breakfast voucher.",
    terms: "Valid before 11:00 AM local store time.",
  },
  {
    id: "offer-7",
    tag: "Summer Refresher",
    title: "2-for-1 Summer Iced Tea Refreshers",
    expiresIn: "Expires in 10 days",
    imageSrc: "/frapino_passion.png",
    description:
      "Bring a friend! Buy one summer sparkling iced tea and get a second one completely free.",
    instruction: "Press Activate to generate coupon barcode for cashier scanning.",
    terms: "Equal or lesser value drink free.",
  },
  {
    id: "offer-8",
    tag: "Wallet Bonus",
    title: "100 Bonus Fika Points on $20 Wallet Top Up",
    expiresIn: "Expires in 22 days",
    imageSrc: "/espresso_shot.png",
    description:
      "Receive 100 extra loyalty bonus points when you add $20 or more to your digital coffee card wallet.",
    instruction: "Press Activate before processing wallet top-up.",
    terms: "Valid on top-ups made in the app.",
  },
];

export const ExpressoOffers: React.FC = () => {
  const { message } = App.useApp();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
  const [activatedOffers, setActivatedOffers] = useState<Record<string, boolean>>({});
  const [selectedOfferModal, setSelectedOfferModal] = useState<Offer | null>(null);

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

  const handleActivate = (offer: Offer, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const isCurrentlyActivated = activatedOffers[offer.id];
    setActivatedOffers((prev) => ({
      ...prev,
      [offer.id]: !isCurrentlyActivated,
    }));

    if (!isCurrentlyActivated) {
      message.success(`🎉 Offer "${offer.title}" activated! Show your My ID at checkout.`);
    } else {
      message.info("Offer deactivated.");
    }
  };

  return (
    <div id="offers" className="mx-4 md:mx-auto md:max-w-7xl my-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#16302b] tracking-tight">
          Expresso Offers
        </h2>
        <span className="text-xs sm:text-sm font-semibold text-gray-500 bg-gray-200/60 px-3 py-1 rounded-full">
          1 of {offersList.length}
        </span>
      </div>

      {/* Cards Carousel Container with Arrows Aligned Along With Cards */}
      <div className="relative group/carousel">
        {/* Left Arrow Button */}
        {canScrollLeft && (
          <button
            onClick={() => handleScroll("left")}
            className="absolute -left-2 sm:-left-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/95 text-[#1e3932] border border-[#1e3932]/30 shadow-md flex items-center justify-center hover:bg-[#1e3932] hover:text-white transition-all active:scale-95"
            aria-label="Scroll Left"
          >
            <LeftOutlined className="text-sm font-bold" />
          </button>
        )}

        {/* Right Arrow Button */}
        {canScrollRight && (
          <button
            onClick={() => handleScroll("right")}
            className="absolute -right-2 sm:-right-3 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-white/95 text-[#1e3932] border border-[#1e3932]/30 shadow-md flex items-center justify-center hover:bg-[#1e3932] hover:text-white transition-all active:scale-95"
            aria-label="Scroll Right"
          >
            <RightOutlined className="text-sm font-bold" />
          </button>
        )}

        {/* Horizontal Scrollable Offer Cards List */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none scroll-smooth"
        >
          {offersList.map((offer) => {
            const isActivated = activatedOffers[offer.id];

            return (
              <div
                key={offer.id}
                onClick={() => setSelectedOfferModal(offer)}
                className="snap-start shrink-0 w-72.5 sm:w-85 bg-white rounded-3xl overflow-hidden border border-gray-200/90 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                {/* Top Image Section */}
                <div className="relative h-44 sm:h-48 w-full bg-gray-100 overflow-hidden">
                  <Image
                    src={offer.imageSrc}
                    alt={offer.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 340px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Offer Tag Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/95 text-[#1e3932] text-xs font-bold px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5 backdrop-blur-xs">
                      <CheckOutlined className="text-emerald-600 text-xs" />
                      <span>{offer.tag}</span>
                    </span>
                  </div>
                </div>

                {/* Card Content Section */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#16302b] leading-snug group-hover:text-[#1e3932] transition-colors line-clamp-2">
                      {offer.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                      {offer.expiresIn}
                    </p>
                  </div>

                  {/* Footer Action Row */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <span className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-600 group-hover:text-[#1e3932] transition-colors">
                      <span>More info</span>
                      <InfoCircleOutlined className="text-xs" />
                    </span>

                    <button
                      onClick={(e) => handleActivate(offer, e)}
                      className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                        isActivated
                          ? "bg-emerald-700 text-white shadow-xs"
                          : "bg-[#1e3932] text-white hover:bg-primary-hover active:scale-95"
                      }`}
                    >
                      {isActivated ? "Activated ✓" : "Activate"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ==============================================================================
          Offer Detail Modal matching the User's Screenshot Design
         ============================================================================== */}
      {selectedOfferModal && (
        <Modal
          open={!!selectedOfferModal}
          onCancel={() => setSelectedOfferModal(null)}
          footer={null}
          centered
          closeIcon={null}
          className="rounded-3xl overflow-hidden max-w-md"
          modalRender={(modalContent) => (
            <div className="rounded-3xl overflow-hidden shadow-2xl bg-white">
              {modalContent}
            </div>
          )}
        >
          <div className="text-[#16302b]">
            {/* Top Back Header Bar matching Screenshot */}
            <div className="p-4 bg-white border-b border-gray-100 flex items-center justify-start">
              <button
                onClick={() => setSelectedOfferModal(null)}
                className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-800 bg-gray-100/80 hover:bg-gray-200 px-4 py-1.5 rounded-full transition-all border border-gray-200/60 shadow-2xs"
              >
                <LeftOutlined className="text-xs" />
                <span>Back</span>
              </button>
            </div>

            {/* Hero Image Section matching Screenshot */}
            <div className="relative h-56 sm:h-64 w-full bg-gray-100 overflow-hidden">
              <Image
                src={selectedOfferModal.imageSrc}
                alt={selectedOfferModal.title}
                fill
                sizes="(max-width: 768px) 100vw, 448px"
                className="object-cover"
              />

              {/* Offer Tag Badge matching Screenshot */}
              <div className="absolute top-4 left-4">
                <span className="bg-white/95 text-[#1e3932] text-xs font-bold px-3.5 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                  <CheckOutlined className="text-emerald-700 text-xs" />
                  <span>{selectedOfferModal.tag}</span>
                </span>
              </div>
            </div>

            {/* Body Content Section matching Screenshot */}
            <div className="p-6 space-y-4">
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#16302b] leading-tight">
                {selectedOfferModal.title}
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-gray-700 leading-relaxed">
                <p className="font-medium text-gray-800">
                  {selectedOfferModal.description}
                </p>

                <p className="text-gray-600">
                  {selectedOfferModal.instruction}
                </p>

                <div className="pt-2 border-t border-gray-100 text-xs font-semibold text-gray-500">
                  {selectedOfferModal.expiresIn}
                </div>
              </div>

              {/* Bottom Full-Width Pill Action Button matching Screenshot */}
              <div className="pt-6">
                <button
                  onClick={() => {
                    handleActivate(selectedOfferModal);
                    setSelectedOfferModal(null);
                  }}
                  className={`w-full py-4 rounded-full font-bold text-sm sm:text-base transition-all shadow-md flex items-center justify-center gap-2 ${
                    activatedOffers[selectedOfferModal.id]
                      ? "bg-emerald-800 text-white hover:bg-emerald-900"
                      : "bg-[#1e3932] hover:bg-primary-hover text-white active:scale-98"
                  }`}
                >
                  <span>
                    {activatedOffers[selectedOfferModal.id]
                      ? "Deactivate Offer"
                      : "Activate"}
                  </span>
                  <CheckOutlined className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
