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
exports.addUser = exports.getUsers = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve('./out/database/.env') });
/**
 * Connects to db .env vars are in 'out/database/.env'
 */
const pool = mysql2_1.default.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();
/**
 * Gets all fields of a table
 * @returns Array of user's fields
 */
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield pool.query("SELECT * FROM emails");
        const users = result[0];
        return users;
    });
}
exports.getUsers = getUsers;
/**
 * Adds a user to a database
 * @param email to subscribe
 */
function addUser(email) {
    return __awaiter(this, void 0, void 0, function* () {
        yield pool.query(`INSERT INTO emails (email) VALUES (?)`, [email]);
    });
}
exports.addUser = addUser;
