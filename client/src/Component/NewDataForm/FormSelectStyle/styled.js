import styled from "styled-components";

export const MainSelecStyle = styled.div`
    display: flex;
    height: 30px;
    align-items: center;
    justify-content: center;
    gap: 5px;

    &>button {
        height: 30px; 
        width: 30px;
        border-radius: 5px;
    }

    &>div {
        display: flex;
        align-items: center;
        gap: 5px;
        margin: 0 10px;
        &>input {
            height: 40px;
        }
    }

    &>select {
        height: 40px;
        width: fit-content;
        padding: 0 10px;
    }
`;