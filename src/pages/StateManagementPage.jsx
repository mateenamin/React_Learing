import { useState }              from 'react';
import { Provider, useSelector,
         useDispatch }           from 'react-redux';
import { store }                 from '../store/store';
import { addItem, removeItem,
         clearCart }             from '../store/cartSlice';
import { login, logout }         from '../store/userSlice';
import { create }                from 'zustand';

// ── Styles ────────────────────────────────
const box = (color = '#EFF6FF') => ({
  background: color, borderRadius: '10px',
  padding: '16px', marginBottom: '16px',
  border: '1px solid #E2E8F0',
});

const btn = (color = '#2563EB') => ({
  background: color, color: 'white',
  border: 'none', borderRadius: '6px',
  padding: '7px 14px', cursor: 'pointer',
  marginRight: '6px', marginTop: '4px',
});

// ══════════════════════════════════════════
// PART 1 — Context API
// ══════════════════════════════════════════
import { createContext, useContext } from 'react';

const ThemeContext = createContext();

function ThemeButton() {
  const { theme, toggle } = useContext(ThemeContext);
  return (
    <button style={btn(theme === 'dark' ? '#1A1A2E' : '#2563EB')}
      onClick={toggle}>
      {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}

function ThemeCard() {
  const { theme } = useContext(ThemeContext);
  return (
    <div style={{
      background: theme === 'dark' ? '#1E293B' : '#F8FAFC',
      color:      theme === 'dark' ? 'white'   : '#1A1A2E',
      padding: '12px', borderRadius: '8px',
      border: '1px solid #E2E8F0',
    }}>
      <p style={{ margin: 0 }}>
        Theme: <strong>{theme}</strong> — Context se aaya ✅
      </p>
    </div>
  );
}

function ContextAPIDemo() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{
      theme,
      toggle: () => setTheme(t => t === 'light' ? 'dark' : 'light')
    }}>
      <div style={box('#EFF6FF')}>
        <h3>1️⃣ Context API</h3>
        <p style={{ color: '#666', fontSize: '13px',
          marginBottom: '10px' }}>
          Built-in — small apps ke liye — prop drilling se bachao
        </p>
        <ThemeButton />
        <div style={{ marginTop: '10px' }}>
          <ThemeCard />
        </div>

        {/* Flow */}
        <div style={{ background: '#1E293B', padding: '10px',
          borderRadius: '8px', marginTop: '10px',
          fontSize: '12px', color: '#94A3B8',
          fontFamily: 'monospace' }}>
          <p style={{ margin: '2px 0' }}>
            createContext() → Provider → useContext()
          </p>
          <p style={{ margin: '2px 0', color: '#60A5FA' }}>
            // No prop drilling! ✅
          </p>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

// ══════════════════════════════════════════
// PART 2 — Redux Toolkit
// ══════════════════════════════════════════

// Products data
const products = [
  { id: 1, name: 'React Course',  price: 999,  emoji: '📘' },
  { id: 2, name: 'Node.js Book',  price: 599,  emoji: '📗' },
  { id: 3, name: 'MongoDB Guide', price: 799,  emoji: '📙' },
  { id: 4, name: 'JS Basics',     price: 399,  emoji: '📕' },
];

function UserSection() {
  const dispatch  = useDispatch();
  const user      = useSelector(state => state.user);

  return (
    <div style={{ marginBottom: '12px', padding: '10px',
      background: 'white', borderRadius: '8px',
      border: '1px solid #E2E8F0' }}>
      {user.isLoggedIn ? (
        <div style={{ display: 'flex',
          justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ margin: 0, fontWeight: 'bold' }}>
              👤 {user.name}
            </p>
            <p style={{ margin: 0, color: '#666', fontSize: '13px' }}>
              Role: {user.role}
            </p>
          </div>
          <button style={btn('#DC2626')}
            onClick={() => dispatch(logout())}>
            Logout
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '6px' }}>
          <button style={btn()}
            onClick={() => dispatch(login({
              name: 'Mateen Amin', role: 'admin'
            }))}>
            Login as Admin
          </button>
          <button style={btn('#16A34A')}
            onClick={() => dispatch(login({
              name: 'Ali Hassan', role: 'user'
            }))}>
            Login as User
          </button>
        </div>
      )}
    </div>
  );
}

function ProductList() {
  const dispatch  = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const isInCart = (id) => cartItems.some(i => i.id === id);

  return (
    <div style={{ display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px',
      marginBottom: '12px' }}>
      {products.map(p => (
        <div key={p.id} style={{ padding: '10px',
          background: 'white', borderRadius: '8px',
          border: `2px solid ${isInCart(p.id) ? '#16A34A' : '#E2E8F0'}` }}>
          <p style={{ margin: '0 0 4px', fontSize: '20px' }}>
            {p.emoji}
          </p>
          <p style={{ margin: '0 0 2px', fontWeight: 'bold',
            fontSize: '14px' }}>
            {p.name}
          </p>
          <p style={{ margin: '0 0 8px', color: '#16A34A',
            fontWeight: 'bold' }}>
            Rs. {p.price}
          </p>
          <button
            style={btn(isInCart(p.id) ? '#16A34A' : '#2563EB')}
            onClick={() => dispatch(addItem(p))}>
            {isInCart(p.id) ? '✅ Added' : '+ Add'}
          </button>
        </div>
      ))}
    </div>
  );
}

