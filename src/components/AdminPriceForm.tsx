'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { pricingService } from '@/services/pricingService';
import { productTypeService } from '@/services/productTypeService';
import { BatchPricingRequest, ProductType } from '@/types';
import Button from './Button';

interface AdminPriceFormProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AdminPriceForm({ onClose, onSuccess }: AdminPriceFormProps) {
  const [loading, setLoading] = useState(false);
  const [loadingProductTypes, setLoadingProductTypes] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);

  const [formData, setFormData] = useState({
    title: `Giá mít hôm nay - ${new Date().toLocaleDateString('vi-VN')}`,
    description: 'Bảng giá mít cập nhật hàng ngày',
    prices: {} as Record<number, string>
  });

  // Fetch product types on mount
  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        setLoadingProductTypes(true);
        const response = await productTypeService.getProductTypes();
        if (response.success && response.response) {
          setProductTypes(response.response);
          // Initialize prices object
          const initialPrices = response.response.reduce((acc, type) => {
            acc[type.productTypeId] = '';
            return acc;
          }, {} as Record<number, string>);
          setFormData(prev => ({ ...prev, prices: initialPrices }));
        } else {
          setError('Không thể tải danh sách loại mít');
        }
      } catch {
        setError('Có lỗi xảy ra khi tải danh sách loại mít');
      } finally {
        setLoadingProductTypes(false);
      }
    };

    fetchProductTypes();
  }, []);

  const handlePriceChange = (productTypeId: number, value: string) => {
    // Chỉ cho phép số
    const numericValue = value.replace(/\D/g, '');
    setFormData(prev => ({
      ...prev,
      prices: {
        ...prev.prices,
        [productTypeId]: numericValue
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validate form
      const priceDetails = Object.entries(formData.prices)
        .filter(([, price]) => price.trim() !== '')
        .map(([productTypeId, price]) => ({
          productTypeId: parseInt(productTypeId),
          price: parseInt(price)
        }));

      if (priceDetails.length === 0) {
        setError('Vui lòng nhập ít nhất một giá sản phẩm');
        return;
      }

      const requestData: BatchPricingRequest = {
        title: formData.title,
        description: formData.description,
        priceDetails
      };

      const result = await pricingService.createBatchPricing(requestData);

      if (result.success) {
        setSuccess('Đăng giá thành công!');
        setTimeout(() => {
          onSuccess?.();
          onClose();
        }, 1500);
      } else {
        setError('Có lỗi xảy ra khi đăng giá');
      }
    } catch {
      setError('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Đăng Giá Hôm Nay
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <motion.div
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {success}
            </motion.div>
          )}

          {/* Loading Product Types */}
          {loadingProductTypes ? (
            <div className="text-center py-8">
              <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Đang tải danh sách loại mít...</p>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiêu đề
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                  disabled={loading}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                  disabled={loading}
                />
              </div>

              {/* Price Inputs */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Giá các loại mít</h3>
                <div className="max-h-64 overflow-y-auto space-y-3">
                  {productTypes.map((type) => (
                    <div key={type.productTypeId}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {type.typeName}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.prices[type.productTypeId] || ''}
                          onChange={(e) => handlePriceChange(type.productTypeId, e.target.value)}
                          placeholder={`Nhập giá ${type.typeName}`}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          disabled={loading}
                        />
                        {formData.prices[type.productTypeId] && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                            VND/kg
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                  disabled={loading}
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-1"
                  disabled={loading}
                >
                  {loading ? 'Đang đăng...' : 'Đăng giá'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
