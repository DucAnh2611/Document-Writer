import styled from "styled-components";

export const MainFormAdd = styled.div`
    height: fit-content;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
    border: 1px solid;
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
    margin-top: 15px;
`;

export const ButtonCreate = styled.button`
    padding: 10px 20px;
    border-radius: 10px;
`;

export const ButtonForm = styled.button`
    padding: 5px 15px;
    border-radius: 5px;
    margin: 0 2px;
`;

export const FormAdd = styled.div`
    width: 100%;
    height: fit-content;
`;

export const ContentWrapper = styled.div`
    position: relative;
    height: fit-content;
    margin: 20px 0;
    &>p {
        width: 10%;
        text-align: left;
        font-size: 19px;
        font-weight: bold;
        margin: 0px 0 20px 0;
    }
`;