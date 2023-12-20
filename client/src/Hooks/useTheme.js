import { useEffect, useState } from "react";
import { getfromLS, setToLS } from "../utils/themeStorage";
import _ from "lodash";

export const useTheme = () => {
    const themes = getfromLS('all-themes');
    const [theme, setTheme] = useState(themes.data.dark);
    const [themeLoaded, setThemeLoaded] = useState(false);
  
    const setMode = mode => {
      setToLS('theme', mode)
      setTheme(mode);
    };
  
    const getFonts = () => {
      const allFonts = _.values(_.mapValues(themes.data, 'font'));
      return allFonts;
    }
  
    useEffect(() =>{
      const localTheme = getfromLS('theme');
      localTheme ? setTheme(localTheme) : setTheme(themes.data.dark);
      setThemeLoaded(true);
    }, []);
  
    return { theme, themeLoaded, setMode, getFonts };
  };