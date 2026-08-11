import { createFileRoute } from '@tanstack/react-router'
import Quiz from '../../Components/Quiz';

export const Route = createFileRoute('/quiz/$quizID')({
    loader: async({params})=>{
        return {quizID:params.quizID}
    },
    component: Quiz,
})

