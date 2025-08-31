import { ProductType, ProductTypeResponse, CreateProductTypeRequest, ApiResponse } from '@/types';
import httpRequest from '@/api/httpRequest';

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
      const response = await httpRequest.get<ProductTypeResponse>('/api/v1/ProductType');

      if (response.data.success && response.data.response) {
        return {
          success: true,
          response: response.data.response,
          message: response.data.message || 'Lấy danh sách loại mít thành công',
          messageId: response.data.messageId,
          detailErrors: response.data.detailErrors,
        };
      } else {
        return {
          success: false,
          message: response.data.message || 'Có lỗi xảy ra khi lấy danh sách loại mít',
          messageId: response.data.messageId || '',
          detailErrors: response.data.detailErrors,
        };
      }
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError?.response?.data?.message || 'Có lỗi xảy ra khi lấy danh sách loại mít',
        messageId: '',
      };
    }
  }

  // Create new product type (Admin only)
  async createProductType(data: CreateProductTypeRequest): Promise<ApiResponse<ProductType>> {
    try {
      const response = await httpRequest.post<ApiResponse<ProductType>>('/api/v1/ProductType', data);
      return {
        success: response.data.success,
        response: response.data.response,
        message: response.data.message || 'Tạo loại mít mới thành công',
        messageId: response.data.messageId,
        detailErrors: response.data.detailErrors,
      };
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError?.response?.data?.message || 'Có lỗi xảy ra khi tạo loại mít mới',
        messageId: '',
      };
    }
  }
}

export const productTypeService = new ProductTypeService();
