"use client";

import React from "react";
import { Tag } from "antd";

export type StatusVariant =
  | "success"
  | "processing"
  | "warning"
  | "error"
  | "default";

export interface StatusBadgeProps {
  status: StatusVariant;
  label: string;
}

const colorMap: Record<StatusVariant, string> = {
  success: "success",
  processing: "processing",
  warning: "warning",
  error: "error",
  default: "default",
};

/**
 * Reusable Status Badge component
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label }) => {
  return (
    <Tag color={colorMap[status] || "default"} className="px-2 py-0.5 text-xs">
      {label}
    </Tag>
  );
};
