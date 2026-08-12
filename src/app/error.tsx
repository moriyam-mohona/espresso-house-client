"use client";

import { useEffect } from "react";
import { AppButton, AppCard } from "@/components/ui";
import { logger } from "@/lib/logger";
import { WarningOutlined } from "@ant-design/icons";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error("Unhandled root error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <AppCard className="max-w-md text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
          <WarningOutlined className="text-2xl" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Something went wrong</h2>
        <p className="mt-2 text-sm text-gray-500">
          An unexpected error occurred. Please try reloading the page.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <AppButton type="primary" onClick={() => reset()}>
            Try Again
          </AppButton>
        </div>
      </AppCard>
    </div>
  );
}
