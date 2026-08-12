"use client";

import React from "react";
import { Button as AntdButton, type ButtonProps as AntdButtonProps } from "antd";
import { cn } from "@/utils/cn";

export interface AppButtonProps extends AntdButtonProps {
  className?: string;
}

/**
 * Reusable App Button wrapper around Ant Design Button with Tailwind styling support.
 */
export const AppButton: React.FC<AppButtonProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <AntdButton className={cn("font-medium shadow-none", className)} {...props}>
      {children}
    </AntdButton>
  );
};
