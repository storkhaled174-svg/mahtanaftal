'use server';

import prisma from '@/tools/prisma';
import { withResult, requireAuth, requireRole, UserRole } from '@/backend/action_utils';
import {
  TireStockDto,
  StockManagementDashboardData,
  CreateTireStockInput,
  UpdateTireStockInput,
  ToggleAvailabilityInput,
  TireBrand,
  TireCategory,
} from '@/backend/types/AdminStockManagement';

/**
 * جلب جميع سجلات مخزون ومقاسات وأسعار الإطارات وحساب مؤشرات الأداء الحية
 * قواعد العمل:
 * - مسموح حصراً لعلامتي CONTINENTAL و IRIS
 * - مخصص لمشرف الإدارة المركزية لنفطال (ADMIN)
 */
export async function getStockManagementData(): Promise<StockManagementDashboardData> {
  return withResult(
    requireAuth(
      requireRole(UserRole.Admin)(async () => {
        const tireStocks = await prisma.tireStock.findMany({
          orderBy: [{ availableStock: 'asc' }, { updatedAt: 'desc' }],
        });

        let totalAvailable = 0;
        let totalReserved = 0;
        let criticalAlertCount = 0;
        let continentalCount = 0;
        let irisCount = 0;
        let totalInventoryValue = 0;

        const items: TireStockDto[] = tireStocks.map((record) => {
          const priceDzdNum = record.priceDzd.toNumber();
          totalAvailable += record.availableStock;
          totalReserved += record.reservedStock;
          totalInventoryValue += record.availableStock * priceDzdNum;

          if (record.brand === 'CONTINENTAL') continentalCount++;
          if (record.brand === 'IRIS') irisCount++;

          // تنبيه النفاذ: إذا كان المخزون أقل من أو يساوي حد التنبيه
          if (record.availableStock <= record.minThreshold) {
            criticalAlertCount++;
          }

          return {
            id: record.id, // data-from: TireStock-id
            brand: record.brand as TireBrand, // data-from: TireStock-brand
            size: record.size, // data-from: TireStock-size
            category: record.category as TireCategory, // data-from: TireStock-category
            priceDzd: priceDzdNum, // data-from: TireStock-priceDzd
            availableStock: record.availableStock, // data-from: TireStock-availableStock
            reservedStock: record.reservedStock, // data-from: TireStock-reservedStock
            minThreshold: record.minThreshold, // data-from: TireStock-minThreshold
            speedIndex: record.speedIndex, // data-from: TireStock-speedIndex
            isAvailable: record.isAvailable, // data-from: TireStock-isAvailable
            createdAt: record.createdAt, // data-from: TireStock-createdAt
            updatedAt: record.updatedAt, // data-from: TireStock-updatedAt
          };
        });

        return {
          items,
          kpi: {
            totalSizes: items.length,
            totalAvailable,
            totalReserved,
            criticalAlertCount,
            continentalCount,
            irisCount,
            totalInventoryValueDzd: totalInventoryValue,
          },
          serverTime: new Date(),
        };
      })
    )
  )();
}

/**
 * إضافة مقاس إطار جديد معتمد لإحدى علامتي نفطال
 * قواعد العمل:
 * - العلامة إما CONTINENTAL أو IRIS
 * - إذا كان المخزون الابتدائي = 0 يتم ضبط التوفر تلقائياً على false
 */
export async function createTireStock(input: CreateTireStockInput): Promise<TireStockDto> {
  return withResult(
    requireAuth(
      requireRole(UserRole.Admin)(async () => {
        // قاعدة العمل الصارمة: نفاد المخزون يمنع التوفر
        const isAutoAvailable = input.availableStock > 0;

        const record = await prisma.tireStock.create({
          data: {
            brand: input.brand,
            size: input.size.trim(),
            category: input.category,
            priceDzd: input.priceDzd,
            availableStock: input.availableStock,
            reservedStock: 0,
            minThreshold: input.minThreshold,
            speedIndex: input.speedIndex?.trim() || null,
            isAvailable: isAutoAvailable,
          },
        });

        return {
          id: record.id, // data-from: TireStock-id
          brand: record.brand as TireBrand, // data-from: TireStock-brand
          size: record.size, // data-from: TireStock-size
          category: record.category as TireCategory, // data-from: TireStock-category
          priceDzd: record.priceDzd.toNumber(), // data-from: TireStock-priceDzd
          availableStock: record.availableStock, // data-from: TireStock-availableStock
          reservedStock: record.reservedStock, // data-from: TireStock-reservedStock
          minThreshold: record.minThreshold, // data-from: TireStock-minThreshold
          speedIndex: record.speedIndex, // data-from: TireStock-speedIndex
          isAvailable: record.isAvailable, // data-from: TireStock-isAvailable
          createdAt: record.createdAt, // data-from: TireStock-createdAt
          updatedAt: record.updatedAt, // data-from: TireStock-updatedAt
        };
      })
    )
  )();
}

