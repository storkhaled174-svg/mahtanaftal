'use server';

import prisma from '@/tools/prisma';
import { randomUUID } from 'node:crypto';
import { withResult, tryGetAuthContext } from '../action_utils';
import {
  HomePageInitialData,
  TireStockItem,
  WilayaItem,
  PlatformFaqItem,
  SupportChannelItem,
  CustomerProfile,
  CreateOrderInput,
  OrderReceipt,
  TireBrand,
  TireCategory,
  FaqCategory,
  OrderStatus,
  AlgerianWilayaCommunes,
  BrandType,
} from '@/frontend/types/HomePage';

/**
 * Fetch all essential initial data for HomePage:
 * - Approved tire stock list (Continental & Iris)
 * - 58 Algerian Wilayas and their communes
 * - Active FAQs categorized by topic
 * - Active Support Channels (Toll Free 1050, Email, Facebook, etc.)
 * - Authenticated Customer profile (if logged in) for pre-filling
 */
export async function getHomePageData(): Promise<HomePageInitialData> {
  return withResult(async () => {
    // 1. Fetch tire stocks (active, order by brand then size)
    const tireRecords = await prisma.tireStock.findMany({
      orderBy: [{ brand: 'asc' }, { size: 'asc' }],
    });

    const tires: TireStockItem[] = tireRecords.map((t) => ({
      id: t.id, // data-from: TireStock-id
      brand: t.brand as TireBrand, // data-from: TireStock-brand
      size: t.size, // data-from: TireStock-size
      category: t.category as TireCategory, // data-from: TireStock-category
      priceDzd: t.priceDzd.toNumber(), // data-from: TireStock-priceDzd
      availableStock: t.availableStock, // data-from: TireStock-availableStock
      reservedStock: t.reservedStock, // data-from: TireStock-reservedStock
      minThreshold: t.minThreshold, // data-from: TireStock-minThreshold
      speedIndex: t.speedIndex, // data-from: TireStock-speedIndex
      isAvailable: t.isAvailable && t.availableStock > 0, // data-from: TireStock-isAvailable
    }));

    // 2. Fetch Algerian Wilayas (ordered by administrative code)
    const wilayaRecords = await prisma.algerianWilaya.findMany({
      orderBy: { code: 'asc' },
    });

    const wilayas: WilayaItem[] = wilayaRecords.map((w) => ({
      id: w.id, // data-from: AlgerianWilaya-id
      code: w.code, // data-from: AlgerianWilaya-code
      nameAr: w.nameAr, // data-from: AlgerianWilaya-nameAr
      communes: (w.communes as AlgerianWilayaCommunes) || [], // data-from: AlgerianWilaya-communes
    }));

    // 3. Fetch active FAQs
    const faqRecords = await prisma.platformFaq.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'asc' },
    });

    const faqs: PlatformFaqItem[] = faqRecords.map((f) => ({
      id: f.id, // data-from: PlatformFaq-id
      question: f.question, // data-from: PlatformFaq-question
      answer: f.answer, // data-from: PlatformFaq-answer
      category: f.category as FaqCategory, // data-from: PlatformFaq-category
      isActive: f.isActive, // data-from: PlatformFaq-isActive
    }));

    // 4. Fetch active Support Channels
    const channelRecords = await prisma.supportChannel.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'asc' },
    });

    const supportChannels: SupportChannelItem[] = channelRecords.map((c) => ({
      id: c.id, // data-from: SupportChannel-id
      title: c.title, // data-from: SupportChannel-title
      value: c.value, // data-from: SupportChannel-value
      description: c.description, // data-from: SupportChannel-description
      isActive: c.isActive, // data-from: SupportChannel-isActive
    }));

    // 5. Check if user is logged in
    let customerProfile: CustomerProfile | null = null;
    const auth = tryGetAuthContext();
    if (auth && auth.userId) {
      const user = await prisma.accountUser.findUnique({
        where: { id: auth.userId },
        select: {
          id: true,
          fullName: true,
          phoneNumber: true,
          nationalIdNumber: true,
        },
      });
      if (user) {
        customerProfile = {
          id: user.id, // data-from: AccountUser-id
          fullName: user.fullName, // data-from: AccountUser-fullName
          phoneNumber: user.phoneNumber, // data-from: AccountUser-phoneNumber
          nationalIdNumber: user.nationalIdNumber, // data-from: AccountUser-nationalIdNumber
        };
      }
    }

    return {
      tires,
      wilayas,
      faqs,
      supportChannels,
      customerProfile,
    };
  })();
}

/**
 * Create a new sovereign tire order reservation:
 * Domain rules:
 * - Brand must be CONTINENTAL or IRIS
 * - Quantity must be 1, 2, 3, or 4
 * - Validate exact 8 digits for Edahabia card
 * - Validate Algerian phone format (05, 06, 07)
 * - Look up tire stock by brand & size to fetch authentic unit price
 * - Calculate total price = unitPrice * quantity
 * - Auto-generate unique orderNumber: NM-2026-XXXX
 * - Status initialized to NEW
 */
