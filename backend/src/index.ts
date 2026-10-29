import dotenv from "dotenv";

dotenv.config({ quiet: true });


import type {  Request, Response } from "express";
import cors from 'cors';
import {authRouter} from './routes/authRouter.js'

import express from "express";
import cookieParser from "cookie-parser";
import { getUsers } from "./models/userModel.js";
import { quizRouter } from "./routes/quizRoutes.js";
import { logger } from './utils/logger.js';
import { requestLogging, errorLogging } from './middleware/requestLogging.js';



const app = express();
const port = Number(process.env.PORT || 8001);

app.use(requestLogging);
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/quiz', quizRouter);

app.get('/', (req: Request, res: Response) => {
    return res.json({ msg: "this is the home page."});
});
app.get('/test',async (req: Request, res: Response) => {
    const data = await getUsers();
    return res.json({ msg: data});
});

app.use(errorLogging);

// Flush a sanitized fatal event and exit; never keep serving after an uncaught error.
process.on('uncaughtException', (error, origin) => {
    logger.error('PROCESS_UNCAUGHT_EXCEPTION', 'The server encountered a fatal error', { error, origin });
    process.exit(1);
});

const server = app.listen(port, () => {
    logger.info('SERVER_STARTED', 'API server started', { port });
});

server.on('error', (error) => {
    logger.error('SERVER_START_FAILED', 'API server could not start', { error, port });
    process.exit(1);
});
