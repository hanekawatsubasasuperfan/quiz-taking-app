import { validationResult } from 'express-validator';
import {pool} from '../config/database.js'
import type {Request, Response} from 'express'


export async function createQuiz(req: Request, res: Response){
    const errors = validationResult(req);
    
        // returns if error
        if(!errors.isEmpty()){
            return res.status(400).json({
                status:'error',
                msg: "Validation error nyan",
            })
        }
    
    try{
        const {title} = req.body;
        const userID = req.user?.id

        const createQuizQuery = await pool.query(
            "INSERT INTO quizzes (title, user_id) VALUES ($1, $2)",
            [title, userID]
        )

        return res.status(200).json({
            status:"successs",
            msg:"Quiz successfully created nyan",
            code:1
        })
    }catch(err){
        return res.status(500).json({
            status:"error",
            msg:"Internal Server Error",
            code:2
        })
    }
}