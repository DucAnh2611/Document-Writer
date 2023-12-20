import styled from "styled-components";


export const NavigationHeader = styled.div`
    display: flex;
    align-items: center;
    height: fit-content;
    width: 100%;
    box-sizing: border-box;
    padding: 20px 20px;
    gap: 15px;
    justify-content: space-between;

    &>div:first-child {
        height: 60px;
        width: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
        overflow: hidden;
        &>img {
            height: 100%;
            width: 100%;
            aspect-ratio: square;
            object-fit: cover;
        }
    }

    &>div:nth-child(2) {
        height: fit-content;
        display: block;
        flex-grow: 1;
        &>p{
            width: 100%;
            text-align: left;
            margin: 5px 0;

            &:first-child {
                font-size: 17px;
                font-weight: bolder;
                letter-spacing: 0cap.5;
            }
            &:last-child {
                font-size: 12px;
                font-weight: lighter;
            }
        }
    }

    &>div:last-child {
        height: fit-content;
        width: fit-content;
        display: flex;
        gap: 5px;
        &>button {
            height: 35px;
            width: 35px;
            border-radius: 100%;
            display: grid;
            place-items: center;
        }
    }

`;

export const NavigationDocs = styled.div`
    flex-grow: 1;
    overflow-y: auto;
    overflow-x: visible;
    display: block;
`;

export const NavigationTheme = styled.div`
    height: 80px;
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: left;
`;