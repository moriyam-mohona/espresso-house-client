"use client";

import React from "react";
import Image from "next/image";
import { EnvironmentOutlined, ShoppingCartOutlined, WifiOutlined, CoffeeOutlined } from "@ant-design/icons";

export const StoreSpotlight: React.FC<{ onPreOrderClick?: () => void }> = ({ onPreOrderClick }) => {
  return (
    <div id="stores" className="mx-4 md:mx-auto md:max-w-5xl my-10">
      <div className="bg-white rounded-3xl overflow-hidden border border-gray-200/90 shadow-md grid grid-cols-1 md:grid-cols-2">
        {/* Left Image Section featuring coffee-shop.jpg */}
        <div className="relative h-64 md:h-full min-h-[300px]">
          <Image
            src="/coffee-shop.jpg"
            alt="Espresso House Coffee Shop"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
          <div className="absolute bottom-4 left-4 text-white md:hidden">
            <span className="bg-[#1e3932] text-xs font-bold px-3 py-1 rounded-full">
              Nearest Branch
            </span>
            <h3 className="text-lg font-bold mt-1">Central Station House</h3>
          </div>
        </div>

        {/* Right Details Section */}
        <div className="p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-white to-[#f9faf8]">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="bg-[#e8efe6] text-[#1e3932] text-xs font-extrabold px-3 py-1 rounded-full flex items-center gap-1.5">
                <EnvironmentOutlined className="text-emerald-700" />
                <span>Selected Store</span>
              </span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                Open • Closes 10:00 PM
              </span>
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#16302b] tracking-tight">
                Central Station House
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Klarabergsviadukten 90, Central Station, Stockholm
              </p>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              Step into a warm atmosphere, enjoy handcrafted espresso beverages, and try fresh artisanal Swedish pastries prepared daily by our baristas.
            </p>

            {/* Store Features Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 bg-gray-100/70 p-2.5 rounded-xl">
                <WifiOutlined className="text-emerald-700 text-sm" />
                <span>Free High-Speed Wi-Fi</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 bg-gray-100/70 p-2.5 rounded-xl">
                <ShoppingCartOutlined className="text-emerald-700 text-sm" />
                <span>Mobile Pre-Order & Pickup</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 bg-gray-100/70 p-2.5 rounded-xl">
                <CoffeeOutlined className="text-emerald-700 text-sm" />
                <span>Specialty Oat & Soy Milks</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 bg-gray-100/70 p-2.5 rounded-xl">
                <EnvironmentOutlined className="text-emerald-700 text-sm" />
                <span>Outdoor Terrace Seating</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={onPreOrderClick}
              className="flex-1 bg-[#1e3932] hover:bg-[#2d5349] text-white px-5 py-3 rounded-2xl font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <ShoppingCartOutlined className="text-base" />
              <span>Pre-Order for Pickup</span>
            </button>

            <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-3 rounded-2xl font-semibold text-sm transition-colors flex items-center justify-center gap-1.5">
              <EnvironmentOutlined />
              <span>Store Map</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
