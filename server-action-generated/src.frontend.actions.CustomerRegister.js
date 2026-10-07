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

// src/frontend/actions/CustomerRegister.ts
var CustomerRegister_exports = {};
__export(CustomerRegister_exports, {
  checkUsernameAvailability: () => checkUsernameAvailability,
  registerCustomer: () => registerCustomer
});
module.exports = __toCommonJS(CustomerRegister_exports);
var import_prisma = __toESM(require_prisma());
var import_action_utils = __toESM(require_action_utils());
async function registerCustomer(input) {
  return (0, import_action_utils.withResult)(async () => {
    const trimmedUsername = input.username.trim();
    const trimmedFullName = input.fullName.trim();
    const trimmedPhone = input.phoneNumber.trim();
    const trimmedNIN = input.nationalIdNumber.trim();
    if (!trimmedFullName) {
      throw new Error("\u0627\u0644\u0627\u0633\u0645 \u0648\u0627\u0644\u0644\u0642\u0628 \u0627\u0644\u0643\u0627\u0645\u0644 \u0645\u0637\u0644\u0648\u0628");
    }
    if (!trimmedUsername) {
      throw new Error("\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 / \u0627\u0644\u0645\u0639\u0631\u0641 \u0627\u0644\u0648\u062D\u064A\u062F \u0645\u0637\u0644\u0648\u0628");
    }
    if (!input.password || input.password.length < 6) {
      throw new Error("\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u064A\u062C\u0628 \u0623\u0646 \u0644\u0627 \u062A\u0642\u0644 \u0639\u0646 6 \u0623\u062D\u0631\u0641 \u0623\u0648 \u0623\u0631\u0642\u0627\u0645");
    }
    const existingUser = await import_prisma.default.accountUser.findUnique({
      where: { username: trimmedUsername }
    });
    if (existingUser) {
      throw new Error("\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0623\u0648 \u0631\u0642\u0645 \u0627\u0644\u0645\u0639\u0631\u0641 \u0645\u0633\u062C\u0644 \u0645\u0633\u0628\u0642\u0627\u064B \u0641\u064A \u0627\u0644\u0646\u0638\u0627\u0645");
    }
    const passwordHash = (0, import_action_utils.hashPassword)(input.password);
    const newUser = await import_prisma.default.accountUser.create({
      data: {
        fullName: trimmedFullName,
        username: trimmedUsername,
        passwordHash,
        role: "CUSTOMER",
        phoneNumber: trimmedPhone || null,
        nationalIdNumber: trimmedNIN || null
      }
    });
    return {
      id: newUser.id,
      fullName: newUser.fullName,
      username: newUser.username,
      role: newUser.role,
      phoneNumber: newUser.phoneNumber,
      nationalIdNumber: newUser.nationalIdNumber,
      createdAt: newUser.createdAt
    };
  })();
}
async function checkUsernameAvailability(input) {
  return (0, import_action_utils.withResult)(async () => {
    const username = input.username.trim();
    if (!username) {
      return { isAvailable: false, message: "\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u063A\u064A\u0631 \u0645\u062D\u062F\u062F" };
    }
    const existing = await import_prisma.default.accountUser.findUnique({
      where: { username },
      select: { id: true }
    });
    if (existing) {
      return {
        isAvailable: false,
        message: "\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0645\u0633\u062C\u0644 \u0628\u0627\u0644\u0641\u0639\u0644"
      };
    }
    return {
      isAvailable: true,
      message: "\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0645\u062A\u0627\u062D"
    };
  })();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkUsernameAvailability,
  registerCustomer
});
