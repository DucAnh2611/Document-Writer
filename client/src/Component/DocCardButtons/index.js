import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import ButtonWithText from "../Button/ButtonWithText";
import styled from "styled-components";

const Main = styled.div`
    width: fit-content;
    height: fit-content;
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 0;
    right: 0;
    transform: translate(0, 0);
    z-index: 1;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 10px rgb(0,0,0, 0.5);
`;

export default function ButtonsDocCard({hide, onEdit, onDelete}) {
    if(!hide) return;
    return (
    <Main className="card">
        <ButtonWithText icon={faEdit} text={"Edit"} onClick={onEdit}/>
        <ButtonWithText icon={faTrashCan} text={"Delete"} style={{color: "#DF2E38"}} onClick={onDelete}/>
    </Main>
    )
}