'use server';

import { getAuthContext, ForbiddenError } from '../action_utils';

import prisma from '@/tools/prisma';
import { withResult } from '../action_utils';
import {
  AdminDashboardDataOutput,
  OrderItem,
  TireSizeStock,
  WilayaData,
  PlatformFaqItem,
  SupportChannelItem,
  KpiSummary,
  UpdateOrderStatusInput,
  UpdateOrderDetailsInput,
  AddTireStockInput,
  UpdateTireStockInput,
  AddPlatformFaqInput,
  UpdatePlatformFaqInput,
  UpdateSupportChannelInput,
  TireBrand,
  TireCategory,
  FaqCategory,
  OrderStatus,
  AlgerianCommunes,
} from '@/backend/types/AdminDashboard';

// Action 1: Get complete dashboard state & seed if empty
export async function getAdminDashboardData(): Promise<AdminDashboardDataOutput> {
  return withResult(async () => {
    if (getAuthContext().role !== 'ADMIN') throw new ForbiddenError('هذه الخدمة مخصصة للمشرف فقط');
    // 1. Fetch Orders with newest first
    const ordersRaw = await prisma.tireOrder.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const orders: OrderItem[] = ordersRaw.map((o) => ({
      id: o.id, // data-from: TireOrder-id
      orderNumber: o.orderNumber, // data-from: TireOrder-orderNumber
      customerName: o.customerName, // data-from: TireOrder-customerName
      phoneNumber: o.phoneNumber, // data-from: TireOrder-phoneNumber
      secondaryPhone: o.secondaryPhone, // data-from: TireOrder-secondaryPhone
      wilaya: o.wilaya, // data-from: TireOrder-wilaya
      commune: o.commune, // data-from: TireOrder-commune
      brand: o.brand as TireBrand, // data-from: TireOrder-brand
      tireSize: o.tireSize, // data-from: TireOrder-tireSize
      quantity: o.quantity, // data-from: TireOrder-quantity
      unitPriceDzd: o.unitPriceDzd.toNumber(), // data-from: TireOrder-unitPriceDzd
      totalPriceDzd: o.totalPriceDzd.toNumber(), // data-from: TireOrder-totalPriceDzd
      nationalIdNumber: o.nationalIdNumber, // data-from: TireOrder-nationalIdNumber
      dahabiaCardNumber: '', // data-from: TireOrder-dahabiaCardNumber
      dahabiaExpiry: '', // data-from: TireOrder-dahabiaExpiry
      status: o.status as OrderStatus, // data-from: TireOrder-status
      notes: o.notes, // data-from: TireOrder-notes
      customerId: o.customerId, // data-from: TireOrder-customerId
      createdAt: o.registrationDate || o.createdAt, // data-from: TireOrder-createdAt
      updatedAt: o.updatedAt, // data-from: TireOrder-updatedAt
    }));

    // 2. Fetch Stocks
    const stocksRaw = await prisma.tireStock.findMany({
      orderBy: [{ brand: 'asc' }, { size: 'asc' }],
    });

    const stocks: TireSizeStock[] = stocksRaw.map((s) => ({
      id: s.id, // data-from: TireStock-id
      brand: s.brand as TireBrand, // data-from: TireStock-brand
      size: s.size, // data-from: TireStock-size
      category: s.category as TireCategory, // data-from: TireStock-category
      priceDzd: s.priceDzd.toNumber(), // data-from: TireStock-priceDzd
      availableStock: s.availableStock, // data-from: TireStock-availableStock
      reservedStock: s.reservedStock, // data-from: TireStock-reservedStock
      minThreshold: s.minThreshold, // data-from: TireStock-minThreshold
      speedIndex: s.speedIndex, // data-from: TireStock-speedIndex
      isAvailable: s.isAvailable, // data-from: TireStock-isAvailable
      createdAt: s.createdAt, // data-from: TireStock-createdAt
      updatedAt: s.updatedAt, // data-from: TireStock-updatedAt
    }));

    // 3. Fetch Wilayas
    const wilayasRaw = await prisma.algerianWilaya.findMany({
      orderBy: { code: 'asc' },
    });

    const wilayas: WilayaData[] = wilayasRaw.map((w) => ({
      id: w.id, // data-from: AlgerianWilaya-id
      code: w.code, // data-from: AlgerianWilaya-code
      nameAr: w.nameAr, // data-from: AlgerianWilaya-nameAr
      communes: (w.communes as unknown as AlgerianCommunes) || [], // data-from: AlgerianWilaya-communes
    }));

    // 4. Fetch FAQs
    const faqsRaw = await prisma.platformFaq.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const faqs: PlatformFaqItem[] = faqsRaw.map((f) => ({
      id: f.id, // data-from: PlatformFaq-id
      question: f.question, // data-from: PlatformFaq-question
      answer: f.answer, // data-from: PlatformFaq-answer
      category: f.category as FaqCategory, // data-from: PlatformFaq-category
      isActive: f.isActive, // data-from: PlatformFaq-isActive
      createdAt: f.createdAt, // data-from: PlatformFaq-createdAt
      updatedAt: f.updatedAt, // data-from: PlatformFaq-updatedAt
    }));

    // 5. Fetch Support Channels
    const channelsRaw = await prisma.supportChannel.findMany({
      orderBy: { createdAt: 'asc' },
    });

    const channels: SupportChannelItem[] = channelsRaw.map((c) => ({
      id: c.id, // data-from: SupportChannel-id
      title: c.title, // data-from: SupportChannel-title
      value: c.value, // data-from: SupportChannel-value
      description: c.description, // data-from: SupportChannel-description
      isActive: c.isActive, // data-from: SupportChannel-isActive
      createdAt: c.createdAt, // data-from: SupportChannel-createdAt
      updatedAt: c.updatedAt, // data-from: SupportChannel-updatedAt
    }));

    // 6. Compute Real Statistical KPIs
    const totalOrders = orders.length;
    const newOrders = orders.filter((o) => o.status === 'NEW').length;
    const processingOrders = orders.filter((o) => o.status === 'PROCESSING').length;
    const completedOrders = orders.filter((o) => o.status === 'COMPLETED').length;
    const cancelledOrders = orders.filter((o) => o.status === 'CANCELLED').length;

    const totalAvailableTires = stocks.reduce(
      (acc, s) => acc + (s.isAvailable ? s.availableStock : 0),
      0
    );
    const totalTires = stocks.reduce((acc, s) => acc + s.availableStock, 0);
    const stockAvailabilityRate = totalTires > 0 ? Math.round((totalAvailableTires / totalTires) * 100) : 0;
    const lowStockAlertCount = stocks.filter((s) => s.availableStock <= s.minThreshold).length;

    const totalRevenueDzd = orders
      .filter((o) => o.status === 'COMPLETED')
      .reduce((acc, o) => acc + o.totalPriceDzd, 0);

    const kpiSummary: KpiSummary = {
      totalOrders,
      newOrders,
      processingOrders,
      completedOrders,
      cancelledOrders,
      stockAvailabilityRate,
      totalRevenueDzd,
      totalAvailableTires,
      lowStockAlertCount,
    };

    return {
      orders,
      stocks,
      wilayas,
      faqs,
      channels,
      kpiSummary,
    };
  })();
}

