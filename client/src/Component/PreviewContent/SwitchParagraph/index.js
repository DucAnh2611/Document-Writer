import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PreviewWrapper } from "../styled";
import { FirstLine, Level } from "./styled";
import { faCircle as cirSol, faSquare } from "@fortawesome/free-solid-svg-icons";
import { faCircle as cirReg } from "@fortawesome/free-regular-svg-icons";

const Paragraph = ({children}) => {
    return (
        <>
            <FirstLine/>
            {children}
        </>
    )
}

const LevelList = ({children, level=1}) => {

    const map = [
        {
            width: "37px",
            icon: cirSol
        },
        {
            width: "52px",
            icon: cirReg
        },
        
        {
            width: "62px",
            icon: faSquare
        }
    ]

    return <>
        <Level style={{width: map[level-1].width}}>
            <FontAwesomeIcon icon={map[level-1].icon} />
        </Level>
        {children}
    </>
}

const Invalid = ({children}) => <>{children}</>

export default function SwitchParagraph({children, type, ...props}) {

    const SwitchType = () => {
        switch(type) {
            case "normal": 
                return (
                    <Paragraph>
                        {children}
                    </Paragraph>
                );
            case "ul1": 
                return (
                    <LevelList level={1}>
                        {children}
                    </LevelList>
                );
            case "ul2": 
                return (
                    <LevelList level={2}>
                        {children}
                    </LevelList>
                );
            case "ul3": 
                return (
                    <LevelList level={3}>
                        {children}
                    </LevelList>
                );
            default:
                return (
                    <Invalid>
                        {children}
                    </Invalid>
                )
        }

    }

    return (
        <PreviewWrapper {...props}>
            <SwitchType>
                {children}    
            </SwitchType>      
        </PreviewWrapper>
    )
}