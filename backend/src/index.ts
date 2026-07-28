import dotenv from "dotenv";

dotenv.config();


import type {  Request, Response } from "express";
import {authRouter} from './routes/authRouter.js'

import express from "express";
import cookieParser from "cookie-parser";
import { getUsers } from "./models/userModel.js";



const app = express();


// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);

app.get('/', (req: Request, res: Response) => {
    return res.json({ msg: "this is the home page."});
});
app.get('/test',async (req: Request, res: Response) => {
    const data = await getUsers();
    return res.json({ msg: data});
});

app.listen(process.env.PORT, async () => {
    console.log(`Server Started at port: ${process.env.PORT}`);
    
});