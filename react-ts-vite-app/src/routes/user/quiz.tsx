import { createFileRoute, redirect } from '@tanstack/react-router'
import Quiz from '../../Components/Quiz';
import authenticate from '../../api/authenticate';


export const Route = createFileRoute('/user/quiz')({
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


