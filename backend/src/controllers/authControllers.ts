import {validationResult} from 'express-validator'
import bcrypt from 'bcryptjs';
import type {Request, Response} from 'express'
import {authCookieConfig} from '../config/cookieConfigs.js'


import {pool} from '../config/database.js'
import { generateToken } from '../utils/generateToken.js';


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
            "SELECT name, email FROM users WHERE name = $1 or email = $2",
            [name, email]
        )

        if(result.rowCount !== null && result.rowCount > 0){
            const existingUser = result.rows[0];


            // the code is to make it error checking in the frontend
            if (existingUser.name === name) {
                return res.status(409).json({
                    status: "error",
                    msg: "Username is already taken.",
                    code: 1
                });
            }

            if (existingUser.email === email) {
                return res.status(409).json({
                    status: "error",
                    msg: "Email is already in use.",
                    code: 2
                });
            }
        }

        // generate a hashed password
        const hashedPassword = await bcrypt.hash(password, 12);

        // create user in database
        const createdUser = await pool.query(
            `INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)
            RETURNING id, name, email
            `,
            [name, email, hashedPassword]
        )

        res.cookie("token", generateToken({id: createdUser.rows[0].id, username: createdUser.rows[0].name}), authCookieConfig);


        return res.status(201).json({
            status: 'success',
            msg: 'User created successfully.',
            user:{
                id: createdUser.rows[0].id,
                name: createdUser.rows[0].name,
            },
            code: 3,
        })
    }catch(err: unknown){
        console.log(err)
        return res.status(500).json({
            status: 'error',
            msg: 'Internal server error',
            code: 4
        })
    }
}

export async function login(req:Request, res: Response){
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            status:'error',
            msg:'Validation error',
            errors:errors.array()
        })
    }

    try{
        const {name, password} = req.body;

        // retrieve user
        const user = await pool.query(
            "SELECT id, name, email, password_hash FROM users WHERE name = $1",
            [name]
        )

        // check if user exists and compare passwords
        if(user.rowCount === 0 || !(await bcrypt.compare(password, user.rows[0].password_hash))){
            return res.status(401).json({
                status:'error',
                msg:'Invalid username or password',
                code:2
            })
        }

        res.cookie("token", generateToken({id: user.rows[0].id, username: user.rows[0].name}), authCookieConfig);

        return res.status(200).json({
            status:'success',
            msg: 'Successfully logged in nyan',
            user:{
                id: user.rows[0].id,
                name: user.rows[0].name,
            },
            code:1
        })

    }catch(err: unknown){
        return res.status(500).json({
            status: 'error',
            msg: 'Internal server error.',
            code: 3,
        });
    }
}

export async function dashboard(req:Request, res:Response){
    try {
        if (!req.user) {
        return res.status(401).json({
            status: "error",
            msg: "Authentication required",
        });
        }

        const result = await pool.query(
        `
        SELECT id, name, email
        FROM users
        WHERE id = $1
        `,
        [req.user.id]
        );

        if (result.rowCount !== 1) {
        return res.status(404).json({
            status: "error",
            msg: "User not found",
        });
        }

        const user = result.rows[0];

        return res.status(200).json({
        status: "success",
        user: {
            id: user.id,
            username: user.name,
            email: user.email,
        },
        code:1
        });
    } catch (error) {

        return res.status(500).json({
        status: "error",
        msg: "Unable to retrieve user",
        code:2
        });
    }
}

export  async function logout(req: Request, res: Response){
    res.clearCookie("token",{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
    })

    return res.status(200).json({
        status: "success",
        msg: "Logged out successfully",
    });
}