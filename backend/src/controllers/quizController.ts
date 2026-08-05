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
            quizzes: allQuizzes.rows,
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

//alternative option
// function for the building the query that will perform bulk insert
// function buildBulkInsertQuery(
//         questions: Question[],
//         quizID: number
//     ): { query: string; values: (string | number)[] } {

//     let query =
//         "INSERT INTO questions (question, answer, quiz_id) VALUES ";

//     const placeholders: string[] = [];
//     const values: (string | number)[] = [];

//     for (let i = 0; i < questions.length; i++) {
//         const offset = i * 3;

//         placeholders.push(
//             `($${offset + 1}, $${offset + 2}, $${offset + 3})`
//         );

//         values.push(
//             questions[i]!.question,
//             questions[i]!.answer,
//             quizID
//         );
//     }

//     query += placeholders.join(", ");

//     return { query, values };
// }
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

        const questionTexts = questions.map((q: Question) => q.question);
        const answers = questions.map((q: Question) => q.answer);

        await pool.query(
            `INSERT INTO questions (question, answer, quiz_id)
            SELECT question, answer, $3
            FROM UNNEST($1::text[], $2::text[])
            AS t(question, answer)`,
            [
                questionTexts,
                answers,
                quizID
            ]
        );
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