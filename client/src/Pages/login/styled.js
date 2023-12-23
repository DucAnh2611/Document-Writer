import styled from "styled-components";

export const LoginMain = styled.div`
    height: 100%;
    width: 100%;
    display: grid;
    place-items: center;

    &>div {
        height: fit-content;
        width: fit-content;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        box-shadow: 0 0 20px rgb(0 ,0 ,0, 0.4);
        padding: 20px;
        gap: 30px;

        &>h1 {
            margin: 0;
            text-align: left;
            width: 100%;
            font-size: 32px;
            font-weight: bolder;
        }

        & > button {
            width: 300px;
            height: 50px;
            font-size: 15px;
            padding: 10px;
            display: flex;
            justify-content: center;
            gap: 20px;
            align-items: center;

            &>svg  {
                height: 20px;
                width: 20px;
            }
        }

        &> button:last-child {
            color: #3559E0;
            background-color: white;
            
            &:hover {
                background-color: #3559E0;
                color: white;
                letter-spacing: 1px;
            }
        }
    }
`;