import { addUser } from "../database/database";
import { checkIfValid } from "../middleware/validation";
import { HTTP_STATUSES } from "../utils/HTTP_CODES";
import { RequestWithBody } from "../utils/REQUEST_TYPES";
import { Response } from "express";

class SubscriptionController {

    public constructor() {
        this.subscribe = this.subscribe.bind(this);
    }

    /**
     * @param req with email in body 
     * @param res result of subscription
     */
    public async subscribe(req: RequestWithBody<{ email: string }>, res: Response) {
        const errors = checkIfValid(req);
        if (errors) {
            res.status(HTTP_STATUSES.BAD_REQUEST_400).json("Invalid email address");
        }

        try {
            await addUser(req.body.email);
            res.status(HTTP_STATUSES.CREATED_201).json(req.body.email)
        } catch (error) {
            res.status(HTTP_STATUSES.BAD_REQUEST_400).json('Email already subscribed');
        }
    }
}

export default new SubscriptionController();