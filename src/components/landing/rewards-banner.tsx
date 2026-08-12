"use client";

import React from "react";
import { ArrowRightOutlined } from "@ant-design/icons";

import Image from "next/image";

interface RewardsBannerProps {
  onCollectPointsClick?: () => void;
}

export const RewardsBanner: React.FC<RewardsBannerProps> = ({ onCollectPointsClick }) => {
  return (
    <div className="mx-4 md:mx-auto md:max-w-5xl my-4">
      <div 
        onClick={onCollectPointsClick}
        className="bg-[#e8efe6] hover:bg-[#e1ebd9] transition-all duration-200 rounded-2xl p-5 sm:p-6 flex items-center justify-between shadow-xs border border-[#d6e3d3] cursor-pointer group"
      >
        <div className="space-y-1.5">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#16302b] tracking-tight leading-tight">
            Collect points to get rewards
          </h2>
          <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-[#1e3932] group-hover:translate-x-1 transition-transform">
            <span>Expresso House</span>
            <ArrowRightOutlined className="text-xs" />
          </div>
        </div>

        {/* Circular Espresso House Badge Logo Image */}
        <div className="relative shrink-0">
          <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full overflow-hidden shadow-md border-2 border-[#d4a373] relative">
            <Image
              src="/logo.png"
              alt="Espresso House Logo"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
  