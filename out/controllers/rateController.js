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
Object.defineProperty(exports, "__esModule", { value: true });
class RateController {
    constructor() {
        this.updateRate();
        this.getRate = this.getRate.bind(this);
    }
    /**
     * Updates rate once a day since the server started
     */
    updateRate() {
        return __awaiter(this, void 0, void 0, function* () {
            this.fetchRate();
            setInterval(() => __awaiter(this, void 0, void 0, function* () {
                this.fetchRate();
            }), 86400000);
        });
    }
    ;
    /**
     * Gets rate from NBU API. If error occures, it tries again 10 mins later
     */
    fetchRate() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const response = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&json');
                // const data = await response.json();
                // RateController.rate = data[0].rate;
                RateController.rate = 10;
                console.log(RateController.rate);
            }
            catch (error) {
                console.log('Error occured while fetching rate:');
                setTimeout(() => {
                    this.fetchRate();
                }, 600000);
            }
        });
    }
    getRate(req, res) {
        res.json(RateController.rate);
    }
}
RateController.rate = undefined;
exports.default = new RateController();
