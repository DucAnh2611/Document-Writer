import { faCircleNotch, faEllipsisVertical, faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CardHolder } from "./styles";
import DocCardDetail from "../DocumentCardDetail";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ButtonsDocCard from "../DocCardButtons";
import { config_api } from "../../APIs/ApiConfig";
import { useNotifications } from "../../Hooks/useNotification";

export default function DocCard({doc, SetList, ...props}) {

    const { addNoti } = useNotifications();
    const [isSelect, SetIsSelect] = useState(false);
    const navigate = useNavigate();
    const [wait, SetWait] = useState(false);

    const handleOpen = () => {
        SetIsSelect(select => !select);
    }

    const handleDelete = async () => {
        addNoti('w', "Deleting doc: " + doc.title);
        SetWait(true);
        SetIsSelect(false);
        await fetch(`${config_api.base_uri_local}/${config_api.document}/${doc._id}`, {
            method: "DELETE",
            credentials: "include"
        }).then(res => res.json())
        .then(data => {
            SetWait(false);
            if(data.status === "ok") {
                SetList(list => list.filter(e => e._id !== doc._id));
                addNoti('a', "Deleted doc: " + doc.title);
            }
            else {  
                addNoti('e', data.message);
            }

        })
    }

    const handleEdit = () => {
        navigate(`/docs/edit?id=${doc._id}`, {})
    }

    return (
        <CardHolder className="card" onMouseLeave={() => SetIsSelect(false)} {...props}>
            <div>
                {
                    wait ?
                    <span className="loading_svg"><FontAwesomeIcon icon={faCircleNotch}/></span>
                    : <span><FontAwesomeIcon style={{color: doc.publish ? "#65B741" : "#EE7214"}} icon={ doc.publish ? faLockOpen : faLock} /></span>
                }
                <p>{doc.title}</p>
                <button onClick={handleOpen}><FontAwesomeIcon icon={faEllipsisVertical}/></button>
            </div>
            <DocCardDetail doc={doc}/>
            <ButtonsDocCard hide={isSelect} onDelete={handleDelete} onEdit={handleEdit}/>
        </CardHolder>
    )
}