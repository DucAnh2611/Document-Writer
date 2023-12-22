import { SwitchContent } from "../PreviewContent/SwitchContent";
import SwitchParagraph from "../PreviewContent/SwitchParagraph";
import { EachCharacter } from "../PreviewContent/styled";

export default function DisplayContent({content, paragraphStyle, ...props}) {

    return (
        <SwitchParagraph style={{
            justifyContent: paragraphStyle.textAlign,
            fontSize: `${paragraphStyle.fontSize}px`,
            padding: "0 0 5px 0"
        }} type={paragraphStyle.type}>
            {content && content.map((e, id) => (
                <EachCharacter>
                    <SwitchContent key={id} styleData={e.style} content={e.key}/>  
                </EachCharacter>

            ))}
        </SwitchParagraph>
    )
}