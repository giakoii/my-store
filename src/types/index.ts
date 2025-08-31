// Common types
import {UserRole} from "@/consts/constantEnum";

// Base pagination interface
export interface PaginationRequest {
  page?: number;
  pageSize?: number;
}

// Specific pagination request for pricing API
export interface PricingPaginationRequest extends PaginationRequest {
  fromDate?: string;
  toDate?: string;
}

export interface PaginationResponse {
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  response?: T;
  messageId: string;
  detailErrors?: string[] | null;
}

// Auth types
export interface UserRoleRequest {
  phoneNumber: string;
}

export interface UserRoleResponse {
  userRole: UserRole.Customer | UserRole.Admin;
}

export interface LoginData {
  username: string;
  password: string;
  grant_type: string;
  phoneNumber: string;
}

export interface User {
  id?: string;
  userId?: number;
  name?: string;
  username?: string;
  email?: string;
  phoneNumber?: string;
  accessToken?: string;
  userRole?: 'Customer' | 'Admin';
  role?: 'Customer' | 'Admin';
}

export interface SessionResponse {
  userId: number;
  name: string;
  phoneNumber: string;
  role: 'Customer' | 'Admin';
}

// Pricing types
export interface PricingData {
  id: string;
  name: string;
  price: number;
  unit: string;
  createAt: string;
  updatedAt?: string;
}

export interface DailyPrice {
  date: string;
  mitType1: number;
  mitType2: number;
  mitCL: number;
  mitCho: number;
}

// Batch pricing types for API - Updated to match actual API response
export interface PriceDetail {
  priceId: number;
  productTypeId: number;
  typeName: string;
  price: number;
}

export interface BatchPricingRequest {
  title: string;
  description: string;
  priceDetails: {
    productTypeId: number;
    price: number;
  }[];
}

export interface BatchPricingListResponse {
  data: BatchPricingResponse[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface BatchPricingResponse {
  pricingBatchId: number;
  title: string;
  description: string;
  createdAt: string;
  priceDetails: PriceDetail[];
}

export interface ApiPricingResponse {
  success: boolean;
  message: string;
  response: BatchPricingListResponse;
  messageId: string;
  detailErrors?: string[] | null;
}

// Component types
export interface CarouselImage {
  src: string;
  alt: string;
  title: string;
  description: string;
}

export interface ServiceItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
}

export interface StatItem {
  icon: React.ComponentType<{ className?: string }>;
  number: string;
  label: string;
}

// Button component types
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export interface CarouselProps {
  images: CarouselImage[];
  autoSlide?: boolean;
  autoSlideInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  height?: string;
}

// Product Type API types
export interface ProductType {
  productTypeId: number;
  typeName: string;
}

export interface ProductTypeResponse {
  response: ProductType[];
  success: boolean;
  messageId: string;
  message: string;
  detailErrors: null | string[];
}

export interface CreateProductTypeRequest {
  typeName: string;
}

export interface OrdersRequest {
    page: number;
    pageSize: number;
}