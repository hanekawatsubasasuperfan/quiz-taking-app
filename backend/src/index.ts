import type {  Request, Response } from "express";
import {getUsers} from './models/userModel.js'
import {authRouter} from './routes/authRouter.js'

import express from "express";
import dotenv from "dotenv";


dotenv.config();

const app = express();


// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/auth', authRouter);

app.get('/', (req: Request, res: Response) => {
    return res.json({ msg: "this is the home page."});
});

app.listen(process.env.PORT, async () => {
    console.log(`Server Started at port: ${process.env.PORT}`);
    // const res = await getUsers();
    // console.log(res);
});