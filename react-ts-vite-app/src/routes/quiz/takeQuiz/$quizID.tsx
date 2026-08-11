import { createFileRoute, redirect } from '@tanstack/react-router'
import Quiz from '../../../Components/TakeQuiz';
import authenticate from '../../../api/authenticate';
import getAllQuestionsForQuiz from '../../../api/quiz/questions';


export const Route = createFileRoute('/quiz/takeQuiz/$quizID')({
    loader:async ({params})=>{
            // ADD AUTHENTICATION TO MAKE SURE USER HAS PERMISSION TO VIEW THIS QUIZ
            const auth = await authenticate();
            if(!auth){
                throw redirect({
                    to:'/'
                })
            }
            const data = await getAllQuestionsForQuiz(Number(params.quizID))
            console.log(data)
            return data
        },
    component: Quiz,
})


