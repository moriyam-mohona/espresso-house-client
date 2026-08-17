"use client";

import React from "react";
import Link from "next/link";
import {
  RiseOutlined,
  ShoppingOutlined,
  WalletOutlined,
  TeamOutlined,
  CoffeeOutlined,
  RightOutlined,
  StarFilled,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { ROUTES } from "@/constants/routes";

export default function DashboardOverviewPage() {
  const kpiCards = [
    {
      title: "Total Platform Sales",
      value: "248,920 SEK",
      change: "+14.2% vs last month",
      icon: <RiseOutlined className="text-[#1e3932]" />,
      bg: "bg-brand-sage",
    },
    {
      title: "Active Pre-Orders",
      value: "18 Orders",
      change: "4 Ready for pickup",
      icon: <ShoppingOutlined className="text-[#1e3932]" />,
      bg: "bg-emerald-50",
    },
    {
      title: "Digital Wallet Funds",
      value: "54,200 SEK",
      change: "Coffee card deposits",
      icon: <WalletOutlined className="text-[#1e3932]" />,
      bg: "bg-amber-50",
    },
    {
      title: "Active Loyalty Members",
      value: "1,420 Members",
      change: "+86 new this week",
      icon: <TeamOutlined className="text-[#1e3932]" />,
      bg: "bg-blue-50",
    },
  ];

  const topBeverages = [
    { name: "Peach Please Frapino", category: "Cold drinks", sold: 482, revenue: "37,596 SEK" },
    { name: "Iced Salted Caramel Cold Brew", category: "Cold drinks", sold: 340, revenue: "22,100 SEK" },
    { name: "Double Espresso Shot & Croissant", category: "App deals", sold: 290, revenue: "16,820 SEK" },
    { name: "Passion Fruit Refresher", category: "Cold drinks", sold: 215, revenue: "14,620 SEK" },
  ];

  const recentOrders = [
    { id: "#ORD-9481", branch: "Isomyy", customer: "Sofia L.", items: "Peach Please Frapino × 2", total: "156 SEK", status: "Ready", time: "2 mins ago" },
    { id: "#ORD-9480", branch: "Sergelstorg", customer: "Marcus K.", items: "Double Espresso + Oat Milk", total: "48 SEK", status: "Preparing", time: "5 mins ago" },
    { id: "#ORD-9479", branch: "Iso Kristiina", customer: "Elena R.", items: "Iced Cold Brew & Cinnamon Bun", total: "107 SEK", status: "New", time: "8 mins ago" },
  ];

  return (
    <div className="space-y-8">
      {/* Page Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#16302b]">
            Executive Overview & Analytics
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
            Real-time performance metrics across all Espresso Club coffee shop branches.
          </p>
        </div>

        <Link
          href={ROUTES.DASHBOARD.ORDERS}
          className="inline-flex items-center gap-2 bg-[#1e3932] hover:bg-primary-hover text-white px-5 py-2.5 rounded-full font-bold text-xs shadow-md transition-all self-start sm:self-auto cursor-pointer"
        >
          <ShoppingOutlined />
          <span>Open Kitchen KDS Board</span>
        </Link>
      </div>

      {/* 4 Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {kpiCards.map((kpi, idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-3xl border border-gray-200/90 shadow-2xs space-y-3 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-gray-500 uppercase tracking-wider">
                {kpi.title}
              </span>
              <div className={`h-10 w-10 rounded-2xl ${kpi.bg} flex items-center justify-center text-lg shadow-2xs`}>
                {kpi.icon}
              </div>
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-black text-[#16302b]">{kpi.value}</h2>
              <p className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircleOutlined className="text-xs" />
                <span>{kpi.change}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: Popular Drinks + Live Order Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Top Selling Drinks */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-gray-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="text-base font-extrabold text-[#16302b] flex items-center gap-2">
              <CoffeeOutlined className="text-emerald-700" />
              <span>Top Beverage Sales</span>
            </h3>
            <Link
              href={ROUTES.DASHBOARD.MENU}
              className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1"
            >
              <span>Manage Menu</span>
              <RightOutlined className="text-[10px]" />
            </Link>
          </div>

          <div className="space-y-3">
            {topBeverages.map((bev, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-gray-50/80 border border-gray-200/60 flex items-center justify-between text-xs sm:text-sm"
              >
                <div className="space-y-0.5">
                  <h4 className="font-extrabold text-[#16302b]">{bev.name}</h4>
                  <p className="text-xs text-gray-500 font-medium">{bev.category} • {bev.sold} Units Sold</p>
                </div>

                <div className="text-right">
                  <span className="font-black text-[#1e3932] block">{bev.revenue}</span>
                  <span className="text-[11px] text-amber-600 font-bold flex items-center gap-1 justify-end">
                    <StarFilled className="text-[10px]" />
                    <span>Best Seller</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Order Activity Stream */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-gray-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="text-base font-extrabold text-[#16302b] flex items-center gap-2">
              <ShoppingOutlined className="text-emerald-700" />
              <span>Live Order Stream</span>
            </h3>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
          </div>

          <div className="space-y-3">
            {recentOrders.map((ord) => (
              <div
                key={ord.id}
                className="p-3.5 rounded-2xl border border-gray-200/80 hover:bg-gray-50 transition-all space-y-1.5"
              >
                <div className="flex justify-between text-xs">
                  <span className="font-mono font-extrabold text-[#16302b]">{ord.id} • {ord.branch}</span>
                  <span className="text-gray-400 font-medium">{ord.time}</span>
                </div>

                <p className="text-xs font-bold text-gray-800">{ord.customer}: {ord.items}</p>

                <div className="flex justify-between items-center text-xs pt-1">
                  <span className="font-extrabold text-[#1e3932]">{ord.total}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                    ord.status === "Ready" ? "bg-emerald-100 text-emerald-800" :
                    ord.status === "Preparing" ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"
                  }`}>
                    {ord.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
