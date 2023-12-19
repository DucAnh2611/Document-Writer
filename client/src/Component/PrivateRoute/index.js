import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";


export default function PrivateRoute() {

    const [login, SetLogin ]= useState(true);

    if(!login ) return <Navigate to={"/"}/>;

    return (
        <Outlet/>
    )
}