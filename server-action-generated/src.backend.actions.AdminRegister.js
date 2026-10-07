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

// src/backend/actions/AdminRegister.ts
var AdminRegister_exports = {};
__export(AdminRegister_exports, {
  registerAdmin: () => registerAdmin
});
module.exports = __toCommonJS(AdminRegister_exports);
var import_prisma = __toESM(require_prisma());
var import_action_utils = __toESM(require_action_utils());
async function registerAdmin(input) {
  return (0, import_action_utils.withResult)(async () => {
    const trimmedUsername = input.username.trim().toLowerCase();
    const trimmedFullName = input.fullName.trim();
    const trimmedPhone = input.phoneNumber.trim();
    if (!trimmedUsername || !trimmedFullName || !input.password) {
      throw new Error("\u062C\u0645\u064A\u0639 \u062D\u0642\u0648\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0625\u062F\u0627\u0631\u064A\u0629 \u0625\u062C\u0628\u0627\u0631\u064A\u0629");
    }
    if (input.password.length < 8) {
      throw new Error("\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u064A\u062C\u0628 \u0623\u0644\u0627 \u062A\u0642\u0644 \u0639\u0646 8 \u062E\u0627\u0646\u0627\u062A");
    }
    const existingUser = await import_prisma.default.accountUser.findUnique({
      where: { username: trimmedUsername },
      select: { id: true }
    });
    if (existingUser) {
      throw new Error("\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0645\u0633\u062C\u0644 \u0645\u0633\u0628\u0642\u0627\u064B \u0641\u064A \u0627\u0644\u0646\u0638\u0627\u0645 \u0627\u0644\u0625\u062F\u0627\u0631\u064A\u060C \u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0633\u0645 \u0645\u0633\u062A\u062E\u062F\u0645 \u0622\u062E\u0631");
    }
    const passwordHash = (0, import_action_utils.hashPassword)(input.password);
    const newUser = await import_prisma.default.accountUser.create({
      data: {
        fullName: trimmedFullName,
        username: trimmedUsername,
        passwordHash,
        role: "ADMIN",
        phoneNumber: trimmedPhone || null
      }
    });
    const token = await (0, import_action_utils.signToken)(newUser.id, "ADMIN");
    return {
      id: newUser.id,
      username: newUser.username,
      fullName: newUser.fullName,
      role: newUser.role,
      phoneNumber: newUser.phoneNumber,
      token
    };
  })();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  registerAdmin
});
