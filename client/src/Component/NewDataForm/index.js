import { useRef, useState } from "react";
import FormSelectStyle from "./FormSelectStyle";
import useStyleForm from "../../Hooks/useStyleForm";
import PreviewContent from "../PreviewContent";
import { ButtonCreate, ButtonForm, ContentWrapper, FormAdd, MainFormAdd } from "./styles";

export default function NewDataForm({open, onOpen, onAdd, ...props}) {

    const {currentTextStyle, paragraphStyle} = useStyleForm();

    const [newdata, SetNewData] = useState([]);
    const [prevKey, SetPrevKey] = useState("");
    const [capretStart, SetCapretStart] = useState(1);
    const [capretEnd, SetCapretEnd] = useState(1);
    const textRef = useRef(null);

    const handleChangeContent = (e) => {
        if(e.key.length === 1) {
            if(prevKey === "") {
                let capret = capretStart + 1;

                SetCapretEnd(capret);
                SetCapretStart(capret);
                
                SetNewData(data => [
                    ...data.slice(0, capret-1),
                    {
                        key: e.key,
                        style: currentTextStyle
                    },
                    ...data.slice(capret-1)
                ]);   
            }
            else {
                prevKey !== "" && SetPrevKey("");
            }        
        }
        else if(e.key === "Control") {
            SetPrevKey("control");
        }
        else if(e.key === "Enter") {
            // handleAdd();
        }
        else if(e.key === "Backspace"){
            let end = capretEnd, start = capretStart;
            if(end === start) {
                start--;
            }

            SetCapretEnd(capretStart);
            SetCapretStart(capretStart);

            SetNewData(data => [
                ...data.slice(0, start),
                ...data.slice(end)
            ]);   

        } 
    }

    const handleSelectContent = (e) => {
        SetCapretEnd(e.target.selectionEnd);
        SetCapretStart(e.target.selectionStart);
    }

    const handleAdd = () => {
        onAdd({
            content: newdata,
            style: paragraphStyle
        });
        SetCapretEnd(1);
        SetCapretStart(1);
        SetPrevKey("");
        SetNewData([]);
    }

    return (
        <MainFormAdd>
        {
            open 
            ?<FormAdd>

                <ContentWrapper>
                    <p>Style</p>

                    <FormSelectStyle/>
                    
                    <p>Content</p>

                    <textarea
                    ref={textRef}
                    onSelect={handleSelectContent}
                    onKeyDown={handleChangeContent} 
                    onClick={handleSelectContent}
                    value={newdata.content}/> 

                    <p>Preview</p>

                    <PreviewContent content={newdata} capretStart={capretStart} capretEnd={capretEnd}/>                
                </ContentWrapper>

                <ButtonForm onClick={onOpen}>Close</ButtonForm>
                <ButtonForm onClick={handleAdd}>Add</ButtonForm>

            </FormAdd>
            :<ButtonCreate onClick={onOpen}>Add Content</ButtonCreate>
        }                
        </MainFormAdd>            

    )


}