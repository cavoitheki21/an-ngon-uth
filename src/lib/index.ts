// ── Routes ────────────────────────────────────────────────────────────────────
export const ROUTE_PATHS = {
  HOME: '/',
  SPLASH: '/splash',
  ONBOARDING: '/onboarding',
  LOGIN: '/login',
  REGISTER: '/register',
  MENU: '/menu',
  FOOD_DETAIL: '/food/:id',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ORDER_SUCCESS: '/order-success',
  ORDER_TRACKING: '/tracking/:orderId',
  REVIEWS: '/reviews/:orderId',
  PROFILE: '/profile',
  ORDERS: '/orders',
  SEARCH: '/search',
} as const;

// ── Types ──────────────────────────────────────────────────────────────────────
export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  categoryId: string;
  rating: number;
  reviewCount: number;
  isPopular?: boolean;
  isSale?: boolean;
  prepTime: string;
  restaurant: string;
  restaurantId: string;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  count: number;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  category: string;
  isOpen: boolean;
  isPartner: boolean;
}

export interface CartItem extends FoodItem {
  quantity: number;
  notes?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  deliveryFee: number;
  status: 'placed' | 'preparing' | 'delivering' | 'delivered' | 'cancelled';
  createdAt: string;
  estimatedTime: string;
  address: string;
  restaurant: string;
  paymentMethod: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  studentId: string;
  avatar: string;
  points: number;
  addresses: Address[];
}

export interface Address {
  id: string;
  label: string;
  detail: string;
  isDefault: boolean;
}

export interface Review {
  id: string;
  userName: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  foodName: string;
  helpful: number;
}

// ── Constants ─────────────────────────────────────────────────────────────────
export const ORDER_STATUS_LABELS: Record<Order['status'], string> = {
  placed: 'Đã đặt hàng',
  preparing: 'Đang chuẩn bị',
  delivering: 'Đang giao hàng',
  delivered: 'Đã giao thành công',
  cancelled: 'Đã hủy',
};

export const PAYMENT_METHODS = [
  { id: 'cash', label: 'Tiền mặt', icon: '💵' },
  { id: 'momo', label: 'Ví MoMo', icon: '💜' },
  { id: 'zalopay', label: 'ZaloPay', icon: '💙' },
  { id: 'banking', label: 'Chuyển khoản ngân hàng', icon: '🏦' },
];

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

export const formatShortPrice = (price: number): string => {
  if (price >= 1000000) return `${(price / 1000000).toFixed(1)}M`;
  if (price >= 1000) return `${(price / 1000).toFixed(0)}K`;
  return `${price}đ`;
};