// Action 2: Update Order Status & Synchronize Stock Quota Allocation
export async function updateOrderStatus(input: UpdateOrderStatusInput): Promise<OrderItem> {
  return withResult(async () => {
    if (getAuthContext().role !== 'ADMIN') throw new ForbiddenError('هذه الخدمة مخصصة للمشرف فقط');
    const { orderId, newStatus } = input;

    const order = await prisma.tireOrder.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new Error('الطلبية غير موجودة في السجلات.');
    }

    const oldStatus = order.status;

    // Execute status update and stock quota deductions in a transaction
    const updatedOrder = await prisma.$transaction(async (tx) => {
      // Find matching stock by brand and size
      const stock = await tx.tireStock.findFirst({
        where: {
          brand: order.brand,
          size: order.tireSize,
        },
      });

      if (stock) {
        let newAvailable = stock.availableStock;
        let newReserved = stock.reservedStock;

        // Rules:
        // 1. NEW -> PROCESSING: allocate quantity from available to reserved
        if (oldStatus === 'NEW' && newStatus === 'PROCESSING') {
          newAvailable = Math.max(0, newAvailable - order.quantity);
          newReserved = newReserved + order.quantity;
        }
        // 2. PROCESSING -> COMPLETED: finalize delivery, release reserved stock
        else if (oldStatus === 'PROCESSING' && newStatus === 'COMPLETED') {
          newReserved = Math.max(0, newReserved - order.quantity);
        }
        // 3. PROCESSING -> CANCELLED: release reserved stock back to available
        else if (oldStatus === 'PROCESSING' && newStatus === 'CANCELLED') {
          newReserved = Math.max(0, newReserved - order.quantity);
          newAvailable = newAvailable + order.quantity;
        }
        // 4. COMPLETED -> CANCELLED: return quantity back to available stock
        else if (oldStatus === 'COMPLETED' && newStatus === 'CANCELLED') {
          newAvailable = newAvailable + order.quantity;
        }

        await tx.tireStock.update({
          where: { id: stock.id },
          data: {
            availableStock: newAvailable,
            reservedStock: newReserved,
            isAvailable: newAvailable > 0,
          },
        });
      }

      // Update Tire Order Status
      const saved = await tx.tireOrder.update({
        where: { id: orderId },
        data: {
          status: newStatus,
        },
      });

      return saved;
    });

    return {
      id: updatedOrder.id, // data-from: TireOrder-id
      orderNumber: updatedOrder.orderNumber, // data-from: TireOrder-orderNumber
      customerName: updatedOrder.customerName, // data-from: TireOrder-customerName
      phoneNumber: updatedOrder.phoneNumber, // data-from: TireOrder-phoneNumber
      secondaryPhone: updatedOrder.secondaryPhone, // data-from: TireOrder-secondaryPhone
      wilaya: updatedOrder.wilaya, // data-from: TireOrder-wilaya
      commune: updatedOrder.commune, // data-from: TireOrder-commune
      brand: updatedOrder.brand as TireBrand, // data-from: TireOrder-brand
      tireSize: updatedOrder.tireSize, // data-from: TireOrder-tireSize
      quantity: updatedOrder.quantity, // data-from: TireOrder-quantity
      unitPriceDzd: updatedOrder.unitPriceDzd.toNumber(), // data-from: TireOrder-unitPriceDzd
      totalPriceDzd: updatedOrder.totalPriceDzd.toNumber(), // data-from: TireOrder-totalPriceDzd
      nationalIdNumber: updatedOrder.nationalIdNumber, // data-from: TireOrder-nationalIdNumber
      dahabiaCardNumber: '', // data-from: TireOrder-dahabiaCardNumber
      dahabiaExpiry: '', // data-from: TireOrder-dahabiaExpiry
      status: updatedOrder.status as OrderStatus, // data-from: TireOrder-status
      notes: updatedOrder.notes, // data-from: TireOrder-notes
      customerId: updatedOrder.customerId, // data-from: TireOrder-customerId
      createdAt: updatedOrder.registrationDate || updatedOrder.createdAt, // data-from: TireOrder-createdAt
      updatedAt: updatedOrder.updatedAt, // data-from: TireOrder-updatedAt
    };
  })();
}

