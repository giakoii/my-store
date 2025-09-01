import React, { useState } from 'react';
import { useAdminOrders, useAdminOrderDetail } from '@/hooks/useAdminOrders';
import { AdminOrderSummary } from '@/types/orderTypes';
import Pagination from '../Pagination';
import Loader from '../Loader';

// Tạm thời sử dụng div thay vì heroicons vì chưa install
const ChevronDownIcon = ({ className }: { className?: string }) => (
  <div className={`${className} inline-block`}>▼</div>
);
const ChevronUpIcon = ({ className }: { className?: string }) => (
  <div className={`${className} inline-block`}>▲</div>
);
const UserIcon = ({ className }: { className?: string }) => (
  <div className={`${className} inline-block`}>👤</div>
);
const CalendarIcon = ({ className }: { className?: string }) => (
  <div className={`${className} inline-block`}>📅</div>
);
const CurrencyDollarIcon = ({ className }: { className?: string }) => (
  <div className={`${className} inline-block`}>💰</div>
);

interface AdminDashboardProps {
  className?: string;
}

export default function AdminDashboard({ className = '' }: Readonly<AdminDashboardProps>) {
  const [filters, setFilters] = useState({
    userId: '',
    fromDate: '',
    toDate: ''
  });

  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  const {
    orders,
    loading,
    error,
    currentPage,
    totalPages,
    totalCount,
    loadAdminOrders,
    changePage
  } = useAdminOrders();

  const { orderDetail, loading: detailLoading } = useAdminOrderDetail(selectedOrderId);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const handleFilter = () => {
    const userId = filters.userId ? parseInt(filters.userId) : undefined;
    loadAdminOrders(userId, filters.fromDate || undefined, filters.toDate || undefined, 1);
  };

  const clearFilters = () => {
    setFilters({ userId: '', fromDate: '', toDate: '' });
    loadAdminOrders();
  };

  const handleViewDetail = (orderId: number) => {
    setSelectedOrderId(selectedOrderId === orderId ? null : orderId);
  };

  // Tính toán thống kê
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const averageOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
  const totalOrders = totalCount;

  if (loading && orders.length === 0) {
    return <Loader />;
  }

  const renderOrderDetail = () => {
    if (detailLoading) {
      return (
        <div className="flex justify-center py-4">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      );
    }

    if (orderDetail) {
      return (
        <div className="space-y-4">
          {/* Thông tin khách hàng chi tiết */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold text-gray-700 mb-2">Thông tin khách hàng</h4>
              <p className="text-sm"><strong>Tên:</strong> {orderDetail.userName}</p>
              <p className="text-sm"><strong>SĐT:</strong> {orderDetail.phoneNumber}</p>
              <p className="text-sm"><strong>User ID:</strong> {orderDetail.userId}</p>
              <p className="text-sm"><strong>Vai trò:</strong> {orderDetail.userRole}</p>
              <p className="text-sm"><strong>Ngày tạo tài khoản:</strong> {formatDate(orderDetail.userCreatedAt)}</p>
            </div>

            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold text-gray-700 mb-2">Thống kê đơn hàng</h4>
              <p className="text-sm"><strong>Tổng số sản phẩm:</strong> {orderDetail.totalItemsCount}</p>
              <p className="text-sm"><strong>Giá TB/sản phẩm:</strong> {formatCurrency(orderDetail.averageItemPrice)}</p>
              <p className="text-sm"><strong>Tổng giá trị:</strong> {formatCurrency(orderDetail.totalAmount)}</p>
            </div>

            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold text-gray-700 mb-2">Thông tin đơn hàng</h4>
              <p className="text-sm"><strong>Mã đơn:</strong> #{orderDetail.orderId}</p>
              <p className="text-sm"><strong>Ngày đặt:</strong> {formatDate(orderDetail.orderDate)}</p>
            </div>
          </div>

          {/* Chi tiết sản phẩm */}
          <div className="bg-white rounded-lg border">
            <div className="px-4 py-3 border-b border-gray-200">
              <h4 className="font-semibold text-gray-700">Chi tiết sản phẩm</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Sản phẩm</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Số lượng</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Đơn giá</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Thành tiền</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {orderDetail.orderItems.map((item) => (
                    <tr key={item.orderDetailId}>
                      <td className="px-4 py-2 text-sm font-medium text-gray-900">
                        {item.productTypeName}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        {item.quantity} kg
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-900">
                        {formatCurrency(item.price)}
                      </td>
                      <td className="px-4 py-2 text-sm font-semibold text-green-600">
                        {formatCurrency(item.totalPrice)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="text-center py-4 text-gray-500">
        Không thể tải chi tiết đơn hàng
      </div>
    );
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header và thống kê */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Quản lý Đơn hàng</h2>

        {/* Thống kê tổng quan */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-500 rounded-lg">
                <CurrencyDollarIcon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-blue-600">Tổng doanh thu</p>
                <p className="text-2xl font-bold text-blue-700">{formatCurrency(totalRevenue)}</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-500 rounded-lg">
                <CalendarIcon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-green-600">Tổng đơn hàng</p>
                <p className="text-2xl font-bold text-green-700">{totalOrders}</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center">
              <div className="p-2 bg-purple-500 rounded-lg">
                <UserIcon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-purple-600">Giá trị TB/đơn</p>
                <p className="text-2xl font-bold text-purple-700">{formatCurrency(averageOrderValue)}</p>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center">
              <div className="p-2 bg-orange-500 rounded-lg">
                <UserIcon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-orange-600">Đơn hiện tại</p>
                <p className="text-2xl font-bold text-orange-700">{orders.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bộ lọc */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Bộ lọc tìm kiếm</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-2">User ID</label>
            <input
              id="userId"
              type="number"
              value={filters.userId}
              onChange={(e) => setFilters({...filters, userId: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập User ID"
            />
          </div>
          <div>
            <label htmlFor="fromDate" className="block text-sm font-medium text-gray-700 mb-2">Từ ngày</label>
            <input
              id="fromDate"
              type="date"
              value={filters.fromDate}
              onChange={(e) => setFilters({...filters, fromDate: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="toDate" className="block text-sm font-medium text-gray-700 mb-2">Đến ngày</label>
            <input
              id="toDate"
              type="date"
              value={filters.toDate}
              onChange={(e) => setFilters({...filters, toDate: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-end space-x-2">
            <button
              onClick={handleFilter}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Tìm kiếm
            </button>
            <button
              onClick={clearFilters}
              className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
            >
              Xóa bộ lọc
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Danh sách đơn hàng */}
      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-gray-500 text-lg">Không có đơn hàng nào</div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">
              Danh sách đơn hàng ({totalCount} đơn)
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Đơn hàng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Khách hàng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày đặt
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tổng tiền
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Số lượng SP
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order: AdminOrderSummary) => (
                  <React.Fragment key={order.orderId}>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          #{order.orderId}
                        </div>
                        <div className="text-sm text-gray-500">
                          User ID: {order.userId}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order.userName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.phoneNumber}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(order.orderDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-green-600">
                          {formatCurrency(order.totalAmount)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.totalItems} sản phẩm
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleViewDetail(order.orderId)}
                          className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                        >
                          <span>{selectedOrderId === order.orderId ? 'Ẩn chi tiết' : 'Xem chi tiết'}</span>
                          {selectedOrderId === order.orderId ? (
                            <ChevronUpIcon className="w-4 h-4" />
                          ) : (
                            <ChevronDownIcon className="w-4 h-4" />
                          )}
                        </button>
                      </td>
                    </tr>

                    {/* Chi tiết đơn hàng */}
                    {selectedOrderId === order.orderId && (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 bg-gray-50">
                          {renderOrderDetail()}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page: number) => changePage(page,
                  filters.userId ? parseInt(filters.userId) : undefined,
                  filters.fromDate || undefined,
                  filters.toDate || undefined
                )}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
