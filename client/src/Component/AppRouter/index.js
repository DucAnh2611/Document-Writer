import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../PrivateRoute";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element= {<p>Default page</p>}/>
            <Route path="/login" element={<p>Login page</p>}/>
            <Route element={<PrivateRoute/>}>
                <Route path="/docs" element={<p>This is protected route</p>} />
            </Route>
            
            <Route path="/*" element={<p>Not found page</p>}/>
        </Routes>
    )
}