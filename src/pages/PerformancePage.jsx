import {
  useState, useMemo, useCallback,
  memo, useRef, useEffect
} from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

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

// ── Render Counter ────────────────────────
function RenderBadge({ count, label }) {
  return (
    <span style={{
      background: count > 3 ? '#FEE2E2' : '#DCFCE7',
      color:      count > 3 ? '#DC2626' : '#16A34A',
      padding: '2px 8px', borderRadius: '999px',
      fontSize: '12px', fontWeight: 'bold',
      marginLeft: '8px',
    }}>
      {label}: {count}x renders
    </span>
  );
}

// ══════════════════════════════════════════
// PART 1 — React.memo
// ══════════════════════════════════════════

// Bina memo — har baar re-render hoga
function ChildWithoutMemo({ name, color }) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div style={{ padding: '8px', background: '#FEE2E2',
      borderRadius: '6px', marginBottom: '6px',
      display: 'flex', justifyContent: 'space-between',
      alignItems: 'center' }}>
      <span style={{ color, fontWeight: 'bold' }}>
        {name}
      </span>
      <RenderBadge count={renderCount.current} label="No memo" />
    </div>
  );
}

// memo ke saath — props same ho toh skip
const ChildWithMemo = memo(function ChildWithMemo({ name, color }) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div style={{ padding: '8px', background: '#DCFCE7',
      borderRadius: '6px', marginBottom: '6px',
      display: 'flex', justifyContent: 'space-between',
      alignItems: 'center' }}>
      <span style={{ color, fontWeight: 'bold' }}>
        {name}
      </span>
      <RenderBadge count={renderCount.current} label="memo" />
    </div>
  );
});

function MemoDemo() {
  const [count, setCount] = useState(0);
  const [toggle, setToggle] = useState(false);

  return (
    <div style={box('#EFF6FF')}>
      <h3>1️⃣ React.memo</h3>
      <p style={{ color: '#666', fontSize: '13px',
        marginBottom: '10px' }}>
        Props same ho toh re-render rokta hai ✅
      </p>

      {/* Code */}
      <div style={{ background: '#1E293B', padding: '10px',
        borderRadius: '8px', marginBottom: '12px',
        fontSize: '12px', color: '#94A3B8',
        fontFamily: 'monospace' }}>
        <p style={{ margin: '2px 0', color: '#F87171' }}>
          // Bina memo — har baar render
        </p>
        <p style={{ margin: '2px 0' }}>
          function Child({'{ name }'}) {'{ ... }'}
        </p>
        <p style={{ margin: '2px 0', color: '#86EFAC',
          marginTop: '6px' }}>
          // memo — props same? skip! ✅
        </p>
        <p style={{ margin: '2px 0' }}>
          const Child = memo(function Child({'{ name }'}) {'{ ... }'})
        </p>
      </div>

      {/* Counter */}
      <div style={{ marginBottom: '12px' }}>
        <button style={btn()} onClick={() => setCount(c => c + 1)}>
          Parent Counter: {count}
        </button>
        <button style={btn('#666')} onClick={() => setToggle(t => !t)}>
          Toggle: {toggle ? 'ON' : 'OFF'}
        </button>
        <p style={{ color: '#666', fontSize: '12px',
          marginTop: '6px' }}>
          💡 Counter badlao — renders dekho
        </p>
      </div>

      {/* Children */}
      <ChildWithoutMemo name="Bina Memo" color="#DC2626" />
      <ChildWithMemo    name="Memo ke saath" color="#16A34A" />
    </div>
  );
}

// ══════════════════════════════════════════
// PART 2 — useMemo
// ══════════════════════════════════════════

// Fake heavy calculation
function heavyCalc(num) {
  let result = 0;
  for (let i = 0; i < 100000; i++) result += num;
  return result;
}

// Fake students
const allStudents = Array.from({ length: 20 }, (_, i) => ({
  id:    i + 1,
  name:  ['Mateen', 'Ali', 'Sara', 'Ahmed', 'Zara'][i % 5] + ` ${i+1}`,
  marks: Math.floor(Math.random() * 60) + 40,
  city:  ['Lahore', 'Karachi', 'Islamabad'][i % 3],
}));

