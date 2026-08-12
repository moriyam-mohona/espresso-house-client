"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRightOutlined } from "@ant-design/icons";
import { ROUTES } from "@/constants/routes";

export const RewardsBanner: React.FC = () => {
  return (
    <div className="mx-4 md:mx-auto md:max-w-5xl my-4">
      <Link href={ROUTES.REWARDS} className="block">
        <div className="bg-brand-sage hover:bg-[#e1ebd9] transition-all duration-200 rounded-2xl p-5 sm:p-6 flex items-center justify-between shadow-xs border border-[#d6e3d3] cursor-pointer group">
          <div className="space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#16302b] tracking-tight leading-tight">
              Collect points to get rewards
            </h2>
            <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-[#1e3932] group-hover:translate-x-1 transition-transform">
              <span>Expresso Club</span>
              <ArrowRightOutlined className="text-xs" />
            </div>
          </div>

          {/* Circular Espresso Club Badge Logo Image */}
          <div className="relative shrink-0">
            <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full overflow-hidden shadow-md border-2 border-[#d4a373] relative">
              <Image
                src="/logo.png"
                alt="Espresso Club Logo"
                fill
                sizes="(max-width: 640px) 56px, 64px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};