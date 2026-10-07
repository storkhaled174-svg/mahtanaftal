"use server";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// common-redirect:@/tools/prisma
var require_prisma = __commonJS({
  "common-redirect:@/tools/prisma"(exports2, module2) {
    var prisma2 = require("./_common").prisma;
    module2.exports = {
      __esModule: true,
      default: prisma2,
      prisma: prisma2
    };
  }
});

// common-redirect:@/backend/action_utils
var require_action_utils = __commonJS({
  "common-redirect:@/backend/action_utils"(exports2, module2) {
    module2.exports = require("./_common").backendAuth;
  }
});

// src/backend/actions/AdminStockManagement.ts
var AdminStockManagement_exports = {};
__export(AdminStockManagement_exports, {
  createTireStock: () => createTireStock,
  getStockManagementData: () => getStockManagementData,
  toggleTireAvailability: () => toggleTireAvailability,
  updateTireStock: () => updateTireStock
});
module.exports = __toCommonJS(AdminStockManagement_exports);
var import_prisma = __toESM(require_prisma());
var import_action_utils = __toESM(require_action_utils());
async function getStockManagementData() {
  return (0, import_action_utils.withResult)(
    (0, import_action_utils.requireAuth)(
      (0, import_action_utils.requireRole)(import_action_utils.UserRole.Admin)(async () => {
        const tireStocks = await import_prisma.default.tireStock.findMany({
          orderBy: [{ availableStock: "asc" }, { updatedAt: "desc" }]
        });
        let totalAvailable = 0;
        let totalReserved = 0;
        let criticalAlertCount = 0;
        let continentalCount = 0;
        let irisCount = 0;
        let totalInventoryValue = 0;
        const items = tireStocks.map((record) => {
          const priceDzdNum = record.priceDzd.toNumber();
          totalAvailable += record.availableStock;
          totalReserved += record.reservedStock;
          totalInventoryValue += record.availableStock * priceDzdNum;
          if (record.brand === "CONTINENTAL") continentalCount++;
          if (record.brand === "IRIS") irisCount++;
          if (record.availableStock <= record.minThreshold) {
            criticalAlertCount++;
          }
          return {
            id: record.id,
            // data-from: TireStock-id
            brand: record.brand,
            // data-from: TireStock-brand
            size: record.size,
            // data-from: TireStock-size
            category: record.category,
            // data-from: TireStock-category
            priceDzd: priceDzdNum,
            // data-from: TireStock-priceDzd
            availableStock: record.availableStock,
            // data-from: TireStock-availableStock
            reservedStock: record.reservedStock,
            // data-from: TireStock-reservedStock
            minThreshold: record.minThreshold,
            // data-from: TireStock-minThreshold
            speedIndex: record.speedIndex,
            // data-from: TireStock-speedIndex
            isAvailable: record.isAvailable,
            // data-from: TireStock-isAvailable
            createdAt: record.createdAt,
            // data-from: TireStock-createdAt
            updatedAt: record.updatedAt
            // data-from: TireStock-updatedAt
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
            totalInventoryValueDzd: totalInventoryValue
          },
          serverTime: /* @__PURE__ */ new Date()
        };
      })
    )
  )();
}
async function createTireStock(input) {
  return (0, import_action_utils.withResult)(
    (0, import_action_utils.requireAuth)(
      (0, import_action_utils.requireRole)(import_action_utils.UserRole.Admin)(async () => {
        const isAutoAvailable = input.availableStock > 0;
        const record = await import_prisma.default.tireStock.create({
          data: {
            brand: input.brand,
            size: input.size.trim(),
            category: input.category,
            priceDzd: input.priceDzd,
            availableStock: input.availableStock,
            reservedStock: 0,
            minThreshold: input.minThreshold,
            speedIndex: input.speedIndex?.trim() || null,
            isAvailable: isAutoAvailable
          }
        });
        return {
          id: record.id,
          // data-from: TireStock-id
          brand: record.brand,
          // data-from: TireStock-brand
          size: record.size,
          // data-from: TireStock-size
          category: record.category,
          // data-from: TireStock-category
          priceDzd: record.priceDzd.toNumber(),
          // data-from: TireStock-priceDzd
          availableStock: record.availableStock,
          // data-from: TireStock-availableStock
          reservedStock: record.reservedStock,
          // data-from: TireStock-reservedStock
          minThreshold: record.minThreshold,
          // data-from: TireStock-minThreshold
          speedIndex: record.speedIndex,
          // data-from: TireStock-speedIndex
          isAvailable: record.isAvailable,
          // data-from: TireStock-isAvailable
          createdAt: record.createdAt,
          // data-from: TireStock-createdAt
          updatedAt: record.updatedAt
          // data-from: TireStock-updatedAt
        };
      })
    )
  )();
}
async function updateTireStock(input) {
  return (0, import_action_utils.withResult)(
    (0, import_action_utils.requireAuth)(
      (0, import_action_utils.requireRole)(import_action_utils.UserRole.Admin)(async () => {
        const enforcedAvailability = input.availableStock === 0 ? false : input.isAvailable;
        const record = await import_prisma.default.tireStock.update({
          where: { id: input.id },
          data: {
            priceDzd: input.priceDzd,
            availableStock: input.availableStock,
            minThreshold: input.minThreshold,
            isAvailable: enforcedAvailability
          }
        });
        return {
          id: record.id,
          // data-from: TireStock-id
          brand: record.brand,
          // data-from: TireStock-brand
          size: record.size,
          // data-from: TireStock-size
          category: record.category,
          // data-from: TireStock-category
          priceDzd: record.priceDzd.toNumber(),
          // data-from: TireStock-priceDzd
          availableStock: record.availableStock,
          // data-from: TireStock-availableStock
          reservedStock: record.reservedStock,
          // data-from: TireStock-reservedStock
          minThreshold: record.minThreshold,
          // data-from: TireStock-minThreshold
          speedIndex: record.speedIndex,
          // data-from: TireStock-speedIndex
          isAvailable: record.isAvailable,
          // data-from: TireStock-isAvailable
          createdAt: record.createdAt,
          // data-from: TireStock-createdAt
          updatedAt: record.updatedAt
          // data-from: TireStock-updatedAt
        };
      })
    )
  )();
}
async function toggleTireAvailability(input) {
  return (0, import_action_utils.withResult)(
    (0, import_action_utils.requireAuth)(
      (0, import_action_utils.requireRole)(import_action_utils.UserRole.Admin)(async () => {
        const existing = await import_prisma.default.tireStock.findUniqueOrThrow({
          where: { id: input.id }
        });
        if (input.isAvailable && existing.availableStock === 0) {
          throw new Error("\u0644\u0627 \u064A\u0645\u0643\u0646 \u062A\u0641\u0639\u064A\u0644 \u062A\u0648\u0641\u0631 \u0627\u0644\u0645\u0642\u0627\u0633 \u0628\u064A\u0646\u0645\u0627 \u0627\u0644\u0645\u062E\u0632\u0648\u0646 \u0627\u0644\u062D\u0627\u0644\u064A \u064A\u0633\u0627\u0648\u064A 0 (\u062A\u062C\u0645\u064A\u062F \u0622\u0644\u064A \u0635\u0627\u0631\u0645 \u0644\u0646\u0641\u0637\u0627\u0644)");
        }
        const record = await import_prisma.default.tireStock.update({
          where: { id: input.id },
          data: {
            isAvailable: input.isAvailable
          }
        });
        return {
          id: record.id,
          // data-from: TireStock-id
          brand: record.brand,
          // data-from: TireStock-brand
          size: record.size,
          // data-from: TireStock-size
          category: record.category,
          // data-from: TireStock-category
          priceDzd: record.priceDzd.toNumber(),
          // data-from: TireStock-priceDzd
          availableStock: record.availableStock,
          // data-from: TireStock-availableStock
          reservedStock: record.reservedStock,
          // data-from: TireStock-reservedStock
          minThreshold: record.minThreshold,
          // data-from: TireStock-minThreshold
          speedIndex: record.speedIndex,
          // data-from: TireStock-speedIndex
          isAvailable: record.isAvailable,
          // data-from: TireStock-isAvailable
          createdAt: record.createdAt,
          // data-from: TireStock-createdAt
          updatedAt: record.updatedAt
          // data-from: TireStock-updatedAt
        };
      })
    )
  )();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createTireStock,
  getStockManagementData,
  toggleTireAvailability,
  updateTireStock
});
