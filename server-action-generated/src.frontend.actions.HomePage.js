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

// src/frontend/actions/HomePage.ts
var HomePage_exports = {};
__export(HomePage_exports, {
  createTireOrder: () => createTireOrder,
  getHomePageData: () => getHomePageData
});
module.exports = __toCommonJS(HomePage_exports);
var import_prisma = __toESM(require_prisma());
var import_action_utils = __toESM(require_action_utils());
async function getHomePageData() {
  return (0, import_action_utils.withResult)(async () => {
    const tireRecords = await import_prisma.default.tireStock.findMany({
      orderBy: [{ brand: "asc" }, { size: "asc" }]
    });
    const tires = tireRecords.map((t) => ({
      id: t.id,
      // data-from: TireStock-id
      brand: t.brand,
      // data-from: TireStock-brand
      size: t.size,
      // data-from: TireStock-size
      category: t.category,
      // data-from: TireStock-category
      priceDzd: t.priceDzd.toNumber(),
      // data-from: TireStock-priceDzd
      availableStock: t.availableStock,
      // data-from: TireStock-availableStock
      reservedStock: t.reservedStock,
      // data-from: TireStock-reservedStock
      minThreshold: t.minThreshold,
      // data-from: TireStock-minThreshold
      speedIndex: t.speedIndex,
      // data-from: TireStock-speedIndex
      isAvailable: t.isAvailable && t.availableStock > 0
      // data-from: TireStock-isAvailable
    }));
    const wilayaRecords = await import_prisma.default.algerianWilaya.findMany({
      orderBy: { code: "asc" }
    });
    const wilayas = wilayaRecords.map((w) => ({
      id: w.id,
      // data-from: AlgerianWilaya-id
      code: w.code,
      // data-from: AlgerianWilaya-code
      nameAr: w.nameAr,
      // data-from: AlgerianWilaya-nameAr
      communes: w.communes || []
      // data-from: AlgerianWilaya-communes
    }));
    const faqRecords = await import_prisma.default.platformFaq.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "asc" }
    });
    const faqs = faqRecords.map((f) => ({
      id: f.id,
      // data-from: PlatformFaq-id
      question: f.question,
      // data-from: PlatformFaq-question
      answer: f.answer,
      // data-from: PlatformFaq-answer
      category: f.category,
      // data-from: PlatformFaq-category
      isActive: f.isActive
      // data-from: PlatformFaq-isActive
    }));
    const channelRecords = await import_prisma.default.supportChannel.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "asc" }
    });
    const supportChannels = channelRecords.map((c) => ({
      id: c.id,
      // data-from: SupportChannel-id
      title: c.title,
      // data-from: SupportChannel-title
      value: c.value,
      // data-from: SupportChannel-value
      description: c.description,
      // data-from: SupportChannel-description
      isActive: c.isActive
      // data-from: SupportChannel-isActive
    }));
    let customerProfile = null;
    const auth = (0, import_action_utils.tryGetAuthContext)();
    if (auth && auth.userId) {
      const user = await import_prisma.default.accountUser.findUnique({
        where: { id: auth.userId },
        select: {
          id: true,
          fullName: true,
          phoneNumber: true,
          nationalIdNumber: true
        }
      });
      if (user) {
        customerProfile = {
          id: user.id,
          // data-from: AccountUser-id
          fullName: user.fullName,
          // data-from: AccountUser-fullName
          phoneNumber: user.phoneNumber,
          // data-from: AccountUser-phoneNumber
          nationalIdNumber: user.nationalIdNumber
          // data-from: AccountUser-nationalIdNumber
        };
      }
    }
    return {
      tires,
      wilayas,
      faqs,
      supportChannels,
      customerProfile
    };
  })();
}
async function createTireOrder(input) {
  return (0, import_action_utils.withResult)(async () => {
    const qty = Math.max(1, Math.min(4, Math.floor(input.quantity)));
    const edahabiaClean = input.dahabiaCardNumber.replace(/\D/g, "");
    if (edahabiaClean.length !== 18) {
      throw new Error("\u0631\u0642\u0645 \u0627\u0644\u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u0630\u0647\u0628\u064A\u0629 \u064A\u062C\u0628 \u0623\u0646 \u064A\u062A\u0643\u0648\u0646 \u0645\u0646 18 \u0631\u0642\u0645\u0627\u064B \u062A\u0645\u0627\u0645\u0627\u064B");
    }
    const tireStock = await import_prisma.default.tireStock.findFirst({
      where: {
        brand: input.brand,
        size: input.tireSize
      }
    });
    if (!tireStock) {
      throw new Error("\u0645\u0642\u0627\u0633 \u0627\u0644\u0639\u062C\u0644\u0629 \u0627\u0644\u0645\u062E\u062A\u0627\u0631 \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631 \u0641\u064A \u0627\u0644\u0643\u062A\u0627\u0644\u0648\u062C \u0627\u0644\u0645\u0639\u062A\u0645\u062F");
    }
    const unitPrice = tireStock.priceDzd.toNumber();
    const totalPrice = unitPrice * qty;
    const wilayaRecord = await import_prisma.default.algerianWilaya.findUnique({
      where: { code: input.wilayaCode }
    });
    const wilayaDisplayName = wilayaRecord ? `${wilayaRecord.code} - ${wilayaRecord.nameAr}` : input.wilayaCode;
    const randomSuffix = Math.floor(1e3 + Math.random() * 9e3);
    const orderNumber = `NM-2026-${randomSuffix}`;
    const auth = (0, import_action_utils.tryGetAuthContext)();
    const customerId = auth?.userId || null;
    const order = await import_prisma.default.tireOrder.create({
      data: {
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
        status: "NEW",
        customerId
      }
    });
    const nidRaw = order.nationalIdNumber;
    const nidMasked = nidRaw.length > 6 ? `${nidRaw.slice(0, 3)}\u2022\u2022\u2022\u2022\u2022\u2022${nidRaw.slice(-3)}` : "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022";
    const edahabiaMasked = edahabiaClean.length === 18 ? `${edahabiaClean.slice(0, 4)} \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 ${edahabiaClean.slice(-2)}` : "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022";
    const dateFormatted = order.createdAt.toISOString().split("T")[0];
    const brandMapped = order.brand === "CONTINENTAL" ? "continental" : "iris";
    return {
      orderNumber: order.orderNumber,
      // data-from: TireOrder-orderNumber
      registrationDate: dateFormatted,
      fullName: order.customerName,
      // data-from: TireOrder-customerName
      primaryPhone: order.phoneNumber,
      // data-from: TireOrder-phoneNumber
      secondaryPhone: order.secondaryPhone,
      // data-from: TireOrder-secondaryPhone
      wilayaCode: input.wilayaCode,
      wilayaName: order.wilaya,
      // data-from: TireOrder-wilaya
      commune: order.commune,
      // data-from: TireOrder-commune
      brand: brandMapped,
      dimension: order.tireSize,
      // data-from: TireOrder-tireSize
      quantity: order.quantity,
      // data-from: TireOrder-quantity
      unitPriceDzd: order.unitPriceDzd.toNumber(),
      // data-from: TireOrder-unitPriceDzd
      totalPriceDzd: order.totalPriceDzd.toNumber(),
      // data-from: TireOrder-totalPriceDzd
      nidMasked,
      edahabiaMasked,
      status: order.status
      // data-from: TireOrder-status
    };
  })();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createTireOrder,
  getHomePageData
});
