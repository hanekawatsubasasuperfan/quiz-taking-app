import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import homeIcon from '../../public/package.png'



export const Route = createRootRoute({ component: ()=>{
    return (
        <>
        <div style={{backgroundColor:"#2f2147", height:"65px"}}>
            <img src={homeIcon}/>
        <Link to="/">
            Home
        </Link>{' '} 
        <Link to="/login">
            Quiz 
        </Link>
        </div>
        <Outlet />
        <TanStackRouterDevtools />
    </>
    )
} })
