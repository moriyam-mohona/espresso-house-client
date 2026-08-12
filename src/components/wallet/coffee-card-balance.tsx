"use client";

import React, { useState } from "react";
import { InfoCircleOutlined, RightOutlined, CreditCardOutlined } from "@ant-design/icons";
import { Modal, App } from "antd";

interface CoffeeCardBalanceProps {
  balance?: number;
  onBalanceChange?: (newBalance: number) => void;
}

export const CoffeeCardBalance: React.FC<CoffeeCardBalanceProps> = ({
  balance = 0,
  onBalanceChange,
}) => {
  const { message } = App.useApp();
  const [currentBalance, setCurrentBalance] = useState<number>(balance);
  const [showBalanceInfoModal, setShowBalanceInfoModal] = useState<boolean>(false);
  const [showTopUpModal, setShowTopUpModal] = useState<boolean>(false);
  const [showRegisterCardModal, setShowRegisterCardModal] = useState<boolean>(false);
  const [selectedTopUpAmount, setSelectedTopUpAmount] = useState<number>(200);

  const handleProcessTopUp = () => {
    const newBal = currentBalance + selectedTopUpAmount;
    setCurrentBalance(newBal);
    if (onBalanceChange) onBalanceChange(newBal);
    message.success(`🎉 Successfully topped up ${selectedTopUpAmount} SEK to your Coffee Card!`);
    setShowTopUpModal(false);
  };

  const handleRegisterPaymentCard = () => {
    message.success("Payment card registered successfully!");
    setShowRegisterCardModal(false);
  };

  return (
    <>
      {/* Coffee Card Balance Container matching Screenshot 1 */}
      <div className="bg-[#f4f0eb] rounded-3xl border border-[#e2d7cb] shadow-xs overflow-hidden">
        {/* Main Balance Card Body */}
        <div className="p-6 relative text-center flex flex-col items-center justify-center">
          {/* Top Right Info Link */}
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setShowBalanceInfoModal(true)}
              className="flex items-center gap-1 text-xs font-medium text-[#7e6452] hover:text-[#5a4638] transition-colors"
            >
              <span>info</span>
              <InfoCircleOutlined className="text-xs" />
            </button>
          </div>

          {/* Big Bold Balance Text */}
          <span className="text-3xl sm:text-4xl font-extrabold text-[#2c221a] tracking-tight">
            {currentBalance} SEK
          </span>

          {/* Sub-label */}
          <span className="text-xs sm:text-sm font-semibold text-gray-600 mt-1">
            Coffee card balance
          </span>

          {/* Top Up Button */}
          <button
            onClick={() => setShowTopUpModal(true)}
            className="mt-4 bg-[#947864] hover:bg-[#7e6452] text-white px-9 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all shadow-2xs active:scale-95"
          >
            Top up
          </button>
        </div>

        {/* Bottom Link Row matching Screenshot 1 */}
        <button
          onClick={() => setShowRegisterCardModal(true)}
          className="w-full bg-white/60 hover:bg-white px-5 py-3.5 border-t border-[#e2d7cb]/70 flex items-center justify-between text-xs sm:text-sm font-semibold text-[#2c221a] transition-colors text-left"
        >
          <span>Top up someone elses Coffee card balance</span>
          <RightOutlined className="text-xs text-gray-500" />
        </button>
      </div>

      {/* Modal 1: Select Top Up Amount matching Screenshot 3 */}
      <Modal
        open={showTopUpModal}
        onCancel={() => setShowTopUpModal(false)}
        footer={null}
        centered
        className="rounded-3xl overflow-hidden max-w-md"
        modalRender={(modalContent) => (
          <div className="rounded-3xl overflow-hidden shadow-2xl bg-white">
            {modalContent}
          </div>
        )}
      >
        <div className="p-6 text-center text-[#16302b]">
          <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-4" />

          {/* Credit Card Icon */}
          <div className="h-14 w-20 rounded-xl border-2 border-gray-700 flex items-center justify-center mx-auto mb-3">
            <CreditCardOutlined className="text-2xl text-gray-700" />
          </div>

          <h3 className="text-base sm:text-lg font-extrabold text-[#16302b] mb-4">
            Select Top up amount
          </h3>

          {/* Amount Options Selector matching Screenshot 3 */}
          <div className="space-y-2 max-w-xs mx-auto mb-4">
            {[100, 200, 300, 500].map((amt) => (
              <button
                key={amt}
                onClick={() => setSelectedTopUpAmount(amt)}
                className={`w-full py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all border ${
                  selectedTopUpAmount === amt
                    ? "bg-[#e8efe6] text-[#1e3932] border-[#1e3932] shadow-2xs font-extrabold"
                    : "bg-gray-50 text-gray-700 border-gray-200/80 hover:bg-gray-100"
                }`}
              >
                {amt} SEK
              </button>
            ))}
          </div>

          <p className="text-xs font-bold text-[#16302b] mb-6">
            Get <span className="text-emerald-700">{Math.floor(selectedTopUpAmount * 0.03)} Fika Points</span>
          </p>

          <button
            onClick={handleProcessTopUp}
            className="w-full bg-[#1e3932] hover:bg-[#2d5349] text-white py-3.5 rounded-full font-bold text-sm transition-all shadow-md active:scale-98"
          >
            Continue
          </button>
        </div>
      </Modal>

      {/* Modal 2: Register Payment Card matching Screenshot 3 */}
      <Modal
        open={showRegisterCardModal}
        onCancel={() => setShowRegisterCardModal(false)}
        footer={null}
        centered
        className="rounded-3xl overflow-hidden max-w-md"
        modalRender={(modalContent) => (
          <div className="rounded-3xl overflow-hidden shadow-2xl bg-white">
            {modalContent}
          </div>
        )}
      >
        <div className="p-6 text-[#16302b]">
          <h3 className="text-base font-extrabold text-[#16302b] mb-2">
            Register your payment card
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed mb-6">
            To top up someone else&apos;s app, you may first register a payment card. Would you like to do that now?
          </p>

          <div className="space-y-2.5">
            <button
              onClick={handleRegisterPaymentCard}
              className="w-full bg-[#1e3932] hover:bg-[#2d5349] text-white py-3 rounded-full font-bold text-xs sm:text-sm transition-all shadow-xs"
            >
              Add Payment method
            </button>
            <button
              onClick={() => setShowRegisterCardModal(false)}
              className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-full font-bold text-xs sm:text-sm transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal 3: Coffee Card Balance Info matching Screenshot 3 & 4 */}
      <Modal
        open={showBalanceInfoModal}
        onCancel={() => setShowBalanceInfoModal(false)}
        footer={null}
        centered
        className="rounded-3xl overflow-hidden max-w-md"
        modalRender={(modalContent) => (
          <div className="rounded-3xl overflow-hidden shadow-2xl bg-white">
            {modalContent}
          </div>
        )}
      >
        <div className="p-6 text-center text-[#16302b]">
          <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-4" />
          <h3 className="text-base font-extrabold text-[#16302b] text-left mb-2">
            Coffee Card Balance
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 text-left leading-relaxed mb-3">
            Top up your Coffee card and get Fika Points as a reward. Read more about how to collect points in Fika House.
          </p>
          <p className="text-xs font-bold text-[#16302b] text-left mb-6 uppercase tracking-wider">
            Minimum Deposit - 300 SEK
          </p>

          <button
            onClick={() => setShowBalanceInfoModal(false)}
            className="w-full bg-[#1e3932] hover:bg-[#2d5349] text-white py-3 rounded-full font-bold text-sm transition-all"
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
};
