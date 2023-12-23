import styled from "styled-components";

export const DefaultMain = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;

    & > p{
        margin: 0;
        font-size: 18px;
        font-weight: lighter;
        opacity: 0.8;
    }

    &> div {
        position: relative;
        &>h1 {
            margin: 10px 0;
            font-size: 100px;
            letter-spacing: 2px;
            font-weight: bolder;
        }
    }

    & > div:last-child {
        height: fit-content;
        width: fit-content;
        display: flex;
        gap: 10px;
        margin: 20px 0 0 0;
        & >button {
            border-radius: 10px;
            width: fit-content;
            height: fit-content;
            padding: 10px 20px;
            font-size: 17px;

            &:first-child {
                border: 1px solid;
                background: transparent;
                
            }

            &:last-child {
                border: 1px solid transparent;
            }
        }
    }
   
`