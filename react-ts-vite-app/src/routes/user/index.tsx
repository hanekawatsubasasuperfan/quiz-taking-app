import { createFileRoute } from '@tanstack/react-router'
import Index from '../../Components/UserPage'

export const Route = createFileRoute('/user/')({
    component: Index,
})

