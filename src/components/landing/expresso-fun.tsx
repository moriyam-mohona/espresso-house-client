"use client";

import React, { useState } from "react";
import { ArrowRightOutlined, ClockCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { message } from "antd";

export const ExpressoFun: React.FC = () => {
  const [visits, setVisits] = useState<number>(0);

  const handleSimulateVisit = () => {
    if (visits < 2) {
      const nextVisits = visits + 1;
      setVisits(nextVisits);
      if (nextVisits === 2) {
        message.success("🎉 Challenge Completed! You earned 3 Loyalty Points!");
      } else {
        message.info(`Visit recorded! (${nextVisits}/2 completed)`);
      }
    } else {
      setVisits(0);
      message.info("Challenge reset for demo!");
    }
  };

  return (
    <div id="fika-fun" className="mx-4 md:mx-auto md:max-w-5xl my-6">
      <div className="bg-[#e8efe6] rounded-2xl p-5 sm:p-6 border border-[#d6e3d3] shadow-xs">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#16302b] tracking-tight flex items-center gap-2">
            <span>Expresso Fun</span>
            <span className="text-xs text-gray-500 font-normal">(Fika Fun Challenges)</span>
          </h2>
          <button 
            onClick={handleSimulateVisit}
            className="text-[#1e3932] hover:text-[#2d5349] p-1 transition-transform hover:translate-x-1 flex items-center gap-1 text-sm font-semibold"
          >
            <span>View All</span>
            <ArrowRightOutlined className="text-base" />
          </button>
        </div>

        {/* Challenge Card Container matching Screenshot 1 */}
        <div 
          onClick={handleSimulateVisit}
          className="relative bg-[#f4f6f0] hover:bg-white transition-all duration-200 rounded-2xl p-5 border border-[#d2dec0] shadow-xs cursor-pointer group"
        >
          {/* Top Row: New Badge & Points Reward */}
          <div className="flex items-center justify-between mb-3">
            <span className="bg-[#1e3932] text-white text-xs font-bold px-3 py-1 rounded-md shadow-xs">
              New
            </span>
            <span className="text-lg font-black text-[#1e3932]">
              3p
            </span>
          </div>

          {/* Card Body */}
          <div className="flex items-center gap-4">
            {/* Progress Meter Ring with Clock Icon */}
            <div className="relative shrink-0 flex items-center justify-center">
              <div className="h-16 w-16 rounded-full border-4 border-[#1e3932]/20 flex flex-col items-center justify-center bg-white shadow-xs relative">
                {visits === 2 ? (
                  <CheckCircleOutlined className="text-2xl text-emerald-600" />
                ) : (
                  <>
                    <ClockCircleOutlined className="text-sm text-[#1e3932] mb-0.5" />
                    <span className="text-xs font-extrabold text-[#1e3932]">{visits}/2</span>
                  </>
                )}
                {/* SVG Progress Circle Overlay */}
                <svg className="absolute inset-0 h-full w-full -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="#1e3932"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="175"
                    strokeDashoffset={175 - (175 * visits) / 2}
                    className="transition-all duration-500 ease-out"
                  />
                </svg>
              </div>
            </div>

            {/* Text details */}
            <div className="flex-1">
              <h3 className="text-base sm:text-lg font-bold text-[#16302b] leading-tight group-hover:text-[#1e3932] transition-colors">
                Visit Espresso House 2 times in 10 days
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">
                {visits === 2 ? "Completed! 3 points added to account." : "Ends in 20 days • Tap to record visit"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