// Action 3: Update Order Details from EditOrderModal
export async function updateOrderDetails(input: UpdateOrderDetailsInput): Promise<OrderItem> {
  return withResult(async () => {
    if (getAuthContext().role !== 'ADMIN') throw new ForbiddenError('هذه الخدمة مخصصة للمشرف فقط');
    const {
      orderId,
      customerName,
      phoneNumber,
      secondaryPhone,
      wilaya,
      commune,
      brand,
      tireSize,
      quantity,
      status,
      notes,
    } = input;

    // Lookup unit price from stock
    const matchingStock = await prisma.tireStock.findFirst({
      where: {
        brand,
        size: tireSize,
      },
    });

    const unitPriceDzd = matchingStock ? matchingStock.priceDzd.toNumber() : 18500;
    const totalPriceDzd = unitPriceDzd * quantity;

    const updated = await prisma.tireOrder.update({
      where: { id: orderId },
      data: {
        customerName,
        phoneNumber,
        secondaryPhone: secondaryPhone || '',
        wilaya,
        commune,
        brand,
        tireSize,
        quantity,
        unitPriceDzd,
        totalPriceDzd,
        status,
        notes,
      },
    });

    return {
      id: updated.id, // data-from: TireOrder-id
      orderNumber: updated.orderNumber, // data-from: TireOrder-orderNumber
      customerName: updated.customerName, // data-from: TireOrder-customerName
      phoneNumber: updated.phoneNumber, // data-from: TireOrder-phoneNumber
      secondaryPhone: updated.secondaryPhone, // data-from: TireOrder-secondaryPhone
      wilaya: updated.wilaya, // data-from: TireOrder-wilaya
      commune: updated.commune, // data-from: TireOrder-commune
      brand: updated.brand as TireBrand, // data-from: TireOrder-brand
      tireSize: updated.tireSize, // data-from: TireOrder-tireSize
      quantity: updated.quantity, // data-from: TireOrder-quantity
      unitPriceDzd: updated.unitPriceDzd.toNumber(), // data-from: TireOrder-unitPriceDzd
      totalPriceDzd: updated.totalPriceDzd.toNumber(), // data-from: TireOrder-totalPriceDzd
      nationalIdNumber: updated.nationalIdNumber, // data-from: TireOrder-nationalIdNumber
      dahabiaCardNumber: '', // data-from: TireOrder-dahabiaCardNumber
      dahabiaExpiry: '', // data-from: TireOrder-dahabiaExpiry
      status: updated.status as OrderStatus, // data-from: TireOrder-status
      notes: updated.notes, // data-from: TireOrder-notes
      customerId: updated.customerId, // data-from: TireOrder-customerId
      createdAt: updated.registrationDate || updated.createdAt, // data-from: TireOrder-createdAt
      updatedAt: updated.updatedAt, // data-from: TireOrder-updatedAt
    };
  })();
}

