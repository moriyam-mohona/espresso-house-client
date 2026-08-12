"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LeftOutlined,
  FileTextOutlined,
  DownloadOutlined,
  PrinterOutlined,
  QrcodeOutlined,
  SearchOutlined,
  StarFilled,
  CoffeeOutlined,
} from "@ant-design/icons";
import { App, Modal, Input } from "antd";
import { ROUTES } from "@/constants/routes";

interface ReceiptItem {
  name: string;
  qty: number;
  price: number;
}

interface Receipt {
  id: string;
  orderNo: string;
  storeName: string;
  address: string;
  date: string;
  time: string;
  items: ReceiptItem[];
  subtotal: number;
  vat: number;
  total: number;
  paymentMethod: string;
  pointsEarned: number;
}

const mockReceipts: Receipt[] = [
  {
    id: "rec-1",
    orderNo: "#EC-94821",
    storeName: "Espresso Club Sergelstorg",
    address: "Sergelstorg 14, 111 57 Stockholm",
    date: "12 Aug 2026",
    time: "14:32",
    items: [
      { name: "Double Espresso Shot", qty: 1, price: 38 },
      { name: "Passionfruit Frapino", qty: 1, price: 68 },
      { name: "Kanelbulle Cinnamon Bun", qty: 1, price: 42 },
    ],
    subtotal: 132.14,
    vat: 15.86,
    total: 148,
    paymentMethod: "Coffee Card",
    pointsEarned: 6,
  },
  {
    id: "rec-2",
    orderNo: "#EC-93204",
    storeName: "Espresso Club Drottninggatan",
    address: "Drottninggatan 71, 111 36 Stockholm",
    date: "09 Aug 2026",
    time: "09:15",
    items: [
      { name: "Iced Caramel Latte (Large)", qty: 2, price: 124 },
      { name: "Avocado & Egg Sourdough", qty: 1, price: 89 },
    ],
    subtotal: 190.18,
    vat: 22.82,
    total: 213,
    paymentMethod: "Visa •••• 4242",
    pointsEarned: 9,
  },
  {
    id: "rec-3",
    orderNo: "#EC-91055",
    storeName: "Espresso Club Vasagatan",
    address: "Vasagatan 22, 111 20 Stockholm",
    date: "04 Aug 2026",
    time: "17:00",
    items: [
      { name: "Coffee Card Top Up (Deposit)", qty: 1, price: 300 },
    ],
    subtotal: 300,
    vat: 0,
    total: 300,
    paymentMethod: "Mastercard •••• 8812",
    pointsEarned: 12,
  },
  {
    id: "rec-4",
    orderNo: "#EC-88319",
    storeName: "Espresso Club Central Station",
    address: "Centralplan 15, 111 20 Stockholm",
    date: "28 Jul 2026",
    time: "08:45",
    items: [
      { name: "Cold Brew Refresher", qty: 1, price: 58 },
      { name: "Croissant Original", qty: 1, price: 35 },
    ],
    subtotal: 83.04,
    vat: 9.96,
    total: 93,
    paymentMethod: "Coffee Card",
    pointsEarned: 4,
  },
];

