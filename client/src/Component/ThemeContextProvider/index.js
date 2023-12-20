import { createContext, useEffect, useState } from "react";
import { useTheme } from "../../Hooks/useTheme";
import WebFont from "webfontloader";
import { ThemeProvider } from "styled-components";

export const ThemeContext = createContext();

export default function ThemeContextProvider({children}) {
    
    const {theme, themeLoaded, getFonts} = useTheme();
    const [selectedTheme, SetSelectedTheme] = useState(theme);

    useEffect(() => {
        SetSelectedTheme(theme);
    }, [theme, themeLoaded]);

    useEffect(() => {
        WebFont.load({
            google: {
                families: getFonts()
            }
        });
    }, []);
    
    return (
        <ThemeContext.Provider value={{selectedTheme, SetSelectedTheme}}>
            <ThemeProvider theme={selectedTheme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}