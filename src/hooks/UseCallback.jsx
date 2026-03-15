
// ## useMemo vs useCallback — Farq:

// useMemo     → Value cache karo
// useCallback → Function cache karo

// useMemo(    () => calculate(), [dep]) → Result return karta hai
// useCallback(() => myFunction(), [dep]) → Function return karta hai










// useCallback — Kya Hai?
// Simple matlab: Function ko cache karo — baar baar naya mat banao


// // Problem — bina useCallback
// function Parent() {
//   const [count, setCount] = useState(0);

//   // Har render pe naya function banta hai!
//   const handleClick = () => {
//     console.log('Clicked!');
//   };

//   return (
//     <>
//       <button onClick={() => setCount(count + 1)}>
//         Count: {count}
//       </button>
//       <Child onClick={handleClick} />
//       // Parent re-render hoga
//       // handleClick naya banega
//       // Child bhi re-render hoga 😫
//     </>
//   );
// }

// // Solution — useCallback
// function Parent() {
//   const [count, setCount] = useState(0);

//   // Function cache ho gaya — naya nahi banega
//   const handleClick = useCallback(() => {
//     console.log('Clicked!');
//   }, []); // dependencies

//   return (
//     <>
//       <button onClick={() => setCount(count + 1)}>
//         Count: {count}
//       </button>
//       <Child onClick={handleClick} />
//       // Parent re-render hoga
//       // handleClick same rahega
//       // Child re-render nahi hoga ✅
//     </>
//   );
// }

















import { useState, useCallback, memo } from 'react';

// ── React.memo — props same ho toh re-render mat karo
const Button = memo(function Button({ label, onClick, color = '#2563EB' }) {
  console.log(`Button render hua: ${label}`);
  return (
    <button
      onClick={onClick}
      style={{
        background: color,
        color: 'white',
        padding: '8px 16px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        margin: '4px',
      }}
    >
      {label}
    </button>
  );
});

// ── Todo Item — memo se wrap
const TodoItem = memo(function TodoItem({ todo, onDelete, onToggle }) {
  console.log(`TodoItem render hua: ${todo.text}`);
  return (
    <li style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '10px',
      marginBottom: '8px',
      background: '#F8FAFC',
      borderRadius: '8px',
      border: '1px solid #E2E8F0',
    }}>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />
      <span style={{
        flex: 1,
        textDecoration: todo.done ? 'line-through' : 'none',
        color: todo.done ? '#888' : '#1A1A2E',
      }}>
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        style={{
          background: '#DC2626',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          padding: '4px 8px',
          cursor: 'pointer',
        }}
      >
        ❌
      </button>
    </li>
  );
});

function UseCallback() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'React seekhna',   done: false },
    { id: 2, text: 'Node.js seekhna', done: false },
    { id: 3, text: 'MongoDB seekhna', done: true  },
  ]);
  const [input,  setInput]  = useState('');
  const [count,  setCount]  = useState(0);
  const [renderLog, setRenderLog] = useState([]);

  const addLog = (msg) => {
    setRenderLog(prev => [
      { id: Date.now(), msg, time: new Date().toLocaleTimeString() },
      ...prev.slice(0, 4)
    ]);
  };

  // ── Bina useCallback ──────────────────────
  // Har render pe naya function banega
  // TodoItem bhi re-render hoga
  // const handleDelete = (id) => { ... } // ❌

  // ── useCallback ──────────────────────────
  // Function cache — sirf todos change pe naya banega
  const handleDelete = useCallback((id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
    addLog('Delete function chala');
  }, []); // [] — function kabhi nahi badlega

  const handleToggle = useCallback((id) => {
    setTodos(prev =>
      prev.map(t =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
    addLog('Toggle function chala');
  }, []);

  const handleAdd = useCallback(() => {
    if (!input.trim()) return;
    setTodos(prev => [
      ...prev,
      { id: Date.now(), text: input, done: false }
    ]);
    setInput('');
    addLog('Add function chala');
  }, [input]); // input change pe naya function banega

  return (
    <div>
      <h2>useCallback Demo</h2>

      {/* Explanation */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
        <div style={{ flex: 1, background: '#FEE2E2',
          padding: '15px', borderRadius: '10px' }}>
          <h4>❌ Bina useCallback</h4>
          <p style={{ fontSize: '13px', color: '#666' }}>
            Har render pe naya function banta hai
            — Child component bhi re-render hota hai
          </p>
        </div>
        <div style={{ flex: 1, background: '#DCFCE7',
          padding: '15px', borderRadius: '10px' }}>
          <h4>✅ useCallback ke saath</h4>
          <p style={{ fontSize: '13px', color: '#666' }}>
            Function cache hota hai
            — Child re-render nahi hota
          </p>
        </div>
      </div>

      {/* Counter — sirf count badlega — todos nahi */}
      <div style={{ border: '2px solid #7C3AED',
        borderRadius: '10px', padding: '15px', marginBottom: '15px' }}>
        <h3>Test — Counter badlao</h3>
        <p style={{ color: '#666', fontSize: '14px' }}>
          Console dekho — counter badhne pe
          TodoItems re-render nahi honge! ✅
        </p>
        <h2 style={{ color: '#7C3AED' }}>{count}</h2>
        <Button
          label={`Counter: ${count} — Badhao`}
          onClick={() => {
            setCount(c => c + 1);
            addLog('Counter badla — todos same');
          }}
          color="#7C3AED"
        />
      </div>

      {/* Todo App */}
      <div style={{ border: '2px solid #2563EB',
        borderRadius: '10px', padding: '15px', marginBottom: '15px' }}>
        <h3>Todo App — useCallback</h3>

        {/* Add */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="Todo likho..."
            style={{ flex: 1, padding: '8px',
              borderRadius: '6px', border: '1px solid #ddd' }}
          />
          <Button label="Add" onClick={handleAdd} />
        </div>

        {/* List */}
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />
          ))}
        </ul>
      </div>

      {/* Render Log */}
      <div style={{ border: '2px solid #16A34A',
        borderRadius: '10px', padding: '15px' }}>
        <h3>Activity Log</h3>
        {renderLog.length === 0 ? (
          <p style={{ color: '#888' }}>Koi activity nahi abhi...</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {renderLog.map(log => (
              <li key={log.id} style={{
                padding: '6px 10px',
                marginBottom: '4px',
                background: '#F0FDF4',
                borderRadius: '6px',
                fontSize: '13px',
                display: 'flex',
                justifyContent: 'space-between',
              }}>
                <span>✅ {log.msg}</span>
                <span style={{ color: '#888' }}>{log.time}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Summary Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse',
        marginTop: '15px' }}>
        <thead>
          <tr style={{ background: '#1A1A2E', color: 'white' }}>
            <th style={{ padding: '10px' }}>Hook</th>
            <th style={{ padding: '10px' }}>Kya Cache Karta Hai</th>
            <th style={{ padding: '10px' }}>Return</th>
            <th style={{ padding: '10px' }}>Kab Use Karo</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['useMemo',    'Value / Result',  'Calculated value', 'Heavy calculation'],
            ['useCallback','Function',         'Cached function',  'Child ko pass karna'],
          ].map(([hook, cache, ret, when], i) => (
            <tr key={hook} style={{
              background: i % 2 === 0 ? '#F8FAFC' : 'white'
            }}>
              <td style={{ padding: '8px', border: '1px solid #ddd',
                fontWeight: 'bold', color: '#2563EB' }}>{hook}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd',
                textAlign: 'center' }}>{cache}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd',
                textAlign: 'center' }}>{ret}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd',
                textAlign: 'center' }}>{when}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UseCallback;