export default function ReceiptsPage() {
  const { message } = App.useApp();
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredReceipts = mockReceipts.filter(
    (r) =>
      r.storeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.orderNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.items.some((i) => i.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalSpent = mockReceipts.reduce((sum, r) => sum + r.total, 0);
  const totalPoints = mockReceipts.reduce((sum, r) => sum + r.pointsEarned, 0);

  const handleDownloadPdf = () => {
    message.success(`📄 Downloading PDF receipt for ${selectedReceipt?.orderNo}...`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#f7f8f6] text-gray-900 font-sans flex flex-col justify-between">
      {/* Sticky Top Header Bar */}
      <header className="sticky top-0 z-30 bg-white px-4 py-3.5 border-b border-gray-200/80 shadow-2xs">
        <div className="mx-auto max-w-md md:max-w-7xl flex items-center justify-between">
          <Link
            href={ROUTES.WALLET}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-gray-800 bg-gray-100 hover:bg-gray-200 px-3.5 py-1.5 rounded-full transition-all border border-gray-200/60 cursor-pointer"
          >
            <LeftOutlined className="text-xs" />
            <span>Back</span>
          </Link>

          <h1 className="text-base sm:text-lg font-extrabold text-[#16302b]">
            Receipts
          </h1>

          <div className="w-16" />
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 p-4 md:p-6 max-w-md md:max-w-7xl mx-auto w-full space-y-6">
        {/* Top Summary Statistics Banner */}
        <div className="bg-gradient-to-r from-[#1e3932] via-[#24473e] to-[#2c5349] text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 translate-x-4 translate-y-4">
            <FileTextOutlined className="text-9xl text-white" />
          </div>

          <div className="relative z-10 grid grid-cols-3 gap-4 text-center">
            <div className="border-r border-white/20 pr-2">
              <span className="text-[11px] uppercase tracking-wider text-emerald-200 font-bold block">
                Total Spent
              </span>
              <span className="text-lg sm:text-2xl font-black mt-1 block">
                {totalSpent} SEK
              </span>
            </div>

            <div className="border-r border-white/20 px-2">
              <span className="text-[11px] uppercase tracking-wider text-emerald-200 font-bold block">
                Receipts
              </span>
              <span className="text-lg sm:text-2xl font-black mt-1 block">
                {mockReceipts.length} Orders
              </span>
            </div>

            <div className="pl-2">
              <span className="text-[11px] uppercase tracking-wider text-emerald-200 font-bold block">
                Fika Points
              </span>
              <span className="text-lg sm:text-2xl font-black mt-1 text-amber-300 flex items-center justify-center gap-1">
                <span>+{totalPoints}</span>
                <StarFilled className="text-xs text-amber-300" />
              </span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div>
          <Input
            prefix={<SearchOutlined className="text-gray-400 mr-1" />}
            placeholder="Search receipts by store, product, or order #"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-2xl py-3 px-4 bg-white border-gray-200 shadow-2xs text-sm"
          />
        </div>

        {/* Receipts List Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-[#16302b]">
              Digital Receipts ({filteredReceipts.length})
            </h2>
            <span className="text-xs text-gray-500 font-medium">
              Verified POS Snapshot
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredReceipts.map((rec) => (
              <div
                key={rec.id}
                onClick={() => setSelectedReceipt(rec)}
                className="bg-white rounded-3xl p-5 border border-gray-200/90 shadow-2xs hover:shadow-md transition-all cursor-pointer space-y-3 group"
              >
                {/* Receipt Card Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-2xl bg-[#e8efe6] text-[#1e3932] flex items-center justify-center text-lg group-hover:scale-105 transition-transform">
                      <CoffeeOutlined />
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-[#16302b] group-hover:text-emerald-800 transition-colors">
                        {rec.storeName}
                      </h3>
                      <p className="text-xs text-gray-500 font-medium">
                        {rec.date} • {rec.time}
                      </p>
                    </div>
                  </div>

                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-200/60 text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <StarFilled className="text-[10px] text-amber-500" />
                    <span>+{rec.pointsEarned} Pts</span>
                  </span>
                </div>

                {/* Items Summary */}
                <div className="bg-gray-50/80 rounded-2xl p-3 text-xs text-gray-700 space-y-1 font-medium">
                  {rec.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>
                        {item.qty}x {item.name}
                      </span>
                      <span className="font-semibold text-gray-900">{item.price} SEK</span>
                    </div>
                  ))}
                </div>

                {/* Footer Row */}
                <div className="flex items-center justify-between pt-1 border-t border-gray-100 text-xs">
                  <span className="font-mono font-bold text-gray-500">
                    {rec.orderNo}
                  </span>
                  <div className="text-right">
                    <span className="text-gray-500 mr-2">{rec.paymentMethod}</span>
                    <span className="text-base font-extrabold text-[#16302b]">
                      {rec.total} SEK
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ==============================================================================
          Digital Thermal Paper Receipt Detail Modal
         ============================================================================== */}
      {selectedReceipt && (
        <Modal
          open={!!selectedReceipt}
          onCancel={() => setSelectedReceipt(null)}
          footer={null}
          centered
          className="rounded-3xl overflow-hidden max-w-md"
          modalRender={(modalContent) => (
            <div className="rounded-3xl overflow-hidden shadow-2xl bg-[#f4f3ef] p-2">
              {modalContent}
            </div>
          )}
        >
          {/* Thermal Receipt Paper Card Design */}
          <div className="bg-white rounded-2xl p-6 text-[#16302b] shadow-inner font-mono text-xs space-y-4 relative border-t-8 border-[#1e3932]">
            {/* Store Branding Header */}
            <div className="text-center space-y-1 pb-3 border-b-2 border-dashed border-gray-300">
              <h2 className="text-lg font-black tracking-widest text-[#16302b]">
                ESPRESSO CLUB
              </h2>
              <p className="text-[11px] font-sans text-gray-600">
                {selectedReceipt.storeName}
              </p>
              <p className="text-[10px] font-sans text-gray-400">
                {selectedReceipt.address}
              </p>
              <p className="text-[10px] font-sans text-gray-400">
                Org.nr: SE556000123401 | VAT Reg: YES
              </p>
            </div>

            {/* Transaction Metadata */}
            <div className="flex justify-between text-[11px] text-gray-600 pb-2 border-b border-gray-200">
              <div>
                <div>Receipt: <span className="font-bold text-gray-900">{selectedReceipt.orderNo}</span></div>
                <div>Date: {selectedReceipt.date} {selectedReceipt.time}</div>
              </div>
              <div className="text-right">
                <div>Terminal: #POS-04</div>
                <div>Cashier: Staff #12</div>
              </div>
            </div>

            {/* Itemized Purchased List */}
            <div className="space-y-2 py-1">
              <div className="flex justify-between font-bold text-gray-900 border-b border-gray-200 pb-1">
                <span>QTY & DESCRIPTION</span>
                <span>AMOUNT</span>
              </div>

              {selectedReceipt.items.map((item, index) => (
                <div key={index} className="flex justify-between text-gray-800">
                  <span>
                    {item.qty}x {item.name}
                  </span>
                  <span className="font-bold">{item.price}.00 SEK</span>
                </div>
              ))}
            </div>

            {/* Calculations & Totals */}
            <div className="border-t-2 border-dashed border-gray-300 pt-3 space-y-1.5">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal (excl. VAT)</span>
                <span>{selectedReceipt.subtotal.toFixed(2)} SEK</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>VAT (12% Beverage/Food)</span>
                <span>{selectedReceipt.vat.toFixed(2)} SEK</span>
              </div>

              <div className="flex justify-between text-base font-black text-[#16302b] pt-2 border-t border-gray-300">
                <span>TOTAL</span>
                <span>{selectedReceipt.total}.00 SEK</span>
              </div>
            </div>

            {/* Payment Method & Loyalty Breakdown */}
            <div className="bg-[#e8efe6] rounded-xl p-3 font-sans space-y-1 text-xs">
              <div className="flex justify-between text-[#1e3932] font-bold">
                <span>Payment Method</span>
                <span>{selectedReceipt.paymentMethod}</span>
              </div>

              <div className="flex justify-between text-emerald-800 font-extrabold pt-1 border-t border-emerald-200">
                <span>Fika Points Earned</span>
                <span className="flex items-center gap-1">
                  <span>+{selectedReceipt.pointsEarned} Points</span>
                  <StarFilled className="text-amber-500 text-xs" />
                </span>
              </div>
            </div>

            {/* Barcode & QR Code Graphic */}
            <div className="pt-2 text-center space-y-2">
              <div className="flex justify-center items-center opacity-80">
                <QrcodeOutlined className="text-6xl text-[#1e3932]" />
              </div>

              {/* Simulated Barcode Lines */}
              <div className="w-full h-8 flex justify-between gap-0.5 opacity-80 px-4">
                {[3, 1, 4, 2, 5, 1, 3, 2, 4, 1, 5, 2, 3, 1, 4, 2, 5, 1, 3, 4].map(
                  (w, i) => (
                    <div key={i} className="h-full bg-gray-900" style={{ width: `${w * 2}px` }} />
                  )
                )}
              </div>
              <p className="text-[10px] text-gray-400 font-sans">
                Thank you for visiting Espresso Club!
              </p>
            </div>

            {/* Action Buttons Row */}
            <div className="pt-3 font-sans space-y-2">
              <button
                onClick={handleDownloadPdf}
                className="w-full bg-[#1e3932] hover:bg-primary-hover text-white py-3 rounded-xl font-bold text-xs transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <DownloadOutlined />
                <span>Download PDF Receipt</span>
              </button>

              <button
                onClick={handlePrint}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer border border-gray-200"
              >
                <PrinterOutlined />
                <span>Print Receipt</span>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
