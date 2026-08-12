"use client";

import React, { useState } from "react";
import Image from "next/image";
import { InfoCircleOutlined, CheckOutlined } from "@ant-design/icons";
import { message, Modal } from "antd";

interface Offer {
  id: string;
  tag: string;
  title: string;
  expiresIn: string;
  imageSrc: string;
  description: string;
  terms: string;
}

const offersList: Offer[] = [
  {
    id: "offer-1",
    tag: "Offer",
    title: "50% off your favourite drink from the menu!",
    expiresIn: "Expires in 25 days",
    imageSrc: "/iced_offer.png",
    description: "Enjoy half price on any handcrafted beverage, including summer iced frapinos and cold brews.",
    terms: "Valid once per member. Applicable on all sizes.",
  },
  {
    id: "offer-2",
    tag: "Bakery Offer",
    title: "Buy 1 Get 1 Free on all fresh bakery items after 4 PM",
    expiresIn: "Expires in 12 days",
    imageSrc: "/coffee-shop.jpg",
    description: "Pair your evening coffee with complimentary croissants, muffins, or cinnamon rolls.",
    terms: "Valid at participating branches from 4:00 PM until closing.",
  },
  {
    id: "offer-3",
    tag: "Member Exclusive",
    title: "Double Loyalty Points on Beach Babe Frapino",
    expiresIn: "Expires in 5 days",
    imageSrc: "/frapino_passion.png",
    description: "Earn 2x points on every order of our new passionfruit and strawberry iced frapino.",
    terms: "Automatic bonus point calculation at checkout.",
  },
];

export const ExpressoOffers: React.FC = () => {
  const [activatedOffers, setActivatedOffers] = useState<Record<string, boolean>>({});
  const [selectedOfferModal, setSelectedOfferModal] = useState<Offer | null>(null);

  const handleActivate = (offer: Offer) => {
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
    <div id="offers" className="mx-4 md:mx-auto md:max-w-5xl my-8">
      {/* Section Header matching Screenshot 2 */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#16302b] tracking-tight">
          Expresso Offers
        </h2>
        <span className="text-xs sm:text-sm font-semibold text-gray-500 bg-gray-200/60 px-3 py-1 rounded-full">
          1 of {offersList.length}
        </span>
      </div>

      {/* Horizontal Scrollable Offer Cards */}
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none">
        {offersList.map((offer) => {
          const isActivated = activatedOffers[offer.id];

          return (
            <div
              key={offer.id}
              className="snap-start shrink-0 w-[290px] sm:w-[340px] bg-white rounded-3xl overflow-hidden border border-gray-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              {/* Top Image Section */}
              <div className="relative h-44 sm:h-48 w-full bg-gray-100">
                <Image
                  src={offer.imageSrc}
                  alt={offer.title}
                  fill
                  className="object-cover"
                />

                {/* Offer Tag Badge matching Screenshot 2 */}
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
                  <h3 className="text-base sm:text-lg font-bold text-[#16302b] leading-snug">
                    {offer.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                    {offer.expiresIn}
                  </p>
                </div>

                {/* Footer Action Row matching Screenshot 2 */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <button
                    onClick={() => setSelectedOfferModal(offer)}
                    className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-600 hover:text-[#1e3932] transition-colors"
                  >
                    <span>More info</span>
                    <InfoCircleOutlined className="text-xs" />
                  </button>

                  <button
                    onClick={() => handleActivate(offer)}
                    className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                      isActivated
                        ? "bg-emerald-700 text-white shadow-xs"
                        : "bg-[#1e3932] text-white hover:bg-[#2d5349] active:scale-95"
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

      {/* Offer Info Modal */}
      {selectedOfferModal && (
        <Modal
          open={!!selectedOfferModal}
          onCancel={() => setSelectedOfferModal(null)}
          footer={null}
          centered
          className="rounded-2xl overflow-hidden"
        >
          <div className="pt-2">
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
              {selectedOfferModal.tag}
            </span>
            <h3 className="text-xl font-extrabold text-[#16302b] mt-3">
              {selectedOfferModal.title}
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              {selectedOfferModal.description}
            </p>
            <div className="mt-4 p-3 bg-gray-50 rounded-xl text-xs text-gray-500 border border-gray-100">
              <strong>Terms & Conditions:</strong> {selectedOfferModal.terms}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  handleActivate(selectedOfferModal);
                  setSelectedOfferModal(null);
                }}
                className="bg-[#1e3932] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[#2d5349]"
              >
                {activatedOffers[selectedOfferModal.id] ? "Deactivate" : "Activate Offer Now"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
