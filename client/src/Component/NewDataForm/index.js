import { useMemo, useRef, useState } from "react";
import FormSelectStyle from "./FormSelectStyle";
import useStyleForm from "../../Hooks/useStyleForm";

export default function NewDataForm({open, onOpen, onAdd, ...props}) {

    const {currentTextStyle, paragraphStyle} = useStyleForm();

    const [newdata, SetNewData] = useState([{
        key: "",
        style: currentTextStyle
    }]);
    const textRef = useRef(null);

    const handleChangeContent = (e) => {
          
        if(e.key.length === 1 ) {
            if(e.key !== " "){
                SetNewData(data => [
                    ...data.slice(0, -1),
                    {
                        key: data[data.length - 1].key + e.key,
                        style: currentTextStyle
                    }
                ]);                 
            }
            else {
                SetNewData(data => [
                    ...data,
                    {
                        key: "",
                        style: currentTextStyle
                    }
                ])
            }

        }
        else if(e.key === "Enter") {
            // handleAdd();
        }
    }

    const handleAdd = () => {
        onAdd({
            content: newdata,
            style: paragraphStyle
        });
    }

    useMemo(() => {
        console.log(newdata);
    }, [newdata]);

    return (
        <div>
        {
            open 
            ?<div>
                
                <FormSelectStyle/>
                
                <textarea
                ref={textRef}
                placeholder="Your content" onKeyDown={handleChangeContent} value={newdata.content}/>

                <button onClick={onOpen}>Close</button>
                <button onClick={handleAdd}>Add</button>
            </div>
            :<button onClick={onOpen}>Add new Content</button>
        }                
        </div>            

    )


}