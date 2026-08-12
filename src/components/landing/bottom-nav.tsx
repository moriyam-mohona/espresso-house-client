"use client";

import React, { useState } from "react";
import {
  HomeFilled,
  WalletOutlined,
  ShoppingOutlined,
  EllipsisOutlined,
  QrcodeOutlined,
} from "@ant-design/icons";
import { Badge, Drawer, App } from "antd";

interface BottomNavProps {
  onOpenMyId: () => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  walletBalance?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  onOpenMyId,
  activeTab = "start",
  onTabChange,
  walletBalance = 24.5,
}) => {
  const { message } = App.useApp();
  const [currentTab, setCurrentTab] = useState<string>(activeTab);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const handleSelectTab = (tab: string) => {
    setCurrentTab(tab);
    if (onTabChange) onTabChange(tab);

    if (tab === "more") {
      setDrawerOpen(true);
    } else if (tab === "wallet") {
      message.info(`Digital Wallet Balance: $${walletBalance.toFixed(2)}`);
    } else if (tab === "order") {
      message.info("Opening Pre-Order menu...");
    }
  };

  return (
    <>
      {/* Mobile Sticky Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg md:hidden px-4 py-2 flex items-center justify-around">
        {/* Tab 1: Start (Home) */}
        <button
          onClick={() => handleSelectTab("start")}
          className={`flex flex-col items-center justify-center py-1 px-4 rounded-full transition-all ${
            currentTab === "start"
              ? "bg-[#e8efe6] text-[#1e3932] font-bold shadow-2xs"
              : "text-gray-500 hover:text-[#1e3932]"
          }`}
        >
          <HomeFilled className="text-xl" />
          <span className="text-[11px] font-semibold mt-0.5">Start</span>
        </button>

        {/* Tab 2: Wallet */}
        <button
          onClick={() => handleSelectTab("wallet")}
          className={`flex flex-col items-center justify-center py-1 px-4 rounded-full transition-all ${
            currentTab === "wallet"
              ? "bg-[#e8efe6] text-[#1e3932] font-bold shadow-2xs"
              : "text-gray-500 hover:text-[#1e3932]"
          }`}
        >
          <WalletOutlined className="text-xl" />
          <span className="text-[11px] font-semibold mt-0.5">Wallet</span>
        </button>

        {/* Tab 3: Order */}
        <button
          onClick={() => handleSelectTab("order")}
          className={`flex flex-col items-center justify-center py-1 px-4 rounded-full transition-all ${
            currentTab === "order"
              ? "bg-[#e8efe6] text-[#1e3932] font-bold shadow-2xs"
              : "text-gray-500 hover:text-[#1e3932]"
          }`}
        >
          <Badge count={1} size="small" offset={[2, -2]} color="#1e3932">
            <ShoppingOutlined className="text-xl" />
          </Badge>
          <span className="text-[11px] font-semibold mt-0.5">Order</span>
        </button>

        {/* Tab 4: More */}
        <button
          onClick={() => handleSelectTab("more")}
          className={`flex flex-col items-center justify-center py-1 px-4 rounded-full transition-all ${
            currentTab === "more"
              ? "bg-[#e8efe6] text-[#1e3932] font-bold shadow-2xs"
              : "text-gray-500 hover:text-[#1e3932]"
          }`}
        >
          <EllipsisOutlined className="text-2xl" />
          <span className="text-[11px] font-semibold mt-0.5">More</span>
        </button>
      </nav>

      {/* Drawer for More tab options */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        placement="bottom"
        styles={{ wrapper: { height: "auto" } }}
        className="rounded-t-3xl"
        title={<span className="font-extrabold text-[#16302b]">Espresso House Menu</span>}
      >
        <div className="space-y-3 pb-6">
          <button
            onClick={() => {
              setDrawerOpen(false);
              onOpenMyId();
            }}
            className="w-full flex items-center justify-between p-3.5 bg-[#e8efe6] text-[#1e3932] rounded-2xl font-bold"
          >
            <div className="flex items-center gap-3">
              <QrcodeOutlined className="text-xl" />
              <span>Show My ID (QR Code)</span>
            </div>
            <span className="text-xs bg-[#1e3932] text-white px-2.5 py-1 rounded-full">Scan</span>
          </button>

          <a href="#offers" onClick={() => setDrawerOpen(false)} className="block p-3 text-[#16302b] font-semibold border-b border-gray-100">
            🏷️ All Expresso Offers
          </a>
          <a href="#fika-fun" onClick={() => setDrawerOpen(false)} className="block p-3 text-[#16302b] font-semibold border-b border-gray-100">
            🎯 Expresso Fun Challenges
          </a>
          <a href="#stores" onClick={() => setDrawerOpen(false)} className="block p-3 text-[#16302b] font-semibold border-b border-gray-100">
            📍 Store Locator & Opening Hours
          </a>
        </div>
      </Drawer>
    </>
  );
};
