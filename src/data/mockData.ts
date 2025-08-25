// filepath: /Users/giakhoi/CodeProject/WebstormProjects/vua-mit-khoa/src/data/mockData.ts

import { CarouselImage, ServiceItem, StatItem, DailyPrice } from '@/types';
import { Truck, Scale, Phone, Star, Users, TrendingUp, Award } from 'lucide-react';

export const carouselImages: CarouselImage[] = [
  {
    src: '/images/home.webp',
    alt: 'Vựa mít Khoa - Thu mua mít tận nơi',
    title: 'Thu Mua Mít Tận Nơi',
    description: 'Chúng tôi đến tận vườn để thu mua mít với giá cao'
  },
  {
    src: '/images/home1.webp',
    alt: 'Vựa mít Khoa – Mua nhanh, giá tốt',
    title: 'Vựa mít Khoa – Mua nhanh, giá tốt',
    description: 'Chúng tôi cam kết thu mua mít với giá cao, thanh toán ngay'
  },
  {
    src: '/images/home2.webp',
    alt: 'Đối tác tin cậy',
    title: 'Đối Tác Tin Cậy',
    description: 'Hơn 500 nông dân đã tin tưởng và hợp tác với chúng tôi'
  },
  {
    src: '/images/home3.webp',
    alt: 'Chất lượng đảm bảo',
    title: 'Chất Lượng Đảm Bảo',
    description: 'Cam kết chất lượng và uy tín trong mọi giao dịch'
  },
  {
    src: '/images/home4.webp',
    alt: 'Mít chất lượng cao',
    title: 'Mít Chất Lượng Cao',
    description: 'Thu mua mít chất lượng với giá cả hợp lý nhất'
  },
];

export const services: ServiceItem[] = [
  {
    icon: Truck,
    title: 'Thu mua tận nơi',
    description: 'Nhận đến tận vườn để thu mua, tiết kiệm thời gian và chi phí vận chuyển cho bà con nông dân.',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Scale,
    title: 'Cân đo chính xác',
    description: 'Sử dụng cân điện tử chính xác, minh bạch trong khâu cân đo để đảm bảo quyền lợi.',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: Phone,
    title: 'Hỗ trợ 24/7',
    description: 'Đội ngũ tư vấn sẵn sàng hỗ trợ bà con 24/7, giải đáp mọi thắc mắc về giá cả. Giá cả luôn được cập nhật mỗi ngày',
    color: 'from-purple-500 to-purple-600'
  }
];

export const stats: StatItem[] = [
  { icon: Users, number: '500+', label: 'Nông dân tin tưởng' },
  { icon: TrendingUp, number: '1000+', label: 'Tấn mít thu mua/năm' },
  { icon: Award, number: '5+', label: 'Năm kinh nghiệm' },
  { icon: Star, number: '4.9/5', label: 'Đánh giá từ khách hàng' }
];

export const dailyPrices: DailyPrice[] = [
  {
    date: '2025-08-25',
    mitType1: 25000,
    mitType2: 22000,
    mitCL: 20000,
    mitCho: 18000,
  },
  {
    date: '2025-08-24',
    mitType1: 24000,
    mitType2: 21000,
    mitCL: 19000,
    mitCho: 17000,
  },
  // Add more mock data as needed
];
