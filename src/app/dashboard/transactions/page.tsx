"use client";

import React, { useState } from "react";
import {
  FileTextOutlined,
  SearchOutlined,
  StarFilled,
  QrcodeOutlined,
} from "@ant-design/icons";
import { Input, Modal } from "antd";

interface TransactionRecord {
  id: string;
  orderNo: string;
  storeName: string;
  customerName: string;
  date: string;
  time: string;
  amount: number;
  paymentMethod: string;
  pointsEarned: number;
}

const mockTransactions: TransactionRecord[] = [
  { id: "t1", orderNo: "#EC-94821", storeName: "Sergelstorg", customerName: "Sofia Lindqvist", date: "12 Aug 2026", time: "14:32", amount: 148, paymentMethod: "Coffee Card", pointsEarned: 6 },
  { id: "t2", orderNo: "#EC-93204", storeName: "Drottninggatan", customerName: "Marcus Karlsson", date: "09 Aug 2026", time: "09:15", amount: 213, paymentMethod: "Visa •••• 4242", pointsEarned: 9 },
  { id: "t3", orderNo: "#EC-91055", storeName: "Isomyy", customerName: "Elena Rantanen", date: "04 Aug 2026", time: "17:00", amount: 300, paymentMethod: "Mastercard •••• 8812", pointsEarned: 12 },
  { id: "t4", orderNo: "#EC-88319", storeName: "Pasaati", customerName: "Johan Berg", date: "28 Jul 2026", time: "08:45", amount: 93, paymentMethod: "Coffee Card", pointsEarned: 4 },
];

export default function DashboardTransactionsPage() {
  const [transactions] = useState<TransactionRecord[]>(mockTransactions);
  const [selectedTx, setSelectedTx] = useState<TransactionRecord | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filtered = transactions.filter(
    (tx) =>
      tx.orderNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.storeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#16302b]">
          Transactions Log & POS Audit
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
          Master transaction audit history across all payment methods and digital POS receipts.
        </p>
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 rounded-3xl border border-gray-200/90 shadow-2xs">
        <Input
          prefix={<SearchOutlined className="text-gray-400 mr-1" />}
          placeholder="Search by order #, customer name, or store..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="rounded-full py-2.5 px-4 bg-gray-50 border-gray-200 text-xs sm:text-sm max-w-md"
        />
      </div>

      {/* Transactions Table Card */}
      <div className="bg-white rounded-3xl border border-gray-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 font-extrabold uppercase tracking-wider text-[11px]">
                <th className="p-4">Order #</th>
                <th className="p-4">Store</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Payment Method</th>
                <th className="p-4">Amount</th>
                <th className="p-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
              {filtered.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-4 font-mono font-extrabold text-[#16302b]">{tx.orderNo}</td>
                  <td className="p-4 font-bold">{tx.storeName}</td>
                  <td className="p-4">{tx.customerName}</td>
                  <td className="p-4 text-gray-500">{tx.date} • {tx.time}</td>
                  <td className="p-4 font-semibold">{tx.paymentMethod}</td>
                  <td className="p-4 font-black text-[#1e3932]">{tx.amount} SEK</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedTx(tx)}
                      className="bg-brand-sage text-[#1e3932] hover:bg-emerald-200 px-3 py-1 rounded-full font-bold text-xs transition-all cursor-pointer inline-flex items-center gap-1"
                    >
                      <FileTextOutlined />
                      <span>View Thermal Receipt</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* POS Receipt Modal */}
      {selectedTx && (
        <Modal
          open={!!selectedTx}
          onCancel={() => setSelectedTx(null)}
          footer={null}
          centered
          width={400}
        >
          <div className="bg-white rounded-2xl p-6 text-[#16302b] font-mono text-xs space-y-4 border-t-8 border-[#1e3932] mt-4">
            <div className="text-center space-y-1 pb-3 border-b-2 border-dashed border-gray-300">
              <h2 className="text-lg font-black tracking-widest text-[#16302b]">
                ESPRESSO CLUB
              </h2>
              <p className="text-[11px] font-sans text-gray-600">
                {selectedTx.storeName} Branch
              </p>
              <p className="text-[10px] font-sans text-gray-400">
                Receipt: {selectedTx.orderNo} • {selectedTx.date} {selectedTx.time}
              </p>
            </div>

            <div className="space-y-1 text-gray-700">
              <div className="flex justify-between">
                <span>Customer:</span>
                <span className="font-bold">{selectedTx.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment:</span>
                <span className="font-bold">{selectedTx.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-base font-black text-[#16302b] pt-2 border-t border-gray-200">
                <span>TOTAL:</span>
                <span>{selectedTx.amount}.00 SEK</span>
              </div>
            </div>

            <div className="bg-brand-sage rounded-xl p-3 font-sans space-y-1 text-xs">
              <div className="flex justify-between text-emerald-800 font-extrabold">
                <span>Fika Points Earned</span>
                <span className="flex items-center gap-1">
                  <span>+{selectedTx.pointsEarned} Points</span>
                  <StarFilled className="text-amber-500 text-xs" />
                </span>
              </div>
            </div>

            <div className="pt-2 text-center">
              <QrcodeOutlined className="text-5xl text-[#1e3932] opacity-80" />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
