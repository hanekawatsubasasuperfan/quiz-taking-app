import { validationResult } from 'express-validator';
import {pool} from '../config/database.js'
import type {Request, Response} from 'express'

interface Question{
    question:string
    answer:string
}
interface Quiz{
    title: string
    questions: [Question]
}   


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

export async function getAllQuizzes(req: Request, res: Response){
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({
                status:'error',
                msg: "Validation error nyan",
            })
    }

    try{
        const userID = req.user?.id;

        const allQuizzes = await pool.query(
            "SELECT title, user_id, id FROM quizzes WHERE user_id = $1",
            [userID]
        )

        return res.status(200).json({
            status:"success",
            msg: allQuizzes.rows,
            code:1
        })
    }catch(err){
        return res.status(500).json({
            status:"error",
            msg:"Internal server error",
            code:2
        })
    }
}

export async function getAllQuestionsForQuiz(req:Request, res: Response){
    try{
        const userID = req.user?.id;
        const quizID = Number(req.params.quizID);

        const questions = await pool.query(
            "SELECT questions.question, questions.answer FROM questions JOIN quizzes ON questions.quiz_id = quizzes.id WHERE quizzes.id = $1 AND quizzes.user_id = $2",
            [quizID, userID]
        )


        return res.status(200).json({
            status:"success",
            questions: questions.rows,
            code:1
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            status:"error",
            msg:"Internal server error",
            code:2
        })
    }
}

// function for the building the query that will perform bulk insert
function buildBulkInsertQuery(questions:[Question], quizID: number): string{
    let query = "";
    console.log(questions)
    console.log(questions.length)
    for(let i = 0; i < questions.length; i++){
        if(i+1<questions.length){
            query = query.concat(" ", `(${questions[i]?.question}, ${questions[i]?.question}, ${quizID}),`)
        }else{
            query = query.concat(" ", `(${questions[i]?.question}, ${questions[i]?.question}, ${quizID})`)
        }
        
    }
    console.log(query)
    return query
}
export async function createQuestions(req: Request, res: Response){
    try{
        const quizID = Number(req.params.quizId);
        const {questions} = req.body;

        // check if user has permission to the quiz
        const userID = req.user?.id
        const quiz_userID = await pool.query(
            "SELECT user_id FROM quizzes WHERE id=$1",
            [quizID]
        )

        if(!(Number(quiz_userID.rows[0].user_id)===userID)){
            return res.status(500).json({
                status:"error",
                msg: "You dont have permission to edit this quiz."
            })
        }

        let query = "INSERT INTO questions (question, answer, quiz_id) VALUES"
        // console.log(query.concat(buildBulkInsertQuery(questions, quizID)))
        
        const insert = await pool.query(query.concat(buildBulkInsertQuery(questions, quizID)));
        return res.status(200).json({
            status:"success"
        })
        

    }catch(err){
        console.log(err)
        return res.status(500).json({
            status:"error"
        })
    }
}