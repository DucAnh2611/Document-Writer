import { useContext, useEffect, useState } from "react"
import { useAuth } from "../../Hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from '@fortawesome/free-solid-svg-icons';
import { config_api } from "../../APIs/ApiConfig";
import DocCard from "../DocumentCard";
import { ThemeContext } from "../ThemeContextProvider";
import ThemeSelector from "../../utils/themeSelector";
import { NavigationDocs, NavigationHeader, NavigationTheme } from "./styles";
import useListDoc from "../../Hooks/useListDoc";

export default function Navigation() {

    const { SetSelectedTheme } = useContext(ThemeContext);
    const { user } = useAuth();
    const {listDoc, SetListDoc} = useListDoc();
    const [page, SetPage] = useState(1);
    const [key, SetKey] = useState("");
    const [load, SetLoad] = useState(false);
    const [isCreating, SetIsCreating] = useState(false);

    const getUserList = async () => {
        const res = await fetch(`${config_api.base_uri_local}/${config_api.document}/list?key=${key}&page=${page}`, {
            credentials: "include"
        });

        const dataRes = await res.json();
        if(dataRes.status === "ok") {
            SetListDoc(list => [...list, ...dataRes.data.list]);
        }
    }

    const createDoc = async () => {
        SetIsCreating(true);
        await fetch(`${config_api.base_uri_local}/${config_api.document}/create`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({})
        }).then(res => res.json())
        .then(data => {
            SetIsCreating(false);
            if(data.status === "ok") {
                let doc = data.data.doc;
                SetListDoc(list => [
                    {
                        title: doc.title, 
                        publish: doc.publish,
                        create_at: doc.create_at,
                        modify_at: doc.modify_at,
                        _id: doc._id,
                    },
                    ...list
                ]);
            }
        });
    }

    useEffect(() => {
        if(!load) {
            SetLoad(true);

            getUserList();
        }
    }, []);

    if(!user) return null;
    if(!load) return <p>Loading</p>;

    return (
        <nav>
            <NavigationHeader>

                <div>
                    <img alt="user avatar" src={user.picture}/>
                </div>
                <div>
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                </div>

                <div>
                    <button onClick={createDoc} disabled={isCreating}><FontAwesomeIcon icon={solid.faPlus} /></button>
                </div>
            </NavigationHeader>

            <NavigationDocs>
                {(listDoc && listDoc.length !==0)
                ? listDoc.map(e => (
                    <DocCard doc={e} key={e._id} SetList={SetListDoc}/>
                )) 
                : <p>Create new doc to have this list</p>}    
            </NavigationDocs>

            <NavigationTheme>
                <ThemeSelector setter={SetSelectedTheme}/>
            </NavigationTheme>
        </nav>
    )
}