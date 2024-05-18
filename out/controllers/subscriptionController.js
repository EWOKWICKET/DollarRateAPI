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
const database_1 = require("../database/database");
const validation_1 = require("../middleware/validation");
const HTTP_CODES_1 = require("../utils/HTTP_CODES");
class SubscriptionController {
    constructor() {
        this.subscribe = this.subscribe.bind(this);
    }
    subscribe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, validation_1.checkIfValid)(req);
            if (errors) {
                res.status(HTTP_CODES_1.HTTP_STATUSES.BAD_REQUEST_400).json("Invalid email address");
            }
            try {
                yield (0, database_1.addUser)(req.body.email);
                res.status(HTTP_CODES_1.HTTP_STATUSES.CREATED_201).json(req.body.email);
            }
            catch (error) {
                res.status(HTTP_CODES_1.HTTP_STATUSES.BAD_REQUEST_400).json('Email already subscribed');
            }
        });
    }
}
exports.default = new SubscriptionController();
