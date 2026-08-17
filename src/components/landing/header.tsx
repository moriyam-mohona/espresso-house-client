"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  QrcodeOutlined,
  UserOutlined,
  EnvironmentOutlined,
  WalletOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { App, Badge, Dropdown, MenuProps } from "antd";
import { siteConfig } from "@/config/site";
import { ROUTES } from "@/constants/routes";

interface HeaderProps {
  onOpenMyId?: () => void;
  userPoints?: number;
}

export const Header: React.FC<HeaderProps> = ({ userPoints = 142 }) => {
  const router = useRouter();
  const { message } = App.useApp();

  const handleProfileMenuClick: MenuProps["onClick"] = (info) => {
    if (info.key === "profile") {
      router.push(ROUTES.PROFILE);
    } else if (info.key === "orders") {
      router.push(ROUTES.RECEIPTS);
    } else if (info.key === "dashboard") {
      router.push(ROUTES.DASHBOARD.HOME);
    } else if (info.key === "login") {
      router.push(ROUTES.LOGIN);
    } else if (info.key === "logout") {
      message.success("Signed out successfully");
      router.push(ROUTES.HOME);
    }
  };

  const profileMenuItems: MenuProps["items"] = [
    { key: "profile", label: "My Profile & Account" },
    { key: "orders", label: "Order History" },
    { key: "dashboard", label: "Admin & POS Dashboard" },
    { type: "divider" },
    { key: "login", label: "Sign In / Register" },
    { key: "logout", label: "Sign Out", danger: true },
  ];

  return (
    <header className="sticky top-0 z-40 shadow-sm">
      {/* Mobile Top Header - Matching Screenshot 1 */}
      <div className="bg-[#1e3932] text-white px-4 py-3 flex items-center justify-between md:hidden">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full overflow-hidden border border-[#d4a373] relative shrink-0">
            <Image src="/logo.png" alt="Espresso Club Logo" fill sizes="36px" className="object-cover" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wide">Hi!</h1>
            <p className="text-[11px] text-emerald-200/80 -mt-1">Gold Member • {userPoints} pts</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* My ID QR Code Button */}
          <Link
            href={ROUTES.MY_ID}
            className="flex flex-col items-center justify-center text-white! hover:text-emerald-200 transition-colors"
          >
            <QrcodeOutlined className="text-2xl" />
            <span className="text-[10px] font-medium tracking-tight mt-0.5">My ID</span>
          </Link>

          {/* Profile Icon with badge */}
          <Dropdown menu={{ items: profileMenuItems, onClick: handleProfileMenuClick }} placement="bottomRight" trigger={['click']}>
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
      <div className="hidden md:block bg-[#1e3932] text-white border-b border-primary">
        <div className="mx-auto max-w-6xl px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-full overflow-hidden border border-[#d4a373] relative shrink-0 shadow-xs">
                <Image src="/logo.png" alt="Espresso Club Logo" fill sizes="40px" className="object-cover" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">{siteConfig.name}</span>
            </div>

            {/* Store selector shortcut */}
            <div className="flex items-center gap-2 bg-primary/80 px-3 py-1.5 rounded-full text-xs text-emerald-100 hover:bg-primary transition-colors cursor-pointer">
              <EnvironmentOutlined className="text-emerald-300" />
              <span>Central Station Club • Open until 10:00 PM</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-5 text-sm font-semibold text-white!">
              <Link
                href={ROUTES.WALLET}
                className="flex items-center gap-1.5 text-white/90! hover:text-white! transition-colors py-1 group"
              >
                <WalletOutlined className="text-base text-amber-300! group-hover:scale-110 transition-transform" />
                <span className="group-hover:scale-110 transition-transform">Wallet</span>
              </Link>

              <div className="h-4 w-px bg-emerald-700/60" />

              <Link
                href={ROUTES.ORDER}
                className="flex items-center gap-1.5 text-white/90! hover:text-white! transition-colors py-1 group"
              >
                <ShoppingOutlined className="text-base text-emerald-300! group-hover:scale-110 transition-transform" />
                <span className="group-hover:scale-110 transition-transform">Order</span>
              </Link>
            </nav>

            <div className="h-5 w-px bg-emerald-700/60" />

            <div className="flex items-center gap-3">
              <Link
                href={ROUTES.MY_ID}
                className="flex items-center gap-2 bg-brand-sage!  text-[#1e3932] px-3.5 py-1.5 rounded-full text-xs font-bold hover:bg-white transition-all shadow-xs"
              >
                <QrcodeOutlined className="text-base" />
                <span>My ID (QR)</span>
              </Link>

              <Dropdown menu={{ items: profileMenuItems, onClick: handleProfileMenuClick }} placement="bottomRight" trigger={['click']}>
         <button className="flex items-center gap-2 bg-primary-hover hover:bg-[#39695d] px-3.5 py-1.5 rounded-full text-xs font-medium text-white transition-all">
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

