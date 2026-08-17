"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CloseOutlined,
  SearchOutlined,
  CompassOutlined,
  StarFilled,
  EnvironmentOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { App, Input } from "antd";
import { ROUTES } from "@/constants/routes";
import { mockBranches, Branch } from "@/data/branches";

export default function OrderPage() {
  const router = useRouter();
  const { message } = App.useApp();

  const [branchTab, setBranchTab] = useState<"nearby" | "favorites">("nearby");
  const [selectedBranch, setSelectedBranch] = useState<Branch>(mockBranches[0]);
  const [favoriteBranches, setFavoriteBranches] = useState<string[]>(["br-1"]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLocating, setIsLocating] = useState<boolean>(false);

  // Filtered Branches based on Search
  const filteredBranches = mockBranches.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.city.toLowerCase().includes(searchQuery.toLowerCase());

    if (branchTab === "favorites") {
      return matchesSearch && favoriteBranches.includes(b.id);
    }
    return matchesSearch;
  });

  const toggleFavorite = (branchId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavoriteBranches((prev) =>
      prev.includes(branchId) ? prev.filter((id) => id !== branchId) : [...prev, branchId]
    );
    message.success(
      favoriteBranches.includes(branchId) ? "Removed from favorites" : "Added to favorite coffee shops! ❤️"
    );
  };

  const handleGetLocation = () => {
    setIsLocating(true);
    message.loading({ content: "Locating nearest Espresso House...", key: "loc" });

    setTimeout(() => {
      setIsLocating(false);
      message.success({
        content: "📍 Located! Showing nearest shops in Joensuu & Stockholm.",
        key: "loc",
      });
    }, 800);
  };

  const handleNavigateToBranch = (branch: Branch, routeType: "detail" | "menu") => {
    if (routeType === "menu") {
      router.push(`/order/${branch.id}/menu`);
    } else {
      router.push(`/order/${branch.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f8f6] text-gray-900 font-sans flex flex-col justify-between selection:bg-brand-sage selection:text-[#1e3932]">
      {/* Step Indicator Header Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-2xs">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href={ROUTES.HOME}
              className="h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-all cursor-pointer border border-gray-200/80 active:scale-95"
              aria-label="Go Back to Home"
            >
              <CloseOutlined className="text-xs" />
            </Link>

            <div>
              <h1 className="text-base sm:text-lg font-extrabold text-[#16302b] flex items-center gap-2">
                <span>Espresso Club Pre-Order</span>
                <span className="hidden sm:inline-block bg-brand-sage text-[#1e3932] text-[11px] font-black px-2.5 py-0.5 rounded-full">
                  Fika Express
                </span>
              </h1>
              <p className="text-[11px] text-gray-500 font-medium">
                Step 1 of 3: Select Coffee Shop Location
              </p>
            </div>
          </div>

          {/* Header Step Progress Pills */}
          <div className="hidden md:flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#1e3932] text-white shadow-xs">
              1. Location
            </span>
            <span className="text-gray-300">›</span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-400">
              2. Details
            </span>
            <span className="text-gray-300">›</span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-400">
              3. Order Menu
            </span>
          </div>
        </div>
      </header>

      {/* Main Store Locator Body */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4  pb-16">
        {/* Top Banner / Store Locator Intro */}
        <div className="mb-4 bg-linear-to-r from-[#1e3932] via-primary-hover to-[#142722] text-white rounded-3xl p-5 sm:p-6 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <span className="bg-white/20 text-emerald-100 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              📍 Store Locator
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight pt-1">
              Find your nearest Espresso House
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl">
              Pre-order ahead, skip the line, and enjoy your fresh Fika right when you step inside.
            </p>
          </div>

          <button
            onClick={handleGetLocation}
            disabled={isLocating}
            className="bg-white hover:bg-emerald-50 text-[#1e3932] px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-2 shrink-0 active:scale-95"
          >
            <CompassOutlined className={isLocating ? "animate-spin text-base" : "text-base"} />
            <span>{isLocating ? "Locating..." : "Use My Current Location"}</span>
          </button>
        </div>

        {/* Desktop & Mobile Split Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Branch Search & Scrollable Cards (5 cols desktop) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-4 rounded-3xl border border-gray-200/90 shadow-xs space-y-3">
              {/* Search Bar Input */}
              <Input
                prefix={<SearchOutlined className="text-gray-400 mr-1 text-base" />}
                placeholder="Search city, street or coffee shop name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                allowClear
                className="rounded-2xl py-2.5 px-4 bg-gray-100/80 border-gray-200 text-sm"
              />

              {/* Tab Switcher Pills */}
              <div className="bg-gray-100 p-1 rounded-2xl flex items-center">
                <button
                  onClick={() => setBranchTab("nearby")}
                  className={`flex-1 py-2 rounded-xl font-extrabold text-xs transition-all cursor-pointer ${
                    branchTab === "nearby"
                      ? "bg-white text-[#1e3932] shadow-xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Nearby ({mockBranches.length})
                </button>
                <button
                  onClick={() => setBranchTab("favorites")}
                  className={`flex-1 py-2 rounded-xl font-extrabold text-xs transition-all cursor-pointer flex items-center justify-center gap-1 ${
                    branchTab === "favorites"
                      ? "bg-white text-[#1e3932] shadow-xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <HeartFilled className={favoriteBranches.length > 0 ? "text-red-500" : ""} />
                  <span>Favorites ({favoriteBranches.length})</span>
                </button>
              </div>
            </div>

            {/* Branch Cards Scroll Area */}
            <div className="space-y-3 max-h-130 overflow-y-auto pr-1">
              {filteredBranches.length === 0 ? (
                <div className="bg-white p-8 rounded-3xl border border-gray-200 text-center space-y-2">
                  <EnvironmentOutlined className="text-3xl text-gray-300" />
                  <h3 className="text-base font-bold text-gray-700">No coffee shops found</h3>
                  <p className="text-xs text-gray-500">Try searching for Joensuu, Stockholm, or Kotka.</p>
                </div>
              ) : (
                filteredBranches.map((b) => {
                  const isSelected = selectedBranch.id === b.id;
                  const isFav = favoriteBranches.includes(b.id);

                  return (
                    <div
                      key={b.id}
                      onClick={() => setSelectedBranch(b)}
                      className={`p-4 rounded-3xl border transition-all cursor-pointer relative group ${
                        isSelected
                          ? "bg-white border-[#1e3932] ring-2 ring-[#1e3932]/20 shadow-md"
                          : "bg-white border-gray-200/90 hover:border-gray-300 hover:shadow-xs"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1.5 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              Open • Closes {b.closingTime}
                            </span>
                            <span className="text-[11px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                              {b.distance}
                            </span>
                          </div>

                          <h3 className="text-base font-extrabold text-[#16302b] group-hover:text-[#1e3932] transition-colors">
                            {b.name}
                          </h3>

                          <p className="text-xs text-gray-600 font-medium line-clamp-1">
                            {b.address}, {b.city}
                          </p>

                          {/* Ratings & Amenities snippet */}
                          <div className="flex items-center gap-3 pt-1 text-xs text-gray-500">
                            <span className="flex items-center gap-1 font-bold text-amber-600">
                              <StarFilled className="text-amber-400 text-xs" />
                              {b.rating} ({b.reviewsCount})
                            </span>
                            <span>•</span>
                            <span className="text-emerald-700 font-medium">⚡ {b.amenities[0]}</span>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <button
                            onClick={(e) => toggleFavorite(b.id, e)}
                            className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                            title="Favorite branch"
                          >
                            {isFav ? (
                              <HeartFilled className="text-red-500 text-lg" />
                            ) : (
                              <HeartOutlined className="text-lg" />
                            )}
                          </button>

                          <button
                            onClick={() => handleNavigateToBranch(b, "detail")}
                            className="bg-[#1e3932] hover:bg-primary-hover text-white px-4 py-2 rounded-full font-bold text-xs shadow-xs transition-all cursor-pointer mt-2 active:scale-95"
                          >
                            Select Store
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Column: Styled Interactive Map Viewport (7 cols desktop) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden shadow-lg border border-gray-200/90 h-130 lg:h-170 bg-[#d0e3ec] flex flex-col">
              {/* Background Styled Map Pattern */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-90"
                style={{
                  backgroundImage: "radial-gradient(#a3c5d6 2px, transparent 2px)",
                  backgroundSize: "28px 28px",
                }}
              >
                <svg className="w-full h-full opacity-50" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 0,220 Q 200,100 400,260 T 800,200 T 1200,340 L 1200,800 L 0,800 Z" fill="#9ec5d7" />
                  <path d="M 100,0 Q 300,400 600,250 T 1100,600" stroke="#ffffff" strokeWidth="14" fill="none" />
                  <path d="M 0,150 Q 400,150 700,500 T 1200,150" stroke="#fcd34d" strokeWidth="9" fill="none" />
                </svg>
              </div>

              {/* Map Floating Header Overlay */}
              <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-md border border-gray-200 text-xs font-bold text-[#1e3932] flex items-center gap-2 pointer-events-auto">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Interactive Map • {filteredBranches.length} Stores Available</span>
                </div>

                <div className="bg-[#1e3932] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-md">
                  Nordic Fika Network
                </div>
              </div>

              {/* Map Pins */}
              <div className="absolute inset-0 z-10">
                {mockBranches.map((b, idx) => {
                  const isSelected = selectedBranch.id === b.id;
                  const topOffsets = ["30%", "45%", "60%", "35%", "50%"];
                  const leftOffsets = ["50%", "30%", "25%", "70%", "65%"];

                  return (
                    <div
                      key={b.id}
                      style={{ top: topOffsets[idx % 5], left: leftOffsets[idx % 5] }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                      onClick={() => setSelectedBranch(b)}
                    >
                      {/* Pin Pulse Glow */}
                      {isSelected && (
                        <div className="absolute -inset-3 rounded-full bg-[#1e3932]/30 animate-ping" />
                      )}

                      <div
                        className={`h-11 w-11 rounded-full font-black text-xs flex items-center justify-center shadow-xl border-2 transition-all duration-300 ${
                          isSelected
                            ? "bg-[#1e3932] text-white border-amber-300 scale-125 z-30"
                            : "bg-red-600 text-white border-white hover:scale-110 z-20"
                        }`}
                      >
                        ☕
                      </div>

                      {/* Hover Popup Label */}
                      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-white text-gray-900 px-3 py-1.5 rounded-xl shadow-xl border border-gray-200 text-xs font-extrabold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-40">
                        {b.name} ({b.distance})
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Selected Branch Map Card Drawer at Bottom Right */}
              <div className="absolute bottom-4 left-4 right-4 z-20 bg-white/95 backdrop-blur-md p-4 rounded-3xl shadow-xl border border-gray-200/90 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="relative h-14 w-14 rounded-2xl overflow-hidden shrink-0 border border-gray-200">
                    <Image src={selectedBranch.imageSrc} alt={selectedBranch.name} fill className="object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black bg-emerald-100 text-[#1e3932] px-2 py-0.5 rounded-full">
                        SELECTED SHOP
                      </span>
                      <span className="text-xs text-gray-500 font-semibold">{selectedBranch.distance}</span>
                    </div>
                    <h4 className="text-sm font-extrabold text-[#16302b]">{selectedBranch.name}</h4>
                    <p className="text-xs text-gray-500 line-clamp-1">{selectedBranch.address}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => handleNavigateToBranch(selectedBranch, "detail")}
                    className="flex-1 sm:flex-initial bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2.5 rounded-full font-bold text-xs transition-all cursor-pointer"
                  >
                    Store Info
                  </button>
                  <button
                    onClick={() => handleNavigateToBranch(selectedBranch, "menu")}
                    className="flex-1 sm:flex-initial bg-[#1e3932] hover:bg-primary-hover text-white px-5 py-2.5 rounded-full font-bold text-xs shadow-md transition-all cursor-pointer active:scale-95"
                  >
                    Order Here
                  </button>
                </div>
              </div>

              {/* Compass Floating Target Button */}
              <button
                onClick={handleGetLocation}
                disabled={isLocating}
                className="absolute top-16 right-4 z-20 h-11 w-11 rounded-full bg-[#1e3932] text-white flex items-center justify-center text-lg shadow-xl hover:bg-primary-hover transition-all cursor-pointer active:scale-95"
                title="My Location"
              >
                <CompassOutlined className={isLocating ? "animate-spin" : ""} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
