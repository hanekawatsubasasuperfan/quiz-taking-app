import { createFileRoute } from '@tanstack/react-router'
import Quiz from '../Components/Quiz';


export const Route = createFileRoute('/quiz')({
    component: Quiz,
})


