import React from "react";
import styled from "styled-components";

const BaseContent = styled.p`
    margin: 0;
    width: fit-content;
`;

export const SwitchContent = ({styleData, content, ...props}) => {

    const checkStyle = () => {
        let baseString = styleData.join(" ");
        let style = {};

        if(baseString.includes("bold")) {
            style = {
                ...style,
                fontWeight: "bold"
            }
        }
        if(baseString.includes("underline")) {
            style = {
                ...style,
                textDecoration: "underline"
            }
        }
        if(baseString.includes("italic")) {
            style = {
                ...style,
                fontStyle: "italic"
            }
        }

        return style;
    }
   return <BaseContent style={checkStyle()} {...props}>{
    content !== " " ? content
    :<React.Fragment>
        &#8232;
    </React.Fragment> 
    }</BaseContent>
}