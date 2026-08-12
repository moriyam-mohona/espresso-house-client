"use client";

import React from "react";
import { Modal as AntdModal, type ModalProps as AntdModalProps } from "antd";
import { cn } from "@/utils/cn";

export interface AppModalProps extends AntdModalProps {
  className?: string;
}

/**
 * Reusable Modal wrapper.
 */
export const AppModal: React.FC<AppModalProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <AntdModal className={cn("rounded-xl", className)} {...props}>
      {children}
    </AntdModal>
  );
};
