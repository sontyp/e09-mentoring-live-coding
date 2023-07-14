import { useState, createContext, useEffect } from 'react';

import '../../css/App.css';

import TextBox from './Textbox';

// Create and export a context for the app theme
export const ThemeContext = createContext('');

function App() {
  // State for the current theme choice
  const [theme, setTheme] = useState('dark');


  // useEffect(() => {
  //   console.log(theme);
  // }, [theme]);

  // Click handler for the theme toggle button
  const onThemeToggle = () => {
    // Toggle the theme in the state
    setTheme(prevTheme => {
      return (prevTheme === 'dark') ? 'light' : 'dark';
    });
  };

  return (
    /* 
      Wrap all the dependant components inside the ThemeContext's Provider
      and preload it with the current theme from the state
    */
    <ThemeContext.Provider value={theme}>
      <div className="App" style={{
        backgroundColor: theme === 'dark' ? 'black' : 'white',
        color: theme === 'dark' ? 'white' : 'black'
      }}>
        <h1>Hello Context</h1>

        <button
          onClick={onThemeToggle}
        >Toggle Theme</button>

        <br />

        <TextBox />
      </div>
    </ThemeContext.Provider>
    
  );
}

export default App;
