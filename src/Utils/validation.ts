import { Request } from "express";
import { body, validationResult } from "express-validator";

export const emailValidation = body('email').trim().isLength({max: 64}).isEmail().withMessage('Invalid email address');

/**
 * Check if request passes the validation
 * @param req request to be checked
 * @returns json of errors if request invalid, else undefined
 */
export function checkIfValid(req: Request) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return { errors: errors.array() }
    } else {
        return undefined;
    }
}