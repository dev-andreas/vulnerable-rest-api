import { validationResult, param, query } from "express-validator";

export const validateDonor = [
    param('donorID').isNumeric().withMessage('Only numbers allowed.')
];

export const validateDonation = [
    param('donationID').isNumeric().withMessage('Only numbers allowed.')
];

export const validateName = [
    query('first_name').default(''),
    query('last_name').default('')
];

export function handleValidationError(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}