"use client";

import React from "react";
import { Input as AntdInput, type InputProps as AntdInputProps } from "antd";
import { cn } from "@/utils/cn";

export interface AppInputProps extends AntdInputProps {
  className?: string;
}

/**
 * Reusable Input wrapper.
 */
export const AppInput: React.FC<AppInputProps> = ({ className, ...props }) => {
  return <AntdInput className={cn("rounded-md", className)} {...props} />;
};
