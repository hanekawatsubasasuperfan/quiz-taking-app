import { createFileRoute, redirect } from '@tanstack/react-router'
import Index from '../../Components/UserPage'
import authenticate from '../../api/authenticate'

export const Route = createFileRoute('/user/')({
    beforeLoad:async ()=>{
        const auth = await authenticate();
        if(!auth){
            throw redirect({
                to:'/'
            })
        }
    },
    component: Index,
})

