"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LeftOutlined, PlusOutlined } from "@ant-design/icons";
import { App, Input, Modal, Radio } from "antd";
import { ROUTES } from "@/constants/routes";

interface GiftProduct {
  id: string;
  name: string;
  price: number;
  imageSrc: string;
}

const giftProducts: GiftProduct[] = [
  {
    id: "prod-1",
    name: "Hot drink from the menu",
    price: 68,
    imageSrc: "/espresso_shot.png",
  },
  {
    id: "prod-2",
    name: "Artisanal Pastry & Coffee Combo",
    price: 85,
    imageSrc: "/coffee-shop.jpg",
  },
  {
    id: "prod-3",
    name: "Iced Frapino Refresher",
    price: 72,
    imageSrc: "/frapino_passion.png",
  },
  {
    id: "prod-4",
    name: "Cold Brew & Muffin Deal",
    price: 92,
    imageSrc: "/iced_offer.png",
  },
  {
    id: "prod-5",
    name: "Coffee Lover Gift Voucher (100 SEK)",
    price: 100,
    imageSrc: "/espresso_shot.png",
  },
];

export default function SendGiftPage() {
  const router = useRouter();
  const { message } = App.useApp();

  const [step, setStep] = useState<"choose-type" | "select-product" | "checkout">("choose-type");
  const [selectedProduct, setSelectedProduct] = useState<GiftProduct>(giftProducts[0]);
  const [showRegisterPromptModal, setShowRegisterPromptModal] = useState<boolean>(false);

  // Delivery Checkout Form Fields matching Screenshot 3
  const [recipientMobile, setRecipientMobile] = useState<string>("");
  const [senderName, setSenderName] = useState<string>("");
  const [giftMessage, setGiftMessage] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("coffee-card");

  const handleSelectProduct = (prod: GiftProduct) => {
    setSelectedProduct(prod);
    setStep("checkout");
  };

  const handleAddFromContacts = () => {
    setRecipientMobile("+46 70 123 4567");
    message.info("Added contact from address book!");
  };

  const handleSendGift = () => {
    if (!recipientMobile.trim()) {
      message.error("Please enter a recipient's mobile number.");
      return;
    }
    message.success(`🎉 Gift "${selectedProduct.name}" sent to ${recipientMobile}!`);
    router.push(ROUTES.WALLET);
  };

  return (
    <div className="min-h-screen bg-[#f7f8f6] text-gray-900 font-sans flex flex-col justify-between">
      {/* Sticky Header Bar matching Screenshots */}
      <header className="sticky top-0 z-30 bg-white px-4 py-3.5 border-b border-gray-200/80 shadow-2xs">
        <div className="mx-auto max-w-md md:max-w-xl flex items-center justify-between">
          <button
            onClick={() => {
              if (step === "checkout") setStep("select-product");
              else if (step === "select-product") setStep("choose-type");
              else router.push(ROUTES.WALLET);
            }}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-800 bg-gray-100 hover:bg-gray-200 px-3.5 py-1.5 rounded-full transition-all border border-gray-200/60 cursor-pointer"
          >
            <LeftOutlined className="text-xs" />
            <span>Back</span>
          </button>

          <h1 className="text-base sm:text-lg font-extrabold text-[#16302b]">
            {step === "choose-type" ? "Send gift" : "Send Gift"}
          </h1>

          <div className="w-16" />
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 p-4 md:p-6 max-w-md md:max-w-xl mx-auto w-full">
        {/* ==============================================================================
            SCREEN 1: Choose Type of Gift (Exact Match to Screenshot 1 & 4)
           ============================================================================== */}
        {step === "choose-type" && (
          <div className="space-y-5">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#16302b] tracking-tight">
              Choose type of gift
            </h2>

            {/* Option 1 Card: Products */}
            <div
              onClick={() => setStep("select-product")}
              className="bg-white rounded-3xl overflow-hidden border border-gray-200/90 shadow-xs hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="relative h-48 sm:h-56 w-full bg-gray-100 overflow-hidden">
                <Image
                  src="/coffee-shop.jpg"
                  alt="Products Gift"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5 space-y-1.5">
                <h3 className="text-lg font-bold text-[#16302b]">
                  Products
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                  Send someone a gift through Espresso House! Choose between our delicious drinks, pastries, food, or other goods.
                </p>
              </div>
            </div>

            {/* Option 2 Card: Top up someone elses Coffee card balance */}
            <div
              onClick={() => setShowRegisterPromptModal(true)}
              className="bg-white rounded-3xl overflow-hidden border border-gray-200/90 shadow-xs hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="relative h-48 sm:h-56 w-full bg-gray-100 overflow-hidden">
                <Image
                  src="/frapino_passion.png"
                  alt="Top up gift"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5 space-y-1.5">
                <h3 className="text-lg font-bold text-[#16302b]">
                  Top up someone elses Coffee card balance
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                  Top up a friends or family members app balance.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ==============================================================================
            SCREEN 2: Select Product (Exact Match to Screenshot 2)
           ============================================================================== */}
        {step === "select-product" && (
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#16302b] tracking-tight mb-2">
              Select Product
            </h2>

            <div className="space-y-3">
              {giftProducts.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => handleSelectProduct(prod)}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-200/90 shadow-2xs hover:shadow-md transition-all cursor-pointer flex items-center group"
                >
                  {/* Left Image Thumbnail Container */}
                  <div className="relative h-24 w-28 bg-[#f4f0eb] shrink-0 flex items-center justify-center p-2">
                    <Image
                      src={prod.imageSrc}
                      alt={prod.name}
                      fill
                      sizes="112px"
                      className="object-contain p-1 group-hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Right Product Name & Price */}
                  <div className="p-4 flex-1">
                    <h3 className="text-sm sm:text-base font-bold text-[#16302b] group-hover:text-[#1e3932]">
                      {prod.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-gray-600 mt-1">
                      {prod.price} SEK
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==============================================================================
            SCREEN 3: Product Details & Delivery Checkout (Exact Match to Screenshot 3)
           ============================================================================== */}
        {step === "checkout" && (
          <div className="space-y-6">
            {/* Section 1: Product Summary */}
            <div className="space-y-2">
              <h2 className="text-xl font-extrabold text-[#16302b]">
                Product
              </h2>

              <div className="bg-white rounded-2xl p-4 border border-gray-200/90 shadow-2xs flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#16302b]">
                    {selectedProduct.name}
                  </h3>
                  <p className="text-sm font-semibold text-gray-600 mt-0.5">
                    {selectedProduct.price} SEK
                  </p>
                </div>

                <div className="relative h-20 w-24 bg-[#f4f0eb] rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={selectedProduct.imageSrc}
                    alt={selectedProduct.name}
                    fill
                    sizes="96px"
                    className="object-contain p-1"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Delivery Details */}
            <div className="space-y-3 pt-2 border-t border-gray-200/70">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-extrabold text-[#16302b]">
                  Delivery
                </h2>

                <button
                  onClick={handleAddFromContacts}
                  className="text-xs font-bold text-emerald-800 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
                >
                  <PlusOutlined className="text-[10px]" />
                  <span>Add from contacts</span>
                </button>
              </div>

              <div className="space-y-3 bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs">
                <div>
                  <label className="text-xs font-bold text-gray-600">Recipients mobile number *</label>
                  <Input
                    placeholder="+46 70 000 0000"
                    value={recipientMobile}
                    onChange={(e) => setRecipientMobile(e.target.value)}
                    className="rounded-xl py-2.5 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-600">From</label>
                  <Input
                    placeholder="Your name"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="rounded-xl py-2.5 text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-600">Message</label>
                  <Input.TextArea
                    placeholder="Write a warm note..."
                    rows={2}
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    className="rounded-xl py-2 text-sm mt-1"
                  />
                </div>
              </div>

              <p className="text-xs text-gray-500 font-medium pt-1">
                The recipient activates the gift after it&apos;s received
              </p>
            </div>

            {/* Section 3: Choose Payment method */}
            <div className="space-y-3 pt-2 border-t border-gray-200/70">
              <h2 className="text-xl font-extrabold text-[#16302b]">
                Choose Payment method
              </h2>

              <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs space-y-3">
                <Radio.Group
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div>
                      <Radio value="coffee-card" className="font-bold text-sm text-[#16302b]">
                        Coffee Card 0 SEK
                      </Radio>
                      <div className="pl-6 text-xs">
                        <Link href={ROUTES.WALLET} className="text-emerald-700 font-bold hover:underline">
                          Top Up
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Radio value="credit-card" className="font-bold text-sm text-[#16302b]">
                      Credit Card (Visa •••• 4242)
                    </Radio>
                  </div>
                </Radio.Group>
              </div>
            </div>

            {/* Section 4: To Pay Summary & Action Button */}
            <div className="space-y-3 pt-2 border-t border-gray-200/70">
              <h2 className="text-xl font-extrabold text-[#16302b]">
                To Pay
              </h2>

              <div className="flex items-center justify-between text-base font-bold text-[#16302b] px-1">
                <span>Order Total</span>
                <span>{selectedProduct.price} SEK</span>
              </div>

              <div className="pt-3">
                <button
                  onClick={handleSendGift}
                  className="w-full bg-[#1e3932] hover:bg-primary-hover text-white py-4 rounded-full font-bold text-base transition-all shadow-md active:scale-98 cursor-pointer"
                >
                  Buy & send gift
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ==============================================================================
          Register Payment Card Prompt Modal (Exact Match to Screenshot 4)
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
        <div className="p-6 text-[#16302b]">
          <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-4" />

          <h3 className="text-lg font-extrabold text-[#16302b] mb-2">
            Register your payment card
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
            To top up someone else&apos;s app, you may first register a payment card. Would you like to do that now?
          </p>

          <div className="space-y-3">
            <button
              onClick={() => {
                setShowRegisterPromptModal(false);
                router.push(ROUTES.PAYMENT_CARDS);
              }}
              className="w-full bg-[#1e3932] hover:bg-primary-hover text-white py-3.5 rounded-full font-bold text-sm transition-all shadow-xs cursor-pointer"
            >
              Add Payment method
            </button>

            <button
              onClick={() => setShowRegisterPromptModal(false)}
              className="w-full bg-white border border-[#1e3932] hover:bg-gray-50 text-[#1e3932] py-3.5 rounded-full font-bold text-sm transition-all cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
