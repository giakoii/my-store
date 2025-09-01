// Real API Response Types cho Order
export interface OrderSummary {
  orderId: number;
  orderDate: string;
  totalAmount: number;
}

export interface OrderDetail {
  orderId: number;
  orderDate: string;
  totalAmount: number;
  userName: string;
  phoneNumber: string;
  orderItems: OrderItem[];
}

export interface OrderItem {
  orderDetailId: number;
  productTypeId: number;
  productTypeName: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

// Admin API Response Types
export interface AdminOrderSummary {
  orderId: number;
  orderDate: string;
  totalAmount: number;
  userId: number;
  userName: string;
  phoneNumber: string;
  totalItems: number;
}

export interface AdminOrderDetail {
  orderId: number;
  orderDate: string;
  totalAmount: number;
  userId: number;
  userName: string;
  phoneNumber: string;
  userCreatedAt: string;
  userRole: string;
  orderItems: AdminOrderItem[];
  totalItemsCount: number;
  averageItemPrice: number;
}

export interface AdminOrderItem {
  orderDetailId: number;
  productTypeId: number;
  productTypeName: string;
  productName: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

export interface AdminOrderListResponse {
  data: AdminOrderSummary[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface OrderListResponse {
  data: OrderSummary[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface OrderDetailResponse {
  response: OrderDetail;
  success: boolean;
  messageId: string;
  message: string;
  detailErrors: string[] | null;
}

export interface OrderListApiResponse {
  response: OrderListResponse;
  success: boolean;
  messageId: string;
  message: string;
  detailErrors: string[] | null;
}

export interface AdminOrderListApiResponse {
  response: AdminOrderListResponse;
  success: boolean;
  messageId: string;
  message: string;
  detailErrors: string[] | null;
}

export interface AdminOrderDetailResponse {
  response: AdminOrderDetail;
  success: boolean;
  messageId: string;
  message: string;
  detailErrors: string[] | null;
}