export async function createTireOrder(input: CreateOrderInput): Promise<OrderReceipt> {
  return withResult(async () => {
    // Validate quantity constraint (1-4 only)
    const qty = input.quantity;
    if (!Number.isInteger(qty) || qty < 1 || qty > 4) throw new Error('الكمية يجب أن تكون بين 1 و4');
    if (!/^[a-f0-9-]{36}$/i.test(input.submissionKey || '')) throw new Error('معرف التسجيل غير صالح');
    if (!input.customerName?.trim() || input.customerName.trim().length < 3) throw new Error('الاسم واللقب مطلوب');
    if (!/^(05|06|07)[0-9]{8}$/.test(input.phoneNumber) || !/^(05|06|07)[0-9]{8}$/.test(input.secondaryPhone) || input.phoneNumber === input.secondaryPhone) throw new Error('يرجى إدخال رقمي هاتف صالحين ومختلفين');
    if (!/^[0-9]{9,18}$/.test(input.nationalIdNumber)) throw new Error('رقم التعريف يجب أن يتكون من 9 إلى 18 رقماً');
    if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(input.dahabiaExpiry)) throw new Error('تاريخ الصلاحية غير صالح');

    // Clean and validate Dahabia (must be 8 digits)
    const edahabiaClean = input.dahabiaCardNumber;
    if (!/^[0-9]{8}$/.test(edahabiaClean)) {
      throw new Error('رقم البطاقة الذهبية يجب أن يتكون من 8 أرقام أخيرة تماماً');
    }

    // Find tire stock by brand and size
    const tireStock = await prisma.tireStock.findFirst({
      where: {
        brand: input.brand,
        size: input.tireSize,
      },
    });

    if (!tireStock) {
      throw new Error('مقاس العجلة المختار غير متوفر في الكتالوج المعتمد');
    }

    const unitPrice = tireStock.priceDzd.toNumber();
    const totalPrice = unitPrice * qty;

    // Fetch wilaya details for display name
    const wilayaRecord = await prisma.algerianWilaya.findUnique({
      where: { code: input.wilayaCode },
    });
    if (!wilayaRecord || !Array.isArray(wilayaRecord.communes) || !wilayaRecord.communes.includes(input.commune)) throw new Error('يرجى اختيار ولاية وبلدية صحيحتين');
    const wilayaDisplayName = wilayaRecord ? `${wilayaRecord.code} - ${wilayaRecord.nameAr}` : input.wilayaCode;

    // Generate unique sovereign order code
    const randomSuffix = randomUUID().replace(/-/g, '').toUpperCase();
    const orderNumber = `NM-${new Date().getFullYear()}-${randomSuffix}`;

    // Associate logged-in customer if available
    const auth = tryGetAuthContext();
    const customerId = auth?.userId || null;

    // Create tire order record in database
    const order = await prisma.tireOrder.upsert({
      where: { submissionKey: input.submissionKey },
      update: {},
      create: {
        submissionKey: input.submissionKey,
        orderNumber,
        customerName: input.customerName.trim(),
        phoneNumber: input.phoneNumber.trim(),
        secondaryPhone: input.secondaryPhone.trim(),
        wilaya: wilayaDisplayName,
        commune: input.commune.trim(),
        brand: input.brand,
        tireSize: input.tireSize.trim(),
        quantity: qty,
        unitPriceDzd: tireStock.priceDzd,
        totalPriceDzd: totalPrice,
        nationalIdNumber: input.nationalIdNumber.trim(),
        dahabiaCardNumber: edahabiaClean,
        dahabiaExpiry: input.dahabiaExpiry.trim(),
        status: 'NEW' as OrderStatus,
        customerId: customerId,
      },
    });

    // Mask sensitive credentials
    const nidRaw = order.nationalIdNumber;
    const nidMasked = nidRaw.length > 6 ? `${nidRaw.slice(0, 3)}••••••${nidRaw.slice(-3)}` : '••••••••';
    const edahabiaMasked = `•••• ${order.dahabiaCardNumber.slice(-4)}`;

    // Format registration date
    const dateFormatted = order.createdAt.toISOString().split('T')[0];

    const brandMapped: BrandType = order.brand === 'CONTINENTAL' ? 'continental' : 'iris';

    return {
      orderNumber: order.orderNumber, // data-from: TireOrder-orderNumber
      registrationDate: dateFormatted,
      fullName: order.customerName, // data-from: TireOrder-customerName
      primaryPhone: order.phoneNumber, // data-from: TireOrder-phoneNumber
      secondaryPhone: order.secondaryPhone, // data-from: TireOrder-secondaryPhone
      wilayaCode: input.wilayaCode,
      wilayaName: order.wilaya, // data-from: TireOrder-wilaya
      commune: order.commune, // data-from: TireOrder-commune
      brand: brandMapped,
      dimension: order.tireSize, // data-from: TireOrder-tireSize
      quantity: order.quantity, // data-from: TireOrder-quantity
      unitPriceDzd: order.unitPriceDzd.toNumber(), // data-from: TireOrder-unitPriceDzd
      totalPriceDzd: order.totalPriceDzd.toNumber(), // data-from: TireOrder-totalPriceDzd
      nidMasked: nidMasked,
      edahabiaMasked: edahabiaMasked,
      status: order.status as OrderStatus, // data-from: TireOrder-status
    };
  })();
}