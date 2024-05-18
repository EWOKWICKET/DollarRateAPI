"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiRoute_1 = __importDefault(require("../routes/apiRoute"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this._useMiddlewares();
        this._useRoutes();
    }
    _useMiddlewares() {
        //Middleware to parse the body
        this.app.use(express_1.default.json());
    }
    _useRoutes() {
        // "/api" route
        this.app.use('/api', apiRoute_1.default.getRouter());
    }
    listen(PORT) {
        this.app.listen(PORT, () => {
            console.log(`Listening to requests on port ${PORT}`);
        });
    }
}
exports.default = App;
