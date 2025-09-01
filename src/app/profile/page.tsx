'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import OrderList from '@/components/OrderList';
import { redirect } from 'next/navigation';
import { UserRole } from "@/consts/constantEnum";

export default function ProfilePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Đang tải...</div>
      </div>
    );
  }

  if (!user) {
    redirect('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Thông tin profile */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Thông tin cá nhân</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="block text-sm font-medium text-gray-700">Số điện thoại</div>
              <p className="mt-1 text-lg text-gray-900">{user.phoneNumber}</p>
            </div>
            <div>
              <div className="block text-sm font-medium text-gray-700">Vai trò</div>
              <p className="mt-1 text-lg text-gray-900">
                {user.role === UserRole.Admin ? 'Quản trị viên' : 'Khách hàng'}
              </p>
            </div>
          </div>
        </div>

        {/* Danh sách đơn hàng */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <OrderList />
        </div>
      </div>
    </div>
  );
}
