export type OrderStatus = "NEW" | "PROCESSING" | "COMPLETED" | "CANCELLED";

export type TireBrand = "CONTINENTAL" | "IRIS";

export interface TireOrderOutput {
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
  stationName: string;
  stationAddress: string;
  pickupDeadline: string;
  qrVerificationCode: string;
  securityHash: string;
}

export interface SearchOrderInput {
  orderNumber: string;
  phoneNumber?: string;
}

export interface SearchOrderResult {
  found: boolean;
  order: TireOrderOutput | null;
  phoneMismatch: boolean;
  errorMessage: string | null;
}

export interface SampleOrderSummary {
  orderNumber: string; // data-from: TireOrder-orderNumber
  phoneNumber: string; // data-from: TireOrder-phoneNumber
  status: OrderStatus; // data-from: TireOrder-status
  customerName: string; // data-from: TireOrder-customerName
  brand: TireBrand; // data-from: TireOrder-brand
}

export interface TrackingSearchParams {
  orderNumber: string;
  phoneNumber: string;
}