// filepath: /Users/giakhoi/CodeProject/WebstormProjects/vua-mit-khoa/src/constants/index.ts

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/connect/token',
  },
  PRICING: '/pricing',
} as const;

export const NAVIGATION_ITEMS = [
  { name: 'Trang chủ', href: '/' },
  { name: 'Giá cả', href: '/pricing' },
  { name: 'Sản phẩm', href: '#products' },
  { name: 'Về chúng tôi', href: '#about' },
  { name: 'Liên hệ', href: '#contact' },
] as const;

export const CONTACT_INFO = {
  PHONE: '0842 879 238',
  EMAIL: 'khoapham1509.kp@gmail.com',
  ADDRESS: 'Tiền Giang, Việt Nam',
  GOOGLE_MAPS: 'https://maps.app.goo.gl/cSizV3SU5sSEoRHR6',
  FACEBOOK: 'https://www.facebook.com/dangkhoa.pham.144',
} as const;

export const CAROUSEL_SETTINGS = {
  AUTO_SLIDE_INTERVAL: 4000,
  TRANSITION_DURATION: 0.5,
} as const;

export const ANIMATION_VARIANTS = {
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  },
  fadeInLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  },
  fadeInRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 1 }
  }
} as const;
