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

// src/backend/actions/AdminLogin.ts
var AdminLogin_exports = {};
__export(AdminLogin_exports, {
  loginAdmin: () => loginAdmin
});
module.exports = __toCommonJS(AdminLogin_exports);
var import_prisma = __toESM(require_prisma());
var import_action_utils = __toESM(require_action_utils());
async function loginAdmin(input) {
  return (0, import_action_utils.withResult)(async () => {
    const trimmedAccount = input.usernameOrPhone.trim();
    if (!trimmedAccount || !input.password) {
      throw new import_action_utils.UnauthorizedError("\u064A\u0631\u062C\u0649 \u062A\u0642\u062F\u064A\u0645 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u0643\u0627\u0645\u0644\u0629");
    }
    const user = await import_prisma.default.accountUser.findFirst({
      where: {
        OR: [
          { username: trimmedAccount },
          { phoneNumber: trimmedAccount }
        ]
      }
    });
    if (!user) {
      throw new import_action_utils.UnauthorizedError("\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0623\u0648 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629");
    }
    if (user.role !== "ADMIN") {
      throw new import_action_utils.UnauthorizedError("\u063A\u064A\u0631 \u0645\u0635\u0631\u062D \u0644\u0643 \u0628\u0627\u0644\u0648\u0644\u0648\u062C \u0625\u0644\u0649 \u0627\u0644\u0628\u0648\u0627\u0628\u0629 \u0627\u0644\u0625\u062F\u0627\u0631\u064A\u0629 \u0627\u0644\u0645\u0631\u0643\u0632\u064A\u0629");
    }
    const inputHash = (0, import_action_utils.hashPassword)(input.password);
    if (user.passwordHash !== inputHash) {
      throw new import_action_utils.UnauthorizedError("\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0623\u0648 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629");
    }
    const token = await (0, import_action_utils.signToken)(user.id, user.role);
    return {
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        role: user.role,
        phoneNumber: user.phoneNumber
      }
    };
  })();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  loginAdmin
});