/**
 * تعديل السعر الرسمي المعتمد والمخزون المتوفر وحد التنبيه
 * قواعد العمل:
 * - عند انخفاض المخزون إلى 0 يتم تلقائياً ضبط isAvailable = false
 */
export async function updateTireStock(input: UpdateTireStockInput): Promise<TireStockDto> {
  return withResult(
    requireAuth(
      requireRole(UserRole.Admin)(async () => {
        // قاعدة العمل الصارمة: إذا أصبح المخزون 0، يعطل التوفر تلقائياً
        const enforcedAvailability = input.availableStock === 0 ? false : input.isAvailable;

        const record = await prisma.tireStock.update({
          where: { id: input.id },
          data: {
            priceDzd: input.priceDzd,
            availableStock: input.availableStock,
            minThreshold: input.minThreshold,
            isAvailable: enforcedAvailability,
          },
        });

        return {
          id: record.id, // data-from: TireStock-id
          brand: record.brand as TireBrand, // data-from: TireStock-brand
          size: record.size, // data-from: TireStock-size
          category: record.category as TireCategory, // data-from: TireStock-category
          priceDzd: record.priceDzd.toNumber(), // data-from: TireStock-priceDzd
          availableStock: record.availableStock, // data-from: TireStock-availableStock
          reservedStock: record.reservedStock, // data-from: TireStock-reservedStock
          minThreshold: record.minThreshold, // data-from: TireStock-minThreshold
          speedIndex: record.speedIndex, // data-from: TireStock-speedIndex
          isAvailable: record.isAvailable, // data-from: TireStock-isAvailable
          createdAt: record.createdAt, // data-from: TireStock-createdAt
          updatedAt: record.updatedAt, // data-from: TireStock-updatedAt
        };
      })
    )
  )();
}

/**
 * التبديل اليدوي لحالة توفر المقاس بالمحطات
 * قواعد العمل:
 * - يمنع تفعيل التوفر إذا كان المخزون المتوفر = 0 (قاعدة نفطال الصارمة)
 */
export async function toggleTireAvailability(input: ToggleAvailabilityInput): Promise<TireStockDto> {
  return withResult(
    requireAuth(
      requireRole(UserRole.Admin)(async () => {
        const existing = await prisma.tireStock.findUniqueOrThrow({
          where: { id: input.id },
        });

        // قاعدة العمل الصارمة: إذا كان المخزون 0 لا يمكن تفعيل التوفر
        if (input.isAvailable && existing.availableStock === 0) {
          throw new Error('لا يمكن تفعيل توفر المقاس بينما المخزون الحالي يساوي 0 (تجميد آلي صارم لنفطال)');
        }

        const record = await prisma.tireStock.update({
          where: { id: input.id },
          data: {
            isAvailable: input.isAvailable,
          },
        });

        return {
          id: record.id, // data-from: TireStock-id
          brand: record.brand as TireBrand, // data-from: TireStock-brand
          size: record.size, // data-from: TireStock-size
          category: record.category as TireCategory, // data-from: TireStock-category
          priceDzd: record.priceDzd.toNumber(), // data-from: TireStock-priceDzd
          availableStock: record.availableStock, // data-from: TireStock-availableStock
          reservedStock: record.reservedStock, // data-from: TireStock-reservedStock
          minThreshold: record.minThreshold, // data-from: TireStock-minThreshold
          speedIndex: record.speedIndex, // data-from: TireStock-speedIndex
          isAvailable: record.isAvailable, // data-from: TireStock-isAvailable
          createdAt: record.createdAt, // data-from: TireStock-createdAt
          updatedAt: record.updatedAt, // data-from: TireStock-updatedAt
        };
      })
    )
  )();
}