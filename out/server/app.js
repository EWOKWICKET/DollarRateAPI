"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const api_1 = require("../routes/api");
exports.app = (0, express_1.default)();
//Middleware to parse the body
exports.app.use(express_1.default.json());
// "/api" route
exports.app.use('/api', api_1.apiRouter);
