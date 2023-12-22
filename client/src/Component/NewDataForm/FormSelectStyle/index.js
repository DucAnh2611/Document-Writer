import { faAlignCenter, faAlignJustify, faAlignLeft, faAlignRight, faBold, faItalic, faListUl, faUnderline } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useStyleForm from "../../../Hooks/useStyleForm";
import { MainSelecStyle } from "./styled";

export default function FormSelectStyle({onSelectType, ...props}) {

    const { currentTextStyle, SetCurrentTextStyle, paragraphStyle, SetParagraphstyle } = useStyleForm();

    const mapAtr = {
        "left": faAlignLeft,
        "center": faAlignCenter,
        "right": faAlignRight,
        "space-between": faAlignJustify,
    }

    const mapType = {
        "h1": {
            text: "Header 1",
            fontSize: 28,
            current: ["bold"],
            justifyContent: "left"
        },
        "h2": {
            text: "Header 2",
            fontSize: 24,
            current: ["bold"],
            justifyContent: "left"
        },
        "h3": {
            text: "Header 3",
            fontSize: 20,
            current: ["bold"],
            justifyContent: "left"
        },
        "h4": {
            text: "Header 4",
            fontSize: 16,
            current: ["bold"],
            justifyContent: "left"
        },
        "normal": {
            text: "Normal",
            fontSize: 13,
            current: [''],
            justifyContent: paragraphStyle.textAlign
        },
        "ul1": {
            text: "List 1",
            fontSize: 13,
            current: [""],
            justifyContent: 'left'
        },
        "ul2": {
            text: "List 2",
            fontSize: 12,
            current: ["italic"],
            justifyContent: 'left'
        },
        "ul3": {
            text: "List 3",
            fontSize: 11,
            current: ["italic"],
            justifyContent: 'left'
        },
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

    const handleChangeCuStyle = (value, replace = false) => {
        SetCurrentTextStyle(style => replace ? value : Array.from( new Set([...style, ...value]) ));
    }

    const handleChangeSelect = (type) => {

        const {text , current, ...attr} = mapType[type];

        handleChangeCuStyle(current, true);

        handleChangePaStyle("type", type);
        handleChangePaStyle("fontSize", attr.fontSize);
        handleChangePaStyle("textAlign", attr.justifyContent);

        onSelectType(current);
    }

    return (
        <MainSelecStyle>
            {Object.entries(mapStyle).map(([key, value]) => (
                <button
                key={key}
                onClick={() => handleChangeCuStyle([key])}
                className={`${currentTextStyle.indexOf(key) !== -1 ? "selected" : ""}`} 
                ><FontAwesomeIcon icon={value}/></button>
            ))}

            <div>
                <input 
                type="number" 
                value={paragraphStyle.fontSize} 
                style={{width: "60px", padding: "5px 10px"}} 
                onChange={(e) => handleChangePaStyle("fontSize", e.target.value <= 6 ? 13 : e.target.value)}/>
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
            onChange={(e) => handleChangeSelect(e.target.value)}>
                {Object.entries(mapType).map(([key, value]) => (
                    <option key={key} value={key}>{value.text}</option>
                ))}
            </select>
        </MainSelecStyle>
    )
}