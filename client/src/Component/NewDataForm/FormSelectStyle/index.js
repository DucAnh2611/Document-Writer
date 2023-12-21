import { faAlignCenter, faAlignJustify, faAlignLeft, faAlignRight, faBold, faItalic, faListUl, faUnderline } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useStyleForm from "../../../Hooks/useStyleForm";
import { MainSelecStyle } from "./styled";

export default function FormSelectStyle() {

    const { currentTextStyle, SetCurrentTextStyle, paragraphStyle, SetParagraphstyle } = useStyleForm();

    const mapAtr = {
        "left": faAlignLeft,
        "center": faAlignCenter,
        "right": faAlignRight,
        "space-between": faAlignJustify,
    }

    const mapType = {
        "h1": "Header 1",
        "h2": "Header 2",
        "h3": "Header 3",
        "h4": "Header 4",
        "normal": "Normal",
        "ul1": "Level 1",
        "ul2": "Level 2",
        "ul3": "Level 3",
    }

    const mapStyle = {
        "bold": faBold,
        "italic": faItalic,
        "underline": faUnderline
    }

    const handleChangePaStyle = (field, value) => {
        SetParagraphstyle(style => ({
            ...style, 
            [field]: value
        }));
    }

    const handleChangeCuStyle = (value) => {
        SetCurrentTextStyle(style => {
            if(style.filter(e => e === value).length !== 0){
                return style.filter(e => e !== value);
            }
            return [...style, value];
        });
    }

    return (
        <MainSelecStyle>
            {Object.entries(mapStyle).map(([key, value]) => (
                <button
                key={key}
                onClick={() => handleChangeCuStyle(key)}
                className={`${currentTextStyle.indexOf(key) !== -1 ? "selected" : ""}`} 
                ><FontAwesomeIcon icon={value}/></button>
            ))}

            <div>
                <input 
                type="number" 
                value={paragraphStyle.fontSize} 
                style={{width: "60px", padding: "5px 10px"}} 
                onChange={(e) => handleChangePaStyle("fontSize", e.target.value <= 0 ? 13 : e.target.value)}/>
                <p>px</p>                
            </div>


            {Object.entries(mapAtr).map(([key, value]) => (
                <button 
                key={key} 
                onClick={() => handleChangePaStyle("textAlign", key)}
                className={`${paragraphStyle.textAlign === key ? "selected" : ""}`} ><FontAwesomeIcon icon={value} /></button>
            ))}

            <select 
            value={paragraphStyle.type}
            onChange={(e) => handleChangePaStyle("type", e.target.value)}>
                {Object.entries(mapType).map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                ))}
            </select>
        </MainSelecStyle>
    )
}