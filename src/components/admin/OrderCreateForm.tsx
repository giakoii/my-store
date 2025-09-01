import React, { useState, useEffect } from 'react';
import { OrderCreateRequest } from '@/services/orderService';
import { useOrders } from '@/hooks/useOrders';
import { productTypeService } from '@/services/productTypeService';
import Button from '../Button';
import Form from '../Form';

interface OrderCreateFormProps {
  onOrderCreated?: () => void;
}

interface ProductType {
  productTypeId?: number;
  typeName?: string;
}

export default function OrderCreateForm({ onOrderCreated }: OrderCreateFormProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [quantities, setQuantities] = useState<{[key: number]: number}>({});
  const [shouldPrintInvoice, setShouldPrintInvoice] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { createOrder, loading } = useOrders({ autoLoad: false });

  useEffect(() => {
    loadProductTypes();
  }, []);

  const loadProductTypes = async () => {
    try {
      const response = await productTypeService.getProductTypes();
      if (response.success && response.response) {
        setProductTypes(response.response);
        // Initialize quantities to 0 for all products
        const initialQuantities: {[key: number]: number} = {};
        response.response.forEach((type: ProductType) => {
          if (type.productTypeId) {
            initialQuantities[type.productTypeId] = 0;
          }
        });
        setQuantities(initialQuantities);
      } else {
        // Mock product types nếu API không hoạt động
        const mockTypes: ProductType[] = [
          { productTypeId: 1, typeName: 'Mít ruột đỏ' },
          { productTypeId: 2, typeName: 'Mít Thái' },
          { productTypeId: 3, typeName: 'Mít tố nữ' },
          { productTypeId: 4, typeName: 'Mít Malaysia' },
          { productTypeId: 5, typeName: 'Mít Đài Loan' },
          { productTypeId: 6, typeName: 'Mít CN' }
        ];
        setProductTypes(mockTypes);
        const initialQuantities: {[key: number]: number} = {};
        mockTypes.forEach((type) => {
          if (type.productTypeId) {
            initialQuantities[type.productTypeId] = 0;
          }
        });
        setQuantities(initialQuantities);
      }
    } catch (error) {
      console.error('Error loading product types:', error);
    }
  };

  const updateQuantity = (productTypeId: number, quantity: string) => {
    const numQuantity = quantity === '' ? 0 : parseInt(quantity);
    setQuantities(prev => ({
      ...prev,
      [productTypeId]: isNaN(numQuantity) ? 0 : Math.max(0, numQuantity)
    }));
  };

  const printInvoice = (orderData: OrderCreateRequest) => {
    // Tạo nội dung hóa đơn để in
    const invoiceContent = `
      <div style="font-family: Arial, sans-serif; max-width: 300px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="margin: 0; color: #2d5016;">VỰA MÍT KHOA</h2>
          <p style="margin: 5px 0;">Thu mua mít giá cao</p>
          <hr style="border: 1px solid #ccc;">
        </div>
        
        <div style="margin-bottom: 15px;">
          <h3 style="margin: 0 0 10px 0; font-size: 16px;">HÓA ĐƠN BÁN HÀNG</h3>
          <p style="margin: 5px 0;"><strong>Ngày:</strong> ${new Date().toLocaleDateString('vi-VN')}</p>
          <p style="margin: 5px 0;"><strong>SĐT KH:</strong> ${orderData.phoneNumber}</p>
        </div>
        
        <div style="margin-bottom: 15px;">
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="border-bottom: 1px solid #ccc;">
                <th style="text-align: left; padding: 5px 0; font-size: 12px;">Sản phẩm</th>
                <th style="text-align: center; padding: 5px 0; font-size: 12px;">SL</th>
              </tr>
            </thead>
            <tbody>
              ${orderData.orderDetails?.map((item) => {
                const productName = productTypes.find(p => p.productTypeId === item.orderTypeId)?.typeName || 'N/A';
                return `
                  <tr style="border-bottom: 1px dotted #ccc;">
                    <td style="padding: 3px 0; font-size: 12px;">${productName}</td>
                    <td style="text-align: center; padding: 3px 0; font-size: 12px;">${item.quantity} kg</td>
                  </tr>
                `;
              }).join('') || ''}
            </tbody>
          </table>
        </div>
        
        <div style="text-align: center; margin-top: 20px; font-size: 11px; color: #666;">
          <p>Cảm ơn quý khách đã tin tướng!</p>
          <p>Hotline: 0123-456-789</p>
        </div>
      </div>
    `;

    // Mở cửa sổ mới để in
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Hóa đơn - Vựa Mít Khoa</title>
            <meta charset="utf-8">
          </head>
          <body>
            ${invoiceContent}
            <script>
              window.onload = function() {
                window.print();
                window.onafterprint = function() {
                  window.close();
                }
              }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate
    if (!phoneNumber.trim()) {
      setError('Vui lòng nhập số điện thoại');
      return;
    }

    // Validate phone number format
    const phoneRegex = /^\d{10,11}$/;
    if (!phoneRegex.test(phoneNumber.trim())) {
      setError('Số điện thoại không hợp lệ (10-11 số)');
      return;
    }

    // Tạo order details từ quantities, chỉ lấy những sản phẩm có số lượng > 0
    const orderDetails = Object.entries(quantities)
      .filter(([, quantity]) => quantity > 0)
      .map(([productTypeId, quantity]) => ({
        orderTypeId: parseInt(productTypeId),
        quantity
      }));

    if (orderDetails.length === 0) {
      setError('Vui lòng nhập số lượng cho ít nhất một loại mít');
      return;
    }

    const orderData: OrderCreateRequest = {
      phoneNumber: phoneNumber.trim(),
      orderDetails
    };

    const response = await createOrder(orderData);

    if (response.success) {
      setSuccess('Tạo đơn hàng thành công!');

      // In hóa đơn nếu được chọn
      if (shouldPrintInvoice) {
        printInvoice(orderData);
      }

      // Reset form
      setPhoneNumber('');
      const resetQuantities: {[key: number]: number} = {};
      productTypes.forEach((type) => {
        if (type.productTypeId) {
          resetQuantities[type.productTypeId] = 0;
        }
      });
      setQuantities(resetQuantities);
      setShouldPrintInvoice(false);

      onOrderCreated?.();

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setError(response.error || 'Có lỗi xảy ra khi tạo đơn hàng');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Tạo Đơn Hàng Mới</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      <Form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
            Số điện thoại khách hàng *
          </label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập số điện thoại (VD: 0123456789)"
            required
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Danh sách các loại mít</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {productTypes.map((product) => (
              <div key={product.productTypeId} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {product.typeName}
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    min="0"
                    value={quantities[product.productTypeId || 0] || ''}
                    onChange={(e) => updateQuantity(product.productTypeId || 0, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg"
                    placeholder="0"
                  />
                  <span className="text-sm text-gray-600 font-medium">kg</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="printInvoice"
              checked={shouldPrintInvoice}
              onChange={(e) => setShouldPrintInvoice(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="printInvoice" className="text-sm font-medium text-gray-700">
              In hóa đơn sau khi tạo đơn hàng
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? 'Đang tạo...' : 'Tạo đơn hàng'}
          </Button>
        </div>
      </Form>
    </div>
  );
}
