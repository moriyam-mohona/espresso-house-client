"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LeftOutlined, StarOutlined, PlusCircleOutlined, CheckCircleOutlined, ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { ROUTES } from "@/constants/routes";
import { DUMMY_POINTS_HISTORY, PointsHistoryItem } from "@/constants/rewards-data";

type TabType = "expiring" | "available" | "history";

export default function PointsHistoryPage() {
  const [activeTab, setActiveTab] = useState<TabType>("available");
  const [isDemoEmpty, setIsDemoEmpty] = useState<boolean>(true);
  const [historyItems] = useState<PointsHistoryItem[]>(DUMMY_POINTS_HISTORY);

  // Dynamic stats based on isDemoEmpty state
  const availablePoints = isDemoEmpty ? 0 : 142;
  const expiringPoints = 0;
  const historyCount = isDemoEmpty ? 0 : historyItems.length;

  return (
    <div className="min-h-screen bg-gray-50/50 text-gray-900 font-sans flex flex-col justify-between">
      {/* Top Header Bar matching Screenshot */}
      <header className="sticky top-0 z-30 bg-brand-sage px-4 py-3 border-b border-[#d6e3d3]/80">
        <div className="mx-auto max-w-md md:max-w-xl flex items-center justify-between">
          <Link
            href={ROUTES.REWARDS}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-800 bg-white px-3.5 py-1.5 rounded-full shadow-xs hover:bg-gray-100 transition-all border border-gray-200/60"
          >
            <LeftOutlined className="text-xs" />
            <span>Back</span>
          </Link>

          <h1 className="text-base sm:text-lg font-bold text-[#16302b]">
            Expresso Points
          </h1>

          {/* Quick toggle between Empty State (screenshot default) and Populated state */}
          <button
            onClick={() => setIsDemoEmpty(!isDemoEmpty)}
            className="flex items-center gap-1 text-[11px] font-bold bg-[#1e3932] text-white px-3 py-1.5 rounded-full hover:bg-primary transition-colors"
            title="Toggle between Empty state and Populated state"
          >
            <PlusCircleOutlined />
            <span>{isDemoEmpty ? "Show Data" : "Show 0 Pts"}</span>
          </button>
        </div>

        {/* 3-Tab Summary Navigation Bar matching Screenshot */}
        <div className="mx-auto max-w-md md:max-w-xl mt-3 grid grid-cols-3 bg-white rounded-t-xl border border-b-0 border-gray-200/80 shadow-2xs">
          {/* Tab 1: Expiring */}
          <button
            onClick={() => setActiveTab("expiring")}
            className={`py-3 px-2 flex flex-col items-center justify-center transition-all border-r border-gray-100 relative ${
              activeTab === "expiring"
                ? "bg-white border-b-2 border-red-500 shadow-2xs"
                : "bg-gray-50/50 hover:bg-white text-gray-500"
            }`}
          >
            <span className="text-2xl font-bold text-red-500 leading-tight">
              {expiringPoints}
            </span>
            <span className="text-xs font-semibold text-red-500/90 mt-0.5">
              Expiring
            </span>
          </button>

          {/* Tab 2: Available */}
          <button
            onClick={() => setActiveTab("available")}
            className={`py-3 px-2 flex flex-col items-center justify-center transition-all border-r border-gray-100 relative ${
              activeTab === "available"
                ? "bg-white border-b-2 border-[#1e3932] shadow-2xs"
                : "bg-gray-50/50 hover:bg-white text-gray-500"
            }`}
          >
            <span className="text-2xl font-bold text-[#1e3932] leading-tight">
              {availablePoints}
            </span>
            <span className="text-xs font-semibold text-[#1e3932] mt-0.5">
              Available
            </span>
          </button>

          {/* Tab 3: History */}
          <button
            onClick={() => setActiveTab("history")}
            className={`py-3 px-2 flex flex-col items-center justify-center transition-all relative ${
              activeTab === "history"
                ? "bg-white border-b-2 border-[#1e3932] shadow-2xs"
                : "bg-gray-50/50 hover:bg-white text-gray-500"
            }`}
          >
            <span className="text-2xl font-bold text-gray-500 leading-tight">
              {historyCount}
            </span>
            <span className="text-xs font-semibold text-gray-400 mt-0.5">
              History
            </span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-6 max-w-md md:max-w-xl mx-auto w-full">
        {/* Render Tab 2: Available (Default) */}
        {activeTab === "available" && (
          <>
            {isDemoEmpty || availablePoints === 0 ? (
              /* Empty State matching Screenshot exactly */
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-xs text-center my-4 flex flex-col items-center justify-center min-h-75">
                {/* Circular Outline Star Icon */}
                <div className="h-16 w-16 rounded-full border-2 border-gray-800 flex items-center justify-center mb-6">
                  <StarOutlined className="text-3xl text-gray-800" />
                </div>

                <p className="text-base sm:text-lg font-semibold text-gray-800 max-w-xs leading-snug">
                  Sorry, no Fika Points are available.
                </p>
                <p className="text-sm text-gray-600 mt-1 max-w-xs">
                  Get points by purchasing Fika!
                </p>

                <div className="mt-8">
                  <Link
                    href={ROUTES.HOME}
                    className="inline-block bg-[#1e3932] hover:bg-primary text-white px-6 py-2.5 rounded-full text-xs font-bold transition-all shadow-xs"
                  >
                    Explore Menu & Order
                  </Link>
                </div>
              </div>
            ) : (
              /* Populated State */
              <div className="space-y-4">
                <div className="bg-brand-sage p-5 rounded-2xl border border-[#d6e3d3] flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-[#16302b]">Gold Member Account</h3>
                    <p className="text-xs text-gray-600">Points collected are valid for 6 months</p>
                  </div>
                  <span className="bg-[#1e3932] text-white text-xs font-bold px-3 py-1 rounded-full">
                    {availablePoints} pts
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-3">
                  <h4 className="font-bold text-sm text-[#16302b]">Active Points Summary</h4>
                  <div className="flex justify-between text-xs py-2 border-b border-gray-100 text-gray-600">
                    <span>Base Purchase Points</span>
                    <span className="font-bold text-[#1e3932]">130 pts</span>
                  </div>
                  <div className="flex justify-between text-xs py-2 border-b border-gray-100 text-gray-600">
                    <span>Challenge Bonus Points</span>
                    <span className="font-bold text-[#1e3932]">12 pts</span>
                  </div>
                  <div className="flex justify-between text-xs pt-2 font-bold text-gray-900">
                    <span>Total Available Fika Points</span>
                    <span className="text-[#1e3932]">142 pts</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Render Tab 1: Expiring */}
        {activeTab === "expiring" && (
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200/80 shadow-xs text-center my-4 flex flex-col items-center justify-center min-h-75">
            <div className="h-16 w-16 rounded-full border-2 border-emerald-800 flex items-center justify-center mb-6 bg-emerald-50">
              <CheckCircleOutlined className="text-3xl text-emerald-800" />
            </div>

            <p className="text-base sm:text-lg font-semibold text-gray-800 leading-snug">
              No Fika Points expiring soon!
            </p>
            <p className="text-sm text-gray-600 mt-1 max-w-xs">
              All your points are fresh and valid for the next 6 months.
            </p>
          </div>
        )}

        {/* Render Tab 3: History */}
        {activeTab === "history" && (
          <div className="space-y-3">
            {isDemoEmpty || historyItems.length === 0 ? (
              <div className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-xs text-center my-4">
                <StarOutlined className="text-4xl text-gray-400 mb-3" />
                <p className="font-semibold text-gray-700">No transaction history yet.</p>
              </div>
            ) : (
              historyItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-9 w-9 rounded-full flex items-center justify-center text-sm ${
                        item.points > 0
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {item.points > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#16302b]">{item.title}</h4>
                      <span className="text-xs text-gray-400">{item.date}</span>
                    </div>
                  </div>

                  <span
                    className={`font-black text-sm px-3 py-1 rounded-full ${
                      item.points > 0
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {item.points > 0 ? `+${item.points}` : item.points} pts
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}
