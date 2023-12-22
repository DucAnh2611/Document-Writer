import { createContext, useState } from "react";

export const FormStyleContext = createContext();

export default function FormStyleProvider({children}) {
    
    const [currentTextStyle, SetCurrentTextStyle] = useState([]);
    const [paragraphStyle, SetParagraphstyle] = useState({
        type: "normal",
        fontSize: "13",
        textAlign: "left"
    });

    return (
        <FormStyleContext.Provider value={{currentTextStyle, paragraphStyle, SetCurrentTextStyle, SetParagraphstyle}}>
            {children}
        </FormStyleContext.Provider>
    )
}

