// filepath: /Users/giakhoi/CodeProject/WebstormProjects/vua-mit-khoa/src/types/index.ts

// Common types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  response?: T;
  messageId?: string;
  detailErrors?: string[] | null;
}

// Auth types
export interface UserRoleRequest {
  phoneNumber: string;
}

export interface UserRoleResponse {
  userRole: 'Customer' | 'Admin';
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
