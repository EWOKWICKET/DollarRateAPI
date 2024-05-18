import { Request, Response } from "express";
import apiRoute from "../routes/apiRoute";

class RateController {
    private rate: number = 0;

    public constructor() {
        this._updateRate();
        this.sendRate = this.sendRate.bind(this);
    }

    /**
     * Updates rate once a day since the server started
     */
    private async _updateRate() {
        await this._fetchRate();
        apiRoute.sendEmails();

        setInterval(async () => {
            await this._fetchRate();
            apiRoute.sendEmails();
        }, 86400000);
    };

    /**
     * Gets rate from NBU API. If error occures, it tries again 10 mins later
     */
    private async _fetchRate() {
        try {
            // const response = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&json');
            // const data = await response.json();
            // this.rate = data[0].rate;
            this.rate = 10;
            console.log(this.rate)
        } catch (error) {
            console.log('Error occured while fetching rate:');
            setTimeout(() => {
                this._fetchRate();
            }, 600000)
        }
    }

    /**
     * @param req 
     * @param res rate 
     */
    public async sendRate(req: Request, res: Response<number | undefined>) {
        res.json(await this.rate);
    }

    /**
     * @returns rate
     */
    public async getRate() : Promise<number> {
        return this.rate;
    }
}

export default new RateController();