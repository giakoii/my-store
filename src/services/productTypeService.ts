import { ProductType, ProductTypeResponse, CreateProductTypeRequest, ApiResponse } from '@/types';
import apiClient from '@/libraries/apiClient';

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

class ProductTypeService {
  // Get all product types
  async getProductTypes(): Promise<ApiResponse<ProductType[]>> {
    try {
      const response = await apiClient.get<ProductTypeResponse>('/api/v1/ProductType');

      if (response.data.success && response.data.response) {
        return {
          success: true,
          data: response.data.response,
          message: 'Lấy danh sách loại mít thành công',
        };
      } else {
        return {
          success: false,
          error: response.data.message || 'Có lỗi xảy ra khi lấy danh sách loại mít',
        };
      }
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return {
        success: false,
        error: apiError?.response?.data?.message || 'Có lỗi xảy ra khi lấy danh sách loại mít',
      };
    }
  }

  // Create new product type (Admin only)
  async createProductType(data: CreateProductTypeRequest): Promise<ApiResponse<ProductType>> {
    try {
      const response = await apiClient.post<ProductType>('/api/v1/ProductType', data);
      return {
        success: true,
        data: response.data,
        message: 'Tạo loại mít mới thành công',
      };
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return {
        success: false,
        error: apiError?.response?.data?.message || 'Có lỗi xảy ra khi tạo loại mít mới',
      };
    }
  }
}

export const productTypeService = new ProductTypeService();
