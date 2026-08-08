import { createFileRoute, redirect } from '@tanstack/react-router'
import Quiz from '../../Components/TakeQuiz';
import authenticate from '../../api/authenticate';


export const Route = createFileRoute('/user/takeQuiz')({
    loader:async ()=>{
            const auth = await authenticate();
            if(!auth){
                throw redirect({
                    to:'/'
                })
            }
        },
    component: Quiz,
})


