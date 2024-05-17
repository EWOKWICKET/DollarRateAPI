import { Router, Request, Response } from "express";
import { RequestWithBody, HTTP_STATUSES } from "../utils/utils";
import { emailValidation, checkIfValid } from "../utils/validation";
import { addUser } from '../database/database';


let rate: number | undefined = undefined;
export const apiRouter = Router();

/**
 * Shows dollar rate
 */
apiRouter.get('/rate', async (req: Request, res: Response<number | undefined>) => {
    res.json(rate)
});

/**
 * Subscribe email and add to a database, if there is no one
 */
apiRouter.post('/subscribe', emailValidation, async (req: RequestWithBody<{ email: string }>, res: Response) => {
    const errors = checkIfValid(req);
    if (errors) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).json(errors);
    }

    try {
        await addUser(req.body.email);
        res.status(HTTP_STATUSES.CREATED_201).json(req.body.email)
    } catch (error : any) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).json('Email already exists');
    }
});


/**
 * Updates rate once a day since the server started
 */
void async function updateRate() {
    rate = await getRate();

    setInterval(async () => {
        rate = await getRate();
    }, 86400000);
}();

/**
 * Gets rate from NBU API. If error occures, it tries again 10 mins later
 */
async function getRate() {
    try {
        // const response = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&json');
        // const data = await response.json();
        // return data[0].rate;
        return 10;
    } catch (error) {
        console.log('Error occured while fetching rate:');
        setTimeout(() => {
            return getRate();
        }, 600000)
    }
};

async function sendEmails() {
}