function UseMemoDemo() {
  const [search,  setSearch]  = useState('');
  const [count,   setCount]   = useState(0);
  const [num,     setNum]     = useState(5);
  const renderCount = useRef(0);
  renderCount.current += 1;

  // Bina useMemo — har render pe filter chalta hai
  // const filtered = allStudents.filter(s =>
  //   s.name.toLowerCase().includes(search.toLowerCase())
  // );

  // useMemo — sirf search change pe filter chalta hai ✅
  const filtered = useMemo(() => {
    console.log('Filter chal raha hai...');
    return allStudents.filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  // useMemo — heavy calculation cache
  const calcResult = useMemo(() => {
    console.log('Heavy calc chal rahi hai...');
    return heavyCalc(num);
  }, [num]);

  // Stats — sirf filtered change pe
  const stats = useMemo(() => ({
    total:   filtered.length,
    pass:    filtered.filter(s => s.marks >= 50).length,
    average: filtered.length
      ? (filtered.reduce((sum, s) => sum + s.marks, 0)
         / filtered.length).toFixed(1)
      : 0,
  }), [filtered]);

  return (
    <div style={box('#F0FDF4')}>
      <h3>2️⃣ useMemo</h3>
      <p style={{ color: '#666', fontSize: '13px',
        marginBottom: '10px' }}>
        Expensive calculation cache karo ✅
        <RenderBadge count={renderCount.current} label="Page" />
      </p>

      {/* Code */}
      <div style={{ background: '#1E293B', padding: '10px',
        borderRadius: '8px', marginBottom: '12px',
        fontSize: '12px', color: '#94A3B8',
        fontFamily: 'monospace' }}>
        <p style={{ margin: '2px 0', color: '#F87171' }}>
          // Bina — har render pe
        </p>
        <p style={{ margin: '2px 0' }}>
          const filtered = students.filter(...)
        </p>
        <p style={{ margin: '2px 0', color: '#86EFAC',
          marginTop: '6px' }}>
          // useMemo — sirf search change pe ✅
        </p>
        <p style={{ margin: '2px 0' }}>
          const filtered = useMemo(
        </p>
        <p style={{ margin: '2px 0', paddingLeft: '12px' }}>
          () ={'>'} students.filter(...), [search]
        </p>
        <p style={{ margin: '2px 0' }}>)</p>
      </div>

      {/* Counter — filter nahi chalega */}
      <button style={btn('#666')} onClick={() => setCount(c => c + 1)}>
        Other Counter: {count}
        <span style={{ fontSize: '11px', marginLeft: '6px' }}>
          (filter nahi chalega)
        </span>
      </button>

      {/* Num — calc chalega */}
      <button style={btn('#EA580C')} onClick={() => setNum(n => n + 1)}>
        Num: {num}
        <span style={{ fontSize: '11px', marginLeft: '6px' }}>
          (calc chalega)
        </span>
      </button>

      <p style={{ color: '#7C3AED', fontSize: '13px',
        marginTop: '6px' }}>
        Heavy Calc Result: {calcResult}
      </p>

      {/* Search */}
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Student search karo..."
        style={{ padding: '8px', width: '100%',
          borderRadius: '6px', border: '1px solid #ddd',
          marginTop: '10px', marginBottom: '10px',
          boxSizing: 'border-box' }}
      />

      {/* Stats */}
      <div style={{ display: 'flex', gap: '10px',
        marginBottom: '10px' }}>
        {[
          { label: 'Total',   value: stats.total,   color: '#2563EB' },
          { label: 'Pass',    value: stats.pass,    color: '#16A34A' },
          { label: 'Average', value: stats.average, color: '#7C3AED' },
        ].map(s => (
          <div key={s.label} style={{ flex: 1,
            background: 'white', padding: '8px',
            borderRadius: '8px', textAlign: 'center',
            border: `2px solid ${s.color}` }}>
            <p style={{ fontWeight: 'bold', color: s.color,
              margin: '0 0 2px', fontSize: '18px' }}>
              {s.value}
            </p>
            <p style={{ color: '#666', margin: 0,
              fontSize: '12px' }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* List */}
      <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
        {filtered.map(s => (
          <div key={s.id} style={{ display: 'flex',
            justifyContent: 'space-between', padding: '6px 8px',
            marginBottom: '4px', background: 'white',
            borderRadius: '6px', fontSize: '13px',
            border: `1px solid ${s.marks >= 50
              ? '#DCFCE7' : '#FEE2E2'}` }}>
            <span>{s.name} — {s.city}</span>
            <span style={{ color: s.marks >= 50
              ? '#16A34A' : '#DC2626', fontWeight: 'bold' }}>
              {s.marks} {s.marks >= 50 ? '✅' : '❌'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════
// PART 3 — useCallback
// ══════════════════════════════════════════

const TodoItem = memo(function TodoItem({ todo, onToggle, onDelete }) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div style={{ display: 'flex', alignItems: 'center',
      gap: '8px', padding: '8px', marginBottom: '6px',
      background: '#F8FAFC', borderRadius: '8px',
      border: '1px solid #E2E8F0' }}>
      <input type="checkbox" checked={todo.done}
        onChange={() => onToggle(todo.id)}
        style={{ cursor: 'pointer' }} />
      <span style={{ flex: 1,
        textDecoration: todo.done ? 'line-through' : 'none',
        color: todo.done ? '#888' : '#1A1A2E',
        fontSize: '14px' }}>
        {todo.text}
      </span>
      <RenderBadge count={renderCount.current} label="item" />
      <button onClick={() => onDelete(todo.id)}
        style={{ background: '#FEE2E2', color: '#DC2626',
          border: 'none', borderRadius: '4px',
          padding: '2px 8px', cursor: 'pointer',
          fontSize: '12px' }}>
        ✕
      </button>
    </div>
  );
});

function UseCallbackDemo() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'React seekhna',   done: false },
    { id: 2, text: 'Node.js seekhna', done: true  },
    { id: 3, text: 'MongoDB seekhna', done: false },
  ]);
  const [input,  setInput]  = useState('');
  const [count,  setCount]  = useState(0);

  // useCallback — same function reference
  // [] — dependencies — kabhi nahi badlega
  const handleToggle = useCallback((id) => {
    setTodos(prev =>
      prev.map(t => t.id === id ? { ...t, done: !t.done } : t)
    );
  }, []);

  const handleDelete = useCallback((id) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  }, []);

  const handleAdd = useCallback(() => {
    if (!input.trim()) return;
    setTodos(prev => [
      ...prev,
      { id: Date.now(), text: input, done: false }
    ]);
    setInput('');
  }, [input]); // input change pe naya function

  return (
    <div style={box('#FFF7ED')}>
      <h3>3️⃣ useCallback</h3>
      <p style={{ color: '#666', fontSize: '13px',
        marginBottom: '10px' }}>
        Function cache karo — memo children re-render nahi ✅
      </p>

      {/* Code */}
      <div style={{ background: '#1E293B', padding: '10px',
        borderRadius: '8px', marginBottom: '12px',
        fontSize: '12px', color: '#94A3B8',
        fontFamily: 'monospace' }}>
        <p style={{ margin: '2px 0', color: '#F87171' }}>
          // Bina — har render pe naya function
        </p>
        <p style={{ margin: '2px 0' }}>
          const handleDelete = (id) ={'>'} {'{ ... }'}
        </p>
        <p style={{ margin: '2px 0', color: '#86EFAC',
          marginTop: '6px' }}>
          // useCallback — same reference ✅
        </p>
        <p style={{ margin: '2px 0' }}>
          const handleDelete = useCallback(
        </p>
        <p style={{ margin: '2px 0', paddingLeft: '12px' }}>
          (id) ={'>'} {'{ ... }'}, []
        </p>
        <p style={{ margin: '2px 0' }}>)</p>
      </div>

      {/* Counter */}
      <button style={btn('#666')} onClick={() => setCount(c => c + 1)}>
        Other Counter: {count}
        <span style={{ fontSize: '11px', marginLeft: '6px' }}>
          (todos re-render nahi honge)
        </span>
      </button>

      {/* Add todo */}
      <div style={{ display: 'flex', gap: '8px',
        margin: '10px 0' }}>
        <input value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
          placeholder="Todo likho..."
          style={{ flex: 1, padding: '7px', borderRadius: '6px',
            border: '1px solid #ddd' }} />
        <button style={btn()} onClick={handleAdd}>Add</button>
      </div>

      {/* Todos */}
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo}
          onToggle={handleToggle}
          onDelete={handleDelete} />
      ))}
    </div>
  );
}