function CartSection() {
  const dispatch = useDispatch();
  const { items, total } = useSelector(state => state.cart);

  return (
    <div style={{ padding: '12px', background: 'white',
      borderRadius: '8px', border: '1px solid #E2E8F0' }}>
      <div style={{ display: 'flex',
        justifyContent: 'space-between', marginBottom: '8px' }}>
        <h4 style={{ margin: 0 }}>
          🛒 Cart ({items.length} items)
        </h4>
        {items.length > 0 && (
          <button style={btn('#DC2626')}
            onClick={() => dispatch(clearCart())}>
            Clear All
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <p style={{ color: '#888', fontSize: '13px',
          textAlign: 'center', padding: '10px' }}>
          Cart khali hai
        </p>
      ) : (
        <>
          {items.map(item => (
            <div key={item.id} style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', padding: '6px 0',
              borderBottom: '1px solid #F1F5F9',
            }}>
              <span style={{ fontSize: '14px' }}>
                {item.emoji} {item.name} x{item.qty}
              </span>
              <div style={{ display: 'flex',
                alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#16A34A',
                  fontWeight: 'bold', fontSize: '14px' }}>
                  Rs. {item.price * item.qty}
                </span>
                <button
                  style={{ background: '#FEE2E2', color: '#DC2626',
                    border: 'none', borderRadius: '4px',
                    padding: '2px 8px', cursor: 'pointer',
                    fontSize: '12px' }}
                  onClick={() => dispatch(removeItem(item.id))}>
                  ✕
                </button>
              </div>
            </div>
          ))}
          <div style={{ display: 'flex',
            justifyContent: 'space-between',
            marginTop: '10px', paddingTop: '8px',
            borderTop: '2px solid #E2E8F0' }}>
            <span style={{ fontWeight: 'bold' }}>Total:</span>
            <span style={{ fontWeight: 'bold', color: '#16A34A',
              fontSize: '18px' }}>
              Rs. {total}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

function ReduxDemo() {
  return (
    <div style={box('#F0FDF4')}>
      <h3>2️⃣ Redux Toolkit</h3>
      <p style={{ color: '#666', fontSize: '13px',
        marginBottom: '10px' }}>
        Large apps — store, slice, actions, reducers
      </p>

      {/* Flow */}
      <div style={{ background: '#1E293B', padding: '10px',
        borderRadius: '8px', marginBottom: '12px',
        fontSize: '12px', color: '#94A3B8',
        fontFamily: 'monospace' }}>
        <p style={{ margin: '2px 0', color: '#60A5FA' }}>
          // Redux Flow:
        </p>
        <p style={{ margin: '2px 0' }}>
          dispatch(action) → reducer → store update → re-render
        </p>
        <p style={{ margin: '2px 0', color: '#86EFAC' }}>
          useSelector → store se data lo
        </p>
        <p style={{ margin: '2px 0', color: '#86EFAC' }}>
          useDispatch → action bhejo
        </p>
      </div>

      <UserSection />
      <h4 style={{ margin: '12px 0 8px' }}>Products:</h4>
      <ProductList />
      <CartSection />
    </div>
  );
}

// ══════════════════════════════════════════
// PART 3 — Zustand
// ══════════════════════════════════════════

// Zustand store — bahut simple!
const useCounterStore = create((set) => ({
  count: 0,
  step:  1,
  history: [],

  increment: () => set((state) => ({
    count:   state.count + state.step,
    history: [...state.history,
      `+${state.step} → ${state.count + state.step}`],
  })),

  decrement: () => set((state) => ({
    count:   state.count - state.step,
    history: [...state.history,
      `-${state.step} → ${state.count - state.step}`],
  })),

  setStep: (step) => set({ step }),

  reset: () => set({ count: 0, history: [] }),
}));

function ZustandDemo() {
  const { count, step, history,
          increment, decrement,
          setStep, reset } = useCounterStore();

  return (
    <div style={box('#FFF7ED')}>
      <h3>3️⃣ Zustand</h3>
      <p style={{ color: '#666', fontSize: '13px',
        marginBottom: '10px' }}>
        Simple syntax — Redux se kam code
      </p>

      {/* Redux vs Zustand */}
      <div style={{ display: 'flex', gap: '10px',
        marginBottom: '12px' }}>
        <div style={{ flex: 1, background: '#FEE2E2',
          padding: '10px', borderRadius: '8px',
          fontSize: '12px', fontFamily: 'monospace' }}>
          <p style={{ margin: '0 0 4px', fontWeight: 'bold',
            color: '#DC2626' }}>Redux — zyada code</p>
          <p style={{ margin: '1px 0', color: '#666' }}>
            createSlice()
          </p>
          <p style={{ margin: '1px 0', color: '#666' }}>
            configureStore()
          </p>
          <p style={{ margin: '1px 0', color: '#666' }}>
            Provider wrap
          </p>
          <p style={{ margin: '1px 0', color: '#666' }}>
            useSelector()
          </p>
          <p style={{ margin: '1px 0', color: '#666' }}>
            useDispatch()
          </p>
        </div>
        <div style={{ flex: 1, background: '#DCFCE7',
          padding: '10px', borderRadius: '8px',
          fontSize: '12px', fontFamily: 'monospace' }}>
          <p style={{ margin: '0 0 4px', fontWeight: 'bold',
            color: '#16A34A' }}>Zustand — kam code ✅</p>
          <p style={{ margin: '1px 0', color: '#666' }}>
            create(set {'=> ({ ... })'}
          </p>
          <p style={{ margin: '1px 0', color: '#666' }}>
            // Provider nahi!
          </p>
          <p style={{ margin: '1px 0', color: '#666' }}>
            const {'{ count }'} =
          </p>
          <p style={{ margin: '1px 0', color: '#666' }}>
            useCounterStore()
          </p>
          <p style={{ margin: '1px 0', color: '#666' }}>
            // bas itna! ✅
          </p>
        </div>
      </div>

      {/* Counter */}
      <div style={{ background: 'white', padding: '16px',
        borderRadius: '8px', border: '1px solid #E2E8F0',
        marginBottom: '10px' }}>
        <h1 style={{ textAlign: 'center', fontSize: '56px',
          margin: '0 0 12px',
          color: count > 0 ? '#16A34A' :
                 count < 0 ? '#DC2626' : '#1A1A2E' }}>
          {count}
        </h1>

        <div style={{ marginBottom: '10px',
          textAlign: 'center' }}>
          <span style={{ color: '#666', fontSize: '13px' }}>
            Step: </span>
          {[1, 5, 10].map(s => (
            <button key={s}
              style={btn(step === s ? '#EA580C' : '#FED7AA')}
              onClick={() => setStep(s)}>
              {s}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '8px',
          justifyContent: 'center' }}>
          <button style={btn('#16A34A')} onClick={increment}>
            + {step}
          </button>
          <button style={btn('#DC2626')} onClick={decrement}>
            - {step}
          </button>
          <button style={btn('#666')} onClick={reset}>
            Reset
          </button>
        </div>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div>
          <p style={{ fontWeight: 'bold', fontSize: '13px',
            marginBottom: '6px' }}>
            History:
          </p>
          <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
            {[...history].reverse().map((h, i) => (
              <div key={i} style={{
                padding: '4px 8px', marginBottom: '3px',
                background: '#FFF7ED', borderRadius: '4px',
                fontSize: '13px', color: '#EA580C',
              }}>
                {h}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════
// COMPARISON TABLE
// ══════════════════════════════════════════
function ComparisonTable() {
  return (
    <div style={box('#F8FAFC')}>
      <h3>📊 Comparison</h3>
      <table style={{ width: '100%',
        borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#1A1A2E', color: 'white' }}>
            {['Feature','Context API',
              'Redux Toolkit','Zustand'].map(h => (
              <th key={h} style={{ padding: '10px',
                fontSize: '13px' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            ['Install',    'Built-in', 'npm install', 'npm install'],
            ['Boilerplate','Thoda',    'Zyada',       'Bahut kam ✅'],
            ['DevTools',   '❌',       '✅',          '✅'],
            ['Performance','Medium',   'Good',        'Best ✅'],
            ['Kab use',    'Small app','Large app',   'Medium app'],
          ].map(([f,...vals], i) => (
            <tr key={f} style={{
              background: i % 2 === 0 ? '#F8FAFC' : 'white'
            }}>
              <td style={{ padding: '8px',
                border: '1px solid #E2E8F0',
                fontWeight: 'bold', fontSize: '13px' }}>
                {f}
              </td>
              {vals.map((v, j) => (
                <td key={j} style={{ padding: '8px',
                  border: '1px solid #E2E8F0',
                  textAlign: 'center', fontSize: '13px',
                  color: '#666' }}>
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ══════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════
function StateManagementContent() {
  return (
    <div style={{ padding: '20px',
      maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#7C3AED', marginBottom: '4px' }}>
        🗄️ State Management
      </h1>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        Context API, Redux Toolkit, Zustand
      </p>

      <ContextAPIDemo />
      <ReduxDemo />
      <ZustandDemo />
      <ComparisonTable />
    </div>
  );
}

function StateManagementPage() {
  return (
    <Provider store={store}>
      <StateManagementContent />
    </Provider>
  );
}

export default StateManagementPage;