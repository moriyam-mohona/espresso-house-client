"use client";

import React from "react";
import Link from "next/link";
import { LeftOutlined } from "@ant-design/icons";
import { ROUTES } from "@/constants/routes";
import { MemberIdCard } from "@/components/wallet/member-id-card";
import { CoffeeCardBalance } from "@/components/wallet/coffee-card-balance";
import { FikaPointsBanner } from "@/components/wallet/fika-points-banner";
import { WalletActionList } from "@/components/wallet/wallet-action-list";

export default function WalletPage() {
  return (
    <div className="min-h-screen bg-[#f7f8f6] text-gray-900 font-sans flex flex-col justify-between">
      {/* Sticky Header Bar */}
      <header className="sticky top-0 z-30 bg-white px-4 py-3.5 border-b border-gray-200/80 shadow-2xs">
        <div className="mx-auto max-w-md md:max-w-7xl flex items-center justify-between">
          <Link
            href={ROUTES.HOME}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-800 bg-gray-100 hover:bg-gray-200 px-3.5 py-1.5 rounded-full transition-all border border-gray-200/60"
          >
            <LeftOutlined className="text-xs" />
            <span>Back</span>
          </Link>

          <h1 className="text-xl sm:text-2xl font-extrabold text-[#16302b] tracking-tight">
            Wallet
          </h1>

          <div className="w-16" />
        </div>
      </header>

      {/* Main Wallet Container matching Screenshots 1, 2, 3 & 4 */}
      <main className="flex-1 pb-16 pt-4">
        <div className="mx-auto max-w-md sm:max-w-7xl px-4 space-y-4">
          {/* Section 1: Member ID Card */}
          <MemberIdCard />

          {/* Section 2: Coffee Card Balance Container */}
          <CoffeeCardBalance />

          {/* Section 3: Loyalty Fika Points Banner */}
          <FikaPointsBanner />

          {/* Section 4 & 5: Gift & Interactive Wallet Options */}
          <WalletActionList />
        </div>
      </main>
    </div>
  );
}
