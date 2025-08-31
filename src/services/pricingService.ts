import { PricingData, DailyPrice, ApiResponse, BatchPricingRequest, BatchPricingResponse, ApiPricingResponse, BatchPricingListResponse, PricingPaginationRequest } from '@/types';
import httpRequest from '@/api/httpRequest';

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

class PricingService {
  async getBatchPricings(params?: PricingPaginationRequest): Promise<ApiResponse<BatchPricingListResponse>> {
    try {
      const queryParams = new URLSearchParams();

      if (params?.page) queryParams.append('Page', params.page.toString());
      if (params?.pageSize) queryParams.append('PageSize', params.pageSize.toString());
      if (params?.fromDate) queryParams.append('FromDate', params.fromDate);
      if (params?.toDate) queryParams.append('ToDate', params.toDate);

      const queryString = queryParams.toString();
      const url = `/api/v1/Pricing/batches${queryString ? `?${queryString}` : ''}`;
      const response = await httpRequest.get<ApiPricingResponse>(url);

      // Handle API response structure
      if (response.data.success && response.data.response) {
        return {
          success: true,
          response: response.data.response,
          message: response.data.message || 'Lấy danh sách giá thành công',
          messageId: response.data.messageId,
          detailErrors: response.data.detailErrors,
        };
      } else {
        return {
          success: false,
          message: response.data.message || 'Có lỗi xảy ra khi lấy danh sách giá',
          messageId: response.data.messageId || '',
          detailErrors: response.data.detailErrors,
        };
      }
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError?.response?.data?.message || 'Có lỗi xảy ra khi lấy danh sách giá',
        messageId: '',
      };
    }
  }

  async createBatchPricing(data: BatchPricingRequest): Promise<ApiResponse<BatchPricingResponse>> {
    try {
      const response = await httpRequest.post<ApiResponse<BatchPricingResponse>>('/api/v1/Pricing/batch', data);
      return {
        success: response.data.success,
        response: response.data.response,
        message: response.data.message || 'Tạo giá mới thành công',
        messageId: response.data.messageId,
        detailErrors: response.data.detailErrors,
      };
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError?.response?.data?.message || 'Có lỗi xảy ra khi tạo giá mới',
        messageId: '',
      };
    }
  }

  async getPricings(params?: PricingPaginationRequest): Promise<ApiResponse<PricingData[]>> {
    const result = await this.getBatchPricings(params);
    if (result.success && result.response?.data) {
      const transformedData: PricingData[] = result.response.data.flatMap(batch =>
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
        response: transformedData,
        message: result.message,
        messageId: result.messageId,
        detailErrors: result.detailErrors,
      };
    }
    return {
      success: false,
      message: result.message || 'Không thể tải dữ liệu giá',
      messageId: result.messageId || '',
      detailErrors: result.detailErrors,
    };
  }

  async createPricing(data: Omit<PricingData, 'id'>): Promise<ApiResponse<PricingData>> {
    try {
      const response = await httpRequest.post<ApiResponse<PricingData>>('/pricing', data);
      return {
        success: response.data.success,
        response: response.data.response,
        message: response.data.message || 'Tạo giá mới thành công',
        messageId: response.data.messageId,
        detailErrors: response.data.detailErrors,
      };
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError?.response?.data?.message || 'Có lỗi xảy ra khi tạo giá mới',
        messageId: '',
      };
    }
  }

  async updatePricing(id: string, data: Partial<PricingData>): Promise<ApiResponse<PricingData>> {
    try {
      const response = await httpRequest.put<ApiResponse<PricingData>>(`/pricing/${id}`, data);
      return {
        success: response.data.success,
        response: response.data.response,
        message: response.data.message || 'Cập nhật giá thành công',
        messageId: response.data.messageId,
        detailErrors: response.data.detailErrors,
      };
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError?.response?.data?.message || 'Có lỗi xảy ra khi cập nhật giá',
        messageId: '',
      };
    }
  }

  async deletePricing(id: string): Promise<ApiResponse<void>> {
    try {
      const response = await httpRequest.delete<ApiResponse<void>>(`/pricing/${id}`);
      return {
        success: response.data.success,
        message: response.data.message || 'Xóa giá thành công',
        messageId: response.data.messageId,
        detailErrors: response.data.detailErrors,
      };
    } catch (error: unknown) {
      const apiError = error as ApiError;
      return {
        success: false,
        message: apiError?.response?.data?.message || 'Có lỗi xảy ra khi xóa giá',
        messageId: '',
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
        response: mockData,
        message: 'Lấy giá hằng ngày thành công',
        messageId: '',
      };
    } catch {
      return {
        success: false,
        message: 'Có lỗi xảy ra khi lấy giá hằng ngày',
        messageId: '',
      };
    }
  }
}

export const pricingService = new PricingService();
