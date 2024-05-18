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
const path_1 = __importDefault(require("path"));
const googleapis_1 = require("googleapis");
const database_1 = require("../database/database");
const rateController_1 = __importDefault(require("./rateController"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve('./out/database/.env') });
class EmailController {
    constructor() {
        this.users = (0, database_1.getUsers)();
        this._configure();
        const accessToken = this.OAuth2_client.getAccessToken();
        this.transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                type: "OAuth2",
                user: process.env.EMAIL_USER,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken
            }
        });
    }
    /**
     * Configures email to send a rate
     */
    _configure() {
        const OAuth2 = googleapis_1.google.auth.OAuth2;
        this.OAuth2_client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET);
        this.OAuth2_client.setCredentials({
            refresh_token: process.env.REFRESH_TOKEN
        });
    }
    ;
    /**
     * Controls intervals to send emails
     */
    sendEmails() {
        return __awaiter(this, void 0, void 0, function* () {
            this._sendToEach();
            setInterval(() => __awaiter(this, void 0, void 0, function* () {
                yield (0, database_1.getUsers)();
                this._sendToEach();
            }), 86400000);
        });
    }
    ;
    /**
     * Sends emails to each user
     */
    _sendToEach() {
        return __awaiter(this, void 0, void 0, function* () {
            if ((yield this.users).length > 0) {
                (yield this.users).forEach((user) => {
                    this._sendEmail(user.email);
                });
            }
        });
    }
    /**
     * Sends an email to one user
     * @param email subscriber
     */
    _sendEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            this.transporter.sendMail(yield this._getMailOptions(email), (err, result) => {
                if (err) {
                    console.error('Error while sending messages');
                }
                else {
                    console.log(result);
                }
            });
        });
    }
    ;
    /**
     * @param email subscriber
     * @returns returns mail send options
     */
    _getMailOptions(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                from: `IVAN <${process.env.EMAIL_USER}>`,
                to: email,
                subject: 'Dollar rate',
                text: `Dollar rate is ${yield rateController_1.default.getRate()} UAH`
            };
        });
    }
}
exports.default = new EmailController();
