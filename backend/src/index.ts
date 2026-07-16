import type {  Request, Response } from "express";
import {getUsers} from './models/userModel.js'

import express from "express";
import dotenv from "dotenv";
import {body} from 'express-validator';

dotenv.config();

const app = express();

const validateRegister = [
    body('name').isLength({ min: 4 }).notEmpty().withMessage('Oops! Name is required.').trim().escape(),
    body('email').isEmail().notEmpty().withMessage('Oops! Email is required.').trim().escape(),
    body('password').isLength({ min: 8 }).withMessage('Oops! Password must be at least 8 characters long.').trim().escape(),
];

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.use('/signup',)

app.use('/', (req: Request, res: Response) => {
    return res.json({ msg: "this is the home page."});
});

app.listen(process.env.PORT, async () => {
    console.log(`Server Started at port: ${process.env.PORT}`);
    const res = await getUsers();
    console.log(res);
});