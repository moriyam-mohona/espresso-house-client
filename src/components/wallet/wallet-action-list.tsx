"use client";

import React from "react";
import Link from "next/link";
import {
  GiftOutlined,
  TagOutlined,
  CreditCardOutlined,
  FileTextOutlined,
  StarOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { ROUTES } from "@/constants/routes";

export const WalletActionList: React.FC = () => {
  return (
    <div className="space-y-3">
      {/* 1. Send a Gift Banner matching Screenshot 1 & 2 */}
      <Link
        href={ROUTES.SEND_GIFT}
        className="bg-[#dce6d8] hover:bg-[#d3e0cf] rounded-2xl p-4 flex items-center justify-between border border-[#c8d8c2] cursor-pointer transition-all shadow-2xs group"
      >
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-[#1e3932] text-amber-200 flex items-center justify-center text-xl shadow-2xs group-hover:scale-105 transition-transform">
            <GiftOutlined />
          </div>
          <div>
            <h4 className="text-base font-extrabold text-[#16302b]">
              Send a gift!
            </h4>
            <p className="text-xs text-gray-600 font-medium mt-0.5">
              View gift options
            </p>
          </div>
        </div>
        <RightOutlined className="text-xs text-gray-600 group-hover:translate-x-0.5 transition-transform" />
      </Link>

      {/* 2. Fika Offers Card matching Screenshot 2 */}
      <Link
        href={ROUTES.FIKA_OFFERS}
        className="bg-white hover:bg-gray-50 rounded-2xl p-4 border border-gray-200/90 flex items-center justify-between shadow-2xs transition-all cursor-pointer group"
      >
        <div className="flex items-center gap-4">
          <div className="h-11 w-11 rounded-full bg-brand-sage text-[#1e3932] flex items-center justify-center text-lg">
            <TagOutlined />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-extrabold text-[#16302b]">
              Fika Offers (5)
            </h4>
            <p className="text-xs text-emerald-700 font-semibold mt-0.5 flex items-center gap-1">
              <span>View your Fika Offers</span>
              <RightOutlined className="text-[10px]" />
            </p>
          </div>
        </div>
      </Link>

      {/* 3. Payment Cards matching Screenshot 2 */}
      <Link
        href={ROUTES.PAYMENT_CARDS}
        className="bg-white hover:bg-gray-50 rounded-2xl p-4 border border-gray-200/90 flex items-center justify-between shadow-2xs transition-all cursor-pointer group"
      >
        <div className="flex items-center gap-4">
          <div className="h-11 w-11 rounded-full bg-brand-sage text-[#1e3932] flex items-center justify-center text-lg">
            <CreditCardOutlined />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-extrabold text-[#16302b]">
              Payment cards
            </h4>
            <p className="text-xs text-emerald-700 font-semibold mt-0.5 flex items-center gap-1">
              <span>Add payment card</span>
              <RightOutlined className="text-[10px]" />
            </p>
          </div>
        </div>
      </Link>

      {/* 4. Receipts Link matching User Flow */}
      <Link
        href={ROUTES.RECEIPTS}
        className="bg-white hover:bg-gray-50 rounded-2xl p-4 border border-gray-200/90 flex items-center justify-between shadow-2xs transition-all cursor-pointer group"
      >
        <div className="flex items-center gap-4">
          <div className="h-11 w-11 rounded-full bg-brand-sage text-[#1e3932] flex items-center justify-center text-lg">
            <FileTextOutlined />
          </div>
          <h4 className="text-sm sm:text-base font-bold text-[#16302b]">
            Receipts
          </h4>
        </div>
        <RightOutlined className="text-xs text-emerald-700 font-bold" />
      </Link>

      {/* 5. Fika Points Link matching User Request */}
      <Link
        href={ROUTES.REWARDS}
        className="bg-white hover:bg-gray-50 rounded-2xl p-4 border border-gray-200/90 flex items-center justify-between shadow-2xs transition-all cursor-pointer group"
      >
        <div className="flex items-center gap-4">
          <div className="h-11 w-11 rounded-full bg-brand-sage text-[#1e3932] flex items-center justify-center text-lg">
            <StarOutlined />
          </div>
          <h4 className="text-sm sm:text-base font-bold text-[#16302b]">
            Fika Points
          </h4>
        </div>
        <RightOutlined className="text-xs text-emerald-700 font-bold" />
      </Link>
    </div>
  );
};
