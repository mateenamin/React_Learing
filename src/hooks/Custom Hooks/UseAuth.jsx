

// ## 2️⃣ useAuth — Kya Karta Hai?

// Login, Logout, User info — sab ek jagah manage karo
// jsxfunction useAuth() {
//   const [user, setUser]         = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const login = (userData) => {
//     setUser(userData);
//     setIsLoggedIn(true);
//     localStorage.setItem('user', JSON.stringify(userData));
//   };

//   const logout = () => {
//     setUser(null);
//     setIsLoggedIn(false);
//     localStorage.removeItem('user');
//   };

//   return { user, isLoggedIn, login, logout };
// }

// // Use karo
// function App() {
//   const { user, isLoggedIn, login, logout } = useAuth();
//   // sab ek jagah! ✅
// }








import { useState, useEffect } from 'react';

function UseAuth() {
  const [user, setUser]         = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading]   = useState(true);

  // Page load pe localStorage check karo
  useEffect(() => {
    const savedUser = localStorage.getItem('auth_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  // Login
  const login = async (email, password) => {
    // Fake API — 1 second delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Fake credentials check
        if (email === 'mateen@gmail.com' && password === '12345') {
          const userData = {
            id:    1,
            name:  'Mateen Amin',
            email: email,
            role:  'admin',
            city:  'Lahore',
          };
          setUser(userData);
          setIsLoggedIn(true);
          localStorage.setItem('auth_user', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject('Email ya password galat hai!');
        }
      }, 1000);
    });
  };

  // Logout
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('auth_user');
  };

  // Update user
  const updateUser = (newData) => {
    const updated = { ...user, ...newData };
    setUser(updated);
    localStorage.setItem('auth_user', JSON.stringify(updated));
  };

  return {
    user,
    isLoggedIn,
    loading,
    login,
    logout,
    updateUser,
  };
}

export default UseAuth;