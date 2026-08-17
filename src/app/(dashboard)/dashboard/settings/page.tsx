"use client";

import React, { useState } from "react";
import {
  DollarOutlined,
  TeamOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { App, Select, Switch } from "antd";

export default function DashboardSettingsPage() {
  const { message } = App.useApp();
  const [currency, setCurrency] = useState<string>("SEK");
  const [autoRefreshKds, setAutoRefreshKds] = useState<boolean>(true);

  const handleSaveSettings = () => {
    message.success("Dashboard settings saved successfully!");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#16302b]">
          Dashboard Settings & Permissions
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
          Configure platform defaults, KDS kitchen board settings, and staff access roles.
        </p>
      </div>

      {/* Currency & System Defaults */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200/90 shadow-2xs space-y-5">
        <h3 className="text-sm font-extrabold text-[#16302b] flex items-center gap-2 border-b border-gray-100 pb-3">
          <DollarOutlined className="text-emerald-700" />
          <span>System Currency & Regional Settings</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
          <div>
            <label className="block font-bold text-gray-700 mb-1.5">Primary Display Currency</label>
            <Select
              value={currency}
              onChange={setCurrency}
              className="w-full font-bold"
              options={[
                { value: "SEK", label: "SEK (Swedish Krona)" },
                { value: "EUR", label: "EUR (Euro €)" },
                { value: "DKK", label: "DKK (Danish Krone)" },
              ]}
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1.5">Kitchen Board KDS Auto-Refresh</label>
            <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-2xl border border-gray-200">
              <span className="font-semibold text-gray-800">Auto-fetch new POS orders</span>
              <Switch checked={autoRefreshKds} onChange={setAutoRefreshKds} />
            </div>
          </div>
        </div>
      </div>

      {/* Staff Access Control Table */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200/90 shadow-2xs space-y-4">
        <h3 className="text-sm font-extrabold text-[#16302b] flex items-center gap-2 border-b border-gray-100 pb-3">
          <TeamOutlined className="text-emerald-700" />
          <span>Staff Access Role Matrix</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500 font-extrabold uppercase tracking-wider text-[11px]">
                <th className="p-3">Feature Area</th>
                <th className="p-3">Super Admin</th>
                <th className="p-3">Store Manager</th>
                <th className="p-3">POS Barista</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-gray-800">
              <tr>
                <td className="p-3 font-bold">Kitchen KDS Board</td>
                <td className="p-3 text-emerald-700">Full Access</td>
                <td className="p-3 text-emerald-700">Full Access</td>
                <td className="p-3 text-emerald-700">View & Update</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Menu & Stock Toggle</td>
                <td className="p-3 text-emerald-700">Full Access</td>
                <td className="p-3 text-emerald-700">Branch Stock Only</td>
                <td className="p-3 text-gray-400">No Access</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Offers & Coupons</td>
                <td className="p-3 text-emerald-700">Full Access</td>
                <td className="p-3 text-gray-400">View Only</td>
                <td className="p-3 text-gray-400">No Access</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Account Deactivations</td>
                <td className="p-3 text-emerald-700">Full Access</td>
                <td className="p-3 text-gray-400">No Access</td>
                <td className="p-3 text-gray-400">No Access</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <button
        onClick={handleSaveSettings}
        className="bg-[#1e3932] hover:bg-primary-hover text-white px-6 py-3.5 rounded-full font-extrabold text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
      >
        <CheckOutlined />
        <span>Save Dashboard Configuration</span>
      </button>
    </div>
  );
}
