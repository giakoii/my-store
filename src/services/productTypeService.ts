import { ProductType, CreateProductTypeRequest, ApiResponse } from '@/types';
import http from '@/utils/http';

class ProductTypeService {
  // Get all product types
  async getProductTypes(): Promise<ApiResponse<ProductType[]>> {
    try {
      return await http.get<ProductType[]>('/api/v1/ProductType');
    } catch (error: unknown) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Có lỗi xảy ra khi lấy danh sách loại mít',
        messageId: '',
      };
    }
  }

  // Create new product type (Admin only)
  async createProductType(data: CreateProductTypeRequest): Promise<ApiResponse<ProductType>> {
    try {
      return await http.post<ProductType>('/api/v1/ProductType', data);
    } catch (error: unknown) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Có lỗi xảy ra khi tạo loại mít mới',
        messageId: '',
      };
    }
  }
}

export const productTypeService = new ProductTypeService();
