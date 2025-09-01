// Mock data và utilities cho Order
export interface MockOrder {
  id: number;
  phoneNumber: string;
  orderDate: string;
  status: 'Đang xử lý' | 'Đã xác nhận' | 'Hoàn thành' | 'Đã hủy';
  totalAmount: number;
  orderDetails: MockOrderDetail[];
}

export interface MockOrderDetail {
  id: number;
  productTypeName: string;
  quantity: number;
  price: number;
}

const PRODUCT_TYPES = [
  { id: 1, name: 'Mít ruột đỏ', basePrice: 75000 },
  { id: 2, name: 'Mít Thái', basePrice: 100000 },
  { id: 3, name: 'Mít tố nữ', basePrice: 85000 },
  { id: 4, name: 'Mít Malaysia', basePrice: 120000 },
  { id: 5, name: 'Mít Đài Loan', basePrice: 90000 }
];

const ORDER_STATUSES: MockOrder['status'][] = [
  'Đang xử lý',
  'Đã xác nhận',
  'Hoàn thành',
  'Đã hủy'
];

// Generate mock orders for a specific page
export function generateMockOrders(page: number = 1, pageSize: number = 10) {
  const totalCount = 48; // Total mock orders
  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalCount);

  const orders: MockOrder[] = [];

  for (let i = startIndex; i < endIndex; i++) {
    const orderId = i + 1;
    const orderDate = new Date();
    orderDate.setDate(orderDate.getDate() - Math.floor(Math.random() * 30)); // Random date in last 30 days

    // Random number of order details (1-3)
    const detailCount = Math.floor(Math.random() * 3) + 1;
    const orderDetails: MockOrderDetail[] = [];
    let totalAmount = 0;

    for (let j = 0; j < detailCount; j++) {
      const productType = PRODUCT_TYPES[Math.floor(Math.random() * PRODUCT_TYPES.length)];
      const quantity = Math.floor(Math.random() * 5) + 1; // 1-5 quantity
      const price = productType.basePrice + (Math.random() - 0.5) * 20000; // ±10k variation
      const roundedPrice = Math.round(price / 1000) * 1000; // Round to nearest 1k

      orderDetails.push({
        id: j + 1,
        productTypeName: productType.name,
        quantity,
        price: roundedPrice
      });

      totalAmount += roundedPrice * quantity;
    }

    orders.push({
      id: orderId,
      phoneNumber: `012345678${orderId % 10}`,
      orderDate: orderDate.toISOString(),
      status: ORDER_STATUSES[Math.floor(Math.random() * ORDER_STATUSES.length)],
      totalAmount,
      orderDetails
    });
  }

  return {
    data: orders,
    totalCount,
    page,
    pageSize,
    totalPages: Math.ceil(totalCount / pageSize)
  };
}

// Mock successful order creation
export function mockCreateOrder() {
  return {
    success: true,
    orderId: Math.floor(Math.random() * 1000) + 1000,
    message: 'Đơn hàng đã được tạo thành công'
  };
}
