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
exports.apiRouter = void 0;
const express_1 = require("express");
const utils_1 = require("../utils/utils");
const validation_1 = require("../utils/validation");
const database_1 = require("../database/database");
let rate = undefined;
exports.apiRouter = (0, express_1.Router)();
/**
 * Shows dollar rate
 */
exports.apiRouter.get('/rate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(rate);
}));
/**
 * Subscribe email and add to a database, if there is no one
 */
exports.apiRouter.post('/subscribe', validation_1.emailValidation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, validation_1.checkIfValid)(req);
    if (errors) {
        res.status(utils_1.HTTP_STATUSES.BAD_REQUEST_400).json(errors);
    }
    try {
        yield (0, database_1.addUser)(req.body.email);
        res.status(utils_1.HTTP_STATUSES.CREATED_201).json(req.body.email);
    }
    catch (error) {
        res.status(utils_1.HTTP_STATUSES.BAD_REQUEST_400).json('Email already exists');
    }
}));
/**
 * Updates rate once a day since the server started
 */
void function updateRate() {
    return __awaiter(this, void 0, void 0, function* () {
        rate = yield getRate();
        setInterval(() => __awaiter(this, void 0, void 0, function* () {
            rate = yield getRate();
        }), 86400000);
    });
}();
/**
 * Gets rate from NBU API. If error occures, it tries again 10 mins later
 */
function getRate() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const response = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&json');
            // const data = await response.json();
            // return data[0].rate;
            return 10;
        }
        catch (error) {
            console.log('Error occured while fetching rate:');
            setTimeout(() => {
                return getRate();
            }, 600000);
        }
    });
}
;
function sendEmails() {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
