// filepath: /Users/giakhoi/CodeProject/WebstormProjects/vua-mit-khoa/src/services/authService.ts

import { LoginData, User, ApiResponse, UserRoleResponse, SessionResponse } from '@/types';
import { localStorage } from '@/utils';

class AuthService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7001';
  }

  async checkUserRole(phoneNumber: string): Promise<ApiResponse<UserRoleResponse>> {
    try {
      const response = await fetch(`${this.baseUrl}/api/v1/User/user-role`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        return {
          success: true,
          data: result.response,
          message: 'Kiểm tra vai trò người dùng thành công',
        };
      }

      return {
        success: false,
        error: result.message || 'Không thể kiểm tra vai trò người dùng',
      };
    } catch {
      return {
        success: false,
        error: 'Có lỗi xảy ra khi kiểm tra vai trò người dùng',
      };
    }
  }

  async login(data: LoginData): Promise<ApiResponse<User>> {
    try {
      const response = await fetch(`${this.baseUrl}/connect/token`, {
        method: 'POST',
        headers: {
          'accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: new URLSearchParams({
          grant_type: data.grant_type,
          username: data.username,
          password: data.password,
          PhoneNumber: data.phoneNumber,
        }),
      });

      const result = await response.json();

      if (response.ok && result.access_token) {
        const user: User = {
          id: result.user_id || '',
          username: data.username,
          phoneNumber: data.phoneNumber,
          accessToken: result.access_token,
        };

        localStorage.set('access_token', result.access_token);
        localStorage.set('refresh_token', result.refresh_token || '');
        localStorage.set('user', JSON.stringify(user));

        return {
          success: true,
          data: user,
          message: 'Đăng nhập thành công',
        };
      }

      return {
        success: false,
        error: result.error_description || 'Đăng nhập thất bại',
      };
    } catch {
      return {
        success: false,
        error: 'Có lỗi xảy ra khi đăng nhập',
      };
    }
  }

  async getSession(): Promise<ApiResponse<SessionResponse>> {
    try {
      const token = this.getAccessToken();
      if (!token) {
        return {
          success: false,
          error: 'Không có access token',
        };
      }

      const response = await fetch(`${this.baseUrl}/session`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'Authorization': `bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        return {
          success: true,
          data: result,
          message: 'Lấy thông tin session thành công',
        };
      }

      return {
        success: false,
        error: 'Không thể lấy thông tin session',
      };
    } catch {
      return {
        success: false,
        error: 'Có lỗi xảy ra khi lấy thông tin session',
      };
    }
  }

  logout(): void {
    localStorage.remove('access_token');
    localStorage.remove('user');
  }

  getCurrentUser(): User | null {
    try {
      const userStr = localStorage.get('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  }

  getAccessToken(): string | null {
    return localStorage.get('access_token');
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
}

export const authService = new AuthService();
