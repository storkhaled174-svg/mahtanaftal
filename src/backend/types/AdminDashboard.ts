export type UserRole = "ADMIN" | "CUSTOMER";

export type TireBrand = "CONTINENTAL" | "IRIS";

export type TireCategory = "TOURISM" | "UTILITY" | "SUV";

export type FaqCategory = "ORDERS" | "PAYMENT" | "DELIVERY" | "WARRANTY";

export type OrderStatus = "NEW" | "PROCESSING" | "COMPLETED" | "CANCELLED";

export type AlgerianCommunes = Array<string>;

export interface OrderItem {
  id: string; // data-from: TireOrder-id
  orderNumber: string; // data-from: TireOrder-orderNumber
  customerName: string; // data-from: TireOrder-customerName
  phoneNumber: string; // data-from: TireOrder-phoneNumber
  secondaryPhone: string; // data-from: TireOrder-secondaryPhone
  wilaya: string; // data-from: TireOrder-wilaya
  commune: string; // data-from: TireOrder-commune
  brand: TireBrand; // data-from: TireOrder-brand
  tireSize: string; // data-from: TireOrder-tireSize
  quantity: number; // data-from: TireOrder-quantity
  unitPriceDzd: number; // data-from: TireOrder-unitPriceDzd
  totalPriceDzd: number; // data-from: TireOrder-totalPriceDzd
  nationalIdNumber: string; // data-from: TireOrder-nationalIdNumber
  dahabiaCardNumber: string; // data-from: TireOrder-dahabiaCardNumber
  dahabiaExpiry: string; // data-from: TireOrder-dahabiaExpiry
  status: OrderStatus; // data-from: TireOrder-status
  notes: string | null; // data-from: TireOrder-notes
  customerId: string | null; // data-from: TireOrder-customerId
  createdAt: Date; // data-from: TireOrder-createdAt
  updatedAt: Date; // data-from: TireOrder-updatedAt
}

export interface TireSizeStock {
  id: string; // data-from: TireStock-id
  brand: TireBrand; // data-from: TireStock-brand
  size: string; // data-from: TireStock-size
  category: TireCategory; // data-from: TireStock-category
  priceDzd: number; // data-from: TireStock-priceDzd
  availableStock: number; // data-from: TireStock-availableStock
  reservedStock: number; // data-from: TireStock-reservedStock
  minThreshold: number; // data-from: TireStock-minThreshold
  speedIndex: string | null; // data-from: TireStock-speedIndex
  isAvailable: boolean; // data-from: TireStock-isAvailable
  createdAt: Date; // data-from: TireStock-createdAt
  updatedAt: Date; // data-from: TireStock-updatedAt
}

export interface PlatformFaqItem {
  id: string; // data-from: PlatformFaq-id
  question: string; // data-from: PlatformFaq-question
  answer: string; // data-from: PlatformFaq-answer
  category: FaqCategory; // data-from: PlatformFaq-category
  isActive: boolean; // data-from: PlatformFaq-isActive
  createdAt: Date; // data-from: PlatformFaq-createdAt
  updatedAt: Date; // data-from: PlatformFaq-updatedAt
}

export interface SupportChannelItem {
  id: string; // data-from: SupportChannel-id
  title: string; // data-from: SupportChannel-title
  value: string; // data-from: SupportChannel-value
  description: string | null; // data-from: SupportChannel-description
  isActive: boolean; // data-from: SupportChannel-isActive
  createdAt: Date; // data-from: SupportChannel-createdAt
  updatedAt: Date; // data-from: SupportChannel-updatedAt
}

export interface WilayaData {
  id: string; // data-from: AlgerianWilaya-id
  code: string; // data-from: AlgerianWilaya-code
  nameAr: string; // data-from: AlgerianWilaya-nameAr
  communes: AlgerianCommunes; // data-from: AlgerianWilaya-communes
}

export interface FilterState {
  searchQuery: string;
  phone: string;
  orderNumber: string;
  wilaya: string;
  commune: string;
  status: string;
  brand: string;
}

export interface KpiSummary {
  totalOrders: number;
  newOrders: number;
  processingOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  stockAvailabilityRate: number;
  totalRevenueDzd: number;
  totalAvailableTires: number;
  lowStockAlertCount: number;
}

export interface AdminDashboardDataOutput {
  orders: OrderItem[];
  stocks: TireSizeStock[];
  wilayas: WilayaData[];
  faqs: PlatformFaqItem[];
  channels: SupportChannelItem[];
  kpiSummary: KpiSummary;
}

export interface UpdateOrderStatusInput {
  orderId: string;
  newStatus: OrderStatus;
}

export interface UpdateOrderDetailsInput {
  orderId: string;
  customerName: string;
  phoneNumber: string;
  secondaryPhone?: string;
  wilaya: string;
  commune: string;
  brand: TireBrand;
  tireSize: string;
  quantity: number;
  status: OrderStatus;
  notes?: string;
}

export interface AddTireStockInput {
  brand: TireBrand;
  size: string;
  category: TireCategory;
  priceDzd: number;
  availableStock: number;
  minThreshold: number;
  speedIndex?: string;
}

export interface UpdateTireStockInput {
  stockId: string;
  priceDzd: number;
  availableStock: number;
  minThreshold: number;
  isAvailable: boolean;
}

export interface AddPlatformFaqInput {
  question: string;
  answer: string;
  category: FaqCategory;
}

export interface UpdatePlatformFaqInput {
  faqId: string;
  question: string;
  answer: string;
  category: FaqCategory;
  isActive: boolean;
}

export interface UpdateSupportChannelInput {
  channelId: string;
  title: string;
  value: string;
  description?: string;
  isActive: boolean;
}