"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LeftOutlined,
  CheckOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { App } from "antd";
import { ROUTES } from "@/constants/routes";
import { offersList } from "@/components/landing/expresso-offers";
import { OfferDetailModal, Offer } from "@/components/common/offer-detail-modal";

export default function FikaOffersPage() {
  const { message } = App.useApp();
  const [activatedOffers, setActivatedOffers] = useState<Record<string, boolean>>({});
  const [selectedOfferModal, setSelectedOfferModal] = useState<Offer | null>(null);

  const handleToggleActivate = (offer: Offer) => {
    const isCurrentlyActive = !!activatedOffers[offer.id];
    setActivatedOffers((prev) => ({
      ...prev,
      [offer.id]: !isCurrentlyActive,
    }));

    if (!isCurrentlyActive) {
      message.success(`🎉 ${offer.title} activated! Ready to redeem at cashier.`);
    } else {
      message.info(`Offer deactivated.`);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f8f6] text-gray-900 font-sans flex flex-col justify-between">
      {/* Sticky Top Header Bar matching User Screenshot */}
      <header className="sticky top-0 z-30 bg-white px-4 py-3.5 border-b border-gray-200/80 shadow-2xs">
        <div className="mx-auto max-w-md md:max-w-7xl flex items-center justify-between">
          <Link
            href={ROUTES.WALLET}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-800 bg-gray-100 hover:bg-gray-200 px-3.5 py-1.5 rounded-full transition-all border border-gray-200/60 cursor-pointer"
          >
            <LeftOutlined className="text-xs" />
            <span>Back</span>
          </Link>

          <h1 className="text-base sm:text-lg font-extrabold text-[#16302b]">
            Fika Offers
          </h1>

          <div className="w-16" />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-6 max-w-md md:max-w-7xl mx-auto w-full">
        <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {offersList.map((offer) => {
            const isActivated = !!activatedOffers[offer.id];

            return (
              <div
                key={offer.id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-200/90 shadow-xs hover:shadow-md transition-all group"
              >
                {/* Hero Image Section matching */}
                <div
                  onClick={() => setSelectedOfferModal(offer)}
                  className="relative h-48 sm:h-52 w-full bg-gray-100 overflow-hidden cursor-pointer"
                >
                  <Image
                    src={offer.imageSrc}
                    alt={offer.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Top-Left Offer Badge matching User Screenshot */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-white/95 text-[#1e3932] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                      <CheckOutlined className="text-emerald-700 text-xs" />
                      <span>{offer.tag}</span>
                    </span>
                  </div>
                </div>

                {/* Card Body matching User Screenshot */}
                <div className="p-5 border-t border-gray-100/80 space-y-2">
                  <h3
                    onClick={() => setSelectedOfferModal(offer)}
                    className="text-base sm:text-lg font-extrabold text-[#16302b] cursor-pointer hover:text-[#1e3932] transition-colors leading-snug"
                  >
                    {offer.title}
                  </h3>

                  <p className="text-xs font-medium text-gray-400">
                    {offer.expiresIn}
                  </p>

                  {/* Card Footer Action Row matching User Screenshot */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => setSelectedOfferModal(offer)}
                      className="text-xs font-semibold text-gray-500 hover:text-[#1e3932] transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>More info</span>
                      <InfoCircleOutlined className="text-xs" />
                    </button>

                    <button
                      onClick={() => handleToggleActivate(offer)}
                      className={`px-6 py-2 rounded-full font-bold text-xs transition-all shadow-2xs active:scale-95 cursor-pointer ${
                        isActivated
                          ? "bg-emerald-800 text-white hover:bg-emerald-900"
                          : "bg-[#1e3932] hover:bg-primary-hover text-white"
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
      </main>

      {/* Reusable Offer Detail Modal */}
      <OfferDetailModal
        open={!!selectedOfferModal}
        offer={selectedOfferModal}
        isActivated={!!(selectedOfferModal && activatedOffers[selectedOfferModal.id])}
        onClose={() => setSelectedOfferModal(null)}
        onToggleActivate={handleToggleActivate}
      />
    </div>
  );
}
