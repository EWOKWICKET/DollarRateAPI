import nodemailer, { Transporter } from "nodemailer";
import path from "path";
import { google } from 'googleapis';
import { getUsers } from "../database/database";
import { User } from "../database/utils/user";
import rateController from "./rateController";

import dotenv from 'dotenv';
dotenv.config({ path: path.resolve('./out/database/.env') });

class EmailController {
    private transporter: Transporter;
    private OAuth2_client: any;
    private users: Promise<User[]>

    public constructor() {
        this.users = getUsers();

        this._configure();

        const accessToken = this.OAuth2_client.getAccessToken();

        this.transporter = nodemailer.createTransport({
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
    private _configure() {
        const OAuth2 = google.auth.OAuth2;
        this.OAuth2_client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET)
        this.OAuth2_client.setCredentials({
            refresh_token: process.env.REFRESH_TOKEN
        });
    };

    /**
     * Controls intervals to send emails
     */
    public async sendEmails() {
        this._sendToEach();

        setInterval(async () => {
            await getUsers();
            this._sendToEach();
        }, 86400000);
    };

    /**
     * Sends emails to each user
     */
    private async _sendToEach() {
        if ((await this.users).length > 0) {
            (await this.users).forEach((user) => {
                this._sendEmail(user.email);
            });
        }
    }

    /**
     * Sends an email to one user
     * @param email subscriber
     */
    private async _sendEmail(email: string) {
        this.transporter.sendMail(await this._getMailOptions(email), (err, result) => {
            if (err) {
                console.error('Error while sending messages')
            } else {
                console.log(result)
            }
        });
    };

    /**
     * @param email subscriber
     * @returns returns mail send options
     */
    private async _getMailOptions(email: string) {

        return {
            from: `IVAN <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Dollar rate',
            text: `Dollar rate is ${await rateController.getRate()} UAH`
        };
    }
}

export default new EmailController();
