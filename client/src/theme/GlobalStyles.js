import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    html {
        height: 100%;
    }

    body {
        background: ${({ theme }) => theme.colors.body};
        color: ${({ theme }) => theme.colors.text};
        font-family: ${({ theme }) => theme.font};
        transition-duration: .2s;
        height: 100%;
    }

    a {
        color: ${({ theme }) => theme.colors.link.text};
        text-decoration: underline;
        font-style: normal;
        cursor: pointer;
    }

    nav {
        height: 100%;
        width: 380px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-right: ${({ theme }) => theme.colors.nav.border.weight} solid ${({ theme }) => theme.colors.nav.border.color};
    }

    button {
        cursor: pointer;
        box-sizing: border-box;
        background-color: ${({ theme }) => theme.colors.button.background};
        color: ${({ theme }) => theme.colors.button.text};
        font-family: ${({ theme }) => theme.font};
        transition-duration: .15s;
        border: none;
    }

    button:not(:disabled):hover {
        background-color: ${({ theme }) => theme.colors.button.hover.background};
        color: ${({ theme }) => theme.colors.button.hover.text};
        /* transform: scale(1.05); */
    }

    button:disabled {
        opacity: 0.5;
        cursor: default;
    }

    button.selected {
        background-color: ${({ theme }) => theme.colors.button.hover.background};
        color: ${({ theme }) => theme.colors.button.hover.text};
    }

    div#root {
        height: 100%;
    } 

    div.card {
        height: fit-content;
        /* border-top: ${({ theme }) => theme.colors.card.border.weight} solid ${({ theme }) => theme.colors.card.border.color}; */
        border-bottom: ${({ theme }) => theme.colors.card.border.weight} solid ${({ theme }) => theme.colors.card.border.color};
        background-color: ${({ theme }) => theme.colors.card.background};
    } 

    div.card:hover {
        background-color:${({ theme }) => theme.colors.card.hover.background}
    } 

    div.cardDetail {
        background-color: ${({ theme }) => theme.colors.card_detail.background};
        border-radius: 10px;
        padding: 20px;
    } 

    div.paper {
        background-color: ${({ theme }) => theme.colors.paper.background};
        color: ${({ theme }) => theme.colors.paper.text};
        border: ${({ theme }) => theme.colors.paper.border.weight} solid ${({ theme }) => theme.colors.paper.border.color};
    }

    textarea, input {
        resize: none;
        background: ${({ theme }) => theme.colors.body};
        color: ${({ theme }) => theme.colors.text};
        font-family: ${({ theme }) => theme.font};
        padding: 10px;
        box-sizing: border-box;
        font-size: 13px;
        outline: none;
        border-radius: 10px;
        width: 100%;
        height: 150px;
        transition-duration: .15s;
    }

    input {
        height: fit-content;
        padding: 10px 20px;
        width: 200px;
        font-family: ${({ theme }) => theme.font};
        border: ${({ theme }) => theme.colors.paper.border.weight} solid ${({ theme }) => theme.colors.paper.border.color};
    }

    textarea:focus {
        border: 3px solid ${({ theme }) => theme.colors.text}
    }

    @keyframes loading {
        0% {
            transform: rotate(0deg)
        }   
        100% {
            transform: rotate(360deg)
        }
    }
    span.loading_svg{
        animation: loading 1.5s linear infinite;
    } 
`;