import { useAuth } from "../../Hooks/useAuth"
import { Outlet, Navigate } from "react-router-dom";

export default function AuthRoute() {
    const {login} = useAuth();
    if(login) return <Navigate to={"/docs"}/>
    
    return <Outlet/>
}