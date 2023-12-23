import { useNavigate } from "react-router-dom";
import { DefaultMain } from "./styled";
import { useEffect, useState } from "react";

const BASE_H1 = "ocument Writer__";
export default function DefaultPage() {

    const navigate = useNavigate();
    const [index, SetIndex] = useState(0);
    const [op, SetOp] = useState(1);

    const handleClickLogin = () =>{
        navigate("/login");
    }

    const handleClickDocs = () =>{
        navigate("/docs");
    }

    useEffect(() => {
        let time = index === BASE_H1.length-1 || index === 0 ? 2000 : Math.floor(Math.random() * 500);
        const interval = setInterval(() => {
            let oper = op;
            if(index === BASE_H1.length-1 || index === 0) {
                oper = op === 1 ? -1 : 1;
                SetOp(oper);
            }
            SetIndex((index + oper)%BASE_H1.length);

        }, time);

        return () => clearInterval(interval);
    }, [index]); 
    
    return (
        <DefaultMain>

            <div>
                <h1>D{BASE_H1.slice(0, index)}</h1>
                <span className="capret"></span>
            </div>
            <p>Easy to use, Easy to share</p>

            <div>
                <button onClick={handleClickDocs}>Get Started</button>
                <button onClick={handleClickLogin}>Login</button>
            </div>

        </DefaultMain>
    )
}