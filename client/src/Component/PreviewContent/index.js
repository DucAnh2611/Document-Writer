import { useContext } from "react"
import { FormStyleContext } from "../../utils/FormStyleProvider"
import { EachCharacter, PreviewWrapper } from "./styled";
import { SwitchContent } from "./SwitchContent";

export default function PreviewContent({content, capretStart, capretEnd, ...props}) {

    const { currentTextStyle, paragraphStyle } = useContext(FormStyleContext);

    const ConvertType = () => {
    }

    return (
        <PreviewWrapper style={{
            justifyContent: paragraphStyle.textAlign
        }}>
            {content && content.map((e, id) => (
                <EachCharacter>
                    <SwitchContent key={id} styleData={e.style} content={e.key}/>        
                    
                    {id === capretEnd && <span className="capret"/> }
                    {content.length === capretEnd && id === content.length - 1 && <span className="capret" style={{right: 0, left: "100%"}}/> }   
                    {id < capretEnd && id >= capretStart && <span className="bold"/>}
                </EachCharacter>

            ))}
        </PreviewWrapper>
    )
}