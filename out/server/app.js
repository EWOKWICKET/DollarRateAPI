"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const utils_1 = require("../Utils/utils");
exports.app = (0, express_1.default)();
exports.app.get('/rate', (req, res) => {
    res.send('rate');
});
exports.app.get('/subscribe', (req, res) => {
    res.send('subscribe');
});
exports.app.get('/sendEmails', (req, res) => {
    res.send('sendEmails');
});
exports.app.use((req, res) => {
    res.status(utils_1.HTTP_STATUSES.NOT_FOUND_404).send('Not found');
});
