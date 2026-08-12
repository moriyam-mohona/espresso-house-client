"use client";

import React from "react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

interface FikaPointsBannerProps {
  userPoints?: number;
}

export const FikaPointsBanner: React.FC<FikaPointsBannerProps> = ({
  userPoints = 0,
}) => {
  return (
    <div className="bg-brand-sage rounded-3xl p-5 sm:p-6 border border-[#d6e3d3] shadow-xs relative overflow-hidden">
      {/* Top Right Organic Fika Club Badge matching Screenshot 1 */}
      <div className="absolute top-3 right-3 z-10">
        <div className="bg-[#1e3932] text-white text-[11px] font-black tracking-wider px-3.5 py-1.5 rounded-xl shadow-xs leading-tight text-center -rotate-3 border border-[#d4a373]">
          <div>Fika</div>
          <div className="text-[10px] text-amber-200">cLuB</div>
        </div>
      </div>

      <div className="max-w-xs space-y-2">
        {/* Points Title */}
        <h3 className="text-xl sm:text-2xl font-extrabold text-[#16302b]">
          {userPoints} Fika Points
        </h3>

        {/* Description Text */}
        <p className="text-xs sm:text-sm font-medium text-gray-700 leading-snug">
          Collect Fika Points and choose your rewards in Fika House
        </p>

        {/* Fika House Pill Button */}
        <div className="pt-3">
          <Link
            href={ROUTES.REWARDS}
            className="inline-block bg-[#1e3932] hover:bg-primary text-white px-6 py-2 rounded-full text-xs font-bold transition-all shadow-2xs active:scale-95"
          >
            Fika House
          </Link>
        </div>
      </div>
    </div>
  );
};
