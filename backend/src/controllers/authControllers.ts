import {validationResult} from 'express-validator'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import type {Request, Response} from 'express'

import {Pool} from 'pg';
import type { QueryResult } from "pg";

import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});



export async function signup(req: Request, res: Response){
    const errors = validationResult(req);

    // returns if error
    if(!errors.isEmpty()){
        return res.status(400).json({
            status:'error',
            msg: "Validation error nyan",
            errors: errors.array()
        })
    }

    try{
        const {name, email, password} = req.body;
        
        // check if user already exists
        const res = await pool.query(
            "SELECT * FROM users WHERE name = $1",
            [name]
        )

    }catch(err){

    }
}