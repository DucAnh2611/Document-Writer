import { DetailModal } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from "@fortawesome/free-solid-svg-icons";
import TextWithIcon from "../TextWithIcon";


export default function DocCardDetail({doc})  {
    return (
    <DetailModal className="cardDetail">
        <TextWithIcon icon={solid.faFolder} text={`Title: ${doc.title}`}/>
        <TextWithIcon icon={solid.faClock} text={`Create at: ${new Date(doc.create_at).toLocaleString()}`}/>
        <TextWithIcon icon={solid.faClockRotateLeft} text={`Last update: ${new Date(doc.modify_at).toLocaleString()}`}/>
    </DetailModal>)
}