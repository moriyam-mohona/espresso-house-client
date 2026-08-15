"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  LeftOutlined,
  RightOutlined,
  CheckCircleOutlined,
  StarFilled,
  EnvironmentOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { ROUTES } from "@/constants/routes";
import { getBranchById } from "@/data/branches";

export default function BranchDetailPage() {
  const params = useParams();
  const branchId = (params?.branchId as string) || "br-1";
  const branch = getBranchById(branchId);

  return (
    <div className="min-h-screen bg-[#f7f8f6] text-gray-900 font-sans flex flex-col justify-between selection:bg-brand-sage selection:text-[#1e3932]">
      {/* Step Indicator Header Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-2xs">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href={ROUTES.ORDER}
              className="h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-all cursor-pointer border border-gray-200/80 active:scale-95"
              aria-label="Go Back to Store Locator"
            >
              <LeftOutlined className="text-xs" />
            </Link>

            <div>
              <h1 className="text-base sm:text-lg font-extrabold text-[#16302b] flex items-center gap-2">
                <span>{branch.name}</span>
                <span className="hidden sm:inline-block bg-brand-sage text-[#1e3932] text-[11px] font-black px-2.5 py-0.5 rounded-full">
                  Fika Express
                </span>
              </h1>
              <p className="text-[11px] text-gray-500 font-medium">
                Step 2 of 3: Store Information & Hours
              </p>
            </div>
          </div>

          {/* Header Step Progress Pills */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href={ROUTES.ORDER}
              className="px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer bg-gray-100 text-gray-600 hover:bg-gray-200"
            >
              1. Location
            </Link>
            <span className="text-gray-300">›</span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#1e3932] text-white shadow-xs">
              2. Details
            </span>
            <span className="text-gray-300">›</span>
            <Link
              href={`/order/${branch.id}/menu`}
              className="px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer bg-gray-100 text-gray-600 hover:bg-gray-200"
            >
              3. Order Menu
            </Link>
          </div>
        </div>
      </header>

      {/* Main Store Details Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full p-4 sm:px-6 lg:px-8 pb-28">
        <div className="bg-white rounded-3xl overflow-hidden border border-gray-200/90 shadow-md space-y-6">
          {/* Header Hero Banner with Store Photo */}
          <div className="relative h-64 sm:h-80 w-full overflow-hidden">
            <Image
              src={branch.imageSrc}
              alt={branch.name}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

            {/* Top Floating Badge */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <span className="bg-white/90 backdrop-blur-md text-[#1e3932] font-black text-xs px-3.5 py-1.5 rounded-full shadow-md border border-gray-200">
                📍 {branch.city}
              </span>

              <span className="bg-emerald-500 text-white font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                <span>Open • Closes {branch.closingTime}</span>
              </span>
            </div>

            {/* Bottom Store Title Overlay */}
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-xs font-bold text-amber-300 bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-500/40">
                  <StarFilled className="text-amber-400" />
                  {branch.rating} ({branch.reviewsCount} reviews)
                </span>
                <span className="text-xs text-emerald-200 font-bold bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                  {branch.distance} away
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {branch.name}
              </h2>
              <p className="text-xs sm:text-sm text-gray-200 font-medium">
                {branch.address}, {branch.city}
              </p>
            </div>
          </div>

          {/* Information Grid */}
          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Address & Map Links */}
            <div className="space-y-6">
              <div className="space-y-3 pb-6 border-b border-gray-200">
                <h3 className="text-base font-extrabold text-[#16302b] flex items-center gap-2">
                  <EnvironmentOutlined className="text-emerald-700" />
                  <span>Location & Directions</span>
                </h3>
                <div className="text-xs sm:text-sm text-gray-600 font-medium space-y-1 leading-relaxed bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <p className="font-bold text-[#16302b]">{branch.name}</p>
                  <p>{branch.address}</p>
                  <p>{branch.city}, {branch.country}</p>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <a
                    href={`https://maps.apple.com/?q=${encodeURIComponent(branch.name + " " + branch.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-brand-sage hover:bg-emerald-200 text-[#1e3932] px-4 py-2 rounded-full font-bold text-xs transition-all flex items-center gap-1.5"
                  >
                    <span>Open Apple Maps</span>
                    <RightOutlined className="text-[10px]" />
                  </a>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.name + " " + branch.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full font-bold text-xs transition-all flex items-center gap-1.5"
                  >
                    <span>Google Maps</span>
                    <RightOutlined className="text-[10px]" />
                  </a>
                </div>
              </div>

              {/* Amenities */}
              <div className="space-y-3">
                <h3 className="text-base font-extrabold text-[#16302b]">
                  Features & Amenities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {branch.amenities.map((amenity, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs font-semibold text-gray-700 bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100"
                    >
                      <CheckCircleOutlined className="text-emerald-700 text-sm" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Opening Hours & Busy Times */}
            <div className="space-y-6">
              <div className="space-y-3 pb-6 border-b border-gray-200">
                <h3 className="text-base font-extrabold text-[#16302b] flex items-center gap-2">
                  <ClockCircleOutlined className="text-emerald-700" />
                  <span>Opening Hours</span>
                </h3>

                <div className="space-y-2.5 text-xs sm:text-sm font-medium">
                  <div className="flex justify-between items-center bg-brand-sage text-[#1e3932] p-3 rounded-2xl font-bold">
                    <span>Monday - Friday (Today)</span>
                    <span>{branch.hours}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-2xl bg-gray-50 text-gray-700">
                    <span>Saturday</span>
                    <span className="font-bold">10:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-2xl bg-gray-50 text-gray-700">
                    <span>Sunday & Holidays</span>
                    <span className="font-bold">11:00 - 17:00</span>
                  </div>
                </div>
              </div>

              {/* Crowd status */}
              <div className="bg-amber-50 border border-amber-200/80 p-4 rounded-2xl space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-900">Current Fika Atmosphere</span>
                  <span className="text-xs font-black bg-amber-200 text-amber-950 px-2 py-0.5 rounded-full uppercase">
                    {branch.crowdLevel} Now
                  </span>
                </div>
                <p className="text-xs text-amber-800/90 font-medium">
                  Great time for a relaxed coffee break. Barista preparation time currently ~8-10 mins.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Fixed CTA Bar for Step 2 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md p-4 border-t border-gray-200 z-30 shadow-xl">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-gray-500 font-medium">Ready to order?</p>
            <h4 className="text-sm font-extrabold text-[#16302b]">{branch.name}</h4>
          </div>

          <Link
            href={`/order/${branch.id}/menu`}
            className="bg-[#1e3932] hover:bg-primary-hover text-white px-8 py-3.5 rounded-full font-bold text-sm sm:text-base shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <span>Explore Menu & Order</span>
            <RightOutlined className="text-xs" />
          </Link>
        </div>
      </div>
    </div>
  );
}
