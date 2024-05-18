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
const express_1 = require("express");
const validation_1 = require("../middleware/validation");
const emailController_1 = require("../controllers/emailController");
const rateController_1 = __importDefault(require("../controllers/rateController"));
const subscriptionController_1 = __importDefault(require("../controllers/subscriptionController"));
class apiRoute {
    constructor() {
        this.apiRouter = (0, express_1.Router)();
        this.createRoutes();
    }
    createRoutes() {
        /**
         * Shows dollar rate
         */
        this.apiRouter.get('/rate', rateController_1.default.getRate);
        /**
         * Subscribe email and add to a database, if there is no one
         */
        this.apiRouter.post('/subscribe', validation_1.emailValidation, subscriptionController_1.default.subscribe);
    }
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
            yield emailController_1.transporter.sendMail({
                from: 'anabelle.funk68@ethereal.email',
                to: 'anabelle.funk68@ethereal.email',
                subject: 'TESTIN MY API',
                text: 'TEST'
            });
            console.log(`email sent to ${email}`);
        });
    }
    ;
}
exports.default = new apiRoute();
