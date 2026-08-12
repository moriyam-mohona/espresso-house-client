"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LeftOutlined,
  InfoCircleOutlined,
  QrcodeOutlined,
  PlusOutlined,
  CloseOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import { Modal, App } from "antd";
import { ROUTES } from "@/constants/routes";
import { ExpressoOffers } from "@/components/landing/expresso-offers";

export default function MyIdPage() {
  const { message } = App.useApp();
  const [balance, setBalance] = useState<number>(0);
  const [showMemberInfoModal, setShowMemberInfoModal] = useState<boolean>(false);
  const [showBalanceInfoModal, setShowBalanceInfoModal] = useState<boolean>(false);
  const [showTopUpModal, setShowTopUpModal] = useState<boolean>(false);
  const [selectedTopUpAmount, setSelectedTopUpAmount] = useState<number>(200);

  const handleProcessTopUp = () => {
    setBalance((prev) => prev + selectedTopUpAmount);
    message.success(`🎉 Successfully topped up ${selectedTopUpAmount} SEK to your Coffee Card!`);
    setShowTopUpModal(false);
  };

  const handleToggleDemoBalance = () => {
    const newBal = balance === 0 ? 250 : 0;
    setBalance(newBal);
    message.info(`Demo Coffee Card Balance set to ${newBal} SEK`);
  };

  return (
    <div className="min-h-screen bg-[#f7f8f6] text-gray-900 font-sans flex flex-col justify-between">
      {/* Sticky Header Bar */}
      <header className="sticky top-0 z-30 bg-brand-sage px-4 py-3 border-b border-[#d6e3d3]/80">
        <div className="mx-auto max-w-md md:max-w-xl flex items-center justify-between">
          <Link
            href={ROUTES.HOME}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-800 bg-white px-3.5 py-1.5 rounded-full shadow-xs hover:bg-gray-100 transition-all border border-gray-200/60"
          >
            <LeftOutlined className="text-xs" />
            <span>Back</span>
          </Link>

          <h1 className="text-base sm:text-lg font-bold text-[#16302b]">
            Member ID & Card
          </h1>

          {/* Quick Demo Toggle */}
          <button
            onClick={handleToggleDemoBalance}
            className="text-[10px] font-bold text-[#1e3932] bg-white/70 hover:bg-white px-2.5 py-1 rounded-full border border-[#1e3932]/20"
          >
            {balance === 0 ? "Demo: Add 250 SEK" : "Demo: Reset 0 SEK"}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 pb-12 pt-4">
        <div className="mx-auto max-w-md sm:max-w-xl px-4 space-y-4">
          {/* Card 1: Member ID Card matching Screenshot */}
          <div className="bg-white rounded-3xl p-5 border border-gray-200/80 shadow-xs relative">
            {/* Header Row matching Screenshot */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-base font-extrabold text-[#16302b]">
                Member ID
              </span>
              <button
                onClick={() => setShowMemberInfoModal(true)}
                className="flex items-center gap-1 text-xs font-medium text-gray-600 hover:text-[#1e3932] transition-colors"
              >
                <span>info</span>
                <InfoCircleOutlined className="text-xs" />
              </button>
            </div>

            {/* QR & Barcode Container matching Screenshot */}
            <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col items-center justify-center my-2 shadow-2xs">
              {/* QR Code Icon & Pattern */}
              <div className="relative p-2 bg-white rounded-xl flex flex-col items-center">
                <QrcodeOutlined className="text-8xl sm:text-9xl text-[#1e3932]" />
              </div>

              {/* Simulated High-Density Barcode Lines */}
              <div className="w-full max-w-xs h-8 mt-3 flex items-center justify-between gap-0.5 opacity-90">
                {[4, 2, 1, 3, 5, 2, 1, 4, 2, 3, 1, 5, 4, 1, 2, 3, 1, 4, 2, 5, 1, 3, 2, 4, 1, 3, 5, 2, 1, 4].map(
                  (w, i) => (
                    <div
                      key={i}
                      className="h-full bg-[#16302b]"
                      style={{ width: `${w * 2}px` }}
                    />
                  )
                )}
              </div>
            </div>

            {/* Footer Details Row matching Screenshot */}
            <div className="flex items-end justify-between pt-3 border-t border-gray-100 text-xs">
              <div>
                <div className="text-gray-500 font-medium">Membership no:</div>
                <div className="font-mono font-bold text-gray-900 tracking-wide text-xs sm:text-sm mt-0.5">
                  6554646546465
                </div>
              </div>

              <div className="text-right">
                <div className="text-gray-500 font-medium">04 Aug 17:00:26</div>
                <div className="font-mono font-bold text-gray-900 tracking-wide text-xs sm:text-sm mt-0.5">
                  Pin:9201
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Coffee Card Balance Container matching Screenshot */}
          <div className="bg-[#f4f0eb] rounded-3xl p-6 border border-[#e2d7cb] shadow-xs relative text-center flex flex-col items-center justify-center">
            {/* Top Right info link matching Screenshot */}
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setShowBalanceInfoModal(true)}
                className="flex items-center gap-1 text-xs font-medium text-[#7e6452] hover:text-[#5a4638] transition-colors"
              >
                <span>info</span>
                <InfoCircleOutlined className="text-xs" />
              </button>
            </div>

            {/* Big Bold Balance Text matching Screenshot */}
            <span className="text-3xl sm:text-4xl font-extrabold text-[#2c221a] tracking-tight">
              {balance} SEK
            </span>

            {/* Coffee card balance label matching Screenshot */}
            <span className="text-xs sm:text-sm font-semibold text-gray-600 mt-1">
              Coffee card balance
            </span>

            {/* Top up Button matching Screenshot */}
            <button
              onClick={() => setShowTopUpModal(true)}
              className="mt-4 bg-[#947864] hover:bg-[#7e6452] text-white px-8 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all shadow-2xs active:scale-95"
            >
              Top up
            </button>
          </div>

          {/* Section 3: Expresso Offers Component matching Screenshot */}
          <div className="pt-2">
            <ExpressoOffers />
          </div>
        </div>
      </main>

      {/* Member Info Modal */}
      <Modal
        open={showMemberInfoModal}
        onCancel={() => setShowMemberInfoModal(false)}
        footer={null}
        centered
        className="rounded-3xl overflow-hidden max-w-md"
      >
        <div className="p-4 text-[#16302b]">
          <h3 className="text-xl font-extrabold text-[#16302b] mb-3">
            About Member ID
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Scan your unique Member QR Code or Barcode at any Espresso House store checkout to earn Fika Points, redeem offers, and pay seamlessly using your digital Coffee Card.
          </p>
          <div className="mt-6">
            <button
              onClick={() => setShowMemberInfoModal(false)}
              className="w-full bg-[#1e3932] text-white py-2.5 rounded-full font-bold text-xs"
            >
              Got It
            </button>
          </div>
        </div>
      </Modal>

      {/* Balance Info Modal */}
      <Modal
        open={showBalanceInfoModal}
        onCancel={() => setShowBalanceInfoModal(false)}
        footer={null}
        centered
        className="rounded-3xl overflow-hidden max-w-md"
      >
        <div className="p-4 text-[#16302b]">
          <h3 className="text-xl font-extrabold text-[#16302b] mb-3">
            Coffee Card Balance Info
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Your Coffee Card allows contactless payments in store and in app. Top up your balance anytime using credit card or digital wallet payment methods.
          </p>
          <div className="mt-6">
            <button
              onClick={() => setShowBalanceInfoModal(false)}
              className="w-full bg-[#1e3932] text-white py-2.5 rounded-full font-bold text-xs"
            >
              Got It
            </button>
          </div>
        </div>
      </Modal>

      {/* Top Up Modal */}
      <Modal
        open={showTopUpModal}
        onCancel={() => setShowTopUpModal(false)}
        footer={null}
        centered
        closeIcon={<CloseOutlined className="text-gray-700 text-base" />}
        className="rounded-3xl overflow-hidden max-w-md"
      >
        <div className="p-4 text-[#16302b]">
          <div className="flex items-center gap-2 text-[#947864] mb-2">
            <WalletOutlined className="text-xl" />
            <span className="text-xs font-extrabold uppercase tracking-wider">Top Up Coffee Card</span>
          </div>

          <h3 className="text-xl font-extrabold text-[#16302b]">
            Select Top Up Amount
          </h3>

          <div className="grid grid-cols-3 gap-3 my-5">
            {[100, 200, 500].map((amt) => (
              <button
                key={amt}
                onClick={() => setSelectedTopUpAmount(amt)}
                className={`py-3 rounded-2xl font-bold text-sm transition-all border-2 ${
                  selectedTopUpAmount === amt
                    ? "bg-[#947864] text-white border-[#947864] shadow-xs"
                    : "bg-gray-50 text-gray-800 border-gray-200 hover:bg-gray-100"
                }`}
              >
                {amt} SEK
              </button>
            ))}
          </div>

          <p className="text-xs text-gray-500 mb-6">
            ✨ Earn 10 bonus Fika Points for every 100 SEK topped up!
          </p>

          <button
            onClick={handleProcessTopUp}
            className="w-full bg-[#947864] hover:bg-[#7e6452] text-white py-3.5 rounded-full font-bold text-sm transition-all flex items-center justify-center gap-2 active:scale-98 shadow-md"
          >
            <PlusOutlined />
            <span>Pay & Add {selectedTopUpAmount} SEK</span>
          </button>
        </div>
      </Modal>
    </div>
  );
}
