import { createFileRoute } from '@tanstack/react-router'
import Quiz from '../../Components/Quiz';


export const Route = createFileRoute('/user/quiz')({
    component: Quiz,
})


