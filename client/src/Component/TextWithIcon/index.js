import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
const Style = styled.p`

    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    text-align: left;
    white-space: nowrap;
    word-break: break-all;
    word-wrap: break-word;
    margin: 0;
    font-size: 16px;
    font-weight: 400;

    &>svg {
        height: 15px;
        width: 15px;
    }
`;

export default function TextWithIcon({text, icon, ...props}) {
    return (
        <Style {...props}><FontAwesomeIcon icon={icon}/> {text}</Style>
    )
}