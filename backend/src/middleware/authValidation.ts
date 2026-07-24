import {body} from 'express-validator';


export const validateRegister = [
    body('name').notEmpty().withMessage('Name is required meow!').bail().isLength({ min: 4 }).withMessage("Name must be at least 4 characters long.").trim().escape(),
    body('email').notEmpty().withMessage('Oops! Email is required.').bail().isEmail().withMessage("Please provide a valid email.").normalizeEmail(),
    body('password').notEmpty().withMessage('Password is required.').bail().isLength({ min: 4 }).withMessage("Password must be at least 4 characters long"),
];

export const validateLogin = [
    body('name').notEmpty().withMessage('Name is required meow!').trim(),
    body('password').notEmpty().withMessage('Password is required nyan!')
]