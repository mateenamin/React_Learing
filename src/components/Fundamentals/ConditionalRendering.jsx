// Conditional Rendering — Kya Hai?
// Simple matlab: Condition ke hisaab se kuch dikhao ya chhupaao
// jsx// 3 tarike hain:

// // Tarika 1 — if/else
// if (isLoggedIn) {
//   return <h1>Welcome Mateen!</h1>;
// } else {
//   return <h1>Please Login</h1>;
// }

// // Tarika 2 — Ternary ? :
// <h1>{isLoggedIn ? 'Welcome!' : 'Please Login'}</h1>

// // Tarika 3 — && operator
// {isLoggedIn && <h1>Welcome!</h1>}
// // isLoggedIn true ho toh dikhao — warna kuch nahi













import { useState } from 'react';

function ConditionalRendering() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole]             = useState('user');
  const [count, setCount]           = useState(0);
  const [isLoading, setIsLoading]   = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoggedIn(true);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div>
      <h2>Conditional Rendering</h2>

      {/* Tarika 1 — if/else */}
      <div style={{ border: '2px solid #2563EB',
        borderRadius: '10px', padding: '15px', marginBottom: '15px' }}>
        <h3>Tarika 1 — if/else</h3>

        {isLoading ? (
          <p>⏳ Loading...</p>
        ) : isLoggedIn ? (
          <div>
            <p>✅ Welcome Mateen!</p>
            <button onClick={() => setIsLoggedIn(false)}
              style={{ background: '#DC2626', color: 'white',
                padding: '8px 16px', border: 'none',
                borderRadius: '6px', cursor: 'pointer' }}>
              Logout
            </button>
          </div>
        ) : (
          <div>
            <p>❌ Tum logged out ho</p>
            <button onClick={handleLogin}
              style={{ background: '#16A34A', color: 'white',
                padding: '8px 16px', border: 'none',
                borderRadius: '6px', cursor: 'pointer' }}>
              Login
            </button>
          </div>
        )}
      </div>

      {/* Tarika 2 — && operator */}
      <div style={{ border: '2px solid #16A34A',
        borderRadius: '10px', padding: '15px', marginBottom: '15px' }}>
        <h3>Tarika 2 — && Operator</h3>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ padding: '8px', marginBottom: '10px' }}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="moderator">Moderator</option>
        </select>

        {/* Sirf admin ko dikhao */}
        {role === 'admin' && (
          <div style={{ background: '#FEF3C7', padding: '10px',
            borderRadius: '8px' }}>
            🔐 Admin Panel — Sirf admin dekh sakta hai!
          </div>
        )}

        {/* Sirf moderator ko dikhao */}
        {role === 'moderator' && (
          <div style={{ background: '#EFF6FF', padding: '10px',
            borderRadius: '8px' }}>
            🛡️ Moderator Tools — Content manage karo
          </div>
        )}

        {/* Normal user */}
        {role === 'user' && (
          <div style={{ background: '#F0FDF4', padding: '10px',
            borderRadius: '8px' }}>
            👤 Normal User — Basic access
          </div>
        )}
      </div>

      {/* Tarika 3 — Real World */}
      <div style={{ border: '2px solid #7C3AED',
        borderRadius: '10px', padding: '15px' }}>
        <h3>Tarika 3 — Real World Example</h3>

        <button onClick={() => setCount(count + 1)}
          style={{ padding: '8px 16px', marginBottom: '10px',
            background: '#7C3AED', color: 'white',
            border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          Count: {count}
        </button>

        {/* Count ke hisaab se message */}
        {count === 0 && <p>Button abhi dabaya nahi</p>}
        {count > 0 && count < 5 && <p>🟡 Thoda dabaya — {count} baar</p>}
        {count >= 5 && count < 10 && <p>🟠 Zyada daba raha hai — {count} baar</p>}
        {count >= 10 && <p style={{ color: 'red' }}>🔴 Bahut zyada! — {count} baar</p>}
      </div>
    </div>
  );
}

export default ConditionalRendering;