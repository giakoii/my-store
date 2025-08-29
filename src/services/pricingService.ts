// filepath: /Users/giakhoi/CodeProject/WebstormProjects/vua-mit-khoa/src/services/pricingService.ts

import { PricingData, DailyPrice, ApiResponse, BatchPricingRequest, BatchPricingResponse, ApiPricingResponse } from '@/types';
import apiClient from '@/libraries/apiClient';

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

class PricingService {
  async getBatchPricings(): Promise<ApiResponse<BatchPricingResponse[]>> {
    try {
      const response = await apiClient.get<ApiPricingResponse>('/api/v1/Pricing/batches');

      // Handle API response structure
      if (response.data.success && response.data.response) {
        return {
          success: true,
          data: response.data.response,
          message: 'Lấy danh sách giá thành công',
        };
      } else {
        return {
          success: false,
          error: response.data.message || 'Có lỗi xảy ra khi lấy danh sách giá',
        };
      }
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return {
        success: false,
        error: apiError?.response?.data?.message || 'Có lỗi xảy ra khi lấy danh sách giá',
      };
    }
  }

  async createBatchPricing(data: BatchPricingRequest): Promise<ApiResponse<BatchPricingResponse>> {
    try {
      const response = await apiClient.post('/api/v1/Pricing/batch', data);
      return {
        success: true,
        data: response.data,
        message: 'Tạo giá mới thành công',
      };
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return {
        success: false,
        error: apiError?.response?.data?.message || 'Có lỗi xảy ra khi tạo giá mới',
      };
    }
  }

  // Giữ lại các method cũ để tương thích
  async getPricings(): Promise<ApiResponse<PricingData[]>> {
    // Sử dụng API mới
    const result = await this.getBatchPricings();
    if (result.success && result.data) {
      // Chuyển đổi dữ liệu từ BatchPricingResponse sang PricingData
      const transformedData: PricingData[] = result.data.flatMap(batch =>
        batch.priceDetails.map(detail => ({
          id: `${batch.pricingBatchId}-${detail.productTypeId}`,
          name: detail.typeName || `Loại ${detail.productTypeId}`,
          price: detail.price,
          unit: 'VND/kg',
          createAt: batch.createdAt || new Date().toISOString(),
        }))
      );
      return {
          success: result.success,
          data: transformedData,
          message: result.message,
          error: result.error
        };
    }
    return {
      success: false,
      error: result.error || 'Không thể tải dữ liệu giá'
    };
  }

  async createPricing(data: Omit<PricingData, 'id'>): Promise<ApiResponse<PricingData>> {
    try {
      const response = await apiClient.post('/pricing', data);
      return {
        success: true,
        data: response.data,
        message: 'Tạo giá mới thành công',
      };
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return {
        success: false,
        error: apiError?.response?.data?.message || 'Có lỗi xảy ra khi tạo giá mới',
      };
    }
  }

  async updatePricing(id: string, data: Partial<PricingData>): Promise<ApiResponse<PricingData>> {
    try {
      const response = await apiClient.put(`/pricing/${id}`, data);
      return {
        success: true,
        data: response.data,
        message: 'Cập nhật giá thành công',
      };
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return {
        success: false,
        error: apiError?.response?.data?.message || 'Có lỗi xảy ra khi cập nhật giá',
      };
    }
  }

  async deletePricing(id: string): Promise<ApiResponse<void>> {
    try {
      await apiClient.delete(`/pricing/${id}`);
      return {
        success: true,
        message: 'Xóa giá thành công',
      };
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return {
        success: false,
        error: apiError?.response?.data?.message || 'Có lỗi xảy ra khi xóa giá',
      };
    }
  }

  // Mock function for daily prices - replace with real API call
  async getDailyPrices(): Promise<ApiResponse<DailyPrice[]>> {
    try {
      // This is mock data - replace with actual API call
      const mockData: DailyPrice[] = [
        {
          date: '2025-01-25',
          mitType1: 25000,
          mitType2: 22000,
          mitCL: 20000,
          mitCho: 18000,
        },
        {
          date: '2025-01-24',
          mitType1: 24000,
          mitType2: 21000,
          mitCL: 19000,
          mitCho: 17000,
        },
        {
          date: '2025-01-23',
          mitType1: 26000,
          mitType2: 23000,
          mitCL: 21000,
          mitCho: 19000,
        },
      ];

      return {
        success: true,
        data: mockData,
        message: 'Lấy giá hằng ngày thành công',
      };
    } catch {
      return {
        success: false,
        error: 'Có lỗi xảy ra khi lấy giá hằng ngày',
      };
    }
  }
}

export const pricingService = new PricingService();
