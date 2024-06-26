"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/use-cases/users/authenticate.ts
var authenticate_exports = {};
__export(authenticate_exports, {
  AuthenticateUserUseCase: () => AuthenticateUserUseCase
});
module.exports = __toCommonJS(authenticate_exports);

// src/utils/errors/invalid-credentials-error.ts
var InvalidCredentialError = class extends Error {
  constructor() {
    super("Invalid credential error");
  }
};

// src/use-cases/users/authenticate.ts
var import_bcryptjs = require("bcryptjs");
var AuthenticateUserUseCase = class {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }
  async execute({
    email,
    password
  }) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new InvalidCredentialError();
    }
    const passwordMatches = await (0, import_bcryptjs.compare)(password, user.password);
    if (!passwordMatches) {
      throw new InvalidCredentialError();
    }
    return { user };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthenticateUserUseCase
});
