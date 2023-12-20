import styled from "styled-components";

export const DetailModal = styled.div`
    display: none;
    flex-direction: column;
    justify-content: start;
    gap: 10px;
    position: absolute;
    height: fit-content;
    width: fit-content;
    box-shadow: 0 0 10px rgb(0, 0, 0, 0.5);
    bottom: -5px;
    right: 0;
    transform: translate(0, 100%);
    z-index: 1;
`;