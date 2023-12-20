import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";

export default function PrivateRoute() {
    const {login} = useAuth();

    if(!login ) return <Navigate to={"/login"}/>;
    
    return (
        <Outlet/>
    )
}