import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'



export const Route = createRootRoute({ component: ()=>{
    return (
        <>
        <div style={{
            backgroundColor:"#2f2147", 
            height:"65px",
            display:"flex",
            justifyItems:"center",
            alignContent:"center"
            }}>
            <Link to="/user" style={{color:"white", marginLeft:"15px",  fontSize:"2em"}}>
                Home
            </Link>
        </div>
        <Outlet />
        <TanStackRouterDevtools />
    </>
    )
} })
