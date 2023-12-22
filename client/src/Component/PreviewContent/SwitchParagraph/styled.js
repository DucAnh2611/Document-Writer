import styled from "styled-components";

export const FirstLine = styled.div`
    background-color: transparent;
    width: 30px;
    height: auto;
`;

export const Level = styled.div`
    background-color: transparent;
    height: auto;
    display: flex;
    justify-content: right;
    align-items: center;
    margin-right: 10px;
    &>svg {
        width: 7px;
    }
`;
