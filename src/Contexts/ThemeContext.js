import { createContext, useState } from "react";
import { createTheme } from '@mui/material/styles';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#5c6bc0', // Postavite glavnu boju za primarnu boju
      },
      secondary: {
        main: '#26a69a', // Postavite glavnu boju za sekundarnu boju
      },  
      third: {
        main: '#ef5350',
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, theme }}>
      {children}
    </ThemeContext.Provider>
  )
}