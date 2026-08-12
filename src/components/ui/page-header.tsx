"use client";

import React from "react";
import { cn } from "@/utils/cn";

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  breadcrumbs?: React.ReactNode;
  className?: string;
}

/**
 * Standardized SaaS Page Header component
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  action,
  breadcrumbs,
  className,
}) => {
  return (
    <div className={cn("mb-6 flex flex-col gap-2", className)}>
      {breadcrumbs && <div className="text-xs text-gray-500">{breadcrumbs}</div>}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
          )}
        </div>
        {action && <div className="flex items-center gap-2">{action}</div>}
      </div>
    </div>
  );
};
