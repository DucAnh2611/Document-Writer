import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { config_api } from "../../APIs/ApiConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, faClock, faClockRotateLeft, faCopy, faFloppyDisk, faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import TextWithIcon from "../../Component/TextWithIcon";
import PaperPages from "../../Component/PaperPages";
import { DocInfo, DocSave, EditHeader, EditMain, EditPage } from "./styles";
import useListDoc from "../../Hooks/useListDoc";
import ButtonWithText from "../../Component/Button/ButtonWithText";
import { useNotifications } from "../../Hooks/useNotification";

export default function EditDocs() {

    const { addNoti } = useNotifications();
    const [ searchParams, setSearchParams ] = useSearchParams();
    const urlRef = useRef(null);
    const { SetListDoc } = useListDoc();
    const [ editable, SetEditable] = useState(false);
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
                let {editable, ...docData} = res.data;

                SetDoc(docData);
                SetNewDoc(docData);
                SetLoad(true);
                SetEditable(editable);

                addNoti("a", "Get doc infomation successful")
            }
            else {
                addNoti("e", res.message);
            }
        }) 
    }

    const handleChangeNewDoc =(field, data) => {
        if(editable) {
            SetNewDoc(newDoc => ({
                ...newDoc,
                [field]: data
            }));            
        }
        else {
            addNoti('w', "You are not allow to do this");
        }

    }

    const updateDoc = async () => {
        if(editable) {         
            addNoti('w', "Updating is in progress")
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
                    
                    addNoti('a', "Update successful")
                }
                else {
                    addNoti('e', res.message);
                }
            }); 

        }
        else {
            addNoti('e', "You are not allow to do this");
        }

    }

    const handleCopyClick = () => {
        // Access the current URL and assign it to the input element's value
        urlRef.current.value = window.location.href;
        
        // Select the text inside the input element
        urlRef.current.select();
        
        // Copy the selected text to the clipboard
        document.execCommand('copy');
        
        // Deselect the text
        window.getSelection().removeAllRanges();
        addNoti('a', "Copied link to clipboard");
      };

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

            <input type="text" ref={urlRef} readOnly style={{ position: 'absolute', left: '-9999px' }} />
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

                    <button onClick={handleCopyClick} style={{display: "flex", gap: "10px"}}>
                    <span><FontAwesomeIcon icon={faCopy}/></span> Copy Link </button>

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