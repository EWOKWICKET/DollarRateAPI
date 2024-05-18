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
        this.createRoutes();
        this.configEmailSending();
    }

    private async createRoutes() {
        /**
         * Shows dollar rate
         */
        this.apiRouter.get('/rate', rateController.getRate);

        /**
         * Subscribe email and add to a database, if there is no one
         */
        this.apiRouter.post('/subscribe', emailValidation, subscriptionController.subscribe);
    }

    private async configEmailSending() {
        emailController.sendEmails();
    }

    public getRouter() {
        return this.apiRouter;
    }
}

export default new apiRoute();