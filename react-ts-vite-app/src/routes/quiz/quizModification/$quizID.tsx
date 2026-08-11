import { createFileRoute, redirect } from '@tanstack/react-router'
import QuizModification from '../../../Components/QuizModification'
import authenticate from '../../../api/authenticate';

export const Route = createFileRoute('/quiz/quizModification/$quizID')({
    loader:async ({params})=>{
                const auth = await authenticate();
                console.log(params.quizID)
                if(!auth){
                    throw redirect({
                        to:'/'
                    })
                }
            },
    component: QuizModification,
})


