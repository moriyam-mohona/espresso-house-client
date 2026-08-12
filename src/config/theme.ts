import type { ThemeConfig } from "antd";
import { theme } from "antd";

/**
 * Ant Design v5 Theme Configuration
 * Synchronized with Tailwind CSS design tokens.
 */
export const customAntdTheme: ThemeConfig = {
  token: {
    // Primary Brand Colors (#1e3932 - Espresso Club Deep Green)
    colorPrimary: "#1e3932",
    colorInfo: "#1e3932",
    colorSuccess: "#2e7d32",
    colorWarning: "#faad14",
    colorError: "#ff4d4f",
    colorLink: "#1e3932",
    colorBgContainer: "#ffffff",

    // Typography & Radii
    fontFamily:
      "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: 14,
    borderRadius: 8,
    wireframe: false,
  },
  components: {
    Button: {
      colorPrimary: "#1e3932",
      colorPrimaryHover: "#2d5349",
      colorPrimaryActive: "#142722",
      controlHeight: 40,
      borderRadius: 8,
      fontWeight: 600,
      boxShadow: "none",
    },
    Card: {
      borderRadiusLG: 16,
      colorBorderSecondary: "#e8efe6",
    },
    Input: {
      controlHeight: 40,
      borderRadius: 8,
      activeBorderColor: "#1e3932",
      hoverBorderColor: "#2d5349",
    },
    Select: {
      controlHeight: 40,
      borderRadius: 8,
      optionSelectedBg: "#e8efe6",
    },
    Table: {
      borderRadius: 12,
      headerBg: "#f4f6f0",
      headerColor: "#1e3932",
    },
    Modal: {
      borderRadiusLG: 20,
    },
    Tag: {
      borderRadiusSM: 6,
    },
  },
  algorithm: theme.defaultAlgorithm,
};
