import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../PrivateRoute";
import DefaultPage from "../../Pages/default";
import LoginPage from "../../Pages/login";
import CallBack from "../../APIs/AuthCallBack";
import Docs from "../../Pages/docs";
import AuthContextProvider from "../AuthContextProvider";
import AuthRoute from "../AuthRoute";
import { RouteWithNavigation } from "../RouteWithNav";
import EditDocs from "../../Pages/edit";

export default function AppRouter() {
    return (
        <AuthContextProvider>
            <Routes>
                <Route path="/" element= {<DefaultPage/>}/>

                <Route element={<AuthRoute/>}>
                    <Route path="/login" element={<LoginPage/>}/>
                </Route>
                
                <Route element={<PrivateRoute/>}>
                    <Route element={<RouteWithNavigation />}>
                        <Route path="/docs" element={<Docs/>} />
                        <Route path="/docs/edit" element={<EditDocs/>} />
                    </Route>
                </Route>

                <Route path="/api/auth/callback/google" element={<CallBack/>}/>
                
                <Route path="/*" element={<p>Not found page</p>}/>
            </Routes>              
        </AuthContextProvider>
    )
}