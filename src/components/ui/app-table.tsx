"use client";

import React from "react";
import { Table as AntdTable, type TableProps as AntdTableProps } from "antd";
import { cn } from "@/utils/cn";

export interface AppTableProps<RecordType> extends AntdTableProps<RecordType> {
  className?: string;
}

/**
 * Reusable Table wrapper.
 */
export function AppTable<RecordType extends object>({
  className,
  ...props
}: AppTableProps<RecordType>) {
  return (
    <AntdTable<RecordType>
      className={cn("overflow-hidden rounded-lg border border-gray-200/80", className)}
      {...props}
    />
  );
}
