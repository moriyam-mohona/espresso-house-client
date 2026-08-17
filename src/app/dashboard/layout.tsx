"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  DashboardOutlined,
  ShoppingOutlined,
  CoffeeOutlined,
  ShopOutlined,
  TagOutlined,
  FileTextOutlined,
  TeamOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CrownOutlined,
  UserOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { App, Dropdown, MenuProps, Select } from "antd";
import { ROUTES } from "@/constants/routes";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { message } = App.useApp();

  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [activeRole, setActiveRole] = useState<"superAdmin" | "storeManager">("superAdmin");
  const [selectedBranch, setSelectedBranch] = useState<string>("all");

  const menuItems = [
    {
      key: ROUTES.DASHBOARD.HOME,
      icon: <DashboardOutlined />,
      label: "Overview",
    },
    {
      key: ROUTES.DASHBOARD.ORDERS,
      icon: <ShoppingOutlined />,
      label: "Kitchen KDS Board",
    },
    {
      key: ROUTES.DASHBOARD.MENU,
      icon: <CoffeeOutlined />,
      label: "Menu & Stock",
    },
    {
      key: ROUTES.DASHBOARD.BRANCHES,
      icon: <ShopOutlined />,
      label: "Store Branches",
    },
    {
      key: ROUTES.DASHBOARD.OFFERS,
      icon: <TagOutlined />,
      label: "Expresso Offers",
    },
    {
      key: ROUTES.DASHBOARD.TRANSACTIONS,
      icon: <FileTextOutlined />,
      label: "Transactions Log",
    },
    {
      key: ROUTES.DASHBOARD.MEMBERS,
      icon: <TeamOutlined />,
      label: "Members & Deactivations",
    },
    {
      key: ROUTES.DASHBOARD.SETTINGS,
      icon: <SettingOutlined />,
      label: "Settings",
    },
  ];

  const profileMenuItems: MenuProps["items"] = [
    {
      key: "client",
      label: "Exit to Client Web App",
      onClick: () => router.push(ROUTES.HOME),
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Sign Out",
      danger: true,
      onClick: () => {
        message.success("Signed out from Dashboard");
        router.push(ROUTES.LOGIN);
      },
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f6f3] text-gray-900 font-sans flex flex-col justify-between selection:bg-brand-sage selection:text-[#1e3932]">
      <div className="flex flex-1">
        {/* ==============================================================================
            SIDEBAR NAVIGATION
           ============================================================================== */}
        <aside
          className={`bg-[#1e3932] text-white flex flex-col justify-between transition-all duration-300 z-30 shrink-0 ${
            collapsed ? "w-20" : "w-64"
          }`}
        >
          <div>
            {/* Sidebar Branding Header */}
            <div className="p-4 border-b border-emerald-800/60 flex items-center justify-between">
              <Link href={ROUTES.HOME} className="flex items-center gap-3 overflow-hidden">
                <div className="h-9 w-9 rounded-full overflow-hidden relative shrink-0 border border-[#d4a373]">
                  <Image src="/logo.png" alt="Logo" fill className="object-cover" />
                </div>
                {!collapsed && (
                  <div>
                    <h2 className="text-sm font-black tracking-wide text-white leading-none">
                      ESPRESSO CLUB
                    </h2>
                    <span className="text-[10px] text-emerald-200 font-bold">Admin Portal</span>
                  </div>
                )}
              </Link>
            </div>

            {/* Role Indicator Badge */}
            {!collapsed && (
              <div className="p-3 mx-3 my-3 bg-emerald-900/60 rounded-2xl border border-emerald-700/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {activeRole === "superAdmin" ? (
                    <CrownOutlined className="text-amber-400 text-sm" />
                  ) : (
                    <ShopOutlined className="text-emerald-300 text-sm" />
                  )}
                  <div>
                    <span className="block text-xs font-black text-white">
                      {activeRole === "superAdmin" ? "Super Admin" : "Store Manager"}
                    </span>
                    <span className="text-[10px] text-emerald-200 font-medium">
                      {activeRole === "superAdmin" ? "Head Office" : "Isomyy Branch POS"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Sidebar Links */}
            <nav className="p-2 space-y-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.key;
                return (
                  <Link
                    key={item.key}
                    href={item.key}
                    className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition-all ${
                      isActive
                        ? "bg-brand-sage text-[#1e3932] shadow-sm"
                        : "text-emerald-100/80 hover:bg-emerald-900/40 hover:text-white"
                    }`}
                  >
                    <span className="text-base">{item.icon}</span>
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Footer Back to Web App Button */}
          <div className="p-3 border-t border-emerald-800/60">
            <Link
              href={ROUTES.HOME}
              className="flex items-center justify-center gap-2 bg-emerald-900/60 hover:bg-emerald-800/80 text-emerald-100 p-2.5 rounded-2xl text-xs font-bold transition-all border border-emerald-700/50"
            >
              <LeftOutlined className="text-xs" />
              {!collapsed && <span>Back to Client Web</span>}
            </Link>
          </div>
        </aside>

        {/* ==============================================================================
            MAIN DASHBOARD CONTENT AREA
           ============================================================================== */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar Header */}
          <header className="bg-white px-4 sm:px-6 py-3.5 border-b border-gray-200/90 shadow-2xs flex items-center justify-between sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors cursor-pointer border border-gray-200"
              >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </button>

              {/* Branch Selector */}
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-xs font-bold text-gray-500">Filter Branch:</span>
                <Select
                  value={selectedBranch}
                  onChange={setSelectedBranch}
                  className="w-48 text-xs font-bold"
                  options={[
                    { value: "all", label: "🏢 All Branches (Head Office)" },
                    { value: "br-1", label: "📍 Isomyy Branch" },
                    { value: "br-2", label: "📍 Iso Kristiina Branch" },
                    { value: "br-3", label: "📍 Pasaati Branch" },
                    { value: "br-4", label: "📍 Sergelstorg Branch" },
                  ]}
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Role Switcher Pill for Demo */}
              <div className="bg-gray-100 p-1 rounded-full flex items-center border border-gray-200 text-xs">
                <button
                  onClick={() => {
                    setActiveRole("superAdmin");
                    message.info("Switched to Super Admin View");
                  }}
                  className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
                    activeRole === "superAdmin"
                      ? "bg-[#1e3932] text-white shadow-2xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Super Admin
                </button>
                <button
                  onClick={() => {
                    setActiveRole("storeManager");
                    message.info("Switched to Store Manager View");
                  }}
                  className={`px-3 py-1 rounded-full font-bold transition-all cursor-pointer ${
                    activeRole === "storeManager"
                      ? "bg-[#1e3932] text-white shadow-2xs"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Manager
                </button>
              </div>

              {/* User Dropdown */}
              <Dropdown menu={{ items: profileMenuItems }} placement="bottomRight" trigger={["click"]}>
                <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full border border-gray-200 cursor-pointer">
                  <div className="h-6 w-6 rounded-full bg-[#1e3932] text-white flex items-center justify-center text-xs font-bold">
                    <UserOutlined />
                  </div>
                  <span className="text-xs font-extrabold text-gray-800">
                    {activeRole === "superAdmin" ? "Head Office" : "Isomyy Barista"}
                  </span>
                </button>
              </Dropdown>
            </div>
          </header>

          {/* Dynamic Page Content Render Target */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
