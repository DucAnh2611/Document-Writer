import { useContext } from "react";
import { FormStyleContext } from "../utils/FormStyleProvider";

export default function useStyleForm() {
    const { currentTextStyle, paragraphStyle, SetCurrentTextStyle, SetParagraphstyle } = useContext(FormStyleContext);

    return { currentTextStyle, paragraphStyle, SetCurrentTextStyle, SetParagraphstyle }
}