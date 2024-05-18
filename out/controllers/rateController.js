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
const apiRoute_1 = __importDefault(require("../routes/apiRoute"));
class RateController {
    constructor() {
        this.rate = 0;
        this._updateRate();
        this.sendRate = this.sendRate.bind(this);
    }
    /**
     * Updates rate once a day since the server started
     */
    _updateRate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._fetchRate();
            apiRoute_1.default.sendEmails();
            setInterval(() => __awaiter(this, void 0, void 0, function* () {
                yield this._fetchRate();
                apiRoute_1.default.sendEmails();
            }), 86400000);
        });
    }
    ;
    /**
     * Gets rate from NBU API. If error occures, it tries again 10 mins later
     */
    _fetchRate() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&json');
                const data = yield response.json();
                this.rate = data[0].rate;
                // RateController.rate = 10;
                console.log(this.rate);
            }
            catch (error) {
                console.log('Error occured while fetching rate:');
                setTimeout(() => {
                    this._fetchRate();
                }, 600000);
            }
        });
    }
    /**
     * @param req
     * @param res rate
     */
    sendRate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json(yield this.rate);
        });
    }
    /**
     * @returns rate
     */
    getRate() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.rate;
        });
    }
}
exports.default = new RateController();
