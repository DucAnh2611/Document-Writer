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
import { useNotifications } from "../../Hooks/useNotification";
import PaginationListDoc from "../Pagination";
import ButtonWithText from "../Button/ButtonWithText";

const BASE_GET_LIMIT = 10;

export default function Navigation() {

    const { SetSelectedTheme } = useContext(ThemeContext);
    const { addNoti } = useNotifications();
    const { user, logout } = useAuth();
    const {listDoc, SetListDoc} = useListDoc();
    const [page, SetPage] = useState(1);
    const [key, SetKey] = useState("");
    const [load, SetLoad] = useState(false);
    const [isCreating, SetIsCreating] = useState(false);
    const [maxPage, SetMaxPage] = useState(0);

    const getUserList = async () => {
        
        SetLoad(false);
        const res = await fetch(`${config_api.base_uri_local}/${config_api.document}/list?key=${key}&page=${page}`, {
            credentials: "include"
        });

        const dataRes = await res.json();
        if(dataRes.status === "ok") {
            SetListDoc(dataRes.data.list || []);
        //     SetListDoc(list => [...list, ...dataRes.data.list]);
            SetMaxPage(dataRes.data.max);
            SetLoad(true);
            addNoti('a', "Current page is: " + page.toString() + " ");
        }
        else {
            addNoti('e', "Error: " + dataRes.message);
        }
    }

    const createDoc = async () => {
        addNoti('w', 'Creating new doc: New Document');
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
                SetMaxPage(Math.ceil((listDoc.length+1)/BASE_GET_LIMIT))
                addNoti('a', 'Created new doc: New Document');
            }
            else {
                addNoti('e', "Error: " + data.message);
            }
        });
    }

    const handleClickPage = (page) => {
        SetPage(page);
    }

    useEffect(() => {
        getUserList();
    }, [page]);

    if(!user) return null;

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
                {(load)
                ? listDoc.map(e => (
                    <DocCard doc={e} key={e._id} SetList={SetListDoc}/>
                )) 
                : <p>loading</p>}    
            </NavigationDocs>

            <NavigationTheme>
                <ButtonWithText onClick={logout} icon={solid.faDoorOpen} text={"Logout"}/>
                <ThemeSelector setter={SetSelectedTheme}/>
                <PaginationListDoc current={page} max={maxPage} onClick={handleClickPage}/>
            </NavigationTheme>
        </nav>
    )
}