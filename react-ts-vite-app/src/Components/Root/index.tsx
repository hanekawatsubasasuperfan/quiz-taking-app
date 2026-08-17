import { useNavigate, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Logout } from "../../api/auth/logout";

export default function RootComponent(){
    const navigate = useNavigate();

    async function handleLogout(){
        try{
            const data = await Logout();
            if(data.code == 2){
                alert("Logout error, please try again");
                return;
            }
            navigate({
                to:"/login"
            })
        }catch(err){
            console.error(err)
        }
    }

    return (
        <>
        <div style={{
            backgroundColor:"#2f2147", 
            height:"65px",
            display:"flex",
            alignContent:"center"
            }}>
            <Link to="/user" style={{color:"white", marginLeft:"15px",  fontSize:"2em"}}>
                Home
            </Link>
            <button style={{
                color:"white", marginLeft:"15px",  fontSize:"2em",textDecoration:"underline", cursor:"pointer", background:"none", border:"none"
                }} onClick={handleLogout} type="button">
                Logout
            </button>
        </div>
        <Outlet />
        <TanStackRouterDevtools />
    </>
    )
} 