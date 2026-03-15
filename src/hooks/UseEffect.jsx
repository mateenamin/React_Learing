
// ##  useEffect — Side Effects

// **Simple matlab:** Component render hone ke baad kuch karo

// Side Effect = Jo React ke bahar ho
// API call, timer, event listener — yeh sab side effects hain




// // 3 tarike:

// // 1 — Har render pe chale
// useEffect(() => {
//   console.log('Har baar chala!');
// });

// // 2 — Sirf ek baar — mount pe
// useEffect(() => {
//   console.log('Sirf ek baar!');
// }, []);  // [] = empty dependency

// // 3 — Jab value change ho
// useEffect(() => {
//   console.log('count badla:', count);
// }, [count]);  // count change pe chale











import { useState, useEffect } from 'react';

function UseEffect() {
  const [count, setCount]   = useState(0);
  const [users, setUsers]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // 1 — Sirf ek baar — API call
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(r  => r.json())
      .then(d  => {
        setUsers(d.slice(0, 5));  // sirf 5 users
        setLoading(false);
      });
  }, []);  // [] — sirf mount pe

  // 2 — count change pe — title update
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  // 3 — Timer with Cleanup
  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    // Cleanup — timer band karo
    return () => clearInterval(timer);
  }, [isRunning]);

  return (
    <div>
      <h2>useEffect Demo</h2>

      {/* Counter — title change dekho browser tab mein */}
      <div style={{ marginBottom: '15px', padding: '15px',
        border: '2px solid #2563EB', borderRadius: '10px' }}>
        <h3>Effect 1 — Title Update</h3>
        <p>Browser tab mein title change hoga!</p>
        <h1>{count}</h1>
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>

      {/* API call */}
      <div style={{ marginBottom: '15px', padding: '15px',
        border: '2px solid #16A34A', borderRadius: '10px' }}>
        <h3>Effect 2 — API Call (sirf ek baar)</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {users.map(u => (
              <li key={u.id}>{u.name} — {u.email}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Timer with cleanup */}
      <div style={{ padding: '15px',
        border: '2px solid #EA580C', borderRadius: '10px' }}>
        <h3>Effect 3 — Timer with Cleanup</h3>
        <h1>{seconds}s</h1>
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? '⏸ Pause' : '▶️ Start'}
        </button>
        <button onClick={() => { setSeconds(0); setIsRunning(false); }}>
          🔄 Reset
        </button>
      </div>
    </div>
  );
}

export default UseEffect;