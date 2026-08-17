import { createFileRoute, redirect } from '@tanstack/react-router'
import Index from '../../Components/UserPage'
import authenticate from '../../api/auth/authenticate'
import getAllQuizzes from '../../api/quiz/quizzes';

export const Route = createFileRoute('/user/')({
    // no need to use beforeLoad here so switched to just using loader
    loader: async ()=>{
        const res = await authenticate();
        if(!res.authenticated){
            throw redirect({
                to:'/'
            })
        }
        const data = await getAllQuizzes();
        return data;
    },
    component: Index,
})

