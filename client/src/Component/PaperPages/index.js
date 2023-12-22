import { useState } from "react";
import { PaperMain } from "./styles";
import NewDataForm from "../NewDataForm";
import FormStyleProvider from "../../utils/FormStyleProvider";
import DisplayContent from "../DisplayContent";

export default function PaperPages({data, SetData, ...props}) {

    const [open, SetOpen] = useState(false);

    const handleClickCreateContent = () => {
        SetOpen(open => !open);
    }

    const onAddNewData = (newdata) => {
        handleClickCreateContent();
        SetData([...data, newdata]);
    }
    
    return (
        <PaperMain className="paper">
            {
            data && data.map(e => (
                <DisplayContent paragraphStyle={e.style} content={e.content} />
            ))
            }
            <FormStyleProvider>
                <NewDataForm open={open} onOpen={handleClickCreateContent} onAdd={onAddNewData}/>
            </FormStyleProvider>
        </PaperMain>
    )
}