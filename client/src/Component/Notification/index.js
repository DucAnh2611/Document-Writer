import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react"
import styled from "styled-components";
import { faCheckCircle, faInfoCircle, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

const StyledNoti = styled.div`
    padding: 10px 20px;
    width: fit-content;
    white-space: nowrap;
    border-radius: 10px;
    box-shadow: 0 0 10px rgb(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    gap: 10px;

    &> span {
        height: fit-content;
        width: fit-content;
        &> svg {
            width: 20px;
            height: 20px;
        }
    }

    &>p {
        font-size: 14px;
        height: fit-content;
        margin: 0;
        width: fit-content;
        text-transform: capitalize;
    }

`;

export const Notification = ({time=1, noti, remove, ...props}) => {

    const mapIcon = {
        "a": faCheckCircle,
        "w": faInfoCircle,
        "e": faXmarkCircle
    }
    const mapColor = {
        "a": "#367E18",
        "e": "#f7362f",
        "w": "#f7ae2f"
    }

    useEffect(() => {
        const interval = setInterval(() => {
            remove(noti.id);
        }, time*1000);

        return () => clearInterval(interval);
    }, []);

    return <StyledNoti onClick={() => remove(noti.id)} className="notification" style={{animationDuration: `.25s`}}>
        <span style={{color: mapColor[noti.type]}}><FontAwesomeIcon icon={mapIcon[noti.type]} /></span>
        <p>{noti.message}!</p>
    </StyledNoti>
}

