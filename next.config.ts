import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "antd",
    "@ant-design/nextjs-registry",
    "@ant-design/icons",
    "@ant-design/cssinjs",
  ],
};

export default nextConfig;
