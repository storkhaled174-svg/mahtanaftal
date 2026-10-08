// Canonical types and enums for HomePage and Server Actions

export type TireBrand = "CONTINENTAL" | "IRIS";
export type TireCategory = "TOURISM" | "UTILITY" | "SUV";
export type FaqCategory = "ORDERS" | "PAYMENT" | "DELIVERY" | "WARRANTY";
export type OrderStatus = "NEW" | "PROCESSING" | "COMPLETED" | "CANCELLED";
export type UserRole = "ADMIN" | "CUSTOMER";

export type BrandType = "continental" | "iris";
export type TireCategoryType = "tourisme" | "suv" | "utilitaire";

// Prisma JSON type for AlgerianWilaya.communes
export type AlgerianWilayaCommunes = string[];

export interface TireStockItem {
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
}

export interface WilayaItem {
  id: string; // data-from: AlgerianWilaya-id
  code: string; // data-from: AlgerianWilaya-code
  nameAr: string; // data-from: AlgerianWilaya-nameAr
  communes: AlgerianWilayaCommunes; // data-from: AlgerianWilaya-communes
}

export interface PlatformFaqItem {
  id: string; // data-from: PlatformFaq-id
  question: string; // data-from: PlatformFaq-question
  answer: string; // data-from: PlatformFaq-answer
  category: FaqCategory; // data-from: PlatformFaq-category
  isActive: boolean; // data-from: PlatformFaq-isActive
}

export interface SupportChannelItem {
  id: string; // data-from: SupportChannel-id
  title: string; // data-from: SupportChannel-title
  value: string; // data-from: SupportChannel-value
  description: string | null; // data-from: SupportChannel-description
  isActive: boolean; // data-from: SupportChannel-isActive
}

export interface CustomerProfile {
  id: string; // data-from: AccountUser-id
  fullName: string; // data-from: AccountUser-fullName
  phoneNumber: string | null; // data-from: AccountUser-phoneNumber
  nationalIdNumber: string | null; // data-from: AccountUser-nationalIdNumber
}

export interface HomePageInitialData {
  tires: TireStockItem[];
  wilayas: WilayaItem[];
  faqs: PlatformFaqItem[];
  supportChannels: SupportChannelItem[];
  customerProfile: CustomerProfile | null;
}

// UI Model for Catalog and Form
export interface TireSizeOption {
  id: string;
  brand: BrandType;
  dimension: string;
  loadSpeed: string;
  season: string;
  inStock: boolean;
  availableStock: number;
  priceDzd: number;
  category: TireCategoryType;
}

export interface OrderFormData {
  fullName: string;
  primaryPhone: string;
  secondaryPhone: string;
  wilayaCode: string;
  commune: string;
  brand: BrandType;
  selectedSizeId: string;
  quantity: 1 | 2 | 3 | 4;
  nidNumber: string;
  edahabiaNumber: string;
  edahabiaExpiry: string;
  registrationDate: string;
}

export interface CreateOrderInput {
  submissionKey: string;
  customerName: string;
  phoneNumber: string;
  secondaryPhone: string;
  wilayaCode: string;
  commune: string;
  brand: TireBrand;
  tireSize: string;
  quantity: number;
  nationalIdNumber: string;
  dahabiaCardNumber: string;
  dahabiaExpiry: string;
  registrationDate?: Date;
}

export interface OrderReceipt {
  orderNumber: string; // data-from: TireOrder-orderNumber
  registrationDate: string; // Formatted date string for UI
  fullName: string; // data-from: TireOrder-customerName
  primaryPhone: string; // data-from: TireOrder-phoneNumber
  secondaryPhone: string; // data-from: TireOrder-secondaryPhone
  wilayaCode: string;
  wilayaName: string; // data-from: TireOrder-wilaya
  commune: string; // data-from: TireOrder-commune
  brand: BrandType;
  dimension: string; // data-from: TireOrder-tireSize
  quantity: number; // data-from: TireOrder-quantity
  unitPriceDzd: number; // data-from: TireOrder-unitPriceDzd
  totalPriceDzd: number; // data-from: TireOrder-totalPriceDzd
  nidMasked: string;
  edahabiaMasked: string;
  status: OrderStatus; // data-from: TireOrder-status
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: FaqCategory;
}