// Action 4: Delete Order
export async function deleteOrder(orderId: string): Promise<{ success: boolean; id: string }> {
  return withResult(async () => {
    if (getAuthContext().role !== 'ADMIN') throw new ForbiddenError('هذه الخدمة مخصصة للمشرف فقط');
    const existing = await prisma.tireOrder.findUnique({
      where: { id: orderId },
    });

    if (!existing) {
      return { success: true, id: orderId };
    }

    // If order was processing, release reserved stock
    if (existing.status === 'PROCESSING') {
      const stock = await prisma.tireStock.findFirst({
        where: { brand: existing.brand, size: existing.tireSize },
      });
      if (stock) {
        await prisma.tireStock.update({
          where: { id: stock.id },
          data: {
            reservedStock: Math.max(0, stock.reservedStock - existing.quantity),
            availableStock: stock.availableStock + existing.quantity,
            isAvailable: true,
          },
        });
      }
    }

    await prisma.tireOrder.delete({
      where: { id: orderId },
    });

    return { success: true, id: orderId };
  })();
}

// Action 5: Add New Tire Stock to Catalog
export async function addTireStock(input: AddTireStockInput): Promise<TireSizeStock> {
  return withResult(async () => {
    if (getAuthContext().role !== 'ADMIN') throw new ForbiddenError('هذه الخدمة مخصصة للمشرف فقط');
    const created = await prisma.tireStock.create({
      data: {
        brand: input.brand,
        size: input.size,
        category: input.category,
        priceDzd: input.priceDzd,
        availableStock: input.availableStock,
        reservedStock: 0,
        minThreshold: input.minThreshold,
        speedIndex: input.speedIndex,
        isAvailable: input.availableStock > 0,
      },
    });

    return {
      id: created.id, // data-from: TireStock-id
      brand: created.brand as TireBrand, // data-from: TireStock-brand
      size: created.size, // data-from: TireStock-size
      category: created.category as TireCategory, // data-from: TireStock-category
      priceDzd: created.priceDzd.toNumber(), // data-from: TireStock-priceDzd
      availableStock: created.availableStock, // data-from: TireStock-availableStock
      reservedStock: created.reservedStock, // data-from: TireStock-reservedStock
      minThreshold: created.minThreshold, // data-from: TireStock-minThreshold
      speedIndex: created.speedIndex, // data-from: TireStock-speedIndex
      isAvailable: created.isAvailable, // data-from: TireStock-isAvailable
      createdAt: created.createdAt, // data-from: TireStock-createdAt
      updatedAt: created.updatedAt, // data-from: TireStock-updatedAt
    };
  })();
}

