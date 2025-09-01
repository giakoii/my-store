"use client";

import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/consts/constantEnum";
import OrderCreateForm from "@/components/admin/OrderCreateForm";
import { redirect } from "next/navigation";

export default function AdminOrderPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Đang tải...</div>
      </div>
    );
  }

  // Kiểm tra quyền admin
  if (!user || user.role !== UserRole.Admin) {
    redirect("/");
    return null;
  }

  const handleOrderCreated = () => {
    // Có thể thêm logic refresh hoặc notification
    console.log("Đơn hàng đã được tạo thành công");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tạo hoá đơn cho khách</h1>
          <p className="mt-2 text-gray-600">Tạo đơn hàng mới cho khách hàng</p>
        </div>

        <OrderCreateForm onOrderCreated={handleOrderCreated} />
      </div>
    </div>
  );
}
