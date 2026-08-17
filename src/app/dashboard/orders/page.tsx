"use client";

import { useState } from "react";
import {
  ClockCircleOutlined,
  UserOutlined,
  ShopOutlined,
  CheckOutlined,
  ArrowRightOutlined,
  CoffeeOutlined,
} from "@ant-design/icons";
import { App } from "antd";

interface KitchenOrder {
  id: string;
  orderNo: string;
  customerName: string;
  branchName: string;
  pickupMode: "Take Away" | "At our place";
  items: Array<{
    name: string;
    qty: number;
    customization: string;
  }>;
  totalPrice: number;
  status: "new" | "preparing" | "ready" | "completed";
  timeElapsed: string;
}

const initialOrders: KitchenOrder[] = [
  {
    id: "o1",
    orderNo: "#ORD-9482",
    customerName: "Sofia Lindqvist",
    branchName: "Isomyy",
    pickupMode: "Take Away",
    items: [
      { name: "Peach Please Frapino", qty: 2, customization: "Oat Milk, Extra Cream" },
      { name: "Cinnamon Roll", qty: 1, customization: "Standard" },
    ],
    totalPrice: 198,
    status: "new",
    timeElapsed: "3 mins ago",
  },
  {
    id: "o2",
    orderNo: "#ORD-9481",
    customerName: "Marcus Karlsson",
    branchName: "Isomyy",
    pickupMode: "At our place",
    items: [
      { name: "Iced Salted Caramel Cold Brew", qty: 1, customization: "Extra Shot (+10 SEK)" },
    ],
    totalPrice: 75,
    status: "preparing",
    timeElapsed: "6 mins ago",
  },
  {
    id: "o3",
    orderNo: "#ORD-9480",
    customerName: "Elena Rantanen",
    branchName: "Isomyy",
    pickupMode: "Take Away",
    items: [
      { name: "Double Espresso Shot", qty: 1, customization: "Dairy Free" },
    ],
    totalPrice: 38,
    status: "ready",
    timeElapsed: "10 mins ago",
  },
  {
    id: "o4",
    orderNo: "#ORD-9479",
    customerName: "Johan Berg",
    branchName: "Isomyy",
    pickupMode: "Take Away",
    items: [
      { name: "Passion Fruit Refresher", qty: 2, customization: "Standard" },
    ],
    totalPrice: 136,
    status: "completed",
    timeElapsed: "18 mins ago",
  },
];

export default function KitchenOrdersPage() {
  const { message } = App.useApp();
  const [orders, setOrders] = useState<KitchenOrder[]>(initialOrders);

  const moveOrderStatus = (orderId: string, nextStatus: KitchenOrder["status"]) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: nextStatus } : ord))
    );
    message.success(`Order status updated to ${nextStatus.toUpperCase()}`);
  };

  const columns: Array<{ status: KitchenOrder["status"]; title: string; color: string }> = [
    { status: "new", title: "1. Incoming Orders", color: "bg-blue-500" },
    { status: "preparing", title: "2. Preparing (Barista)", color: "bg-amber-500" },
    { status: "ready", title: "3. Ready for Pickup", color: "bg-emerald-600" },
    { status: "completed", title: "4. Completed", color: "bg-gray-400" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#16302b]">
            Kitchen Order KDS Board
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
            Real-time barista kitchen display system for live order fulfillment.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-2xs text-xs font-bold">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span>Live POS Stream Connected</span>
        </div>
      </div>

      {/* Kanban Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        {columns.map((col) => {
          const columnOrders = orders.filter((o) => o.status === col.status);
          return (
            <div key={col.status} className="bg-gray-100/90 rounded-3xl p-4 space-y-4 border border-gray-200/80">
              {/* Column Title Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`h-3 w-3 rounded-full ${col.color}`} />
                  <h3 className="text-sm font-extrabold text-[#16302b]">{col.title}</h3>
                </div>
                <span className="bg-white px-2.5 py-0.5 rounded-full text-xs font-extrabold text-gray-700 shadow-2xs">
                  {columnOrders.length}
                </span>
              </div>

              {/* Column Cards Container */}
              <div className="space-y-3 min-h-105">
                {columnOrders.length === 0 ? (
                  <div className="bg-white/60 rounded-2xl p-6 text-center text-xs font-bold text-gray-400 border border-dashed border-gray-300">
                    No orders in this column
                  </div>
                ) : (
                  columnOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-white rounded-2xl p-4 border border-gray-200 shadow-2xs hover:shadow-md transition-all space-y-3"
                    >
                      {/* Card Header */}
                      <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                        <div>
                          <span className="font-mono font-black text-[#16302b] text-sm block">
                            {ord.orderNo}
                          </span>
                          <span className="text-[11px] font-bold text-emerald-800 flex items-center gap-1">
                            <ShopOutlined />
                            <span>{ord.pickupMode}</span>
                          </span>
                        </div>
                        <span className="text-[11px] text-gray-400 font-semibold flex items-center gap-1">
                          <ClockCircleOutlined />
                          <span>{ord.timeElapsed}</span>
                        </span>
                      </div>

                      {/* Customer Info */}
                      <div className="flex items-center gap-2 text-xs text-gray-700 font-extrabold">
                        <UserOutlined className="text-gray-400" />
                        <span>{ord.customerName}</span>
                      </div>

                      {/* Items & Customizations */}
                      <div className="bg-gray-50 p-2.5 rounded-xl space-y-1.5 text-xs">
                        {ord.items.map((item, idx) => (
                          <div key={idx} className="space-y-0.5">
                            <div className="flex justify-between font-extrabold text-gray-900">
                              <span className="flex items-center gap-1">
                                <CoffeeOutlined className="text-emerald-700" />
                                <span>{item.qty}x {item.name}</span>
                              </span>
                            </div>
                            <p className="text-[11px] text-gray-500 font-medium pl-4">
                              {item.customization}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Card Actions / State Transitions */}
                      <div className="pt-1 flex items-center justify-between">
                        <span className="text-xs font-black text-[#1e3932]">
                          {ord.totalPrice} SEK
                        </span>

                        {ord.status === "new" && (
                          <button
                            onClick={() => moveOrderStatus(ord.id, "preparing")}
                            className="bg-amber-500 hover:bg-amber-600 text-white px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1 shadow-xs"
                          >
                            <span>Start Preparing</span>
                            <ArrowRightOutlined className="text-[10px]" />
                          </button>
                        )}

                        {ord.status === "preparing" && (
                          <button
                            onClick={() => moveOrderStatus(ord.id, "ready")}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1 shadow-xs"
                          >
                            <span>Mark Ready</span>
                            <CheckOutlined className="text-[10px]" />
                          </button>
                        )}

                        {ord.status === "ready" && (
                          <button
                            onClick={() => moveOrderStatus(ord.id, "completed")}
                            className="bg-[#1e3932] hover:bg-primary-hover text-white px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1 shadow-xs"
                          >
                            <span>Complete</span>
                            <CheckOutlined className="text-[10px]" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
