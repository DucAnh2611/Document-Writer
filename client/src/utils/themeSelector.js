import { useEffect, useState } from "react";
import { getfromLS } from "./themeStorage"
import { useTheme } from "../Hooks/useTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as solid from '@fortawesome/free-solid-svg-icons';
import _ from "lodash";

export default function ThemeSelector (props) {
    const themesFromStore = getfromLS("all-themes");
    const [data, SetData] = useState(themesFromStore.data);
    const [themes, SetThemes] = useState([]);
    const {theme, setMode} = useTheme();

    const themeSwitcher = (selectedTheme) => {
        setMode(selectedTheme);
        props.setter(selectedTheme);
    }

    useEffect(() => {
        SetThemes(_.keys(data));
    }, [data]);


    return (
    <div>
        <button 
        style={{
            height: "40px",
            width: "40px",
            borderRadius: '100%',
        }}
        onClick={() => themeSwitcher(theme.name === "light" ? data.dark : data.light)}>
            <FontAwesomeIcon icon={theme.name === "light" ? solid.faMoon : solid.faLightbulb}/>
        </button>
    </div>)
}