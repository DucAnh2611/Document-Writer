import styled from "styled-components";

export const EditPage = styled.main`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    position: relative;
`;

export const EditHeader = styled.section`
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    height: fit-content;
    padding: 20px 30px;
    border-bottom: 1px solid;

`;

export const DocInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 15px;
    flex-grow: 1;
    &>p{
        width: fit-content;
        height: fit-content;
        &:first-child {
            font-size: 19px;
            font-weight: bold;
            margin-right: 30px;
        }
        &:not(:first-child) {
            svg {
                display: none;
            }
            font-size: 12px;
            font-weight: normal;
        }
    }
`;

export const DocSave = styled.div`
    display: flex;
    align-items: center;
    width: fit-content;

    &>button{
        padding: 10px 20px;
        display: flex;
        gap: 5px;
        align-items: center;
        border-radius: 10px;
    }

`;

export const EditMain = styled.section`
    padding: 20px 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 30px;
    overflow-y: auto;
    flex-grow: 1;
`