// ══════════════════════════════════════════
// PART 4 — List Virtualization
// ══════════════════════════════════════════

// 10,000 items generate karo
const bigList = Array.from({ length: 10000 }, (_, i) => ({
  id:    i + 1,
  name:  `User ${i + 1}`,
  email: `user${i + 1}@gmail.com`,
  city:  ['Lahore', 'Karachi', 'Islamabad',
          'Peshawar', 'Quetta'][i % 5],
}));

// Bina virtualization — sab render
function NormalList({ items }) {
  const renderStart = performance.now();
  const content = (
    <div style={{ height: '200px', overflowY: 'auto',
      border: '1px solid #E2E8F0', borderRadius: '8px' }}>
      {items.slice(0, 100).map(item => ( // slice for demo
        <div key={item.id} style={{ padding: '6px 10px',
          borderBottom: '1px solid #F1F5F9',
          fontSize: '13px' }}>
          {item.name} — {item.email}
        </div>
      ))}
    </div>
  );
  const renderTime = (performance.now() - renderStart).toFixed(2);
  return (
    <div>
      <p style={{ color: '#DC2626', fontSize: '12px',
        marginBottom: '4px' }}>
        ❌ 100 items render kiye (10,000 mein se) — {renderTime}ms
      </p>
      {content}
    </div>
  );
}

