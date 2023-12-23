import { PaperMain } from "./styles";
import Quill from "../Quill";

export default function PaperPages({data, SetData, ...props}) {

    return (
        <PaperMain className="paper">
            <Quill data={data} SetData={SetData}/>
        </PaperMain>
    )
}