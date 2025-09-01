import { ApiResponse } from "@/types";

class HttpError extends Error {
  status: number;
  payload: ApiResponse<unknown>;

  constructor(status: number, payload: ApiResponse<unknown>) {
    super(payload.message || `HTTP Error: ${status}`);
    this.name = 'HttpError';
    this.status = status;
    this.payload = payload;
  }
}

interface CustomOptions {
  baseURL?: string;
  timeout?: number;
  headers?: HeadersInit;
  body?: unknown;
}

// Add timeout functionality
const fetchWithTimeout = async (
  url: string,
  options: RequestInit & { timeout?: number }
): Promise<Response> => {
  const { timeout = 30000, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
};

// Generic request function with improved error handling and interceptors
const request = async <T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  options?: CustomOptions
): Promise<ApiResponse<T>> => {

  // Prepare request body
  const body = options?.body
    ? typeof options.body === 'string'
      ? options.body
      : JSON.stringify(options.body)
    : undefined;

  // Prepare headers with authentication token
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(options?.headers as Record<string, string> || {}),
  };

  // Use baseURL from options or fallback to environment variable
  const baseUrl = options?.baseURL || process.env.NEXT_PUBLIC_API_URL || '';

  // Ensure proper URL construction
  const fullUrl = url.startsWith('http')
    ? url
    : `${baseUrl}${url.startsWith('/') ? url : `/${url}`}`;

  try {
    // Make the fetch request with timeout
    const response = await fetchWithTimeout(fullUrl, {
      method,
      headers,
      body,
      timeout: options?.timeout,
    });

    // Parse response
    const payload: ApiResponse<T> = await response.json();

    // Handle HTTP errors
    if (!response.ok) {
      throw new HttpError(response.status, payload);
    }

    return payload;
  } catch (error) {
    // Handle network errors and parsing errors
    if (error instanceof HttpError) {
      throw error;
    }

    if (error instanceof Error) {
      throw new Error(error.message || 'Network error occurred');
    }

    throw new Error('Unknown error occurred');
  }
};

// HTTP client with typed methods
const http = {
  get<T>(url: string, options?: Omit<CustomOptions, 'body' | 'method'>): Promise<ApiResponse<T>> {
    return request<T>('GET', url, options);
  },

  post<T>(
    url: string,
    body?: unknown,
    options?: Omit<CustomOptions, 'body' | 'method'>
  ): Promise<ApiResponse<T>> {
    return request<T>('POST', url, { ...options, body });
  },

  put<T>(
    url: string,
    body?: unknown,
    options?: Omit<CustomOptions, 'body' | 'method'>
  ): Promise<ApiResponse<T>> {
    return request<T>('PUT', url, { ...options, body });
  },

  delete<T>(url: string, options?: Omit<CustomOptions, 'body' | 'method'>): Promise<ApiResponse<T>> {
    return request<T>('DELETE', url, options);
  }
};

export default http;
export { HttpError };
export type { CustomOptions };
