import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../Component/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import { config_api } from "./ApiConfig";

export default function CallBack() {
    const { checkLoginState, login } = useContext(AuthContext);
    const navigate = useNavigate();

    const getToken = async () => {
        if(!login) {
            try {

                const res = await fetch(`${config_api.base_uri_local}/${config_api.auth.google}/token${window.location.search}`, {
                    credentials: "include"
                });
                const data = await res.json();

                checkLoginState();
                // navigate("/docs");                    

            }
            catch(e) {
                navigate("/login");
                console.log(e);
            }
        }
        else if(login) {
            navigate("/docs");
        }
    }

    useEffect(() => {
        getToken();
    }, [checkLoginState, login, navigate])

    return <></>
}