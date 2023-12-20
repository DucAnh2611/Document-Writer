import './App.css';
import AppRouter from './Component/AppRouter';
import ThemeContextProvider from './Component/ThemeContextProvider';
import { useTheme } from './Hooks/useTheme';
import { GlobalStyles } from './theme/GlobalStyles';

function App() {
  const {themeLoaded} = useTheme();

  return (
    <>
      {themeLoaded && 
      <ThemeContextProvider>

        <GlobalStyles />

        <div className="App">
            <AppRouter/>  
        </div> 

      </ThemeContextProvider>}    
    </>

  );
}

export default App;
