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

// common-redirect:@/@base/BaseActionFun
var require_BaseActionFun = __commonJS({
  "common-redirect:@/@base/BaseActionFun"(exports2, module2) {
    module2.exports = require("./_common").BaseActionFun;
  }
});

// common-redirect:@/backend/action_utils
var require_action_utils = __commonJS({
  "common-redirect:@/backend/action_utils"(exports2, module2) {
    module2.exports = require("./_common").backendAuth;
  }
});

// src/backend/actions/AdminContentSupport.ts
var AdminContentSupport_exports = {};
__export(AdminContentSupport_exports, {
  createPlatformFaq: () => createPlatformFaq,
  createSupportChannel: () => createSupportChannel,
  getContentSupportWorkbenchData: () => getContentSupportWorkbenchData,
  togglePlatformFaqStatus: () => togglePlatformFaqStatus,
  toggleSupportChannelStatus: () => toggleSupportChannelStatus,
  updatePlatformFaq: () => updatePlatformFaq,
  updateSupportChannel: () => updateSupportChannel
});
module.exports = __toCommonJS(AdminContentSupport_exports);
var import_prisma = __toESM(require_prisma());
var import_BaseActionFun = __toESM(require_BaseActionFun());
var import_action_utils = __toESM(require_action_utils());
async function getContentSupportWorkbenchData() {
  return (0, import_BaseActionFun.withResult)(
    (0, import_action_utils.requireRole)(import_action_utils.UserRole.Admin)(async () => {
      const faqsRaw = await import_prisma.default.platformFaq.findMany({
        orderBy: { createdAt: "desc" }
      });
      const channelsRaw = await import_prisma.default.supportChannel.findMany({
        orderBy: { createdAt: "desc" }
      });
      const faqs = faqsRaw.map((item) => ({
        id: item.id,
        // data-from: PlatformFaq-id
        question: item.question,
        // data-from: PlatformFaq-question
        answer: item.answer,
        // data-from: PlatformFaq-answer
        category: item.category,
        // data-from: PlatformFaq-category
        isActive: item.isActive,
        // data-from: PlatformFaq-isActive
        createdAt: item.createdAt,
        // data-from: PlatformFaq-createdAt
        updatedAt: item.updatedAt
        // data-from: PlatformFaq-updatedAt
      }));
      const channels = channelsRaw.map((item) => ({
        id: item.id,
        // data-from: SupportChannel-id
        title: item.title,
        // data-from: SupportChannel-title
        value: item.value,
        // data-from: SupportChannel-value
        description: item.description,
        // data-from: SupportChannel-description
        isActive: item.isActive,
        // data-from: SupportChannel-isActive
        createdAt: item.createdAt,
        // data-from: SupportChannel-createdAt
        updatedAt: item.updatedAt
        // data-from: SupportChannel-updatedAt
      }));
      const stats = {
        totalFaqs: faqs.length,
        activeFaqs: faqs.filter((f) => f.isActive).length,
        ordersFaqsCount: faqs.filter((f) => f.category === "ORDERS").length,
        paymentFaqsCount: faqs.filter((f) => f.category === "PAYMENT").length,
        deliveryFaqsCount: faqs.filter((f) => f.category === "DELIVERY").length,
        warrantyFaqsCount: faqs.filter((f) => f.category === "WARRANTY").length,
        totalChannels: channels.length,
        activeChannels: channels.filter((c) => c.isActive).length
      };
      return {
        faqs,
        channels,
        stats
      };
    })
  )();
}
async function createPlatformFaq(input) {
  return (0, import_BaseActionFun.withResult)(
    (0, import_action_utils.requireRole)(import_action_utils.UserRole.Admin)(async () => {
      const created = await import_prisma.default.platformFaq.create({
        data: {
          question: input.question.trim(),
          answer: input.answer.trim(),
          category: input.category,
          isActive: input.isActive ?? true
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
    })
  )();
}
async function updatePlatformFaq(input) {
  return (0, import_BaseActionFun.withResult)(
    (0, import_action_utils.requireRole)(import_action_utils.UserRole.Admin)(async () => {
      const updated = await import_prisma.default.platformFaq.update({
        where: { id: input.id },
        data: {
          question: input.question.trim(),
          answer: input.answer.trim(),
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
    })
  )();
}
async function togglePlatformFaqStatus(input) {
  return (0, import_BaseActionFun.withResult)(
    (0, import_action_utils.requireRole)(import_action_utils.UserRole.Admin)(async () => {
      const updated = await import_prisma.default.platformFaq.update({
        where: { id: input.id },
        data: {
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
    })
  )();
}
async function createSupportChannel(input) {
  return (0, import_BaseActionFun.withResult)(
    (0, import_action_utils.requireRole)(import_action_utils.UserRole.Admin)(async () => {
      const created = await import_prisma.default.supportChannel.create({
        data: {
          title: input.title.trim(),
          value: input.value.trim(),
          description: input.description ? input.description.trim() : null,
          isActive: input.isActive ?? true
        }
      });
      return {
        id: created.id,
        // data-from: SupportChannel-id
        title: created.title,
        // data-from: SupportChannel-title
        value: created.value,
        // data-from: SupportChannel-value
        description: created.description,
        // data-from: SupportChannel-description
        isActive: created.isActive,
        // data-from: SupportChannel-isActive
        createdAt: created.createdAt,
        // data-from: SupportChannel-createdAt
        updatedAt: created.updatedAt
        // data-from: SupportChannel-updatedAt
      };
    })
  )();
}
async function updateSupportChannel(input) {
  return (0, import_BaseActionFun.withResult)(
    (0, import_action_utils.requireRole)(import_action_utils.UserRole.Admin)(async () => {
      const updated = await import_prisma.default.supportChannel.update({
        where: { id: input.id },
        data: {
          title: input.title.trim(),
          value: input.value.trim(),
          description: input.description ? input.description.trim() : null,
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
    })
  )();
}
async function toggleSupportChannelStatus(input) {
  return (0, import_BaseActionFun.withResult)(
    (0, import_action_utils.requireRole)(import_action_utils.UserRole.Admin)(async () => {
      const updated = await import_prisma.default.supportChannel.update({
        where: { id: input.id },
        data: {
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
    })
  )();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createPlatformFaq,
  createSupportChannel,
  getContentSupportWorkbenchData,
  togglePlatformFaqStatus,
  toggleSupportChannelStatus,
  updatePlatformFaq,
  updateSupportChannel
});
