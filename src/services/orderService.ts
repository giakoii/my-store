import { OrderListApiResponse, OrderDetailResponse, OrderSummary, OrderDetail, AdminOrderListApiResponse, AdminOrderDetailResponse, AdminOrderSummary, AdminOrderDetail } from '@/types/orderTypes';

interface OrderCreateRequest {
  phoneNumber: string;
  orderDetails?: Array<{
    orderTypeId: number;
    quantity: number;
  }>;
}

class OrderService {

  private getAuthHeaders() {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/octet-stream',
      'Authorization': token ? `Bearer ${token}` : ''
    };
  }

  async createOrder(orderData: OrderCreateRequest) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/Order`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        const result = await response.json();
        return {
          success: true,
          data: result
        };
      } else {
        return {
          success: false,
          error: `HTTP Error: ${response.status}`
        };
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra khi tạo đơn hàng';
      console.error('Error creating order:', error);
      return {
        success: false,
        error: errorMessage
      };
    }
  }

  // API lấy danh sách đơn hàng của user hiện tại
  async getMyOrders(page: number = 1, pageSize: number = 10): Promise<{ success: boolean; data?: OrderSummary[]; totalCount?: number; totalPages?: number; error?: string }> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/Order/my-orders?page=${page}&pageSize=${pageSize}`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      if (response.ok) {
        const jsonData: OrderListApiResponse = await response.json();

        if (jsonData.success) {
          return {
            success: true,
            data: jsonData.response.data,
            totalCount: jsonData.response.totalCount,
            totalPages: jsonData.response.totalPages
          };
        } else {
          return {
            success: false,
            error: jsonData.message || 'Có lỗi xảy ra khi lấy danh sách đơn hàng'
          };
        }
      }

      return {
        success: false,
        error: `HTTP Error: ${response.status}`
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra khi lấy danh sách đơn hàng';
      console.error('Error getting orders:', error);
      return {
        success: false,
        error: errorMessage
      };
    }
  }

  // API lấy chi tiết đơn hàng theo ID
  async getOrderDetail(orderId: number): Promise<{ success: boolean; data?: OrderDetail; error?: string }> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/Order/${orderId}`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      if (response.ok) {
        const jsonData: OrderDetailResponse = await response.json();
        
        if (jsonData.success) {
          return {
            success: true,
            data: jsonData.response
          };
        } else {
          return {
            success: false,
            error: jsonData.message || 'Có lỗi xảy ra khi lấy chi tiết đơn hàng'
          };
        }
      }

      return {
        success: false,
        error: `HTTP Error: ${response.status}`
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra khi lấy chi tiết đơn hàng';
      console.error('Error getting order detail:', error);
      return {
        success: false,
        error: errorMessage
      };
    }
  }

  // Admin APIs
  async getAdminOrders(
    userId?: number, 
    fromDate?: string, 
    toDate?: string, 
    page: number = 1, 
    pageSize: number = 10
  ): Promise<{ success: boolean; data?: AdminOrderSummary[]; totalCount?: number; totalPages?: number; error?: string }> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString()
      });

      if (userId) params.append('userId', userId.toString());
      if (fromDate) params.append('fromDate', fromDate);
      if (toDate) params.append('toDate', toDate);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/Order/admin/all?${params.toString()}`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      if (response.ok) {
        const jsonData: AdminOrderListApiResponse = await response.json();
        
        if (jsonData.success) {
          return {
            success: true,
            data: jsonData.response.data,
            totalCount: jsonData.response.totalCount,
            totalPages: jsonData.response.totalPages
          };
        } else {
          return {
            success: false,
            error: jsonData.message || 'Có lỗi xảy ra khi lấy danh sách đơn hàng admin'
          };
        }
      }

      return {
        success: false,
        error: `HTTP Error: ${response.status}`
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra khi lấy danh sách đơn hàng admin';
      console.error('Error getting admin orders:', error);
      return {
        success: false,
        error: errorMessage
      };
    }
  }

  async getAdminOrderDetail(orderId: number): Promise<{ success: boolean; data?: AdminOrderDetail; error?: string }> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/Order/admin/detail/${orderId}`, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      if (response.ok) {
        const jsonData: AdminOrderDetailResponse = await response.json();
        
        if (jsonData.success) {
          return {
            success: true,
            data: jsonData.response
          };
        } else {
          return {
            success: false,
            error: jsonData.message || 'Có lỗi xảy ra khi lấy chi tiết đơn hàng admin'
          };
        }
      }

      return {
        success: false,
        error: `HTTP Error: ${response.status}`
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Có lỗi xảy ra khi lấy chi tiết đơn hàng admin';
      console.error('Error getting admin order detail:', error);
      return {
        success: false,
        error: errorMessage
      };
    }
  }
}

export const orderService = new OrderService();
export type { OrderCreateRequest };
