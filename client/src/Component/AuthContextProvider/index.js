import { createContext, useCallback, useEffect, useState } from 'react';
import { config_api } from '../../APIs/ApiConfig';

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
    const [login, SetLogin] = useState(() => {
        const storedIsLoggedIn = localStorage.getItem('isLogin');
        return storedIsLoggedIn ? JSON.parse(storedIsLoggedIn) : false;
    });
    const [user, SetUser] = useState(null);

    const checkLoginState = useCallback(async () => {
        try {
            const res = await fetch(`${config_api.base_uri_local}/${config_api.auth.google}/logged_in`, {
                credentials: 'include'
            });
            const {loggedIn, user} = await res.json();

            localStorage.setItem("isLogin", JSON.stringify(loggedIn));
            SetLogin(loggedIn);
            user && SetUser(user);                

        }
        catch(e) {
            console.error(e);
        }
    }, []);


    useEffect(() => {
        checkLoginState();
    }, [checkLoginState]);

    return (
        <AuthContext.Provider value={{login, checkLoginState, user}}>
            {children}
        </AuthContext.Provider>
    )
}

