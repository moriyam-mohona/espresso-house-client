"use client";

import Link from "next/link";
import { AppButton, AppCard } from "@/components/ui";
import { ROUTES } from "@/constants/routes";
import { FileSearchOutlined } from "@ant-design/icons";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
      <AppCard className="max-w-md text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#e8efe6] text-[#1e3932]">
          <FileSearchOutlined className="text-2xl" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900">404</h1>
        <h2 className="mt-2 text-lg font-medium text-gray-800">Page Not Found</h2>
        <p className="mt-1 text-sm text-gray-500">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-6 flex justify-center">
          <Link href={ROUTES.HOME}>
            <AppButton type="primary">Return Home</AppButton>
          </Link>
        </div>
      </AppCard>
    </div>
  );
}
