"use client";

import React from "react";
import { ConfigProvider, App as AntdApp } from "antd";
import { customAntdTheme } from "@/config/theme";

interface AntdProviderProps {
  children: React.ReactNode;
}

/**
 * Client provider configuring Ant Design theme and App context.
 */
export function AntdProvider({ children }: AntdProviderProps) {
  return (
    <ConfigProvider theme={customAntdTheme}>
      <AntdApp>{children}</AntdApp>
    </ConfigProvider>
  );
}
