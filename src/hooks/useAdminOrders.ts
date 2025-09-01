import { useState, useEffect, useCallback } from 'react';
import { orderService } from '@/services/orderService';
import { AdminOrderSummary, AdminOrderDetail } from '@/types/orderTypes';

interface UseAdminOrdersOptions {
  autoLoad?: boolean;
  pageSize?: number;
}

export function useAdminOrders(options: UseAdminOrdersOptions = {}) {
  const { autoLoad = true, pageSize = 10 } = options;

  const [orders, setOrders] = useState<AdminOrderSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const loadAdminOrders = useCallback(async (
    userId?: number,
    fromDate?: string,
    toDate?: string,
    page: number = 1
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await orderService.getAdminOrders(userId, fromDate, toDate, page, pageSize);

      if (response.success && response.data) {
        setOrders(response.data);
        setTotalCount(response.totalCount || 0);
        setTotalPages(response.totalPages || 1);
        setCurrentPage(page);
      } else {
        setError(response.error || 'Có lỗi xảy ra khi tải danh sách đơn hàng');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi không xác định';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [pageSize]);

  useEffect(() => {
    if (autoLoad) {
      loadAdminOrders();
    }
  }, [autoLoad, loadAdminOrders]);

  const changePage = (page: number, userId?: number, fromDate?: string, toDate?: string) => {
    loadAdminOrders(userId, fromDate, toDate, page);
  };

  const refresh = (userId?: number, fromDate?: string, toDate?: string) => {
    loadAdminOrders(userId, fromDate, toDate, currentPage);
  };

  return {
    orders,
    loading,
    error,
    currentPage,
    totalPages,
    totalCount,
    loadAdminOrders,
    changePage,
    refresh
  };
}

// Hook riêng để lấy chi tiết đơn hàng admin
export function useAdminOrderDetail(orderId: number | null) {
  const [orderDetail, setOrderDetail] = useState<AdminOrderDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadOrderDetail = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await orderService.getAdminOrderDetail(id);

      if (response.success && response.data) {
        setOrderDetail(response.data);
      } else {
        setError(response.error || 'Có lỗi xảy ra khi tải chi tiết đơn hàng');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi không xác định';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (orderId) {
      loadOrderDetail(orderId);
    }
  }, [orderId, loadOrderDetail]);

  return {
    orderDetail,
    loading,
    error,
    loadOrderDetail
  };
}
