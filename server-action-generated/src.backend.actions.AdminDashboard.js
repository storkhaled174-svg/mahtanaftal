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

// src/backend/actions/AdminDashboard.ts
var AdminDashboard_exports = {};
__export(AdminDashboard_exports, {
  addPlatformFaq: () => addPlatformFaq,
  addTireStock: () => addTireStock,
  deleteOrder: () => deleteOrder,
  deletePlatformFaq: () => deletePlatformFaq,
  getAdminDashboardData: () => getAdminDashboardData,
  toggleStockAvailability: () => toggleStockAvailability,
  updateOrderDetails: () => updateOrderDetails,
  updateOrderStatus: () => updateOrderStatus,
  updatePlatformFaq: () => updatePlatformFaq,
  updateSupportChannel: () => updateSupportChannel,
  updateTireStock: () => updateTireStock
});
module.exports = __toCommonJS(AdminDashboard_exports);
var import_prisma = __toESM(require_prisma());
var import_action_utils = __toESM(require_action_utils());
async function getAdminDashboardData() {
  return (0, import_action_utils.withResult)(async () => {
    const ordersRaw = await import_prisma.default.tireOrder.findMany({
      orderBy: { createdAt: "desc" }
    });
    const orders = ordersRaw.map((o) => ({
      id: o.id,
      // data-from: TireOrder-id
      orderNumber: o.orderNumber,
      // data-from: TireOrder-orderNumber
      customerName: o.customerName,
      // data-from: TireOrder-customerName
      phoneNumber: o.phoneNumber,
      // data-from: TireOrder-phoneNumber
      secondaryPhone: o.secondaryPhone,
      // data-from: TireOrder-secondaryPhone
      wilaya: o.wilaya,
      // data-from: TireOrder-wilaya
      commune: o.commune,
      // data-from: TireOrder-commune
      brand: o.brand,
      // data-from: TireOrder-brand
      tireSize: o.tireSize,
      // data-from: TireOrder-tireSize
      quantity: o.quantity,
      // data-from: TireOrder-quantity
      unitPriceDzd: o.unitPriceDzd.toNumber(),
      // data-from: TireOrder-unitPriceDzd
      totalPriceDzd: o.totalPriceDzd.toNumber(),
      // data-from: TireOrder-totalPriceDzd
      nationalIdNumber: o.nationalIdNumber,
      // data-from: TireOrder-nationalIdNumber
      dahabiaCardNumber: o.dahabiaCardNumber,
      // data-from: TireOrder-dahabiaCardNumber
      dahabiaExpiry: o.dahabiaExpiry,
      // data-from: TireOrder-dahabiaExpiry
      status: o.status,
      // data-from: TireOrder-status
      notes: o.notes,
      // data-from: TireOrder-notes
      customerId: o.customerId,
      // data-from: TireOrder-customerId
      createdAt: o.createdAt,
      // data-from: TireOrder-createdAt
      updatedAt: o.updatedAt
      // data-from: TireOrder-updatedAt
    }));
    const stocksRaw = await import_prisma.default.tireStock.findMany({
      orderBy: [{ brand: "asc" }, { size: "asc" }]
    });
    const stocks = stocksRaw.map((s) => ({
      id: s.id,
      // data-from: TireStock-id
      brand: s.brand,
      // data-from: TireStock-brand
      size: s.size,
      // data-from: TireStock-size
      category: s.category,
      // data-from: TireStock-category
      priceDzd: s.priceDzd.toNumber(),
      // data-from: TireStock-priceDzd
      availableStock: s.availableStock,
      // data-from: TireStock-availableStock
      reservedStock: s.reservedStock,
      // data-from: TireStock-reservedStock
      minThreshold: s.minThreshold,
      // data-from: TireStock-minThreshold
      speedIndex: s.speedIndex,
      // data-from: TireStock-speedIndex
      isAvailable: s.isAvailable,
      // data-from: TireStock-isAvailable
      createdAt: s.createdAt,
      // data-from: TireStock-createdAt
      updatedAt: s.updatedAt
      // data-from: TireStock-updatedAt
    }));
    const wilayasRaw = await import_prisma.default.algerianWilaya.findMany({
      orderBy: { code: "asc" }
    });
    const wilayas = wilayasRaw.map((w) => ({
      id: w.id,
      // data-from: AlgerianWilaya-id
      code: w.code,
      // data-from: AlgerianWilaya-code
      nameAr: w.nameAr,
      // data-from: AlgerianWilaya-nameAr
      communes: w.communes || []
      // data-from: AlgerianWilaya-communes
    }));
    const faqsRaw = await import_prisma.default.platformFaq.findMany({
      orderBy: { createdAt: "desc" }
    });
    const faqs = faqsRaw.map((f) => ({
      id: f.id,
      // data-from: PlatformFaq-id
      question: f.question,
      // data-from: PlatformFaq-question
      answer: f.answer,
      // data-from: PlatformFaq-answer
      category: f.category,
      // data-from: PlatformFaq-category
      isActive: f.isActive,
      // data-from: PlatformFaq-isActive
      createdAt: f.createdAt,
      // data-from: PlatformFaq-createdAt
      updatedAt: f.updatedAt
      // data-from: PlatformFaq-updatedAt
    }));
    const channelsRaw = await import_prisma.default.supportChannel.findMany({
      orderBy: { createdAt: "asc" }
    });
    const channels = channelsRaw.map((c) => ({
      id: c.id,
      // data-from: SupportChannel-id
      title: c.title,
      // data-from: SupportChannel-title
      value: c.value,
      // data-from: SupportChannel-value
      description: c.description,
      // data-from: SupportChannel-description
      isActive: c.isActive,
      // data-from: SupportChannel-isActive
      createdAt: c.createdAt,
      // data-from: SupportChannel-createdAt
      updatedAt: c.updatedAt
      // data-from: SupportChannel-updatedAt
    }));
    const totalOrders = orders.length;
    const newOrders = orders.filter((o) => o.status === "NEW").length;
    const processingOrders = orders.filter((o) => o.status === "PROCESSING").length;
    const completedOrders = orders.filter((o) => o.status === "COMPLETED").length;
    const cancelledOrders = orders.filter((o) => o.status === "CANCELLED").length;
    const totalAvailableTires = stocks.reduce(
      (acc, s) => acc + (s.isAvailable ? s.availableStock : 0),
      0
    );
    const totalTires = stocks.reduce((acc, s) => acc + s.availableStock, 0);
    const stockAvailabilityRate = totalTires > 0 ? Math.round(totalAvailableTires / totalTires * 100) : 0;
    const lowStockAlertCount = stocks.filter((s) => s.availableStock <= s.minThreshold).length;
    const totalRevenueDzd = orders.filter((o) => o.status === "COMPLETED").reduce((acc, o) => acc + o.totalPriceDzd, 0);
    const kpiSummary = {
      totalOrders,
      newOrders,
      processingOrders,
      completedOrders,
      cancelledOrders,
      stockAvailabilityRate,
      totalRevenueDzd,
      totalAvailableTires,
      lowStockAlertCount
    };
    return {
      orders,
      stocks,
      wilayas,
      faqs,
      channels,
      kpiSummary
    };
  })();
}
async function updateOrderStatus(input) {
  return (0, import_action_utils.withResult)(async () => {
    const { orderId, newStatus } = input;
    const order = await import_prisma.default.tireOrder.findUnique({
      where: { id: orderId }
    });
    if (!order) {
      throw new Error("\u0627\u0644\u0637\u0644\u0628\u064A\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629 \u0641\u064A \u0627\u0644\u0633\u062C\u0644\u0627\u062A.");
    }
    const oldStatus = order.status;
    const updatedOrder = await import_prisma.default.$transaction(async (tx) => {
      const stock = await tx.tireStock.findFirst({
        where: {
          brand: order.brand,
          size: order.tireSize
        }
      });
      if (stock) {
        let newAvailable = stock.availableStock;
        let newReserved = stock.reservedStock;
        if (oldStatus === "NEW" && newStatus === "PROCESSING") {
          newAvailable = Math.max(0, newAvailable - order.quantity);
          newReserved = newReserved + order.quantity;
        } else if (oldStatus === "PROCESSING" && newStatus === "COMPLETED") {
          newReserved = Math.max(0, newReserved - order.quantity);
        } else if (oldStatus === "PROCESSING" && newStatus === "CANCELLED") {
          newReserved = Math.max(0, newReserved - order.quantity);
          newAvailable = newAvailable + order.quantity;
        } else if (oldStatus === "COMPLETED" && newStatus === "CANCELLED") {
          newAvailable = newAvailable + order.quantity;
        }
        await tx.tireStock.update({
          where: { id: stock.id },
          data: {
            availableStock: newAvailable,
            reservedStock: newReserved,
            isAvailable: newAvailable > 0
          }
        });
      }
      const saved = await tx.tireOrder.update({
        where: { id: orderId },
        data: {
          status: newStatus
        }
      });
      return saved;
    });
    return {
      id: updatedOrder.id,
      // data-from: TireOrder-id
      orderNumber: updatedOrder.orderNumber,
      // data-from: TireOrder-orderNumber
      customerName: updatedOrder.customerName,
      // data-from: TireOrder-customerName
      phoneNumber: updatedOrder.phoneNumber,
      // data-from: TireOrder-phoneNumber
      secondaryPhone: updatedOrder.secondaryPhone,
      // data-from: TireOrder-secondaryPhone
      wilaya: updatedOrder.wilaya,
      // data-from: TireOrder-wilaya
      commune: updatedOrder.commune,
      // data-from: TireOrder-commune
      brand: updatedOrder.brand,
      // data-from: TireOrder-brand
      tireSize: updatedOrder.tireSize,
      // data-from: TireOrder-tireSize
      quantity: updatedOrder.quantity,
      // data-from: TireOrder-quantity
      unitPriceDzd: updatedOrder.unitPriceDzd.toNumber(),
      // data-from: TireOrder-unitPriceDzd
      totalPriceDzd: updatedOrder.totalPriceDzd.toNumber(),
      // data-from: TireOrder-totalPriceDzd
      nationalIdNumber: updatedOrder.nationalIdNumber,
      // data-from: TireOrder-nationalIdNumber
      dahabiaCardNumber: updatedOrder.dahabiaCardNumber,
      // data-from: TireOrder-dahabiaCardNumber
      dahabiaExpiry: updatedOrder.dahabiaExpiry,
      // data-from: TireOrder-dahabiaExpiry
      status: updatedOrder.status,
      // data-from: TireOrder-status
      notes: updatedOrder.notes,
      // data-from: TireOrder-notes
      customerId: updatedOrder.customerId,
      // data-from: TireOrder-customerId
      createdAt: updatedOrder.createdAt,
      // data-from: TireOrder-createdAt
      updatedAt: updatedOrder.updatedAt
      // data-from: TireOrder-updatedAt
    };
  })();
}
async function updateOrderDetails(input) {
  return (0, import_action_utils.withResult)(async () => {
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
      notes
    } = input;
    const matchingStock = await import_prisma.default.tireStock.findFirst({
      where: {
        brand,
        size: tireSize
      }
    });
    const unitPriceDzd = matchingStock ? matchingStock.priceDzd.toNumber() : 18500;
    const totalPriceDzd = unitPriceDzd * quantity;
    const updated = await import_prisma.default.tireOrder.update({
      where: { id: orderId },
      data: {
        customerName,
        phoneNumber,
        secondaryPhone: secondaryPhone || "",
        wilaya,
        commune,
        brand,
        tireSize,
        quantity,
        unitPriceDzd,
        totalPriceDzd,
        status,
        notes
      }
    });
    return {
      id: updated.id,
      // data-from: TireOrder-id
      orderNumber: updated.orderNumber,
      // data-from: TireOrder-orderNumber
      customerName: updated.customerName,
      // data-from: TireOrder-customerName
      phoneNumber: updated.phoneNumber,
      // data-from: TireOrder-phoneNumber
      secondaryPhone: updated.secondaryPhone,
      // data-from: TireOrder-secondaryPhone
      wilaya: updated.wilaya,
      // data-from: TireOrder-wilaya
      commune: updated.commune,
      // data-from: TireOrder-commune
      brand: updated.brand,
      // data-from: TireOrder-brand
      tireSize: updated.tireSize,
      // data-from: TireOrder-tireSize
      quantity: updated.quantity,
      // data-from: TireOrder-quantity
      unitPriceDzd: updated.unitPriceDzd.toNumber(),
      // data-from: TireOrder-unitPriceDzd
      totalPriceDzd: updated.totalPriceDzd.toNumber(),
      // data-from: TireOrder-totalPriceDzd
      nationalIdNumber: updated.nationalIdNumber,
      // data-from: TireOrder-nationalIdNumber
      dahabiaCardNumber: updated.dahabiaCardNumber,
      // data-from: TireOrder-dahabiaCardNumber
      dahabiaExpiry: updated.dahabiaExpiry,
      // data-from: TireOrder-dahabiaExpiry
      status: updated.status,
      // data-from: TireOrder-status
      notes: updated.notes,
      // data-from: TireOrder-notes
      customerId: updated.customerId,
      // data-from: TireOrder-customerId
      createdAt: updated.createdAt,
      // data-from: TireOrder-createdAt
      updatedAt: updated.updatedAt
      // data-from: TireOrder-updatedAt
    };
  })();
}
async function deleteOrder(orderId) {
  return (0, import_action_utils.withResult)(async () => {
    const existing = await import_prisma.default.tireOrder.findUnique({
      where: { id: orderId }
    });
    if (!existing) {
      return { success: true, id: orderId };
    }
    if (existing.status === "PROCESSING") {
      const stock = await import_prisma.default.tireStock.findFirst({
        where: { brand: existing.brand, size: existing.tireSize }
      });
      if (stock) {
        await import_prisma.default.tireStock.update({
          where: { id: stock.id },
          data: {
            reservedStock: Math.max(0, stock.reservedStock - existing.quantity),
            availableStock: stock.availableStock + existing.quantity,
            isAvailable: true
          }
        });
      }
    }
    await import_prisma.default.tireOrder.delete({
      where: { id: orderId }
    });
    return { success: true, id: orderId };
  })();
}
async function addTireStock(input) {
  return (0, import_action_utils.withResult)(async () => {
    const created = await import_prisma.default.tireStock.create({
      data: {
        brand: input.brand,
        size: input.size,
        category: input.category,
        priceDzd: input.priceDzd,
        availableStock: input.availableStock,
        reservedStock: 0,
        minThreshold: input.minThreshold,
        speedIndex: input.speedIndex,
        isAvailable: input.availableStock > 0
      }
    });
    return {
      id: created.id,
      // data-from: TireStock-id
      brand: created.brand,
      // data-from: TireStock-brand
      size: created.size,
      // data-from: TireStock-size
      category: created.category,
      // data-from: TireStock-category
      priceDzd: created.priceDzd.toNumber(),
      // data-from: TireStock-priceDzd
      availableStock: created.availableStock,
      // data-from: TireStock-availableStock
      reservedStock: created.reservedStock,
      // data-from: TireStock-reservedStock
      minThreshold: created.minThreshold,
      // data-from: TireStock-minThreshold
      speedIndex: created.speedIndex,
      // data-from: TireStock-speedIndex
      isAvailable: created.isAvailable,
      // data-from: TireStock-isAvailable
      createdAt: created.createdAt,
      // data-from: TireStock-createdAt
      updatedAt: created.updatedAt
      // data-from: TireStock-updatedAt
    };
  })();
}
async function updateTireStock(input) {
  return (0, import_action_utils.withResult)(async () => {
    const updated = await import_prisma.default.tireStock.update({
      where: { id: input.stockId },
      data: {
        priceDzd: input.priceDzd,
        availableStock: input.availableStock,
        minThreshold: input.minThreshold,
        isAvailable: input.availableStock > 0 ? input.isAvailable : false
      }
    });
    return {
      id: updated.id,
      // data-from: TireStock-id
      brand: updated.brand,
      // data-from: TireStock-brand
      size: updated.size,
      // data-from: TireStock-size
      category: updated.category,
      // data-from: TireStock-category
      priceDzd: updated.priceDzd.toNumber(),
      // data-from: TireStock-priceDzd
      availableStock: updated.availableStock,
      // data-from: TireStock-availableStock
      reservedStock: updated.reservedStock,
      // data-from: TireStock-reservedStock
      minThreshold: updated.minThreshold,
      // data-from: TireStock-minThreshold
      speedIndex: updated.speedIndex,
      // data-from: TireStock-speedIndex
      isAvailable: updated.isAvailable,
      // data-from: TireStock-isAvailable
      createdAt: updated.createdAt,
      // data-from: TireStock-createdAt
      updatedAt: updated.updatedAt
      // data-from: TireStock-updatedAt
    };
  })();
}
async function toggleStockAvailability(stockId) {
  return (0, import_action_utils.withResult)(async () => {
    const stock = await import_prisma.default.tireStock.findUnique({
      where: { id: stockId }
    });
    if (!stock) {
      throw new Error("\u0645\u0642\u0627\u0633 \u0627\u0644\u0625\u0637\u0627\u0631 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F.");
    }
    const nextState = !stock.isAvailable;
    const updated = await import_prisma.default.tireStock.update({
      where: { id: stockId },
      data: {
        isAvailable: nextState
      }
    });
    return {
      id: updated.id,
      // data-from: TireStock-id
      brand: updated.brand,
      // data-from: TireStock-brand
      size: updated.size,
      // data-from: TireStock-size
      category: updated.category,
      // data-from: TireStock-category
      priceDzd: updated.priceDzd.toNumber(),
      // data-from: TireStock-priceDzd
      availableStock: updated.availableStock,
      // data-from: TireStock-availableStock
      reservedStock: updated.reservedStock,
      // data-from: TireStock-reservedStock
      minThreshold: updated.minThreshold,
      // data-from: TireStock-minThreshold
      speedIndex: updated.speedIndex,
      // data-from: TireStock-speedIndex
      isAvailable: updated.isAvailable,
      // data-from: TireStock-isAvailable
      createdAt: updated.createdAt,
      // data-from: TireStock-createdAt
      updatedAt: updated.updatedAt
      // data-from: TireStock-updatedAt
    };
  })();
}
async function addPlatformFaq(input) {
  return (0, import_action_utils.withResult)(async () => {
    const created = await import_prisma.default.platformFaq.create({
      data: {
        question: input.question,
        answer: input.answer,
        category: input.category,
        isActive: true
      }
    });
    return {
      id: created.id,
      // data-from: PlatformFaq-id
      question: created.question,
      // data-from: PlatformFaq-question
      answer: created.answer,
      // data-from: PlatformFaq-answer
      category: created.category,
      // data-from: PlatformFaq-category
      isActive: created.isActive,
      // data-from: PlatformFaq-isActive
      createdAt: created.createdAt,
      // data-from: PlatformFaq-createdAt
      updatedAt: created.updatedAt
      // data-from: PlatformFaq-updatedAt
    };
  })();
}
async function updatePlatformFaq(input) {
  return (0, import_action_utils.withResult)(async () => {
    const updated = await import_prisma.default.platformFaq.update({
      where: { id: input.faqId },
      data: {
        question: input.question,
        answer: input.answer,
        category: input.category,
        isActive: input.isActive
      }
    });
    return {
      id: updated.id,
      // data-from: PlatformFaq-id
      question: updated.question,
      // data-from: PlatformFaq-question
      answer: updated.answer,
      // data-from: PlatformFaq-answer
      category: updated.category,
      // data-from: PlatformFaq-category
      isActive: updated.isActive,
      // data-from: PlatformFaq-isActive
      createdAt: updated.createdAt,
      // data-from: PlatformFaq-createdAt
      updatedAt: updated.updatedAt
      // data-from: PlatformFaq-updatedAt
    };
  })();
}
async function deletePlatformFaq(faqId) {
  return (0, import_action_utils.withResult)(async () => {
    await import_prisma.default.platformFaq.delete({
      where: { id: faqId }
    });
    return { success: true, id: faqId };
  })();
}
async function updateSupportChannel(input) {
  return (0, import_action_utils.withResult)(async () => {
    const updated = await import_prisma.default.supportChannel.update({
      where: { id: input.channelId },
      data: {
        title: input.title,
        value: input.value,
        description: input.description,
        isActive: input.isActive
      }
    });
    return {
      id: updated.id,
      // data-from: SupportChannel-id
      title: updated.title,
      // data-from: SupportChannel-title
      value: updated.value,
      // data-from: SupportChannel-value
      description: updated.description,
      // data-from: SupportChannel-description
      isActive: updated.isActive,
      // data-from: SupportChannel-isActive
      createdAt: updated.createdAt,
      // data-from: SupportChannel-createdAt
      updatedAt: updated.updatedAt
      // data-from: SupportChannel-updatedAt
    };
  })();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  addPlatformFaq,
  addTireStock,
  deleteOrder,
  deletePlatformFaq,
  getAdminDashboardData,
  toggleStockAvailability,
  updateOrderDetails,
  updateOrderStatus,
  updatePlatformFaq,
  updateSupportChannel,
  updateTireStock
});
