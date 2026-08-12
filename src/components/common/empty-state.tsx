"use client";

import React from "react";
import { Empty } from "antd";
import { cn } from "@/utils/cn";

export interface EmptyStateProps {
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

/**
 * Common Empty State placeholder.
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  description = "No data available",
  action,
  className,
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center", className)}>
      <Empty description={<span className="text-gray-500">{description}</span>}>
        {action && <div className="mt-4">{action}</div>}
      </Empty>
    </div>
  );
};
