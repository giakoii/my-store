import { PricingData, DailyPrice, ApiResponse, BatchPricingRequest, BatchPricingResponse, BatchPricingListResponse, PricingPaginationRequest } from '@/types';
import http from '@/utils/http';

class PricingService {
  /**
   * Get batch pricings with optional pagination and date filters
   * @param params
   */
  async getBatchPricings(params?: PricingPaginationRequest): Promise<ApiResponse<BatchPricingListResponse>> {
    try {
      const queryParams = new URLSearchParams();

      // Append query parameters if they exist
      if (params?.page) queryParams.append('Page', params.page.toString());

      // Append pageSize only if it's provided and greater than 0
      if (params?.pageSize) queryParams.append('PageSize', params.pageSize.toString());

      // Append date filters if they exist
      if (params?.fromDate) queryParams.append('FromDate', params.fromDate);

      // Append toDate only if it exists
      if (params?.toDate) queryParams.append('ToDate', params.toDate);

      // Construct the full URL with query parameters
      const queryString = queryParams.toString();

      // Make the GET request to the API
      const url = `/api/v1/Pricing/batches${queryString ? `?${queryString}` : ''}`;

      return await http.get<BatchPricingListResponse>(url);
    } catch (error: unknown) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Có lỗi xảy ra khi lấy danh sách giá',
        messageId: '',
      };
    }
  }

  /**
   * Create a new batch pricing
   * @param data
   */
  async createBatchPricing(data: BatchPricingRequest): Promise<ApiResponse<BatchPricingResponse>> {
    try {
      return await http.post<BatchPricingResponse>('/api/v1/Pricing/batch', data);
    } catch (error: unknown) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Có lỗi xảy ra khi tạo giá mới',
        messageId: '',
      };
    }
  }

  /**
   * Get pricings transformed from batch pricings
   * @param params
   */
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
      return await http.post<PricingData>('/pricing', data);
    } catch (error: unknown) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Có lỗi xảy ra khi tạo giá mới',
        messageId: '',
      };
    }
  }

  async updatePricing(id: string, data: Partial<PricingData>): Promise<ApiResponse<PricingData>> {
    try {
      return await http.put<PricingData>(`/pricing/${id}`, data);
    } catch (error: unknown) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Có lỗi xảy ra khi cập nhật giá',
        messageId: '',
      };
    }
  }

  async deletePricing(id: string): Promise<ApiResponse<void>> {
    try {
      return await http.delete<void>(`/pricing/${id}`);
    } catch (error: unknown) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Có lỗi xảy ra khi xóa giá',
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
