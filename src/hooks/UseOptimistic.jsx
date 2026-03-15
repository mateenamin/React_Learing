
// ## 3️⃣ useOptimistic — Kya Hai?

// **Simple matlab:** Server ka wait mat karo — pehle UI update karo — phir save karo

// Bina useOptimistic:
// User click karta hai → Server save karta hai (2 sec) → UI update hoti hai
// User 2 second wait karta hai 😫

// useOptimistic ke saath:
// User click karta hai → UI instantly update hoti hai ✅
//                      → Server pe background mein save hota hai
// Agar fail ho → Automatically rollback ✅



















import { useState, useOptimistic } from 'react';

// Fake API — 1.5 second delay
function fakeSaveTodo(text) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 20% chance of failure — test ke liye
      if (Math.random() < 0.2) {
        reject('Server error!');
      } else {
        resolve({ id: Date.now(), text, done: false });
      }
    }, 1500);
  });
}

function UseOptimistic() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'React seekhna',  done: true  },
    { id: 2, text: 'Node.js seekhna', done: false },
  ]);
  const [input, setInput]   = useState('');
  const [error, setError]   = useState(null);

  // useOptimistic — instant update
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (currentTodos, newTodo) => [
      ...currentTodos,
      { ...newTodo, sending: true }  // sending = true dikhao
    ]
  );

  const handleAdd = async () => {
    if (!input.trim()) return;
    setError(null);

    const newTodo = {
      id:   Date.now(),
      text: input,
      done: false
    };

    // Instantly UI update — server wait nahi
    addOptimisticTodo(newTodo);
    setInput('');

    try {
      const saved = await fakeSaveTodo(newTodo.text);
      setTodos(prev => [...prev, saved]);  // real data save
    } catch (err) {
      setError('Todo save nahi hua! Dobara try karo.');
      // Automatically rollback — optimistic update hatega
    }
  };

  return (
    <div>
      <h2>useOptimistic Demo</h2>

      <div style={{ background: '#EFF6FF', padding: '12px',
        borderRadius: '8px', marginBottom: '15px' }}>
        <p>💡 Todo add karo — instantly dikhega!</p>
        <p>⚠️ 20% chance hai fail hone ka — rollback dekhna</p>
      </div>

      {/* Input */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Todo likho..."
          style={{ padding: '8px', flex: 1,
            borderRadius: '6px', border: '1px solid #ddd' }}
        />
        <button
          onClick={handleAdd}
          style={{ background: '#2563EB', color: 'white',
            padding: '8px 16px', border: 'none',
            borderRadius: '6px', cursor: 'pointer' }}
        >
          Add
        </button>
      </div>

      {error && (
        <div style={{ background: '#FEE2E2', padding: '10px',
          borderRadius: '8px', marginBottom: '10px' }}>
          ❌ {error}
        </div>
      )}

      {/* Todo List */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {optimisticTodos.map(todo => (
          <li key={todo.id} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px',
            marginBottom: '8px',
            background: todo.sending ? '#FEF3C7' : '#F8FAFC',
            borderRadius: '8px',
            border: `1px solid ${todo.sending ? '#F59E0B' : '#E2E8F0'}`,
            opacity: todo.sending ? 0.7 : 1
          }}>
            <span>{todo.done ? '✅' : '⬜'}</span>
            <span style={{ flex: 1,
              textDecoration: todo.done ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            {todo.sending && (
              <span style={{ color: '#F59E0B', fontSize: '13px' }}>
                ⏳ Saving...
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UseOptimistic;