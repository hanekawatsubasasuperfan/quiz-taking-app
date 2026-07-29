import { createFileRoute } from '@tanstack/react-router'
import Signup from '../Components/Signup'

export const Route = createFileRoute('/signup')({
  component: Signup,
})
