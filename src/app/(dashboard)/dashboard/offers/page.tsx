"use client";

import React, { useState } from "react";
import {
  PlusOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  FireOutlined,
} from "@ant-design/icons";
import { App, Modal, Input } from "antd";
import { offersList } from "@/components/landing/expresso-offers";

export default function DashboardOffersPage() {
  const { message } = App.useApp();
  const [offers, setOffers] = useState(offersList);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newTag, setNewTag] = useState<string>("Special Coupon");

  const handleCreateOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) {
      message.error("Please enter a campaign title");
      return;
    }

    const createdOffer = {
      id: `offer-${Date.now()}`,
      tag: newTag,
      title: newTitle,
      expiresIn: "Expires in 30 days",
      imageSrc: "/iced_offer.png",
      description: "Exclusive promotional coupon voucher.",
      instruction: "Press Activate to apply discount.",
      terms: "Valid once per member account.",
    };

    setOffers((prev) => [createdOffer, ...prev]);
    message.success(`🎉 Campaign "${newTitle}" launched live on app!`);
    setNewTitle("");
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#16302b]">
            Expresso Offers & Promotional Campaigns
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
            Create and manage live app coupons, discount vouchers, and member rewards campaigns.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 bg-[#1e3932] hover:bg-primary-hover text-white px-5 py-2.5 rounded-full font-bold text-xs shadow-md transition-all self-start sm:self-auto cursor-pointer"
        >
          <PlusOutlined />
          <span>Launch New Campaign</span>
        </button>
      </div>

      {/* Offers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-2xs space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-brand-sage text-[#1e3932] font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-full">
                  {offer.tag}
                </span>
                <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
                  <ClockCircleOutlined />
                  <span>{offer.expiresIn}</span>
                </span>
              </div>

              <h3 className="text-base font-black text-[#16302b]">{offer.title}</h3>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                {offer.description}
              </p>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircleOutlined />
                <span>Live in Client Web</span>
              </span>

              <button
                onClick={() => message.info(`Campaign ${offer.id} updated.`)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full font-bold transition-all cursor-pointer"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Launch Campaign Modal */}
      <Modal
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        footer={null}
        centered
        width={420}
      >
        <div className="p-4 space-y-5">
          <div className="text-center space-y-1">
            <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center mx-auto text-xl mb-1">
              <FireOutlined />
            </div>
            <h3 className="text-lg font-extrabold text-[#16302b]">
              Launch New Campaign Voucher
            </h3>
          </div>

          <form onSubmit={handleCreateOffer} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Campaign Title</label>
              <Input
                placeholder="e.g. 50% off all Iced Lattes"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="rounded-xl py-2 px-3"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Badge Tag</label>
              <Input
                placeholder="e.g. Summer Special"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="rounded-xl py-2 px-3"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#1e3932] hover:bg-primary-hover text-white py-3.5 rounded-full font-extrabold text-sm shadow-md transition-all cursor-pointer"
            >
              Publish Campaign to App
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
