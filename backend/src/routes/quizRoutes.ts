import {createQuiz, getAllQuizzes, getAllQuestionsForQuiz}  from '../controllers/quizController.js'
import {authenticate} from '../middleware/authenticate.js'
import { validateQuiz } from '../middleware/quizValidaton.js'
import { Router } from 'express'

export const quizRouter = Router();

quizRouter.post('/create', authenticate, validateQuiz, createQuiz);
quizRouter.get('/getAllQuizzes', authenticate, getAllQuizzes);
quizRouter.get('/getAllQuestionsForQuiz/:quizID', authenticate, getAllQuestionsForQuiz)