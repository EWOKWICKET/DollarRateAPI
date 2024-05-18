"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfValid = exports.emailValidation = void 0;
const express_validator_1 = require("express-validator");
exports.emailValidation = (0, express_validator_1.body)('email').trim().isLength({ max: 64 }).isEmail().withMessage('Invalid email address');
/**
 * Check if request passes the validation
 * @param req request to be checked
 * @returns json of errors if request invalid, else undefined
 */
function checkIfValid(req) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return { errors: errors.array() };
    }
    else {
        return undefined;
    }
}
exports.checkIfValid = checkIfValid;
