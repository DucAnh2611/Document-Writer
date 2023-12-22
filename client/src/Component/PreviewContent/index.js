import { useContext } from "react"
import { FormStyleContext } from "../../utils/FormStyleProvider"
import { EachCharacter } from "./styled";
import { SwitchContent } from "./SwitchContent";
import SwitchParagraph from "./SwitchParagraph";

export default function PreviewContent({content, capretStart, capretEnd, ...props}) {

    const { paragraphStyle } = useContext(FormStyleContext);
    return (
        <SwitchParagraph style={{
            justifyContent: paragraphStyle.textAlign,
            fontSize: `${paragraphStyle.fontSize}px`
        }} type={paragraphStyle.type}>
            {content && content.map((e, id) => (
                <EachCharacter>
                    <SwitchContent key={id} styleData={e.style} content={e.key}/>        
                    
                    {id === capretEnd && <span className="capret"/> }
                    {content.length === capretEnd && id === content.length - 1 && <span className="capret" style={{right: 0, left: "100%"}}/> }   
                    {id < capretEnd && id >= capretStart && <span className="bold"/>}
                </EachCharacter>

            ))}
        </SwitchParagraph>
    )
}