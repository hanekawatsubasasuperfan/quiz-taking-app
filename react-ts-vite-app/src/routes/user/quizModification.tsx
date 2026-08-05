import { createFileRoute, redirect } from '@tanstack/react-router'
import QuizModification from '../../Components/QuizModification'
import authenticate from '../../api/authenticate';

export const Route = createFileRoute('/user/quizModification')({
    loader:async ()=>{
                const auth = await authenticate();
                if(!auth){
                    throw redirect({
                        to:'/'
                    })
                }
            },
    component: QuizModification,
})