// Virtualized list — sirf visible render
function VirtualizedList({ items }) {
  const parentRef = useRef(null);

  const virtualizer = useVirtualizer({
    count:            items.length,
    getScrollElement: () => parentRef.current,
    estimateSize:     () => 36,
    overscan:         5,
  });

  return (
    <div>
      <p style={{ color: '#16A34A', fontSize: '12px',
        marginBottom: '4px' }}>
        ✅ {items.length.toLocaleString()} items —
        sirf visible render hote hain!
      </p>
      <div
        ref={parentRef}
        style={{ height: '200px', overflowY: 'auto',
          border: '1px solid #E2E8F0', borderRadius: '8px' }}
      >
        <div style={{
          height: `${virtualizer.getTotalSize()}px`,
          position: 'relative',
        }}>
          {virtualizer.getVirtualItems().map(virtualItem => (
            <div
              key={virtualItem.key}
              style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%',
                transform: `translateY(${virtualItem.start}px)`,
                padding: '6px 10px',
                borderBottom: '1px solid #F1F5F9',
                fontSize: '13px',
                background: virtualItem.index % 2 === 0
                  ? '#F8FAFC' : 'white',
              }}
            >
              #{items[virtualItem.index].id} —
              {items[virtualItem.index].name} —
              {items[virtualItem.index].city}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VirtualizationDemo() {
  const [showNormal, setShowNormal]   = useState(false);
  const [showVirtual, setShowVirtual] = useState(false);

  return (
    <div style={box('#F5F3FF')}>
      <h3>4️⃣ List Virtualization</h3>
      <p style={{ color: '#666', fontSize: '13px',
        marginBottom: '10px' }}>
        10,000 items — sirf visible render karo ✅
      </p>

      {/* Concept */}
      <div style={{ background: '#1E293B', padding: '10px',
        borderRadius: '8px', marginBottom: '12px',
        fontSize: '12px', color: '#94A3B8',
        fontFamily: 'monospace' }}>
        <p style={{ margin: '2px 0', color: '#60A5FA' }}>
          // useVirtualizer
        </p>
        <p style={{ margin: '2px 0' }}>
          const virtualizer = useVirtualizer({'({'}
        </p>
        <p style={{ margin: '2px 0', paddingLeft: '12px' }}>
          count: items.length,  // total items
        </p>
        <p style={{ margin: '2px 0', paddingLeft: '12px' }}>
          estimateSize: () ={'>'} 36,  // item height
        </p>
        <p style={{ margin: '2px 0' }}>{'})'}</p>
        <p style={{ margin: '2px 0', color: '#86EFAC' }}>
          // Sirf visible items render! ✅
        </p>
      </div>

      <button style={btn('#DC2626')}
        onClick={() => { setShowNormal(true); setShowVirtual(false); }}>
        ❌ Normal List (100 items)
      </button>
      <button style={btn('#16A34A')}
        onClick={() => { setShowVirtual(true); setShowNormal(false); }}>
        ✅ Virtual List (10,000 items)
      </button>
      <button style={btn('#666')}
        onClick={() => { setShowNormal(false); setShowVirtual(false); }}>
        Reset
      </button>

      <div style={{ marginTop: '12px' }}>
        {showNormal  && <NormalList     items={bigList} />}
        {showVirtual && <VirtualizedList items={bigList} />}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════
// PART 5 — Bundle Optimization Tips
// ══════════════════════════════════════════
function BundleOptDemo() {
  const tips = [
    {
      title: 'Lazy Loading',
      icon: '📦',
      bad:  "import HeavyChart from './HeavyChart'",
      good: "const HeavyChart = lazy(() => import('./HeavyChart'))",
      desc: 'Sirf zaroorat pe load karo',
    },
    {
      title: 'Tree Shaking',
      icon: '🌳',
      bad:  "import _ from 'lodash'  // poora lodash",
      good: "import debounce from 'lodash/debounce'  // sirf ek",
      desc: 'Unused code automatically hata do',
    },
    {
      title: 'Image Optimization',
      icon: '🖼️',
      bad:  '<img src="photo.png" />  // 2MB',
      good: '<img src="photo.webp" loading="lazy" />  // 200kb',
      desc: 'WebP format + lazy loading',
    },
    {
      title: 'Production Build',
      icon: '🚀',
      bad:  'npm run dev  // debug mode',
      good: 'npm run build  // minified + optimized',
      desc: 'Build karo deploy se pehle',
    },
  ];

  return (
    <div style={box('#F0FDF4')}>
      <h3>5️⃣ Bundle Optimization Tips</h3>
      <p style={{ color: '#666', fontSize: '13px',
        marginBottom: '12px' }}>
        Bundle size chhoti karo — app fast karo ✅
      </p>

      {tips.map(tip => (
        <div key={tip.title} style={{ marginBottom: '12px',
          background: 'white', borderRadius: '8px',
          padding: '12px', border: '1px solid #E2E8F0' }}>
          <h4 style={{ margin: '0 0 8px',
            color: '#16A34A' }}>
            {tip.icon} {tip.title}
          </h4>
          <p style={{ color: '#666', fontSize: '12px',
            margin: '0 0 8px' }}>
            {tip.desc}
          </p>
          <div style={{ background: '#FEE2E2', padding: '6px 10px',
            borderRadius: '6px', marginBottom: '6px',
            fontFamily: 'monospace', fontSize: '12px',
            color: '#DC2626' }}>
            ❌ {tip.bad}
          </div>
          <div style={{ background: '#DCFCE7', padding: '6px 10px',
            borderRadius: '6px', fontFamily: 'monospace',
            fontSize: '12px', color: '#16A34A' }}>
            ✅ {tip.good}
          </div>
        </div>
      ))}

      {/* Vite Bundle Analysis */}
      <div style={{ background: '#1E293B', padding: '12px',
        borderRadius: '8px', marginTop: '8px',
        fontSize: '12px', color: '#94A3B8',
        fontFamily: 'monospace' }}>
        <p style={{ margin: '2px 0', color: '#60A5FA' }}>
          # Bundle size check karo:
        </p>
        <p style={{ margin: '2px 0' }}>
          npm run build
        </p>
        <p style={{ margin: '2px 0', color: '#60A5FA',
          marginTop: '6px' }}>
          # Output:
        </p>
        <p style={{ margin: '2px 0' }}>
          dist/assets/index-abc.js    120kb ✅
        </p>
        <p style={{ margin: '2px 0' }}>
          dist/assets/vendor-xyz.js   80kb  ✅
        </p>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════
function PerformancePage() {
  return (
    <div style={{ padding: '20px',
      maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#1A1A2E', marginBottom: '4px' }}>
        ⚡ Performance Optimization
      </h1>
      <p style={{ color: '#666', marginBottom: '8px' }}>
        React.memo, useMemo, useCallback,
        Virtualization, Bundle
      </p>

      {/* Quick Summary */}
      <div style={{ display: 'flex', gap: '8px',
        flexWrap: 'wrap', marginBottom: '20px' }}>
        {[
          { label: 'React.memo', desc: 'Component skip',  c: '#2563EB' },
          { label: 'useMemo',    desc: 'Value cache',      c: '#16A34A' },
          { label: 'useCallback',desc: 'Function cache',   c: '#EA580C' },
          { label: 'Virtual',    desc: 'Long list fast',   c: '#7C3AED' },
          { label: 'Bundle',     desc: 'Size chhoti karo', c: '#0D9488' },
        ].map(item => (
          <div key={item.label} style={{
            background: 'white', border: `2px solid ${item.c}`,
            borderRadius: '8px', padding: '8px 12px',
          }}>
            <p style={{ fontWeight: 'bold', color: item.c,
              margin: '0 0 2px', fontSize: '13px' }}>
              {item.label}
            </p>
            <p style={{ color: '#666', margin: 0,
              fontSize: '12px' }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      <MemoDemo />
      <UseMemoDemo />
      <UseCallbackDemo />
      <VirtualizationDemo />
      <BundleOptDemo />
    </div>
  );
}

export default PerformancePage;