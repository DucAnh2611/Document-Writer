import { useContext } from "react"
import { ListDocContext } from "../utils/ListDocProvider"

export default function useListDoc() {
    const {listDoc, SetListDoc} = useContext(ListDocContext);

    return {listDoc, SetListDoc};
}