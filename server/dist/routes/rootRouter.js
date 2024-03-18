"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const usersRouter_1 = __importDefault(require("./usersRouter"));
let rootRouter = (0, express_1.Router)();
rootRouter.get("/", (req, res) => {
    res.send("Umrah and Hajj guide API is online and running");
});
rootRouter.use("/auth", auth_1.default);
rootRouter.use("/users", usersRouter_1.default);
exports.default = rootRouter;
//# sourceMappingURL=rootRouter.js.map