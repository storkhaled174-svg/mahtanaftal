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

// src/frontend/actions/CustomerLogin.ts
var CustomerLogin_exports = {};
__export(CustomerLogin_exports, {
  loginCustomer: () => loginCustomer
});
module.exports = __toCommonJS(CustomerLogin_exports);
var import_prisma = __toESM(require_prisma());
var import_action_utils = __toESM(require_action_utils());
async function loginCustomer(input) {
  return (0, import_action_utils.withResult)(async () => {
    const trimmedIdentifier = input.username?.trim();
    if (!trimmedIdentifier || !input.password) {
      throw new import_action_utils.UnauthorizedError("\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0627\u0639\u062A\u0645\u0627\u062F \u063A\u064A\u0631 \u0645\u0643\u062A\u0645\u0644\u0629");
    }
    const user = await import_prisma.default.accountUser.findFirst({
      where: {
        OR: [
          { username: trimmedIdentifier },
          { phoneNumber: trimmedIdentifier }
        ]
      },
      select: {
        id: true,
        fullName: true,
        username: true,
        passwordHash: true,
        role: true,
        phoneNumber: true
      }
    });
    if (!user) {
      throw new import_action_utils.UnauthorizedError("\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0623\u0648 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629");
    }
    if (user.role !== "CUSTOMER") {
      throw new import_action_utils.UnauthorizedError("\u0647\u0630\u0627 \u0627\u0644\u0641\u0636\u0627\u0621 \u0645\u062E\u0635\u0635 \u062D\u0635\u0631\u064A\u0627\u064B \u0644\u0644\u0632\u0628\u0627\u0626\u0646 \u0648\u0627\u0644\u0645\u0648\u0627\u0637\u0646\u064A\u0646");
    }
    const hashedPassword = (0, import_action_utils.hashPassword)(input.password);
    if (user.passwordHash !== hashedPassword) {
      throw new import_action_utils.UnauthorizedError("\u0627\u0633\u0645 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645 \u0623\u0648 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u063A\u064A\u0631 \u0635\u062D\u064A\u062D\u0629");
    }
    const token = await (0, import_action_utils.signToken)(user.id, user.role);
    return {
      token,
      userId: user.id,
      // data-from: AccountUser-id
      username: user.username,
      // data-from: AccountUser-username
      fullName: user.fullName,
      // data-from: AccountUser-fullName
      role: user.role
      // data-from: AccountUser-role
    };
  })();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  loginCustomer
});
