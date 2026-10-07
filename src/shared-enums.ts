/**
 * 枚举中心 — 从 prisma/schema.prisma 自动生成
 * 运行: npx tsx scripts/generate-schema-meta.ts
 * ⚠️ 请勿手动修改，schema 变更后重新生成
 */

export const UserRole = {
  ADMIN: 'ADMIN',
  CUSTOMER: 'CUSTOMER',
} as const
export type UserRoleType = typeof UserRole[keyof typeof UserRole]

export const TireBrand = {
  CONTINENTAL: 'CONTINENTAL',
  IRIS: 'IRIS',
} as const
export type TireBrandType = typeof TireBrand[keyof typeof TireBrand]

export const TireCategory = {
  TOURISM: 'TOURISM',
  UTILITY: 'UTILITY',
  SUV: 'SUV',
} as const
export type TireCategoryType = typeof TireCategory[keyof typeof TireCategory]

export const FaqCategory = {
  ORDERS: 'ORDERS',
  PAYMENT: 'PAYMENT',
  DELIVERY: 'DELIVERY',
  WARRANTY: 'WARRANTY',
} as const
export type FaqCategoryType = typeof FaqCategory[keyof typeof FaqCategory]

export const OrderStatus = {
  NEW: 'NEW',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
} as const
export type OrderStatusType = typeof OrderStatus[keyof typeof OrderStatus]

/** 所有枚举名称列表 */
export const ALL_ENUMS = ['UserRole', 'TireBrand', 'TireCategory', 'FaqCategory', 'OrderStatus'] as const
