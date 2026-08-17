import { createFileRoute, redirect } from '@tanstack/react-router'
import QuizModification from '../../../Components/QuizModification'
import authenticate from '../../../api/auth/authenticate';
import getAllQuestionsForQuiz from '../../../api/quiz/questions';

export const Route = createFileRoute('/quiz/quizModification/$quizID')({
    loader:async ({params})=>{
        // ADD AUTHENTICATION TO MAKE SURE USER HAS PERMISSION TO VIEW THIS QUIZ
            const auth = await authenticate();
            if(!auth){
                throw redirect({
                    to:'/'
                })
            }
            const data = await getAllQuestionsForQuiz(Number(params.quizID))
            return data
        },
    component: QuizModification,
})


