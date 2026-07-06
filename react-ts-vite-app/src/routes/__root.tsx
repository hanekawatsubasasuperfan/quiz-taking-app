import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'



export const Route = createRootRoute({ component: ()=>{
    return (
        <>
        {/* <div>
        <Link to="/">
            Home
        </Link>{' '} 
        <Link to="/quiz">
            Quiz 
        </Link>
        </div>
        <hr /> */}
        <Outlet />
        <TanStackRouterDevtools />
    </>
    )
} })
