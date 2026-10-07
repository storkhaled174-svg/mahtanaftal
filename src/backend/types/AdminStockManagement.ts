export type TireBrand = "CONTINENTAL" | "IRIS";
export type TireCategory = "TOURISM" | "UTILITY" | "SUV";

// DTO returned by Server Actions directly from Prisma model TireStock
export interface TireStockDto {
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

export interface StockKpiData {
  totalSizes: number;
  totalAvailable: number;
  totalReserved: number;
  criticalAlertCount: number;
  continentalCount: number;
  irisCount: number;
  totalInventoryValueDzd: number;
}

export interface StockManagementDashboardData {
  items: TireStockDto[];
  kpi: StockKpiData;
  serverTime: Date;
}

export interface StockFilterState {
  searchQuery: string;
  brand: "ALL" | TireBrand;
  category: "ALL" | TireCategory;
  availability: "ALL" | "AVAILABLE" | "UNAVAILABLE";
  stockLevel: "ALL" | "LOW_STOCK" | "OUT_OF_STOCK" | "NORMAL";
  sortBy: "size" | "priceDzd" | "availableStock" | "updatedAt";
  sortOrder: "asc" | "desc";
}

export interface CreateTireStockInput {
  brand: TireBrand;
  size: string;
  category: TireCategory;
  priceDzd: number;
  availableStock: number;
  minThreshold: number;
  speedIndex?: string;
}

export interface UpdateTireStockInput {
  id: string;
  priceDzd: number;
  availableStock: number;
  minThreshold: number;
  isAvailable: boolean;
}

export interface ToggleAvailabilityInput {
  id: string;
  isAvailable: boolean;
}