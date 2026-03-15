
// Hooks Kya Hain?
// Simple matlab: React ki special functions — use se shuru hote hain


// useState    →  Data yaad rakho
// useEffect   →  Side effects — API call, timer
// useRef      →  DOM access ya value bina render
// useContext  →  Global data — sab components mein
// useMemo     →  Expensive calculation cache karo


// useState    →  Data yaad rakho
// useEffect   →  Side effects — API call, timer
// useRef      →  DOM access ya value bina render
// useContext  →  Global data — sab components mein
// useMemo     →  Expensive calculation cache karo































import { useState } from 'react';

function UseState() {
  // Simple value
  const [count, setCount] = useState(0);

  // String
  const [name, setName] = useState('');

  // Boolean
  const [isVisible, setIsVisible] = useState(true);

  // Object
  const [user, setUser] = useState({ name: '', city: '' });

  // Array
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (!newItem.trim()) return;
    setItems([...items, newItem]);  // spread — original mat badlo
    setNewItem('');
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2>useState Demo</h2>

      {/* Number state */}
      <div style={{ marginBottom: '15px' }}>
        <h3>Number State</h3>
        <h1>{count}</h1>
        <button onClick={() => setCount(count + 1)}>+</button>
        <button onClick={() => setCount(count - 1)}>-</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>

      {/* String state */}
      <div style={{ marginBottom: '15px' }}>
        <h3>String State</h3>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Naam likho..."
        />
        {name && <p>Hello {name}!</p>}
      </div>

      {/* Boolean state */}
      <div style={{ marginBottom: '15px' }}>
        <h3>Boolean State</h3>
        <button onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? 'Hide' : 'Show'}
        </button>
        {isVisible && <p>Main dikhta hoon! 👋</p>}
      </div>

      {/* Object state */}
      <div style={{ marginBottom: '15px' }}>
        <h3>Object State</h3>
        <input
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          placeholder="Naam..."
        />
        <input
          value={user.city}
          onChange={(e) => setUser({ ...user, city: e.target.value })}
          placeholder="City..."
        />
        {user.name && <p>{user.name} — {user.city}</p>}
      </div>

      {/* Array state */}
      <div style={{ marginBottom: '15px' }}>
        <h3>Array State</h3>
        <input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Item likho..."
        />
        <button onClick={addItem}>Add</button>
        <ul>
          {items.map((item, i) => (
            <li key={i}>
              {item}
              <button onClick={() => removeItem(i)}>❌</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UseState;