// Action 6: Update Tire Stock & Price
export async function updateTireStock(input: UpdateTireStockInput): Promise<TireSizeStock> {
  return withResult(async () => {
    if (getAuthContext().role !== 'ADMIN') throw new ForbiddenError('هذه الخدمة مخصصة للمشرف فقط');
    const updated = await prisma.tireStock.update({
      where: { id: input.stockId },
      data: {
        priceDzd: input.priceDzd,
        availableStock: input.availableStock,
        minThreshold: input.minThreshold,
        isAvailable: input.availableStock > 0 ? input.isAvailable : false,
      },
    });

    return {
      id: updated.id, // data-from: TireStock-id
      brand: updated.brand as TireBrand, // data-from: TireStock-brand
      size: updated.size, // data-from: TireStock-size
      category: updated.category as TireCategory, // data-from: TireStock-category
      priceDzd: updated.priceDzd.toNumber(), // data-from: TireStock-priceDzd
      availableStock: updated.availableStock, // data-from: TireStock-availableStock
      reservedStock: updated.reservedStock, // data-from: TireStock-reservedStock
      minThreshold: updated.minThreshold, // data-from: TireStock-minThreshold
      speedIndex: updated.speedIndex, // data-from: TireStock-speedIndex
      isAvailable: updated.isAvailable, // data-from: TireStock-isAvailable
      createdAt: updated.createdAt, // data-from: TireStock-createdAt
      updatedAt: updated.updatedAt, // data-from: TireStock-updatedAt
    };
  })();
}

// Action 7: Toggle Stock Availability Directly
export async function toggleStockAvailability(stockId: string): Promise<TireSizeStock> {
  return withResult(async () => {
    if (getAuthContext().role !== 'ADMIN') throw new ForbiddenError('هذه الخدمة مخصصة للمشرف فقط');
    const stock = await prisma.tireStock.findUnique({
      where: { id: stockId },
    });

    if (!stock) {
      throw new Error('مقاس الإطار غير موجود.');
    }

    const nextState = !stock.isAvailable;
    const updated = await prisma.tireStock.update({
      where: { id: stockId },
      data: {
        isAvailable: nextState,
      },
    });

    return {
      id: updated.id, // data-from: TireStock-id
      brand: updated.brand as TireBrand, // data-from: TireStock-brand
      size: updated.size, // data-from: TireStock-size
      category: updated.category as TireCategory, // data-from: TireStock-category
      priceDzd: updated.priceDzd.toNumber(), // data-from: TireStock-priceDzd
      availableStock: updated.availableStock, // data-from: TireStock-availableStock
      reservedStock: updated.reservedStock, // data-from: TireStock-reservedStock
      minThreshold: updated.minThreshold, // data-from: TireStock-minThreshold
      speedIndex: updated.speedIndex, // data-from: TireStock-speedIndex
      isAvailable: updated.isAvailable, // data-from: TireStock-isAvailable
      createdAt: updated.createdAt, // data-from: TireStock-createdAt
      updatedAt: updated.updatedAt, // data-from: TireStock-updatedAt
    };
  })();
}

