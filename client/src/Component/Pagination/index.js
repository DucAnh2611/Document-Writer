import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { useNotifications } from "../../Hooks/useNotification";
import { useState } from "react";
import { isNumber } from "lodash";

const PaginationMain = styled.div`

    display: flex;
    height: fit-content;
    flex-grow: 1;
    overflow: hidden;
    gap:8px;
    align-items: center;
    justify-content: left;

    & > button {
        height: 40px;
        width: 40px;
        border-radius: 50px;
        display: grid;
        place-items: center;

        &>svg {
            height: 15px;
        }
    }

    & > input {
        width: 50px;
        height: 30px;
        padding: 10px;
        border-radius: 10px;
        font-size: 13px;
    }
    &> p {
        margin: 0;
        font-size: 13px;
    }
`;

export default function PaginationListDoc({current, max, onClick, ...props}) {

    const {addNoti} = useNotifications();
    const handleChangeKey = (e) => {
        if(e.key === "Enter") {
            let input = Number.parseInt(e.target.value);
            if(input > 0 && input <= max) {
                onClick(input);
            }
            else if(input === current){ 
                addNoti('w', "Page selected is current page");
            }
            else {
                addNoti('e', "Invalid Page");
            }
        }
    }

    return (
        <PaginationMain {...props}>
            <button
            disabled={current-1 < 1}
            onClick={() => onClick(current - 1 >1 ? current-1 : 1)}
            >
                <FontAwesomeIcon icon={faAngleLeft}/>
            </button>

            <input type="text" datatype="number" defaultValue={current} onKeyDown={handleChangeKey}/>
            <p>/ {max}</p>
            
            <button
            disabled={current+1 > max}
            onClick={() => onClick(current +1 < max ? current+1 : max)}>
                <FontAwesomeIcon icon={faAngleRight}/>
            </button>
        </PaginationMain>
    )
}