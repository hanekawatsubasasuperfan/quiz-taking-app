import {Pool} from 'pg';
import dotenv from 'dotenv';
import { logger } from '../utils/logger.js';
dotenv.config({ quiet: true });


export const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

pool.on('error', (error) => {
    logger.error('DATABASE_POOL_ERROR', 'An idle database connection failed', { error });
});
