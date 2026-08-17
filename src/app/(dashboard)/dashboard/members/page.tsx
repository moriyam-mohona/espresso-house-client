"use client";

import React, { useState } from "react";
import {
  TeamOutlined,
  UserDeleteOutlined,
  StarFilled,
  WarningOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { App } from "antd";

interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  points: number;
  tier: "Gold" | "Platinum" | "Member";
  joinedDate: string;
}

interface DeactivationRequest {
  id: string;
  customerName: string;
  email: string;
  coffeeCardBalance: string;
  requestDate: string;
  reason: string;
}

const mockMembers: Member[] = [
  { id: "m1", name: "Sofia Lindqvist", email: "sofia.lindqvist@example.com", phone: "+46 70 123 4567", points: 142, tier: "Gold", joinedDate: "14 Jan 2025" },
  { id: "m2", name: "Marcus Karlsson", email: "marcus.k@example.com", phone: "+46 72 987 6543", points: 310, tier: "Platinum", joinedDate: "02 Feb 2024" },
  { id: "m3", name: "Elena Rantanen", email: "elena.r@example.fi", phone: "+358 40 555 1234", points: 88, tier: "Gold", joinedDate: "19 Nov 2025" },
];

const mockDeactivations: DeactivationRequest[] = [
  { id: "d1", customerName: "Johan Berg", email: "johan.berg@example.se", coffeeCardBalance: "0.00 SEK", requestDate: "14 Aug 2026", reason: "Moving abroad" },
  { id: "d2", customerName: "Astrid Nilsson", email: "astrid.n@example.com", coffeeCardBalance: "45.00 SEK (Support Contact Needed)", requestDate: "11 Aug 2026", reason: "Switching accounts" },
];

export default function DashboardMembersPage() {
  const { message } = App.useApp();
  const [activeTab, setActiveTab] = useState<"members" | "deactivations">("deactivations");
  const [deactivations, setDeactivations] = useState<DeactivationRequest[]>(mockDeactivations);

  const handleApproveDeactivation = (reqId: string, name: string) => {
    setDeactivations((prev) => prev.filter((d) => d.id !== reqId));
    message.success(`Account for ${name} has been permanently deactivated.`);
  };

  const handleRejectDeactivation = (reqId: string, name: string) => {
    setDeactivations((prev) => prev.filter((d) => d.id !== reqId));
    message.info(`Deactivation request for ${name} rejected.`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#16302b]">
            Member Directory & Account Requests
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
            Manage registered FikaHub loyalty members and process pending account deletion requests.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="bg-gray-200/80 p-1.5 rounded-full flex items-center gap-1 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab("deactivations")}
            className={`px-4 py-2 rounded-full text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "deactivations"
                ? "bg-red-600 text-white shadow-xs"
                : "text-gray-700 hover:text-gray-900"
            }`}
          >
            <UserDeleteOutlined />
            <span>Deactivation Requests ({deactivations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("members")}
            className={`px-4 py-2 rounded-full text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "members"
                ? "bg-[#1e3932] text-white shadow-xs"
                : "text-gray-700 hover:text-gray-900"
            }`}
          >
            <TeamOutlined />
            <span>Active Members ({mockMembers.length})</span>
          </button>
        </div>
      </div>

      {/* ==============================================================================
          TAB 1: Pending Deactivation Requests Tab (Processing Profile Delete Requests)
         ============================================================================== */}
      {activeTab === "deactivations" && (
        <div className="space-y-4">
          <div className="bg-amber-50 p-4 rounded-3xl border border-amber-200/80 text-amber-900 text-xs sm:text-sm font-medium flex items-center gap-3">
            <WarningOutlined className="text-amber-600 text-xl shrink-0" />
            <p>
              Users submitted these requests via the <span className="font-bold">/profile</span> page. Review coffee card balances before approving permanent deactivation.
            </p>
          </div>

          {deactivations.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-gray-200 text-center space-y-2">
              <p className="text-base font-bold text-gray-700">No pending deactivation requests</p>
              <p className="text-xs text-gray-500">All customer account deletion requests have been processed.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {deactivations.map((req) => (
                <div
                  key={req.id}
                  className="bg-white rounded-3xl p-6 border border-red-200/80 shadow-2xs space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3 text-xs sm:text-sm">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                      <div>
                        <h3 className="font-black text-[#16302b] text-base">{req.customerName}</h3>
                        <p className="text-gray-500 font-medium text-xs">{req.email}</p>
                      </div>
                      <span className="bg-red-100 text-red-700 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase">
                        Pending Review
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-gray-700 font-medium">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Coffee Card Balance:</span>
                        <span className="font-extrabold text-amber-800">{req.coffeeCardBalance}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Request Date:</span>
                        <span>{req.requestDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Reason:</span>
                        <span className="font-bold">{req.reason}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
                    <button
                      onClick={() => handleRejectDeactivation(req.id, req.customerName)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-full font-extrabold text-xs transition-all cursor-pointer flex items-center justify-center gap-1"
                    >
                      <CloseOutlined />
                      <span>Reject</span>
                    </button>

                    <button
                      onClick={() => handleApproveDeactivation(req.id, req.customerName)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-full font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1"
                    >
                      <CheckOutlined />
                      <span>Approve Deletion</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ==============================================================================
          TAB 2: Active Members Table
         ============================================================================== */}
      {activeTab === "members" && (
        <div className="bg-white rounded-3xl border border-gray-200/90 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 font-extrabold uppercase tracking-wider text-[11px]">
                  <th className="p-4">Member Name</th>
                  <th className="p-4">Email Address</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Fika Points</th>
                  <th className="p-4">Membership Tier</th>
                  <th className="p-4 text-right">Joined Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
                {mockMembers.map((mem) => (
                  <tr key={mem.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="p-4 font-black text-[#16302b]">{mem.name}</td>
                    <td className="p-4 text-gray-600">{mem.email}</td>
                    <td className="p-4 text-gray-500">{mem.phone}</td>
                    <td className="p-4 font-extrabold text-amber-600 flex items-center gap-1">
                      <StarFilled className="text-xs" />
                      <span>{mem.points} Pts</span>
                    </td>
                    <td className="p-4">
                      <span className="bg-amber-100 text-amber-900 text-[11px] font-extrabold px-3 py-1 rounded-full">
                        {mem.tier} Member
                      </span>
                    </td>
                    <td className="p-4 text-right text-gray-400">{mem.joinedDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
