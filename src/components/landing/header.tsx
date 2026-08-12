"use client";

import React from "react";
import Image from "next/image";
import { QrcodeOutlined, UserOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { Badge, Dropdown, MenuProps } from "antd";
import { siteConfig } from "@/config/site";

interface HeaderProps {
  onOpenMyId: () => void;
  userPoints?: number;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMyId, userPoints = 142 }) => {
  const profileMenuItems: MenuProps["items"] = [
    { key: "profile", label: "My Profile & Account" },
    { key: "orders", label: "Order History" },
    { key: "wallet", label: "Digital Wallet ($24.50)" },
    { key: "loyalty", label: `Loyalty Points (${userPoints} pts)` },
    { type: "divider" },
    { key: "logout", label: "Sign Out", danger: true },
  ];

  return (
    <header className="sticky top-0 z-40 shadow-sm">
      {/* Mobile Top Header - Matching Screenshot 1 */}
      <div className="bg-[#1e3932] text-white px-4 py-3 flex items-center justify-between md:hidden">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full overflow-hidden border border-[#d4a373] relative shrink-0">
            <Image src="/logo.png" alt="Espresso House Logo" fill sizes="36px" className="object-cover" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wide">Hi!</h1>
            <p className="text-[11px] text-emerald-200/80 -mt-1">Gold Member • {userPoints} pts</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* My ID QR Code Button */}
          <button
            onClick={onOpenMyId}
            className="flex flex-col items-center justify-center text-white hover:text-emerald-200 transition-colors"
          >
            <QrcodeOutlined className="text-2xl" />
            <span className="text-[10px] font-medium tracking-tight mt-0.5">My ID</span>
          </button>

          {/* Profile Icon with badge */}
          <Dropdown menu={{ items: profileMenuItems }} placement="bottomRight" trigger={['click']}>
            <button className="flex flex-col items-center justify-center text-white hover:text-emerald-200 transition-colors relative">
              <Badge dot color="#52c41a">
                <UserOutlined className="text-xl text-white" />
              </Badge>
              <span className="text-[10px] font-medium tracking-tight mt-0.5">Profile</span>
            </button>
          </Dropdown>
        </div>
      </div>

      {/* Desktop Navigation Header */}
      <div className="hidden md:block bg-[#1e3932] text-white border-b border-[#2d5349]">
        <div className="mx-auto max-w-6xl px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-full overflow-hidden border border-[#d4a373] relative shrink-0 shadow-xs">
                <Image src="/logo.png" alt="Espresso House Logo" fill sizes="40px" className="object-cover" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">{siteConfig.name}</span>
            </div>

            {/* Store selector shortcut */}
            <div className="flex items-center gap-2 bg-[#2d5349]/80 px-3 py-1.5 rounded-full text-xs text-emerald-100 hover:bg-[#2d5349] transition-colors cursor-pointer">
              <EnvironmentOutlined className="text-emerald-300" />
              <span>Central Station Branch • Open until 10:00 PM</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-6 text-sm font-medium text-emerald-100/90">
              <a href="#offers" className="hover:text-white transition-colors">Offers</a>
              <a href="#fika-fun" className="hover:text-white transition-colors">Fika Fun</a>
              <a href="#menu" className="hover:text-white transition-colors">Menu</a>
              <a href="#stores" className="hover:text-white transition-colors">Stores</a>
            </nav>

            <div className="h-5 w-[1px] bg-emerald-700/60" />

            <div className="flex items-center gap-3">
              <button
                onClick={onOpenMyId}
                className="flex items-center gap-2 bg-[#e8efe6] text-[#1e3932] px-3.5 py-1.5 rounded-full text-xs font-bold hover:bg-white transition-all shadow-xs"
              >
                <QrcodeOutlined className="text-base" />
                <span>My ID (QR)</span>
              </button>

              <Dropdown menu={{ items: profileMenuItems }} placement="bottomRight" trigger={['click']}>
                <button className="flex items-center gap-2 bg-[#2d5349] hover:bg-[#39695d] px-3.5 py-1.5 rounded-full text-xs font-medium text-white transition-all">
                  <UserOutlined className="text-emerald-300" />
                  <span>My Profile</span>
                </button>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
