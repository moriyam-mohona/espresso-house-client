"use client";

import React from "react";
import Link from "next/link";
import { LeftOutlined } from "@ant-design/icons";
import { ROUTES } from "@/constants/routes";
import { MemberIdCard } from "@/components/wallet/member-id-card";
import { CoffeeCardBalance } from "@/components/wallet/coffee-card-balance";
import { FikaPointsBanner } from "@/components/wallet/fika-points-banner";
import { WalletActionList } from "@/components/wallet/wallet-action-list";
import { ExpressoOffers } from "@/components/landing/expresso-offers";

export default function MyIdPage() {
  return (
    <div className="min-h-screen bg-[#f7f8f6] text-gray-900 font-sans flex flex-col justify-between selection:bg-brand-sage selection:text-[#1e3932]">
      {/* Top Header Bar matching web design system */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-2xs">
        <div className="mx-auto max-w-md md:max-w-7xl px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <Link
            href={ROUTES.HOME}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-800 bg-gray-100 hover:bg-gray-200 px-3.5 py-1.5 rounded-full shadow-2xs transition-all border border-gray-200/60 cursor-pointer active:scale-95"
          >
            <LeftOutlined className="text-xs" />
            <span>Back</span>
          </Link>

          <h1 className="text-base sm:text-lg font-extrabold text-[#16302b]">
            Member ID & Wallet
          </h1>

          <div className="w-16" />
        </div>
      </header>

      {/* Main Responsive Grid Layout Container matching max-w-7xl design system */}
      <main className="flex-1 max-w-md md:max-w-7xl mx-auto w-full p-4 sm:px-6 lg:px-8 pt-6 pb-20 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ==============================================================================
              LEFT COLUMN: Member ID, Coffee Card Balance & Points Banner (lg:col-span-7)
             ============================================================================== */}
          <div className="lg:col-span-7 space-y-6">
            {/* Reusable Member ID Card */}
            <MemberIdCard />

            {/* Reusable Coffee Card Balance Box */}
            <CoffeeCardBalance />

            {/* Reusable Fika Points Banner */}
            <FikaPointsBanner />
          </div>

          {/* ==============================================================================
              RIGHT COLUMN: Quick Action List & Options (lg:col-span-5)
             ============================================================================== */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-20">
            <div className="space-y-2">
              <h3 className="text-xs font-extrabold text-[#16302b] uppercase tracking-wider">
                Wallet Options
              </h3>
              <WalletActionList />
            </div>
          </div>
        </div>

        {/* Embedded Expresso Offers Carousel Section */}
        <div className="pt-6 border-t border-gray-200/80">
          <ExpressoOffers />
        </div>
      </main>
    </div>
  );
}
