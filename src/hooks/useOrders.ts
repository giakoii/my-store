import { useState, useEffect, useCallback } from 'react';
import { orderService, OrderCreateRequest } from '@/services/orderService';
import { OrderSummary, OrderDetail } from '@/types/orderTypes';

interface UseOrdersOptions {
  autoLoad?: boolean;
  pageSize?: number;
}

export function useOrders(options: UseOrdersOptions = {}) {
  const { autoLoad = true, pageSize = 10 } = options;

  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const loadOrders = useCallback(async (page: number = 1) => {
    setLoading(true);
    setError(null);

    try {
      const response = await orderService.getMyOrders(page, pageSize);

      if (response.success && response.data) {
        setOrders(response.data);
        setTotalCount(response.totalCount || 0);
        setTotalPages(response.totalPages || 1);
        setCurrentPage(page);
      } else {
        setError(response.error || 'Có lỗi xảy ra khi tải đơn hàng');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi không xác định';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [pageSize]);

  const createOrder = async (orderData: OrderCreateRequest) => {
    setLoading(true);
    setError(null);

    try {
      const response = await orderService.createOrder(orderData);

      if (response.success) {
        await loadOrders(currentPage); // Reload orders after creating
        return { success: true, data: response.data };
      } else {
        setError(response.error || 'Có lỗi xảy ra khi tạo đơn hàng');
        return { success: false, error: response.error };
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Có lỗi không xác định';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoLoad) {
      loadOrders(1);
    }
  }, [autoLoad, loadOrders]);

  const changePage = (page: number) => {
    loadOrders(page);
  };

  const refresh = () => {
    loadOrders(currentPage);
  };

  return {
    orders,
    loading,
    error,
    currentPage,
    totalPages,
    totalCount,
    loadOrders,
    createOrder,
    changePage,
    refresh
  };
}

// Hook riêng để lấy chi tiết đơn hàng
export function useOrderDetail(orderId: number | null) {
  const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadOrderDetail = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await orderService.getOrderDetail(id);

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
