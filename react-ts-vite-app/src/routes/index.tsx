import { createFileRoute, redirect } from '@tanstack/react-router'
import  Home from '../Components/Home'

export const Route = createFileRoute('/')({
    component: Home,
    loader:()=>{
        throw redirect({
            to: '/login'
        })
    }
})



