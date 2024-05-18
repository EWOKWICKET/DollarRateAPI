"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
class EmailController {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            host: '',
            port: 587,
            auth: {
                user: 'anabelle.funk68@ethereal.email',
                pass: 'nQzsvD1Pa44brF5UzN'
            }
        });
        this.configure();
    }
    configure() {
        console.log('configuring');
    }
    ;
    sendEmails() {
        return __awaiter(this, void 0, void 0, function* () {
            // const users : Promise<User[]> = getUsers();
            // (await users).forEach((user) => {
            //     sendEmail(user.email);
            // });
            this.sendEmail('TEST SUBJECT');
        });
    }
    ;
    sendEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            // await this.transporter.sendMail({
            //     from: 'anabelle.funk68@ethereal.email',
            //     to: 'anabelle.funk68@ethereal.email',
            //     subject: 'TESTIN MY API',
            //     text: 'TEST'
            // });
            console.log(`email sent to ${email}`);
        });
    }
    ;
}
exports.default = new EmailController();
