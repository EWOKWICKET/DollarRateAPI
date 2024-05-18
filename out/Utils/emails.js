"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
const oAuth2Client = new googleapis_1.google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
exports.transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    host: '',
    port: 587,
    auth: {
        user: 'anabelle.funk68@ethereal.email',
        pass: 'nQzsvD1Pa44brF5UzN'
    }
});
