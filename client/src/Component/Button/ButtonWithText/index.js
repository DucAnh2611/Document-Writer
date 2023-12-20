import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const ButtonMain = styled.button`
    display: flex;
    box-sizing: border-box;
    gap: 10px;
    align-items: center;
    padding: 15px;
    border-radius: 10PX;
    background-color: none;
    width: 100px;
    padding: 10px;

    &>svg {
        height: 15px;
        width: 15px;
    }

    &:hover {
        transform: scale(1);
    }
`; 

export default function ButtonWithText({icon, text, ...props}) {
    return (
        <ButtonMain {...props}>
            <FontAwesomeIcon icon={icon}/>
            {text}
        </ButtonMain>
    )
}