// Action 8: Add Platform FAQ
export async function addPlatformFaq(input: AddPlatformFaqInput): Promise<PlatformFaqItem> {
  return withResult(async () => {
    if (getAuthContext().role !== 'ADMIN') throw new ForbiddenError('هذه الخدمة مخصصة للمشرف فقط');
    const created = await prisma.platformFaq.create({
      data: {
        question: input.question,
        answer: input.answer,
        category: input.category,
        isActive: true,
      },
    });

    return {
      id: created.id, // data-from: PlatformFaq-id
      question: created.question, // data-from: PlatformFaq-question
      answer: created.answer, // data-from: PlatformFaq-answer
      category: created.category as FaqCategory, // data-from: PlatformFaq-category
      isActive: created.isActive, // data-from: PlatformFaq-isActive
      createdAt: created.createdAt, // data-from: PlatformFaq-createdAt
      updatedAt: created.updatedAt, // data-from: PlatformFaq-updatedAt
    };
  })();
}

// Action 9: Update Platform FAQ
export async function updatePlatformFaq(input: UpdatePlatformFaqInput): Promise<PlatformFaqItem> {
  return withResult(async () => {
    if (getAuthContext().role !== 'ADMIN') throw new ForbiddenError('هذه الخدمة مخصصة للمشرف فقط');
    const updated = await prisma.platformFaq.update({
      where: { id: input.faqId },
      data: {
        question: input.question,
        answer: input.answer,
        category: input.category,
        isActive: input.isActive,
      },
    });

    return {
      id: updated.id, // data-from: PlatformFaq-id
      question: updated.question, // data-from: PlatformFaq-question
      answer: updated.answer, // data-from: PlatformFaq-answer
      category: updated.category as FaqCategory, // data-from: PlatformFaq-category
      isActive: updated.isActive, // data-from: PlatformFaq-isActive
      createdAt: updated.createdAt, // data-from: PlatformFaq-createdAt
      updatedAt: updated.updatedAt, // data-from: PlatformFaq-updatedAt
    };
  })();
}

// Action 10: Delete Platform FAQ
export async function deletePlatformFaq(faqId: string): Promise<{ success: boolean; id: string }> {
  return withResult(async () => {
    if (getAuthContext().role !== 'ADMIN') throw new ForbiddenError('هذه الخدمة مخصصة للمشرف فقط');
    await prisma.platformFaq.delete({
      where: { id: faqId },
    });
    return { success: true, id: faqId };
  })();
}

// Action 11: Update Support Channel
export async function updateSupportChannel(input: UpdateSupportChannelInput): Promise<SupportChannelItem> {
  return withResult(async () => {
    if (getAuthContext().role !== 'ADMIN') throw new ForbiddenError('هذه الخدمة مخصصة للمشرف فقط');
    const updated = await prisma.supportChannel.update({
      where: { id: input.channelId },
      data: {
        title: input.title,
        value: input.value,
        description: input.description,
        isActive: input.isActive,
      },
    });

    return {
      id: updated.id, // data-from: SupportChannel-id
      title: updated.title, // data-from: SupportChannel-title
      value: updated.value, // data-from: SupportChannel-value
      description: updated.description, // data-from: SupportChannel-description
      isActive: updated.isActive, // data-from: SupportChannel-isActive
      createdAt: updated.createdAt, // data-from: SupportChannel-createdAt
      updatedAt: updated.updatedAt, // data-from: SupportChannel-updatedAt
    };
  })();
}