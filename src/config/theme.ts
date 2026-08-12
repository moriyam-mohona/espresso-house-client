import type { ThemeConfig } from "antd";
import { theme } from "antd";

/**
 * Ant Design v5 Theme Configuration
 * Synchronized with Tailwind CSS design tokens.
 */
export const customAntdTheme: ThemeConfig = {
  token: {
    // Primary Brand Colors
    colorPrimary: "#1677ff",
    colorInfo: "#1677ff",
    colorSuccess: "#52c41a",
    colorWarning: "#faad14",
    colorError: "#ff4d4f",
    colorLink: "#1677ff",

    // Typography
    fontFamily:
      "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    fontSize: 14,
    borderRadius: 6,
    wireframe: false,
  },
  components: {
    Button: {
      controlHeight: 38,
      borderRadius: 6,
      fontWeight: 500,
      boxShadow: "none",
    },
    Card: {
      borderRadiusLG: 10,
      colorBorderSecondary: "#f0f0f0",
    },
    Input: {
      controlHeight: 38,
      borderRadius: 6,
    },
    Select: {
      controlHeight: 38,
      borderRadius: 6,
    },
    Table: {
      borderRadius: 8,
      headerBg: "#fafafa",
      headerColor: "#1f2937",
    },
    Modal: {
      borderRadiusLG: 12,
    },
  },
  algorithm: theme.defaultAlgorithm,
};
