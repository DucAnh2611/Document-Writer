import { createContext, useState } from "react";

export const ListDocContext = createContext();

export default function ListDocProvider({children}) {

    const [listDoc, SetListDoc] = useState([]);


    return (
        <ListDocContext.Provider value={{listDoc, SetListDoc}}>
            {children}
        </ListDocContext.Provider>
    )
}