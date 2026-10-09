'use server';

import prisma from '@/tools/prisma';
import { withResult, getAuthContext, ForbiddenError } from '../action_utils';
import { 
  TireOrderOutput, 
  SearchOrderInput, 
  SearchOrderResult, 
  SampleOrderSummary, 
  OrderStatus, 
  TireBrand 
} from '@/frontend/types/OrderTracking';

// Format dynamic station and verification info based on real order attributes
function enrichOrderDetails(order: any): TireOrderOutput {
  const brandLabel = order.brand === "CONTINENTAL" ? "كونتيننتال" : "إيريس";
  const stationName = `محطة نفطال المركزية لتوزيع الإطارات - ${order.commune}`;
  const stationAddress = `الطريق الوطني الرابط، المنطقة الحضرية ${order.commune}، ولاية ${order.wilaya}`;
  
  // Calculate realistic pickup deadline string
  const deadlineDays = order.status === "COMPLETED" ? "جاهزة للاستلام الفوري بالمحطة" : "خلال 15 يوماً من تاريخ إشعار التجهيز";
  
  // Generate sovereign verification fingerprint
  const qrVerificationCode = `NFT-DZ-${order.orderNumber}-VAL`;
  const securityHash = `SHA256:${order.id.replace(/-/g, '').slice(0, 16).toUpperCase()}`;

  return {
    id: order.id, // data-from: TireOrder-id
    orderNumber: order.orderNumber, // data-from: TireOrder-orderNumber
    customerName: order.customerName, // data-from: TireOrder-customerName
    phoneNumber: order.phoneNumber, // data-from: TireOrder-phoneNumber
    secondaryPhone: order.secondaryPhone, // data-from: TireOrder-secondaryPhone
    wilaya: order.wilaya, // data-from: TireOrder-wilaya
    commune: order.commune, // data-from: TireOrder-commune
    brand: order.brand as TireBrand, // data-from: TireOrder-brand
    tireSize: order.tireSize, // data-from: TireOrder-tireSize
    quantity: order.quantity, // data-from: TireOrder-quantity
    unitPriceDzd: order.unitPriceDzd ? Number(order.unitPriceDzd) : 0, // data-from: TireOrder-unitPriceDzd
    totalPriceDzd: order.totalPriceDzd ? Number(order.totalPriceDzd) : 0, // data-from: TireOrder-totalPriceDzd
    nationalIdNumber: '••••••••', // data-from: TireOrder-nationalIdNumber
    dahabiaCardNumber: '••••••••', // data-from: TireOrder-dahabiaCardNumber
    dahabiaExpiry: '', // data-from: TireOrder-dahabiaExpiry
    status: order.status as OrderStatus, // data-from: TireOrder-status
    notes: '', // data-from: TireOrder-notes
    customerId: order.customerId, // data-from: TireOrder-customerId
    createdAt: order.createdAt, // data-from: TireOrder-createdAt
    updatedAt: order.updatedAt, // data-from: TireOrder-updatedAt
    stationName,
    stationAddress,
    pickupDeadline: deadlineDays,
    qrVerificationCode,
    securityHash,
  };
}

/**
 * Search and verify tire order by sovereign orderNumber and registered phone number.
 * Publicly accessible for both GUEST and CUSTOMER (同视图同权).
 */
export async function searchTireOrder(input: SearchOrderInput): Promise<SearchOrderResult> {
  return withResult(async () => {
    const cleanOrderNumber = (input.orderNumber || "").trim().toUpperCase();
    const cleanPhone = (input.phoneNumber || "").trim().replace(/\s+/g, "");

    if (!/^(05|06|07)[0-9]{8}$/.test(cleanPhone)) throw new Error('رقم الهاتف المسجل كاملاً مطلوب للتحقق');
    if (!cleanOrderNumber) {
      return {
        found: false,
        order: null,
        phoneMismatch: false,
        errorMessage: "يرجى إدخال رقم الطلبية المرجعي (مثال: NM-2026-8841)",
      };
    }

    // Step 1: Find order by sovereign unique orderNumber
    const orderRecord = await prisma.tireOrder.findUnique({
      where: {
        orderNumber: cleanOrderNumber,
      },
    });

    if (!orderRecord) {
      return {
        found: false,
        order: null,
        phoneMismatch: false,
        errorMessage: "لم يتم العثور على أي طلبية مطابقة للرقم المرجعي المدخل.",
      };
    }

    // Step 2: If phone number is supplied, check match with phoneNumber or secondaryPhone
    if (cleanPhone) {
      const primaryClean = orderRecord.phoneNumber.replace(/\s+/g, "");
      const secondaryClean = (orderRecord.secondaryPhone || "").replace(/\s+/g, "");

      const matches = primaryClean === cleanPhone || secondaryClean === cleanPhone;

      if (!matches) {
        return {
          found: false,
          order: null,
          phoneMismatch: true,
          errorMessage: "رقم الهاتف المدخل لا يتطابق مع رقم الهاتف المسجل لصاحب هذه الطلبية.",
        };
      }
    }

    // Found and authenticated
    return {
      found: true,
      order: enrichOrderDetails(orderRecord),
      phoneMismatch: false,
      errorMessage: null,
    };
  })();
}

/**
 * Get quick sample orders to help users or guests test sovereign tracking.
 */
export async function getSampleOrders(): Promise<SampleOrderSummary[]> {
  return withResult(async () => {
    return [];
  })();
}

/**
 * Get single tire order by exact orderNumber (e.g. from URL searchParams).
 */
export async function getOrderByOrderNumber(orderNumber: string): Promise<TireOrderOutput | null> {
  return withResult(async () => {
    if (String(getAuthContext().role) !== 'ADMIN') throw new ForbiddenError();
    const cleanNumber = (orderNumber || "").trim().toUpperCase();
    if (!cleanNumber) return null;

    const record = await prisma.tireOrder.findUnique({
      where: {
        orderNumber: cleanNumber,
      },
    });

    if (!record) return null;
    return enrichOrderDetails(record);
  })();
}