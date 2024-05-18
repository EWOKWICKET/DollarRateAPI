import { Router } from "express";
import { emailValidation } from "../middleware/validation";
import rateController from "../controllers/rateController";
import subscriptionController from "../controllers/subscriptionController";
import emailController from "../controllers/emailController";


class apiRoute {
    private apiRouter: Router;

    public constructor() {
        this.apiRouter = Router();
        // this.getRouter = this.getRouter.bind(this)
        this._createRoutes();
    }

    private async _createRoutes() {
        /**
         * Shows dollar rate
         */
        this.apiRouter.get('/rate', rateController.sendRate);

        /**
         * Subscribe email and add to a database, if there is no one
         */
        this.apiRouter.post('/subscribe', emailValidation, subscriptionController.subscribe);
    }

    /**
     * Used after rate was fethed to send emails
     */
    public async sendEmails() {
        emailController.sendEmails();
    }

    /**
     * @returns api route router 
     */
    public getRouter() {
        return this.apiRouter;
    }
}

export default new apiRoute();