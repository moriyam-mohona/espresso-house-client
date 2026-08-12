"use client";

import React from "react";
import { Spin } from "antd";
import { cn } from "@/utils/cn";

export interface LoadingSpinnerProps {
  tip?: string;
  className?: string;
  fullScreen?: boolean;
}

/**
 * Common Loading Spinner component.
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  tip = "Loading...",
  className,
  fullScreen = false,
}) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-xs">
        <Spin size="large" description={tip} />
      </div>
    );
  }

  return (
    <div className={cn("flex items-center justify-center p-8", className)}>
      <Spin size="medium" description={tip} />
    </div>
  );
};
