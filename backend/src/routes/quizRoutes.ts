import {createQuiz, getAllQuizzes, getAllQuestionsForQuiz, createQuestions, modifyQuestion, deleteQuestion}  from '../controllers/quizController.js'
import {authenticate} from '../middleware/authenticate.js'
import { validateQuiz } from '../middleware/quizValidaton.js'
import { Router } from 'express'

export const quizRouter = Router();

quizRouter.post('/create', authenticate, validateQuiz, createQuiz);
quizRouter.get('/', authenticate, getAllQuizzes);
quizRouter.get('/:quizID/questions', authenticate, getAllQuestionsForQuiz)
quizRouter.post('/create/:quizId/questions', authenticate, createQuestions)
quizRouter.patch('/modify/:quizId', authenticate, modifyQuestion)
quizRouter.delete('/delete/:quizId', authenticate, deleteQuestion)

