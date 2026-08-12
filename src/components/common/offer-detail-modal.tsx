"use client";

import React from "react";
import Image from "next/image";
import { LeftOutlined, CheckOutlined } from "@ant-design/icons";
import { Modal } from "antd";

export interface Offer {
  id: string;
  tag: string;
  title: string;
  expiresIn: string;
  imageSrc: string;
  description: string;
  instruction: string;
  terms: string;
}

interface OfferDetailModalProps {
  open: boolean;
  offer: Offer | null;
  isActivated: boolean;
  onClose: () => void;
  onToggleActivate: (offer: Offer) => void;
}

export const OfferDetailModal: React.FC<OfferDetailModalProps> = ({
  open,
  offer,
  isActivated,
  onClose,
  onToggleActivate,
}) => {
  if (!offer) return null;

  return (
    <Modal
      open={open}
      onCancel={onClose}
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
        <div className="pb-4 bg-white border-b border-gray-100 flex items-center justify-start">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-800 bg-gray-100/80 hover:bg-gray-200 px-4 py-1.5 rounded-full transition-all border border-gray-200/60 shadow-2xs cursor-pointer"
          >
            <LeftOutlined className="text-xs" />
            <span>Back</span>
          </button>
        </div>

        {/* Hero Image Section matching Screenshot */}
        <div className="relative h-56 sm:h-64 w-full bg-gray-100 overflow-hidden">
          <Image
            src={offer.imageSrc}
            alt={offer.title}
            fill
            sizes="(max-width: 768px) 100vw, 448px"
            className="object-cover"
          />

          {/* Offer Tag Badge matching Screenshot */}
          <div className="absolute top-4 left-4">
            <span className="bg-white/95 text-[#1e3932] text-xs font-bold px-3.5 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
              <CheckOutlined className="text-emerald-700 text-xs" />
              <span>{offer.tag}</span>
            </span>
          </div>
        </div>

        {/* Body Content Section matching Screenshot */}
        <div className="pt-6 space-y-4">
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#16302b] leading-tight">
            {offer.title}
          </h3>

          <div className="space-y-3 text-xs sm:text-sm text-gray-700 leading-relaxed">
            <p className="font-medium text-gray-800">
              {offer.description}
            </p>

            <p className="text-gray-600">
              {offer.instruction}
            </p>

            <div className="pt-2 border-t border-gray-100 text-xs font-semibold text-gray-500">
              {offer.expiresIn}
            </div>
          </div>

          {/* Bottom Full-Width Pill Action Button matching Screenshot */}
          <div className="pt-4">
            <button
              onClick={() => {
                onToggleActivate(offer);
                onClose();
              }}
              className={`w-full py-4 rounded-full font-bold text-sm sm:text-base transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                isActivated
                  ? "bg-emerald-800 text-white hover:bg-emerald-900"
                  : "bg-[#1e3932] hover:bg-primary-hover text-white active:scale-98"
              }`}
            >
              <span>
                {isActivated ? "Deactivate Offer" : "Activate"}
              </span>
              <CheckOutlined className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
