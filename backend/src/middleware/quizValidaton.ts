import {body} from 'express-validator';


export const validateQuiz = [
    body('title').notEmpty().withMessage('Title is required meow!').bail().isLength({ min: 4, max:255 }).withMessage("Title must be at least 4 and 255 characters.").trim(),
];
