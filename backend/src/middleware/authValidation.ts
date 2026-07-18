import {body} from 'express-validator';


export const validateRegister = [
    body('name').isLength({ min: 4 }).notEmpty().withMessage('Name is required meow!').trim().escape(),
    // body('email').isEmail().notEmpty().withMessage('Oops! Email is required.').trim().escape(),
    body('password').isLength({ min: 4 }).withMessage('Oops! Password must be at least 4 characters long.').trim().escape(),
];

export const validateLogin = [
    body('name').notEmpty().withMessage('Name is required meow!').trim().escape(),
    body('password').notEmpty().withMessage('Password is required nyan!').trim()
]