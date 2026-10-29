import { createFileRoute, redirect } from '@tanstack/react-router'
import QuizModification from '../../../Components/QuizModification'
import authenticate from '../../../api/auth/authenticate';
import getAllQuestionsForQuiz from '../../../api/quiz/questions';

export const Route = createFileRoute('/quiz/quizModification/$quizID')({
    loader:async ({params})=>{
            const auth = await authenticate();
            if(!auth.authenticated){
                throw redirect({
                    to:'/login'
                })
            }
            const data = await getAllQuestionsForQuiz(Number(params.quizID))
            return data
        },
    component: QuizModification,
})


