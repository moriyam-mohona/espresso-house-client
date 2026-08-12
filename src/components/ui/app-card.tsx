"use client";

import React from "react";
import { Card as AntdCard, type CardProps as AntdCardProps } from "antd";
import { cn } from "@/utils/cn";

export interface AppCardProps extends AntdCardProps {
  className?: string;
}

/**
 * Reusable Card wrapper for SaaS dashboard cards.
 */
export const AppCard: React.FC<AppCardProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <AntdCard
      className={cn("shadow-xs border-gray-200/80 rounded-xl", className)}
      {...props}
    >
      {children}
    </AntdCard>
  );
};
