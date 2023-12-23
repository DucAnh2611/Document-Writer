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

    button.current {
        background-color: ${({ theme }) => theme.colors.button.hover.background};
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
    }

    div.notification_container {
        height: fit-content;
        width: fit-content;
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: transparent;
        z-index: 1;
    }

    @keyframes fromtop {
        0% {
            transform: translateY(-100%);
        }
        100% {
            transform: translateY(0);
        }
    }

    
    div.notification {
        animation-name: fromtop;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        background-color: ${({ theme }) => theme.colors.button.background};
        &>p {
            color: ${({ theme }) => theme.colors.text};
        }
    }

    textarea, input, select {
        resize: none;
        background: ${({ theme }) => theme.colors.body};
        color: ${({ theme }) => theme.colors.text};
        font-family: ${({ theme }) => theme.font};
        padding: 10px;
        box-sizing: border-box;
        font-size: 15px;
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

    input:focus {
        background: ${({ theme }) => theme.colors.button.hover.background};
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

    @keyframes capret {
        0% {
            opacity: 0;
        }  
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }

    span.bold {
        background-color: ${({ theme }) => theme.colors.text};
        opacity: .1;

        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    span.capret {
        height: 100%;
        width: 10px;
        position: absolute;
        top: 0;
        right: -10px;
        
        box-shadow: 0 0 10px ${({ theme }) => theme.colors.text};
        background-color: ${({ theme }) => theme.colors.text};

        animation: capret 1s linear infinite;
    }

    .quill {
        display:flex;
        flex-direction: column;
        position: relative;
        height: fit-content;
        overflow-y: auto;
    }
    .ql-toolbar {
        position: sticky;
        top: 0;
        height: 50px;
        width: 100%;
        display: flex;
        align-items: center;
        background-color: ${({ theme }) => theme.colors.body};
        z-index: 1;
    }
    .ql-container{
        flex-grow: 1;
        overflow: hidden;
        box-sizing: border-box;
        font-size: 14px;
    }
    .ql-formats > *{
        color: ${({ theme }) => theme.colors.text};
    }
    .ql-editor{
        font-family: ${({ theme }) => theme.font};
    }

    .ql-editor .ql-size-small {
        font-size: 10px;
    }

    .ql-editor .ql-size-large {
        font-size: 20px;
    }

    .ql-editor .ql-size-huge {
        font-size: 22px;
    }
`;