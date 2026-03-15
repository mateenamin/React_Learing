
// use() — Kya Hai?
// Simple matlab: Promise ya Context — render mein seedha padho
// jsx

// // useContext — conditionally call nahi kar sakte
// if (something) {
//   const theme = useContext(ThemeContext); // ❌ Error!
// }

// // use() — conditionally bhi call kar sakte ho!
// if (something) {
//   const theme = use(ThemeContext); // ✅ Kaam karta hai!
// }

// // Promise ke saath
// const data = use(fetchDataPromise); // Promise resolve hone tak suspend















import { use, Suspense, createContext, useContext, useState } from 'react';

// ── use() with Context ──────────────────────
const UserContext = createContext(null);

function UserProfile({ showDetails }) {
  // use() — conditionally bhi call kar sakte ho!
  if (!showDetails) {
    return <p>Details hidden hain</p>;
  }

  // useContext yahan error deta — early return ke baad
  // use() kaam karta hai! ✅
  const user = use(UserContext);

  return (
    <div style={{ background: '#F0FDF4', padding: '12px',
      borderRadius: '8px' }}>
      <p>Name: {user.name}</p>
      <p>City: {user.city}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}

// ── use() with Promise ──────────────────────
function fetchUsers() {
  return fetch('https://jsonplaceholder.typicode.com/users?_limit=3')
    .then(r => r.json());
}

function UserList({ usersPromise }) {
  // use() — Promise resolve hone tak suspend karega
  const users = use(usersPromise);

  return (
    <ul>
      {users.map(u => (
        <li key={u.id} style={{ padding: '6px 0',
          borderBottom: '1px solid #eee' }}>
          {u.name} — {u.email}
        </li>
      ))}
    </ul>
  );
}

function UseAPI() {
  const [showDetails, setShowDetails] = useState(false);
  const [usersPromise] = useState(() => fetchUsers());

  const user = {
    name: 'Mateen Amin',
    city: 'Lahore',
    role: 'MERN Developer'
  };

  return (
    <div>
      <h2>use() API Demo</h2>

      {/* use() with Context */}
      <div style={{ border: '2px solid #7C3AED',
        borderRadius: '10px', padding: '20px', marginBottom: '20px' }}>
        <h3>use() with Context</h3>
        <p style={{ color: '#666', marginBottom: '10px' }}>
          useContext conditionally call nahi kar sakte
          — use() kar sakte ho! ✅
        </p>

        <button
          onClick={() => setShowDetails(!showDetails)}
          style={{ background: '#7C3AED', color: 'white',
            padding: '8px 16px', border: 'none',
            borderRadius: '6px', cursor: 'pointer',
            marginBottom: '10px' }}
        >
          {showDetails ? 'Hide' : 'Show'} Details
        </button>

        <UserContext.Provider value={user}>
          <UserProfile showDetails={showDetails} />
        </UserContext.Provider>
      </div>

      {/* use() with Promise + Suspense */}
      <div style={{ border: '2px solid #0D9488',
        borderRadius: '10px', padding: '20px' }}>
        <h3>use() with Promise + Suspense</h3>
        <p style={{ color: '#666', marginBottom: '10px' }}>
          Promise resolve hone tak Suspense loading dikhata hai
        </p>

        <Suspense fallback={
          <div style={{ padding: '20px', textAlign: 'center',
            color: '#666' }}>
            ⏳ Users load ho rahe hain...
          </div>
        }>
          <UserList usersPromise={usersPromise} />
        </Suspense>
      </div>
    </div>
  );
}

export default UseAPI;