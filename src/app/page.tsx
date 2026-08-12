"use client";

import React from "react";
import { AppCard, PageHeader, StatusBadge } from "@/components/ui";
import { siteConfig } from "@/config/site";
import { env } from "@/config/env";
import {
  CheckCircleOutlined,
  CodeOutlined,
  ThunderboltOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

export default function HomePage() {
  const stackItems = [
    {
      title: "Next.js App Router",
      desc: "Latest App Router with server-side rendering & route handlers.",
      status: "Ready",
    },
    {
      title: "TypeScript",
      desc: "Strict type checking, alias paths (@/*), & type safety.",
      status: "Ready",
    },
    {
      title: "Ant Design & Tailwind CSS",
      desc: "Integrated AntD v5 SSR registry with utility-first Tailwind styling.",
      status: "Ready",
    },
    {
      title: "Production Architecture",
      desc: "Modular src/ structure with config, hooks, utils, & API layers.",
      status: "Ready",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50/50 p-6 md:p-12">
      <div className="mx-auto max-w-5xl">
        <PageHeader
          title={siteConfig.name}
          subtitle="Initial Frontend Application Scaffold — Production Ready"
          action={
            <StatusBadge status="success" label={`Environment: ${env.NODE_ENV}`} />
          }
        />

        <AppCard className="mb-8 border-gray-200/80 bg-white">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <ThunderboltOutlined className="text-2xl" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Step 1: Frontend Setup Complete
              </h2>
              <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                The project architecture has been configured with clean conventions,
                reusable component abstractions, type-safe helpers, and SSR compatibility.
                Ready to accept business feature requirements.
              </p>
            </div>
          </div>
        </AppCard>

        <h3 className="mb-4 text-base font-semibold text-gray-900 flex items-center gap-2">
          <CodeOutlined className="text-blue-600" /> Environment & Architecture Status
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {stackItems.map((item, idx) => (
            <AppCard key={idx} className="bg-white hover:border-blue-300 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 flex items-center gap-2">
                    <CheckCircleOutlined className="text-emerald-500" />
                    {item.title}
                  </h4>
                  <p className="mt-1 text-xs text-gray-500 leading-normal">
                    {item.desc}
                  </p>
                </div>
                <StatusBadge status="success" label={item.status} />
              </div>
            </AppCard>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-blue-100 bg-blue-50/60 p-4 text-xs text-blue-800 flex items-center gap-3">
          <SafetyCertificateOutlined className="text-base text-blue-600" />
          <span>
            <strong>Incremental Build System Active:</strong> Future features will be added step by step based on your flow requirements.
          </span>
        </div>
      </div>
    </main>
  );
}
