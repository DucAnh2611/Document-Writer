import { useRef, useState } from "react";
import FormSelectStyle from "./FormSelectStyle";
import useStyleForm from "../../Hooks/useStyleForm";
import PreviewContent from "../PreviewContent";
import { ButtonCreate, ButtonForm, ContentWrapper, FormAdd, MainFormAdd } from "./styles";

export default function NewDataForm({open, onOpen, onAdd, ...props}) {

    const {currentTextStyle, paragraphStyle} = useStyleForm();

    const [newdata, SetNewData] = useState([]);
    const [capretStart, SetCapretStart] = useState(1);
    const [capretEnd, SetCapretEnd] = useState(1);
    const textRef = useRef(null);

    const handleChangeSelect = (style) => {
        
        SetNewData(data => data.map( e => ({
            ...e,
            style: style
        }) ));   
    }

    const handleChangeContent = (e) => {
        if(e.key.length === 1) {
            if(!e.ctrlKey) {
                let capret = capretStart + 1;

                SetCapretEnd(capret);
                SetCapretStart(capret);
                
                SetNewData(data => [
                    ...data.slice(0, capret-1),
                    {
                        key: e.shiftKey ? e.key.toUpperCase() : e.key,
                        style: currentTextStyle
                    },
                    ...data.slice(capret-1)
                ]);   
            }
        }
        else if(e.key === "Enter") {
            handleAdd();
        }
        else if(e.key === "Backspace"){
            let end = capretEnd, start = capretStart;
            if(end === start && start !== 0) {
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

    const resetData = () => {

        SetCapretEnd(1);
        SetCapretStart(1);
        SetNewData([]);
    }

    const handleAdd = () => {
        onAdd({
            content: newdata,
            style: paragraphStyle
        });
        resetData();
    }

    const handleClose = () => {
        onOpen();
        resetData();
    }

    return (
        <MainFormAdd {...props}>
        {
            open 
            ?<FormAdd>

                <ContentWrapper>
                    <p>Style</p>

                    <FormSelectStyle onSelectType={handleChangeSelect}/>
                    
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

                <ButtonForm onClick={handleClose}>Close</ButtonForm>
                <ButtonForm onClick={handleAdd}>Add</ButtonForm>

            </FormAdd>
            :<ButtonCreate onClick={handleClose}>Add Content</ButtonCreate>
        }                
        </MainFormAdd>            
    )

}