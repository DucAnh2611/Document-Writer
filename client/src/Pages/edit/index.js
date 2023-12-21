import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { config_api } from "../../APIs/ApiConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, faClock, faClockRotateLeft, faFloppyDisk, faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import TextWithIcon from "../../Component/TextWithIcon";
import PaperPages from "../../Component/PaperPages";
import { DocInfo, DocSave, EditHeader, EditMain, EditPage } from "./styles";
import useListDoc from "../../Hooks/useListDoc";
import ButtonWithText from "../../Component/Button/ButtonWithText";

export default function EditDocs() {

    const [ searchParams, setSearchParams ] = useSearchParams();
    const { SetListDoc } = useListDoc();
    const [ id, SetId ] = useState(null);
    const [ doc, SetDoc ] = useState({});
    const [ newDoc, SetNewDoc ] = useState({});
    const [ change, SetChange ] = useState(false);
    const [ wait, SetWait ] = useState(false);
    const [ load, SetLoad ] = useState(false);

    const getInfoDoc = async () => {
        SetLoad(false);
        await fetch(`${config_api.base_uri_local}/${config_api.document}/${id}/info`, {
            method: "GET",
            credentials: "include"
        }).then(res => res.json())
        .then(res => {
            if(res.status === "ok") {
                SetDoc(res.data);
                SetNewDoc(res.data);
                SetLoad(true);
            }
        }) 
    }

    const handleChangeNewDoc =(field, data) => {
        SetNewDoc(newDoc => ({
            ...newDoc,
            [field]: data
        }));
    }

    const updateDoc = async () => {
        SetWait(true);
        await fetch(`${config_api.base_uri_local}/${config_api.document}/update`, {
            method: "POST",
            credentials:"include",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({doc: {
                ...newDoc,
                title: newDoc.title === "" ? "Blank Title" : newDoc.title
            }})
        }).then(res=> res.json())
        .then(res => {
            SetWait(false);
            if(res.status === "ok") {
                SetChange(false);
                SetDoc(res.data);
                SetNewDoc(res.data);
                SetListDoc(listDoc => [res.data, ...listDoc.filter(e => e._id !== id)]);
            };
        })
    }

    useMemo(() => {
        SetChange(JSON.stringify(doc) === JSON.stringify(newDoc));
        document.title = (JSON.stringify(doc) === JSON.stringify(newDoc) ? "Document Writer" : "Unsave") + " - " + doc.title ;
    }, [newDoc]);

    useMemo(() => {
        if(!!id) getInfoDoc();
    }, [id])

    useEffect(() => {
        SetId(searchParams.get("id"));
    }, [searchParams]);

    if(!id) return;
    if(!load) return <p>Loading</p>;

    return (
        <EditPage>

            <EditHeader>
                <DocInfo>
                    <ButtonWithText style={{padding: "10px 20px", width: "fit-content"}}
                    onClick={() => handleChangeNewDoc('publish', !newDoc.publish)} 
                    icon={newDoc.publish ? faLock : faLockOpen}
                    text={"Set to " + (newDoc.publish ? " Private" : "Publish")}/>

                    <input placeholder="Document title" onChange={(e) => handleChangeNewDoc('title', e.target.value)} value={newDoc.title}/>
                    <TextWithIcon icon={faClock} text={`Create: ${new Date(doc.create_at).toLocaleString()}`}/>
                    <TextWithIcon icon={faClockRotateLeft} text={`Update: ${new Date(doc.modify_at).toLocaleString()}`}/>
                </DocInfo>

                <DocSave>
                    <button onClick={updateDoc} disabled={change} style={{display: "flex", gap: "10px", backgroundColor: "#3559E0", color: "#FFFFFF"}}>
                    {wait
                    ?<span className="loading_svg"><FontAwesomeIcon icon={faCircleNotch}/></span>
                    :<span><FontAwesomeIcon icon={faFloppyDisk}/></span>}
                    Save</button>
                </DocSave>
            </EditHeader>

            <EditMain>
                <PaperPages data={newDoc.data} SetData ={(data) => handleChangeNewDoc('data', data)}/>
            </EditMain>

        </EditPage>
    );
}