

// ##  useContext — Global Data

// **Simple matlab:** Prop drilling se bachao — seedha kisi bhi component mein data lo

// Bina Context — Prop Drilling:
// App → Header → Navbar → Button  (hар jagah props pass karo 😫)

// Context se:
// App (Provider)
//   ↓ seedha
//   Button (useContext)  


//   // 3 steps:
// // 1 — Context banao
// const ThemeContext = createContext();

// // 2 — Provider se wrap karo
// <ThemeContext.Provider value={{ theme, setTheme }}>
//   <App />
// </ThemeContext.Provider>

// // 3 — Koi bhi component mein use karo
// const { theme } = useContext(ThemeContext);
































import { useState, useContext, createContext } from 'react';

// 1 — Context banao
const ThemeContext = createContext();

// 2 — Custom hook — easy use ke liye
function useTheme() {
  return useContext(ThemeContext);
}

// Deep nested component — props nahi chahiye!
function DeepButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      style={{
        background: theme === 'dark' ? '#2563EB' : '#1A1A2E',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer'
      }}
    >
      Toggle Theme
    </button>
  );
}

function Card() {
  const { theme } = useTheme();
  return (
    <div style={{
      background: theme === 'dark' ? '#1E293B' : '#F8FAFC',
      color:      theme === 'dark' ? 'white'   : '#1A1A2E',
      border:     '2px solid #2563EB',
      borderRadius: '10px',
      padding: '15px',
      margin: '10px 0'
    }}>
      <h3>Card Component</h3>
      <p>Theme: {theme}</p>
      <DeepButton />
    </div>
  );
}

// 3 — Provider
function UseContext() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(t => t === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div style={{
        background: theme === 'dark' ? '#0F172A' : 'white',
        color:      theme === 'dark' ? 'white'   : '#1A1A2E',
        padding: '20px',
        borderRadius: '10px',
        transition: 'all 0.3s'
      }}>
        <h2>useContext Demo</h2>
        <p>Current Theme: <strong>{theme}</strong></p>
        <Card />
      </div>
    </ThemeContext.Provider>
  );
}

export default UseContext;