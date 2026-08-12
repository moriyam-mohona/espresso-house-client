"use client";

import React, { useState } from "react";
import {
  InfoCircleOutlined,
  CreditCardOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Modal, App, Input } from "antd";

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

  // Modal Step states for Top-Up flow
  const [showSelectAmountModal, setShowSelectAmountModal] = useState<boolean>(false);
  const [showRegisterPromptModal, setShowRegisterPromptModal] = useState<boolean>(false);
  const [showAddCardModal, setShowAddCardModal] = useState<boolean>(false);

  const [selectedTopUpAmount, setSelectedTopUpAmount] = useState<number>(200);
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [securityCode, setSecurityCode] = useState<string>("");

  // Step 1: User selects amount & clicks Continue
  const handleAmountContinue = () => {
    setShowSelectAmountModal(false);
    setShowRegisterPromptModal(true);
  };

  // Step 2: User clicks Add Payment Method in prompt modal
  const handleOpenAddCardForm = () => {
    setShowRegisterPromptModal(false);
    setShowAddCardModal(true);
  };

  // Step 3: User submits payment card form & completes Top Up
  const handleSaveCardAndCompleteTopUp = () => {
    if (cardNumber.trim() === "") {
      message.error("Please enter a valid card number.");
      return;
    }
    const newBal = currentBalance + selectedTopUpAmount;
    setCurrentBalance(newBal);
    if (onBalanceChange) onBalanceChange(newBal);

    message.success(
      `🎉 Payment card registered! ${selectedTopUpAmount} SEK added to Coffee Card balance.`
    );
    setShowAddCardModal(false);
    setCardNumber("");
    setExpiryDate("");
    setSecurityCode("");
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
            onClick={() => setShowSelectAmountModal(true)}
            className="mt-4 bg-[#947864] hover:bg-[#7e6452] text-white px-9 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all shadow-2xs active:scale-95"
          >
            Top up
          </button>
        </div>
      </div>

      {/* ==============================================================================
          STEP 1 MODAL: Select Top up amount
         ============================================================================== */}
      <Modal
        open={showSelectAmountModal}
        onCancel={() => setShowSelectAmountModal(false)}
        footer={null}
        centered
        className="rounded-3xl overflow-hidden max-w-md"
        modalRender={(modalContent) => (
          <div className="rounded-3xl overflow-hidden shadow-2xl bg-white">
            {modalContent}
          </div>
        )}
      >
        <div className="text-center text-[#16302b]">
          

          {/* Credit Card Icon */}
          <div className="h-14 w-20 rounded-xl border-2 border-gray-700 flex items-center justify-center mx-auto mb-3">
            <CreditCardOutlined className="text-2xl text-gray-700" />
          </div>

          <h3 className="text-base sm:text-lg font-extrabold text-[#16302b] mb-4">
            Select Top up amount
          </h3>

          {/* Amount Options Selector matching Screenshot 3 */}
          <div className="space-y-2 max-w-xs mx-auto mb-4">
            {[300, 600].map((amt) => (
              <button
                key={amt}
                onClick={() => setSelectedTopUpAmount(amt)}
                className={`w-full py-3 rounded-2xl cursor-pointer font-bold text-xs sm:text-sm transition-all border ${
                  selectedTopUpAmount === amt
                    ? "bg-brand-sage text-[#1e3932] border-[#1e3932] shadow-2xs font-extrabold"
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
            onClick={handleAmountContinue}
            className="w-full bg-[#1e3932] cursor-pointer hover:bg-primary-hover text-white py-3.5 rounded-full font-bold text-sm transition-all shadow-md active:scale-98"
          >
            Continue
          </button>
        </div>
      </Modal>

      {/* ==============================================================================
          STEP 2 MODAL: Register your payment card Prompt
         ============================================================================== */}
      <Modal
        open={showRegisterPromptModal}
        onCancel={() => setShowRegisterPromptModal(false)}
        footer={null}
        centered
        className="rounded-3xl overflow-hidden max-w-md"
        modalRender={(modalContent) => (
          <div className="rounded-3xl overflow-hidden shadow-2xl bg-white">
            {modalContent}
          </div>
        )}
      >
        <div className="text-[#16302b]">

          <h3 className="text-lg font-extrabold text-[#16302b] mb-2">
            Register your payment card
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
            To top up someone else&apos;s app, you may first register a payment card. Would you like to do that now?
          </p>

          <div className="space-y-3">
            <button
              onClick={handleOpenAddCardForm}
              className="w-full bg-[#1e3932] cursor-pointer hover:bg-primary-hover text-white py-3.5 rounded-full font-bold text-sm transition-all shadow-xs"
            >
              Add Payment method
            </button>

            <button
              onClick={() => setShowRegisterPromptModal(false)}
              className="w-full bg-white cursor-pointer border border-[#1e3932] hover:bg-gray-50 text-[#1e3932] py-3.5 rounded-full font-bold text-sm transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* ==============================================================================
          STEP 3 MODAL: Add Card Details Form
         ============================================================================== */}
      <Modal
        open={showAddCardModal}
        onCancel={() => setShowAddCardModal(false)}
        footer={null}
        centered
        className="rounded-3xl overflow-hidden max-w-md"
        modalRender={(modalContent) => (
          <div className="rounded-3xl overflow-hidden shadow-2xl bg-white">
            {modalContent}
          </div>
        )}
      >
        <div className="text-[#16302b]">
          
          <h3 className="text-lg font-extrabold text-[#16302b] mb-4 text-center">
            Add card
          </h3>

          {/* Form Container matching Screenshot 2 */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 space-y-4 shadow-2xs">
            {/* Form Header */}
            <div className="flex items-center gap-2 border-b border-slate-200/80 pb-3">
              <CreditCardOutlined className="text-lg text-slate-800" />
              <span className="font-extrabold text-sm text-slate-900">Cards</span>
            </div>

            <p className="text-[11px] text-slate-500 font-medium -mt-2">
              All fields are required unless marked otherwise.
            </p>

            {/* Field 1: Card Number */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Card number</label>
              <Input
                placeholder="4242 4242 4242 4242"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                suffix={<CreditCardOutlined className="text-gray-400" />}
                className="rounded-xl py-2.5 text-sm bg-white"
              />
            </div>

            {/* Field 2: Expiry Date */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Expiry date</label>
              <Input
                placeholder="MM/YY"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="rounded-xl py-2.5 text-sm bg-white"
              />
              <p className="text-[10px] text-gray-500 font-medium">
                Front of card in MM/YY format
              </p>
            </div>

            {/* Field 3: Security Code */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Security code</label>
              <Input
                placeholder="CVC / CVV"
                type="password"
                maxLength={4}
                value={securityCode}
                onChange={(e) => setSecurityCode(e.target.value)}
                className="rounded-xl py-2.5 text-sm bg-white"
              />
              <p className="text-[10px] text-gray-500 font-medium">
                3 digits on back of card
              </p>
            </div>

            {/* Save Details Button matching Screenshot 2 */}
            <div className="pt-2">
              <button
                onClick={handleSaveCardAndCompleteTopUp}
                className="w-full cursor-pointer bg-[#0a192f] hover:bg-[#122542] text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
              >
                <LockOutlined className="text-xs" />
                <span>Save details</span>
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Coffee Card Balance Info Modal */}
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
        <div className="text-center text-[#16302b]">
          
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
            className="w-full bg-[#1e3932] hover:bg-primary-hover text-white py-3 rounded-full font-bold text-sm transition-all"
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
};
