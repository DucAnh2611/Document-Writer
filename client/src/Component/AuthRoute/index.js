import { useAuth } from "../../Hooks/useAuth"
import { useNavigate, Outlet } from "react-router-dom";

export default function AuthRoute() {
    const {login} = useAuth();
    const navigate = useNavigate();

    if(login) return navigate(-1);
    
    return <Outlet/>
}