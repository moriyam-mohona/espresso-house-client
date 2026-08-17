"use client";

import React, { useState } from "react";
import {
  ShopOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  UserOutlined,
  CheckCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { App, Switch } from "antd";
import { mockBranches, Branch } from "@/data/branches";

export default function DashboardBranchesPage() {
  const { message } = App.useApp();
  const [branches] = useState<Branch[]>(mockBranches);
  const [branchStatus, setBranchStatus] = useState<Record<string, boolean>>({
    "br-1": true,
    "br-2": true,
    "br-3": true,
    "br-4": true,
    "br-5": true,
  });

  const handleToggleStoreStatus = (branchId: string, current: boolean) => {
    setBranchStatus((prev) => ({ ...prev, [branchId]: !current }));
    message.success(
      `Store Status Updated: Branch is now ${!current ? "OPEN" : "TEMPORARILY CLOSED"}`
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#16302b]">
            Store Branches Directory
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
            Manage coffee shop locations, operating schedules, amenities, and store managers.
          </p>
        </div>

        <button
          onClick={() => message.info("Opening New Branch Location Form...")}
          className="inline-flex items-center gap-2 bg-[#1e3932] hover:bg-primary-hover text-white px-5 py-2.5 rounded-full font-bold text-xs shadow-md transition-all self-start sm:self-auto cursor-pointer"
        >
          <PlusOutlined />
          <span>Add New Store Branch</span>
        </button>
      </div>

      {/* Branches Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {branches.map((branch) => {
          const isOpen = branchStatus[branch.id] ?? true;
          return (
            <div
              key={branch.id}
              className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-2xs space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-brand-sage text-[#1e3932] flex items-center justify-center text-xl shrink-0">
                      <ShopOutlined />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-[#16302b]">{branch.name}</h3>
                      <p className="text-xs text-gray-500 font-medium">{branch.city}</p>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-black ${
                      isOpen ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {isOpen ? "OPEN" : "CLOSED"}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-gray-600 font-medium">
                  <div className="flex items-center gap-2">
                    <EnvironmentOutlined className="text-emerald-700" />
                    <span>{branch.address}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <ClockCircleOutlined className="text-amber-700" />
                    <span>Hours: {branch.hours}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <UserOutlined className="text-blue-700" />
                    <span>Manager: Staff #{branch.id.replace("br-", "00")}</span>
                  </div>
                </div>

                {/* Amenities Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {branch.amenities.map((amenity, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 text-gray-700 text-[10px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 border border-gray-200"
                    >
                      <CheckCircleOutlined className="text-emerald-600 text-[9px]" />
                      <span>{amenity}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Status Switch */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold">
                <span className={isOpen ? "text-gray-700" : "text-red-600"}>
                  {isOpen ? "Store Operating Normally" : "Emergency Temporary Closure"}
                </span>

                <Switch
                  checked={isOpen}
                  onChange={() => handleToggleStoreStatus(branch.id, isOpen)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
