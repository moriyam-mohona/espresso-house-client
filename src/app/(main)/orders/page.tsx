"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

export default function OrdersPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(ROUTES.RECEIPTS);
  }, [router]);

  return (
    <div className="min-h-screen bg-[#f7f8f6] flex items-center justify-center p-4 text-center">
      <div className="space-y-2">
        <p className="text-sm font-bold text-gray-600">Redirecting to Order History...</p>
      </div>
    </div>
  );
}
