import styled from "styled-components";

export const CardHolder = styled.div`
    width: 100%;
    height: fit-content;
    position: relative;

    &>div:first-child {
        display: flex;
        height: fit-content;
        width: 100%;
        align-items: center;
        justify-content: flex-start;
        box-sizing: border-box;
        padding: 1px 10px;
        gap: 5px;

        &>span {
            width: 40px;
            height: 40px;
            display: grid;
            place-items: center;
            &>svg{
                height: 15px;
            }
        }
        
        &>p{
            flex-grow: 1;
            height: fit-content;
            text-align: left;
        }

        &>button {
            position: absolute;
            top: 50%;
            right: 10px;
            transform: translate(0, -50%);
            display: none;
            height: 35px;
            width: 35px;
            border-radius: 100%;
            overflow: hidden;
            place-items: center;
            &> svg {
                height: 18px;
            }
            &:hover {
                transform: translate(0, -50%) 
                & > svg {
                    transform: scale(1.05);
                }
            }
        }

        &:hover > button {
            display: grid;
        }     
        
        &:hover ~ div:last-child {
            display: flex;
        }
    }

`;
