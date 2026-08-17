"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LeftOutlined,
  CreditCardOutlined,
  LockOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { App, Input } from "antd";
import { ROUTES } from "@/constants/routes";

interface PaymentCard {
  id: string;
  cardNumber: string;
  expiryDate: string;
  cardType: string;
}

export default function PaymentCardsPage() {
  const { message } = App.useApp();
  const [cards, setCards] = useState<PaymentCard[]>([]);
  const [viewState, setViewState] = useState<"list" | "add">("list");

  // Form fields
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [securityCode, setSecurityCode] = useState<string>("");

  const handleSaveCard = () => {
    if (cardNumber.trim() === "") {
      message.error("Please enter a card number.");
      return;
    }
    const newCard: PaymentCard = {
      id: `card-${Date.now()}`,
      cardNumber: cardNumber.slice(-4) ? `•••• •••• •••• ${cardNumber.slice(-4)}` : "•••• •••• •••• 4242",
      expiryDate: expiryDate || "12/28",
      cardType: "Visa",
    };

    setCards((prev) => [...prev, newCard]);
    message.success("🎉 Payment card added successfully!");
    setViewState("list");
    setCardNumber("");
    setExpiryDate("");
    setSecurityCode("");
  };

  return (
    <div className="min-h-screen bg-[#f7f8f6] text-gray-900 font-sans flex flex-col justify-between">
      {/* Top Header Bar matching Screenshot 2 */}
      <header className="sticky top-0 z-30 bg-white px-4 py-3 border-b border-gray-200/80 shadow-2xs">
        <div className="mx-auto max-w-md md:max-w-xl flex items-center justify-between">
          <Link
            href={ROUTES.WALLET}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-800 bg-gray-100 hover:bg-gray-200 px-3.5 py-1.5 rounded-full transition-all border border-gray-200/60"
          >
            <LeftOutlined className="text-xs" />
            <span>Back</span>
          </Link>

          <h1 className="text-base sm:text-lg font-bold text-[#16302b]">
            {viewState === "add" ? "Add card" : "Manage Payment Card"}
          </h1>

          <div className="w-16" />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-6 max-w-md md:max-w-xl mx-auto w-full flex flex-col justify-between">
        {viewState === "list" ? (
          /* Manage Payment Card View (Empty or Populated State matching Screenshot 2) */
          <div className="flex-1 flex flex-col justify-between py-6">
            {cards.length === 0 ? (
              /* Empty State matching Screenshot 2 */
              <div className="my-auto py-12 text-center flex flex-col items-center justify-center">
                <div className="h-24 w-32 rounded-2xl border-2 border-gray-700 flex items-center justify-center mb-6 shadow-2xs">
                  <CreditCardOutlined className="text-5xl text-gray-700" />
                </div>

                <h2 className="text-xl font-extrabold text-gray-900 leading-snug">
                  No payment cards added
                </h2>
                <p className="text-xs sm:text-sm text-gray-500 mt-1.5 max-w-xs leading-relaxed">
                  Add a payment card for a smoother shopping experience
                </p>
              </div>
            ) : (
              /* Populated State */
              <div className="space-y-3">
                <h3 className="text-xs font-extrabold text-gray-500 uppercase tracking-wider mb-2">
                  Saved Cards
                </h3>
                {cards.map((c) => (
                  <div
                    key={c.id}
                    className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-[#1e3932] text-white flex items-center justify-center text-lg font-bold">
                        <CreditCardOutlined />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">
                          {c.cardNumber}
                        </h4>
                        <p className="text-xs text-gray-500">
                          Expires: {c.expiryDate}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                      <CheckCircleOutlined />
                      <span>Active</span>
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Bottom Add Card Button matching Screenshot 2 */}
            <div className="pt-8">
              <button
                onClick={() => setViewState("add")}
                className="w-full bg-[#1e3932] hover:bg-primary-hover text-white py-4 rounded-full font-bold text-sm sm:text-base transition-all shadow-md active:scale-98"
              >
                Add Card
              </button>
            </div>
          </div>
        ) : (
          /* Add Card Form View matching Screenshot 2 */
          <div className="py-2 space-y-4">
            <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 space-y-4 shadow-2xs">
              {/* Cards Header */}
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
                {/* Payment Card Badges */}
                <div className="flex items-center gap-2 pt-1">
                  <span className="bg-blue-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded">AMEX</span>
                  <span className="bg-blue-800 text-white text-[9px] font-black px-1.5 py-0.5 rounded">DISCOVER</span>
                  <span className="bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded">MC</span>
                  <span className="bg-blue-700 text-white text-[9px] font-black px-1.5 py-0.5 rounded">VISA</span>
                </div>
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
                  onClick={handleSaveCard}
                  className="w-full bg-[#0a192f] hover:bg-[#122542] text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <LockOutlined className="text-xs" />
                  <span>Save details</span>
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setViewState("list")}
                className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-full font-bold text-sm hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
