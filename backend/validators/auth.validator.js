import { body } from 'express-validator';

export const registerValidator = [
    body('name')
        .notEmpty().withMessage('Name is required.'),

    body('email')
        .notEmpty().withMessage('e-mail is required.')
        .isEmail().withMessage('Please enter valid email'),
    
    body('password')
        .notEmpty().withMessage('Password is required.')
        .isLength({min: 8}).withMessage('Password must be at least 8 characters'),
];

export const loginValidator = [
    body('email')
        .notEmpty().withMessage('e-mail is required.')
        .isEmail().withMessage('Please enter valid email'),
    
    body('password')
        .notEmpty().withMessage('Password is required.')
        .isLength({min: 8}).withMessage('Password must be at least 8 characters'),

]