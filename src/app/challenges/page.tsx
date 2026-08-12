"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  LeftOutlined,
  InfoCircleOutlined,
  ClockCircleOutlined,
  StarOutlined,
  CloseOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Modal, App } from "antd";
import { ROUTES } from "@/constants/routes";
import { DUMMY_CHALLENGES, ChallengeItem } from "@/constants/challenges-data";

export default function ChallengesPage() {
  const { message } = App.useApp();
  const searchParams = useSearchParams();
  const initialId = searchParams.get("id");

  const [activeTab, setActiveTab] = useState<"active" | "completed">("active");
  const [selectedChallenge, setSelectedChallenge] = useState<ChallengeItem | null>(() => {
    return initialId ? DUMMY_CHALLENGES.find((c) => c.id === initialId) || null : null;
  });
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const [completedCount] = useState<number>(0);

  const handleOrderAtCoffeeShop = () => {
    message.success("Opening Pre-Order menu for coffee shop visit...");
    setSelectedChallenge(null);
  };

  return (
    <div className="min-h-screen bg-[#e8efe6] text-gray-900 font-sans flex flex-col justify-between">
      {/* Top Header Bar matching Screenshot Flow */}
      <header className="sticky top-0 z-30 bg-[#e8efe6] px-4 py-3 border-b border-[#d6e3d3]/80">
        <div className="mx-auto max-w-md md:max-w-xl flex items-center justify-between">
          <Link
            href={ROUTES.HOME}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-800 bg-white px-3.5 py-1.5 rounded-full shadow-xs hover:bg-gray-100 transition-all border border-gray-200/60"
          >
            <LeftOutlined className="text-xs" />
            <span>Back</span>
          </Link>

          <h1 className="text-base sm:text-lg font-bold text-[#16302b]">
            Challenges
          </h1>

          <div className="w-16" />
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 pb-12">
        <div className="mx-auto max-w-md md:max-w-xl">
          {/* Top Banner matching Screen 1 & Screen 2 */}
          <div className="px-5 pt-4 pb-6 flex flex-col items-center justify-center text-center">
            <span className="text-5xl sm:text-6xl font-extrabold text-[#16302b] leading-none">
              {completedCount}
            </span>
            <span className="text-base sm:text-lg font-bold text-[#16302b] mt-1">
              Completed challenges
            </span>

            {/* More info link */}
            <button
              onClick={() => setShowInfoModal(true)}
              className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#1e3932]/80 hover:text-[#1e3932] transition-colors"
            >
              <span>More info</span>
              <InfoCircleOutlined className="text-xs" />
            </button>

            {/* Fika House pill button */}
            <Link
              href={ROUTES.REWARDS}
              className="mt-4 bg-white/80 hover:bg-white text-[#1e3932] border border-[#1e3932] px-6 py-1.5 rounded-full text-xs font-extrabold transition-all shadow-2xs"
            >
              Fika House
            </Link>
          </div>

          {/* Fika Fun Section Container matching Screen 1 & Screen 2 */}
          <div className="bg-white rounded-t-3xl min-h-[480px] p-5 sm:p-6 shadow-md border-t border-gray-100">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#16302b] mb-4 tracking-tight">
              Fika Fun
            </h2>

            {/* Tabs Row: Active vs Completed */}
            <div className="flex border-b border-gray-200 mb-5">
              <button
                onClick={() => setActiveTab("active")}
                className={`pb-2.5 px-4 text-sm font-bold transition-all relative ${
                  activeTab === "active"
                    ? "text-[#1e3932] border-b-2 border-[#1e3932]"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setActiveTab("completed")}
                className={`pb-2.5 px-4 text-sm font-bold transition-all relative ${
                  activeTab === "completed"
                    ? "text-[#1e3932] border-b-2 border-[#1e3932]"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                Completed
              </button>
            </div>

            {/* Active Tab Content matching Screen 1 */}
            {activeTab === "active" && (
              <div>
                <h3 className="text-xs font-extrabold text-gray-500 uppercase tracking-wider mb-3">
                  Ongoing
                </h3>

                <div className="space-y-3">
                  {DUMMY_CHALLENGES.map((challenge) => (
                    <div
                      key={challenge.id}
                      onClick={() => setSelectedChallenge(challenge)}
                      className="bg-[#f4f6f0] hover:bg-white transition-all duration-200 rounded-2xl p-4 sm:p-5 border border-[#d2dec0] shadow-xs cursor-pointer group"
                    >
                      {/* Top Row: Tag & Points */}
                      <div className="flex items-center justify-between mb-2">
                        {challenge.badge ? (
                          <span className="bg-[#1e3932] text-white text-xs font-bold px-3 py-0.5 rounded-md shadow-2xs">
                            {challenge.badge}
                          </span>
                        ) : (
                          <span />
                        )}
                        <span className="text-base font-black text-[#1e3932]">
                          {challenge.points}p
                        </span>
                      </div>

                      {/* Body Row */}
                      <div className="flex items-center gap-4">
                        {/* Progress Meter */}
                        <div className="relative shrink-0 flex items-center justify-center">
                          <div className="h-14 w-14 rounded-full border-4 border-[#1e3932]/20 flex flex-col items-center justify-center bg-white shadow-xs relative">
                            <ClockCircleOutlined className="text-xs text-[#1e3932] mb-0.5" />
                            <span className="text-[11px] font-extrabold text-[#1e3932]">
                              {challenge.currentProgress}/{challenge.totalRequired}
                            </span>
                            <svg className="absolute inset-0 h-full w-full -rotate-90">
                              <circle
                                cx="28"
                                cy="28"
                                r="24"
                                stroke="#1e3932"
                                strokeWidth="3.5"
                                fill="none"
                                strokeDasharray="150"
                                strokeDashoffset={
                                  150 - (150 * challenge.currentProgress) / challenge.totalRequired
                                }
                                className="transition-all duration-500 ease-out"
                              />
                            </svg>
                          </div>
                        </div>

                        {/* Text */}
                        <div className="flex-1">
                          <h4 className="text-sm sm:text-base font-bold text-[#16302b] leading-tight group-hover:text-[#1e3932]">
                            {challenge.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1 font-medium">
                            {challenge.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Completed Tab Content matching Screen 2 */}
            {activeTab === "completed" && (
              <div className="py-12 text-center flex flex-col items-center justify-center">
                <div className="h-16 w-16 rounded-full border-2 border-gray-300 flex items-center justify-center mb-4 text-gray-400">
                  <StarOutlined className="text-3xl" />
                </div>
                <p className="text-sm sm:text-base font-semibold text-gray-600">
                  No completed challenges yet.
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Complete active challenges to earn rewards!
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ==============================================================================
          MODAL 1: Fika Fun Challenges Info Modal
         ============================================================================== */}
      <Modal
        open={showInfoModal}
        onCancel={() => setShowInfoModal(false)}
        footer={null}
        centered
        className="rounded-3xl overflow-hidden max-w-md"
      >
        <div className="p-4 text-[#16302b]">
          <h3 className="text-xl font-extrabold text-[#16302b] mb-3">
            About Fika Fun Challenges
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Fika Fun challenges let you earn bonus Fika Points by ordering your favorite drinks, visiting coffee shops, and trying seasonal menu items.
          </p>
          <div className="mt-6">
            <button
              onClick={() => setShowInfoModal(false)}
              className="w-full bg-[#1e3932] text-white py-2.5 rounded-full font-bold text-xs"
            >
              Got It
            </button>
          </div>
        </div>
      </Modal>

      {/* ==============================================================================
          MODAL 2: Challenge Description Detail View matching Screen 3
         ============================================================================== */}
      {selectedChallenge && (
        <Modal
          open={!!selectedChallenge}
          onCancel={() => setSelectedChallenge(null)}
          footer={null}
          centered
          closeIcon={<CloseOutlined className="text-gray-700 text-base" />}
          className="rounded-3xl overflow-hidden max-w-md"
          modalRender={(modalContent) => (
            <div className="rounded-3xl overflow-hidden shadow-2xl bg-white">
              {modalContent}
            </div>
          )}
        >
          <div className="text-[#16302b]">
            {/* Top Sage Header matching Screen 3 */}
            <div className="bg-[#e8efe6] p-6 text-center flex flex-col items-center justify-center relative border-b border-[#d6e3d3]">
              <span className="text-xs font-bold text-[#16302b] uppercase tracking-wider mb-4">
                Description
              </span>

              {/* Large Progress Ring with Points Badge */}
              <div className="relative my-2">
                <div className="h-28 w-28 rounded-full border-4 border-[#1e3932] bg-white flex flex-col items-center justify-center shadow-xs">
                  <ClockCircleOutlined className="text-2xl text-[#1e3932] mb-1" />
                </div>

                {/* Points Badge on Ring top-right */}
                <div className="absolute top-0 right-0 bg-[#1e3932] text-white text-xs font-extrabold px-2.5 py-0.5 rounded-full shadow-xs">
                  {selectedChallenge.points}p
                </div>
              </div>

              {/* Progress Fraction */}
              <span className="text-3xl font-extrabold text-[#16302b] mt-2">
                {selectedChallenge.currentProgress}/{selectedChallenge.totalRequired}
              </span>

              {/* Challenge Title */}
              <h3 className="text-base sm:text-lg font-extrabold text-[#16302b] mt-2 max-w-xs leading-snug">
                {selectedChallenge.title}
              </h3>
              <p className="text-xs text-gray-600 mt-1 font-medium">
                {selectedChallenge.subtitle}
              </p>
            </div>

            {/* Bottom Content Area matching Screen 3 */}
            <div className="p-6 space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
              <p className="font-medium text-gray-800">
                {selectedChallenge.descriptionHeader}
              </p>

              <p className="text-gray-600">
                {selectedChallenge.descriptionBody}
              </p>

              {/* Action Button matching Screen 3 */}
              <div className="pt-4">
                <button
                  onClick={handleOrderAtCoffeeShop}
                  className="w-full bg-white hover:bg-gray-50 border-2 border-[#1e3932] text-[#1e3932] py-3.5 rounded-full font-bold text-sm transition-all flex items-center justify-center gap-2 active:scale-98 shadow-2xs"
                >
                  <ShoppingOutlined className="text-base" />
                  <span>Order at our coffee shop</span>
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
