import ListDocProvider from "../../utils/ListDocProvider";
import Navigation from "../Navigation"
import {Outlet} from "react-router-dom";

export const RouteWithNavigation = () => {
    return (
        <main style={{display: "flex", height: "100%"}}>
            <ListDocProvider>
                <Navigation/>
                <Outlet/>                      
            </ListDocProvider>
        </main>
    )
}