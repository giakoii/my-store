import React, { useState } from 'react';
import { useOrders, useOrderDetail } from '@/hooks/useOrders';
import { OrderSummary } from '@/types/orderTypes';
import Pagination from './Pagination';
import Loader from './Loader';

interface OrderListProps {
  className?: string;
}

export default function OrderList({ className = '' }: Readonly<OrderListProps>) {
  const {
    orders,
    loading,
    error,
    currentPage,
    totalPages,
    totalCount,
    changePage
  } = useOrders();

  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const { orderDetail, loading: detailLoading } = useOrderDetail(selectedOrderId);

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

  const handleViewDetail = (orderId: number) => {
    setSelectedOrderId(selectedOrderId === orderId ? null : orderId);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Đơn hàng của tôi</h2>
        <span className="text-gray-600">Tổng: {totalCount} đơn hàng</span>
      </div>

      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">Bạn chưa có đơn hàng nào</div>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {orders.map((order: OrderSummary) => (
              <div key={order.orderId} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Đơn hàng #{order.orderId}
                      </h3>
                      <p className="text-gray-600">
                        Ngày đặt: {formatDate(order.orderDate)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-800">
                        {formatCurrency(order.totalAmount)}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => handleViewDetail(order.orderId)}
                      className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      {selectedOrderId === order.orderId ? 'Ẩn chi tiết' : 'Xem chi tiết'}
                    </button>
                  </div>

                  {/* Chi tiết đơn hàng */}
                  {selectedOrderId === order.orderId && (
                    <div className="border-t mt-4 pt-4">
                      {detailLoading ? (
                        <div className="flex justify-center py-4">
                          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      ) : orderDetail ? (
                        <div>
                          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                            <h4 className="font-semibold text-gray-700 mb-2">Thông tin khách hàng</h4>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Tên:</span> {orderDetail.userName}
                            </p>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">SĐT:</span> {orderDetail.phoneNumber}
                            </p>
                          </div>

                          <h4 className="font-medium text-gray-700 mb-3">Chi tiết đơn hàng:</h4>
                          <div className="space-y-2">
                            {orderDetail.orderItems.map((item) => (
                              <div key={item.orderDetailId} className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg">
                                <div className="flex-1">
                                  <span className="font-medium text-gray-700">{item.productTypeName}</span>
                                  <div className="text-sm text-gray-500">
                                    {formatCurrency(item.price)} x {item.quantity} = {formatCurrency(item.totalPrice)}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <span className="text-gray-600">SL: {item.quantity}</span>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="mt-4 pt-3 border-t border-gray-200">
                            <div className="flex justify-between items-center font-semibold text-lg">
                              <span>Tổng cộng:</span>
                              <span className="text-green-600">{formatCurrency(orderDetail.totalAmount)}</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-4 text-gray-500">
                          Không thể tải chi tiết đơn hàng
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={changePage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
