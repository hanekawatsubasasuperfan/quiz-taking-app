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
        const result = await pool.query(
            "SELECT * FROM users WHERE name = $1",
            [name]
        )

        if(result.rowCount==1){
            return res.status(409).json({
                status:'error',
                msg: " User already exists",
            })
        }

        // generate a hashed password
        const hashedPassword = await bcrypt.hash(password, 12);

        // create user in database
        const createdUser = await pool.query(
            "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)",
            [name, email, hashedPassword]
        )

        // get user ID to use for JWT token
        const user = await pool.query(
            "SELECT * FROM users WHERE name = $1",
            [name]
        )

        // generate a JWT token
        const token = jwt.sign(
            {
                id: user.rows[0].id,
                username: user.rows[0].name
            },
            process.env.JWT_SECRET_KEY!,
            {
                expiresIn: "1h"
            }
        )

        return res.status(201).json({
            status: 'success',
            msg: 'User created successfully.',
            user:{
                id: user.rows[0].id,
                username: user.rows[0].name,
                token
            }
            
        })
    }catch(err: any){
        console.error(err)
        return res.status(500).json({
            status: 'error',
            msg: 'Internal server error',
            errors:err.message
        })
    }
}