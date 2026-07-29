import {validationResult} from 'express-validator';

export const validate = (req, res, next) => {
    console.log('validate middleware');
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }
    next();
}