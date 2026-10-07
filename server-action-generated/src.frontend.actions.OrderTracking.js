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

// common-redirect:@/frontend/action_utils
var require_action_utils = __commonJS({
  "common-redirect:@/frontend/action_utils"(exports2, module2) {
    module2.exports = require("./_common").frontendAuth;
  }
});

// src/frontend/actions/OrderTracking.ts
var OrderTracking_exports = {};
__export(OrderTracking_exports, {
  getOrderByOrderNumber: () => getOrderByOrderNumber,
  getSampleOrders: () => getSampleOrders,
  searchTireOrder: () => searchTireOrder
});
module.exports = __toCommonJS(OrderTracking_exports);
var import_prisma = __toESM(require_prisma());
var import_action_utils = __toESM(require_action_utils());
function enrichOrderDetails(order) {
  const brandLabel = order.brand === "CONTINENTAL" ? "\u0643\u0648\u0646\u062A\u064A\u0646\u0646\u062A\u0627\u0644" : "\u0625\u064A\u0631\u064A\u0633";
  const stationName = `\u0645\u062D\u0637\u0629 \u0646\u0641\u0637\u0627\u0644 \u0627\u0644\u0645\u0631\u0643\u0632\u064A\u0629 \u0644\u062A\u0648\u0632\u064A\u0639 \u0627\u0644\u0625\u0637\u0627\u0631\u0627\u062A - ${order.commune}`;
  const stationAddress = `\u0627\u0644\u0637\u0631\u064A\u0642 \u0627\u0644\u0648\u0637\u0646\u064A \u0627\u0644\u0631\u0627\u0628\u0637\u060C \u0627\u0644\u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u062D\u0636\u0631\u064A\u0629 ${order.commune}\u060C \u0648\u0644\u0627\u064A\u0629 ${order.wilaya}`;
  const deadlineDays = order.status === "COMPLETED" ? "\u062C\u0627\u0647\u0632\u0629 \u0644\u0644\u0627\u0633\u062A\u0644\u0627\u0645 \u0627\u0644\u0641\u0648\u0631\u064A \u0628\u0627\u0644\u0645\u062D\u0637\u0629" : "\u062E\u0644\u0627\u0644 15 \u064A\u0648\u0645\u0627\u064B \u0645\u0646 \u062A\u0627\u0631\u064A\u062E \u0625\u0634\u0639\u0627\u0631 \u0627\u0644\u062A\u062C\u0647\u064A\u0632";
  const qrVerificationCode = `NFT-DZ-${order.orderNumber}-VAL`;
  const securityHash = `SHA256:${order.id.replace(/-/g, "").slice(0, 16).toUpperCase()}`;
  return {
    id: order.id,
    // data-from: TireOrder-id
    orderNumber: order.orderNumber,
    // data-from: TireOrder-orderNumber
    customerName: order.customerName,
    // data-from: TireOrder-customerName
    phoneNumber: order.phoneNumber,
    // data-from: TireOrder-phoneNumber
    secondaryPhone: order.secondaryPhone,
    // data-from: TireOrder-secondaryPhone
    wilaya: order.wilaya,
    // data-from: TireOrder-wilaya
    commune: order.commune,
    // data-from: TireOrder-commune
    brand: order.brand,
    // data-from: TireOrder-brand
    tireSize: order.tireSize,
    // data-from: TireOrder-tireSize
    quantity: order.quantity,
    // data-from: TireOrder-quantity
    unitPriceDzd: order.unitPriceDzd ? Number(order.unitPriceDzd) : 0,
    // data-from: TireOrder-unitPriceDzd
    totalPriceDzd: order.totalPriceDzd ? Number(order.totalPriceDzd) : 0,
    // data-from: TireOrder-totalPriceDzd
    nationalIdNumber: order.nationalIdNumber,
    // data-from: TireOrder-nationalIdNumber
    dahabiaCardNumber: order.dahabiaCardNumber,
    // data-from: TireOrder-dahabiaCardNumber
    dahabiaExpiry: order.dahabiaExpiry,
    // data-from: TireOrder-dahabiaExpiry
    status: order.status,
    // data-from: TireOrder-status
    notes: order.notes,
    // data-from: TireOrder-notes
    customerId: order.customerId,
    // data-from: TireOrder-customerId
    createdAt: order.createdAt,
    // data-from: TireOrder-createdAt
    updatedAt: order.updatedAt,
    // data-from: TireOrder-updatedAt
    stationName,
    stationAddress,
    pickupDeadline: deadlineDays,
    qrVerificationCode,
    securityHash
  };
}
async function searchTireOrder(input) {
  return (0, import_action_utils.withResult)(async () => {
    const cleanOrderNumber = (input.orderNumber || "").trim().toUpperCase();
    const cleanPhone = (input.phoneNumber || "").trim().replace(/\s+/g, "");
    if (!cleanOrderNumber) {
      return {
        found: false,
        order: null,
        phoneMismatch: false,
        errorMessage: "\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0631\u0642\u0645 \u0627\u0644\u0637\u0644\u0628\u064A\u0629 \u0627\u0644\u0645\u0631\u062C\u0639\u064A (\u0645\u062B\u0627\u0644: NM-2026-8841)"
      };
    }
    const orderRecord = await import_prisma.default.tireOrder.findUnique({
      where: {
        orderNumber: cleanOrderNumber
      }
    });
    if (!orderRecord) {
      return {
        found: false,
        order: null,
        phoneMismatch: false,
        errorMessage: "\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0623\u064A \u0637\u0644\u0628\u064A\u0629 \u0645\u0637\u0627\u0628\u0642\u0629 \u0644\u0644\u0631\u0642\u0645 \u0627\u0644\u0645\u0631\u062C\u0639\u064A \u0627\u0644\u0645\u062F\u062E\u0644."
      };
    }
    if (cleanPhone) {
      const primaryClean = orderRecord.phoneNumber.replace(/\s+/g, "");
      const secondaryClean = (orderRecord.secondaryPhone || "").replace(/\s+/g, "");
      const matches = primaryClean === cleanPhone || secondaryClean === cleanPhone || primaryClean.endsWith(cleanPhone) || cleanPhone.endsWith(primaryClean);
      if (!matches) {
        return {
          found: false,
          order: null,
          phoneMismatch: true,
          errorMessage: "\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641 \u0627\u0644\u0645\u062F\u062E\u0644 \u0644\u0627 \u064A\u062A\u0637\u0627\u0628\u0642 \u0645\u0639 \u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641 \u0627\u0644\u0645\u0633\u062C\u0644 \u0644\u0635\u0627\u062D\u0628 \u0647\u0630\u0647 \u0627\u0644\u0637\u0644\u0628\u064A\u0629."
        };
      }
    }
    return {
      found: true,
      order: enrichOrderDetails(orderRecord),
      phoneMismatch: false,
      errorMessage: null
    };
  })();
}
async function getSampleOrders() {
  return (0, import_action_utils.withResult)(async () => {
    const orders = await import_prisma.default.tireOrder.findMany({
      take: 4,
      orderBy: {
        createdAt: "desc"
      },
      select: {
        orderNumber: true,
        // data-from: TireOrder-orderNumber
        phoneNumber: true,
        // data-from: TireOrder-phoneNumber
        status: true,
        // data-from: TireOrder-status
        customerName: true,
        // data-from: TireOrder-customerName
        brand: true
        // data-from: TireOrder-brand
      }
    });
    return orders.map((o) => ({
      orderNumber: o.orderNumber,
      // data-from: TireOrder-orderNumber
      phoneNumber: o.phoneNumber,
      // data-from: TireOrder-phoneNumber
      status: o.status,
      // data-from: TireOrder-status
      customerName: o.customerName,
      // data-from: TireOrder-customerName
      brand: o.brand
      // data-from: TireOrder-brand
    }));
  })();
}
async function getOrderByOrderNumber(orderNumber) {
  return (0, import_action_utils.withResult)(async () => {
    const cleanNumber = (orderNumber || "").trim().toUpperCase();
    if (!cleanNumber) return null;
    const record = await import_prisma.default.tireOrder.findUnique({
      where: {
        orderNumber: cleanNumber
      }
    });
    if (!record) return null;
    return enrichOrderDetails(record);
  })();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getOrderByOrderNumber,
  getSampleOrders,
  searchTireOrder
});
