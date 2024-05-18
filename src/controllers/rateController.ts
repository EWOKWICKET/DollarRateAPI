import { Request, Response } from "express";

class RateController {
    private static rate: number | undefined = undefined;

    public constructor() {
        this.updateRate();
        this.getRate = this.getRate.bind(this);
    }

    /**
     * Updates rate once a day since the server started
     */
    private async updateRate() {
        this.fetchRate();

        setInterval(async () => {
            this.fetchRate();
        }, 86400000);
    };

    /**
     * Gets rate from NBU API. If error occures, it tries again 10 mins later
     */
    private async fetchRate() {
        try {
            // const response = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&json');
            // const data = await response.json();
            // RateController.rate = data[0].rate;
            RateController.rate = 10;
            console.log(RateController.rate)
        } catch (error) {
            console.log('Error occured while fetching rate:');
            setTimeout(() => {
                this.fetchRate();
            }, 600000)
        }
    }

    public getRate(req: Request, res: Response<number | undefined>) {
        res.json(RateController.rate)
    }
}

export default new RateController();