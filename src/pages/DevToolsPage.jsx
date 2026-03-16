import { useState, useEffect,
         useRef, memo, useMemo,
         useCallback, Profiler } from 'react';

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
  fontSize: '13px',
});

const codeBlock = (lines, label) => (
  <div style={{ background: '#1E293B', padding: '12px',
    borderRadius: '8px', marginBottom: '12px' }}>
    {label && (
      <p style={{ color: '#60A5FA', fontSize: '12px',
        margin: '0 0 6px', fontFamily: 'monospace' }}>
        // {label}
      </p>
    )}
    {lines.map((line, i) => (
      <p key={i} style={{ margin: '2px 0', fontSize: '12px',
        color: line.startsWith('//') ? '#60A5FA' :
               line.startsWith('✅') ? '#86EFAC' :
               line.startsWith('❌') ? '#F87171' : '#94A3B8',
        fontFamily: 'monospace' }}>
        {line}
      </p>
    ))}
  </div>
);

// ══════════════════════════════════════════
// PART 1 — React DevTools
// ══════════════════════════════════════════
function DevToolsDemo() {
  const [count, setCount]   = useState(0);
  const [name,  setName]    = useState('Mateen');
  const [theme, setTheme]   = useState('light');
  const [items, setItems]   = useState(['React', 'Node']);

  return (
    <div style={box('#EFF6FF')}>
      <h3>1️⃣ React DevTools</h3>
      <p style={{ color: '#666', fontSize: '13px',
        marginBottom: '12px' }}>
        Browser extension — State aur Props live dekho
      </p>

      {/* Install steps */}
      <div style={{ background: '#1E293B', padding: '12px',
        borderRadius: '8px', marginBottom: '12px' }}>
        <p style={{ color: '#60A5FA', fontSize: '12px',
          margin: '0 0 8px', fontFamily: 'monospace' }}>
          // Install karo:
        </p>
        {[
          '1. Chrome kholo',
          '2. chrome.google.com/webstore',
          '3. "React Developer Tools" search karo',
          '4. Add to Chrome click karo',
          '5. F12 → Components tab → ⚛️ dikhega ✅',
        ].map((step, i) => (
          <p key={i} style={{ color: '#94A3B8',
            fontSize: '12px', margin: '3px 0',
            fontFamily: 'monospace' }}>
            {step}
          </p>
        ))}
      </div>

      {/* Live State - DevTools mein dekho */}
      <div style={{ background: 'white', padding: '12px',
        borderRadius: '8px', border: '1px solid #E2E8F0',
        marginBottom: '12px' }}>
        <p style={{ fontWeight: 'bold', margin: '0 0 8px',
          fontSize: '14px' }}>
          👆 F12 → Components Tab mein yeh dekho:
        </p>
        <div style={{ fontFamily: 'monospace',
          fontSize: '12px', color: '#666' }}>
          <p style={{ margin: '2px 0' }}>
            state: {'{'} count: <strong style={{ color: '#2563EB' }}>
              {count}
            </strong> {'}'}
          </p>
          <p style={{ margin: '2px 0' }}>
            state: {'{'} name: <strong style={{ color: '#16A34A' }}>
              "{name}"
            </strong> {'}'}
          </p>
          <p style={{ margin: '2px 0' }}>
            state: {'{'} theme: <strong style={{ color: '#7C3AED' }}>
              "{theme}"
            </strong> {'}'}
          </p>
          <p style={{ margin: '2px 0' }}>
            state: {'{'} items: <strong style={{ color: '#EA580C' }}>
              [{items.join(', ')}]
            </strong> {'}'}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '6px',
        flexWrap: 'wrap' }}>
        <button style={btn()}
          onClick={() => setCount(c => c + 1)}>
          Count: {count}
        </button>
        <button style={btn('#16A34A')}
          onClick={() => setName(
            n => n === 'Mateen' ? 'Ali' : 'Mateen'
          )}>
          Name: {name}
        </button>
        <button style={btn('#7C3AED')}
          onClick={() => setTheme(
            t => t === 'light' ? 'dark' : 'light'
          )}>
          Theme: {theme}
        </button>
        <button style={btn('#EA580C')}
          onClick={() => setItems(
            i => [...i, `Item ${i.length + 1}`]
          )}>
          Add Item
        </button>
      </div>

      <div style={{ background: '#DCFCE7', padding: '10px',
        borderRadius: '8px', marginTop: '12px' }}>
        <p style={{ color: '#16A34A', fontWeight: 'bold',
          margin: '0 0 4px', fontSize: '13px' }}>
          💡 DevTools Tips:
        </p>
        {[
          'Components tab → Component select karo → State/Props dekho',
          'State ko DevTools se directly edit kar sakte ho',
          'Search bar mein component name dhundho',
          'Eye icon → DOM mein highlight karo',
        ].map((tip, i) => (
          <p key={i} style={{ color: '#666', fontSize: '12px',
            margin: '2px 0' }}>
            → {tip}
          </p>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════
// PART 2 — Debugging Techniques
// ══════════════════════════════════════════
function DebuggingDemo() {
  const [value, setValue]   = useState('');
  const [result, setResult] = useState(null);
  const [logs,   setLogs]   = useState([]);

  const addLog = (msg, type = 'info') => {
    setLogs(prev => [
      { id: Date.now(), msg, type,
        time: new Date().toLocaleTimeString() },
      ...prev.slice(0, 6)
    ]);
  };

  // Debugging Example 1 — console.log
  const handleConsoleLog = () => {
    const data = { value, length: value.length };
    console.log('🔍 Debug:', data);
    console.warn('⚠️ Warning example');
    console.error('❌ Error example');
    console.table([data]);
    addLog(`console.log: "${value}"`, 'success');
  };

  // Debugging Example 2 — debugger
  const handleDebugger = () => {
    const num = parseInt(value) || 0;
    // debugger; // ← Yeh line code rok deti hai!
    // F12 → Sources tab mein step through karo
    const doubled = num * 2;
    const result  = doubled + 10;
    setResult(result);
    addLog(`debugger example: ${num} → ${result}`, 'info');
  };

  // Debugging Example 3 — Error handling
  const handleErrorDemo = () => {
    try {
      if (!value) throw new Error('Value empty hai!');
      const parsed = JSON.parse(value);
      setResult(parsed);
      addLog(`JSON parsed: ${value}`, 'success');
    } catch (err) {
      console.error('Caught error:', err.message);
      addLog(`Error: ${err.message}`, 'error');
    }
  };

  // Debugging Example 4 — useEffect debug
  useEffect(() => {
    if (value) {
      console.log('Value changed:', value);
      addLog(`useEffect: value = "${value}"`, 'info');
    }
  }, [value]);

  return (
    <div style={box('#FFF7ED')}>
      <h3>2️⃣ Debugging Techniques</h3>
      <p style={{ color: '#666', fontSize: '13px',
        marginBottom: '12px' }}>
        Bugs dhundho — console, debugger, try/catch
      </p>

      {/* Techniques */}
      <div style={{ display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '8px', marginBottom: '12px' }}>
        {[
          { title: 'console.log',
            desc:  'Value print karo',
            color: '#2563EB', icon: '📝' },
          { title: 'debugger',
            desc:  'Code rok ke dekho',
            color: '#EA580C', icon: '🔴' },
          { title: 'try/catch',
            desc:  'Error pakdo',
            color: '#DC2626', icon: '🛡️' },
        ].map(t => (
          <div key={t.title} style={{
            background: 'white', padding: '10px',
            borderRadius: '8px', textAlign: 'center',
            border: `2px solid ${t.color}` }}>
            <p style={{ fontSize: '22px', margin: '0 0 4px' }}>
              {t.icon}
            </p>
            <p style={{ fontWeight: 'bold', color: t.color,
              margin: '0 0 2px', fontSize: '13px' }}>
              {t.title}
            </p>
            <p style={{ color: '#666', margin: 0,
              fontSize: '11px' }}>
              {t.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Input */}
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder='Kuch likho... ya {"key":"val"}'
        style={{ padding: '8px', width: '100%',
          borderRadius: '6px', border: '1px solid #ddd',
          marginBottom: '8px', boxSizing: 'border-box',
          fontSize: '13px' }}
      />

      <div style={{ marginBottom: '12px' }}>
        <button style={btn()} onClick={handleConsoleLog}>
          console.log
        </button>
        <button style={btn('#EA580C')} onClick={handleDebugger}>
          debugger
        </button>
        <button style={btn('#DC2626')} onClick={handleErrorDemo}>
          try/catch
        </button>
        <button style={btn('#666')}
          onClick={() => { setLogs([]); setResult(null); }}>
          Clear
        </button>
      </div>

      {result !== null && (
        <div style={{ background: '#DCFCE7', padding: '8px',
          borderRadius: '6px', marginBottom: '8px',
          fontSize: '13px' }}>
          Result: <strong>{JSON.stringify(result)}</strong>
        </div>
      )}

      {/* Console Tips */}
      {codeBlock([
        '// Console methods:',
        'console.log("Normal:", value);',
        'console.warn("Warning:", value);',
        'console.error("Error:", value);',
        'console.table(arrayOfObjects);',
        'console.group("Group name");',
        'console.time("timer");',
        'console.timeEnd("timer");',
      ], 'Useful console methods')}

      {/* Log output */}
      {logs.length > 0 && (
        <div style={{ background: '#0F172A',
          borderRadius: '8px', padding: '10px',
          maxHeight: '150px', overflowY: 'auto' }}>
          {logs.map(log => (
            <div key={log.id} style={{
              display: 'flex', gap: '8px',
              marginBottom: '3px', fontSize: '11px',
              fontFamily: 'monospace' }}>
              <span style={{ color: '#64748B' }}>
                {log.time}
              </span>
              <span style={{
                color: log.type === 'error'   ? '#F87171' :
                       log.type === 'success' ? '#86EFAC' : '#94A3B8'
              }}>
                {log.msg}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════
// PART 3 — Performance Profiler
// ══════════════════════════════════════════

// Slow component — intentionally
const SlowComponent = memo(function SlowComponent({ count }) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  // Fake slow calculation
  const start = performance.now();
  while (performance.now() - start < 5) {} // 5ms delay

  return (
    <div style={{ padding: '6px 10px',
      background: '#FEE2E2', borderRadius: '6px',
      marginBottom: '4px', fontSize: '13px',
      display: 'flex', justifyContent: 'space-between' }}>
      <span>Slow Component (count: {count})</span>
      <span style={{ color: '#DC2626', fontSize: '11px' }}>
        renders: {renderCount.current}
      </span>
    </div>
  );
});

const FastComponent = memo(function FastComponent({ name }) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div style={{ padding: '6px 10px',
      background: '#DCFCE7', borderRadius: '6px',
      marginBottom: '4px', fontSize: '13px',
      display: 'flex', justifyContent: 'space-between' }}>
      <span>Fast Component (name: {name})</span>
      <span style={{ color: '#16A34A', fontSize: '11px' }}>
        renders: {renderCount.current}
      </span>
    </div>
  );
});

function ProfilerDemo() {
  const [count,   setCount]   = useState(0);
  const [name,    setName]    = useState('Mateen');
  const [profile, setProfile] = useState([]);

  // React Profiler API
  const onRenderCallback = useCallback((
    id,           // component id
    phase,        // mount / update
    actualTime,   // kitna time laga
    baseTime,     // bina memoization ke
  ) => {
    setProfile(prev => [
      {
        id, phase, actualTime: actualTime.toFixed(2),
        baseTime: baseTime.toFixed(2),
        time: new Date().toLocaleTimeString()
      },
      ...prev.slice(0, 4)
    ]);
  }, []);

  return (
    <div style={box('#F5F3FF')}>
      <h3>3️⃣ Performance Profiler</h3>
      <p style={{ color: '#666', fontSize: '13px',
        marginBottom: '12px' }}>
        Slow components dhundho — render time measure karo
      </p>

      {/* DevTools Profiler Steps */}
      <div style={{ background: '#1E293B', padding: '12px',
        borderRadius: '8px', marginBottom: '12px' }}>
        <p style={{ color: '#60A5FA', fontSize: '12px',
          margin: '0 0 8px', fontFamily: 'monospace' }}>
          // React DevTools Profiler use karna:
        </p>
        {[
          '1. F12 → Profiler tab (⚛️)',
          '2. Record button click karo (🔴)',
          '3. App use karo — buttons click karo',
          '4. Stop button click karo (⬛)',
          '5. Flame chart dekho — slow parts dikhenge',
        ].map((step, i) => (
          <p key={i} style={{ color: '#94A3B8',
            fontSize: '12px', margin: '3px 0',
            fontFamily: 'monospace' }}>
            {step}
          </p>
        ))}
      </div>

      {/* React Profiler API */}
      <Profiler id="DemoSection" onRender={onRenderCallback}>
        <div style={{ marginBottom: '12px' }}>
          <SlowComponent count={count} />
          <FastComponent name={name} />
        </div>
      </Profiler>

      {/* Controls */}
      <div style={{ marginBottom: '12px' }}>
        <button style={btn('#DC2626')}
          onClick={() => setCount(c => c + 1)}>
          Slow Update (count: {count})
        </button>
        <button style={btn('#16A34A')}
          onClick={() => setName(
            n => n === 'Mateen' ? 'Ali' : 'Mateen'
          )}>
          Fast Update (name: {name})
        </button>
        <button style={btn('#666')}
          onClick={() => setProfile([])}>
          Clear
        </button>
      </div>

      {/* Profiler Results */}
      {profile.length > 0 && (
        <div>
          <p style={{ fontWeight: 'bold', fontSize: '13px',
            marginBottom: '6px' }}>
            Profiler Results:
          </p>
          <div style={{ background: '#0F172A',
            borderRadius: '8px', padding: '10px' }}>
            <div style={{ display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
              gap: '4px', marginBottom: '6px',
              fontSize: '11px', color: '#64748B',
              fontFamily: 'monospace' }}>
              <span>ID</span>
              <span>Phase</span>
              <span>Actual</span>
              <span>Base</span>
              <span>Time</span>
            </div>
            {profile.map((p, i) => (
              <div key={i} style={{ display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
                gap: '4px', marginBottom: '3px',
                fontSize: '11px', fontFamily: 'monospace' }}>
                <span style={{ color: '#60A5FA' }}>{p.id}</span>
                <span style={{ color: '#94A3B8' }}>{p.phase}</span>
                <span style={{
                  color: parseFloat(p.actualTime) > 3
                    ? '#F87171' : '#86EFAC'
                }}>
                  {p.actualTime}ms
                </span>
                <span style={{ color: '#94A3B8' }}>
                  {p.baseTime}ms
                </span>
                <span style={{ color: '#64748B' }}>{p.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      <div style={{ background: '#EDE9FE', padding: '10px',
        borderRadius: '8px', marginTop: '12px' }}>
        <p style={{ color: '#7C3AED', fontWeight: 'bold',
          margin: '0 0 6px', fontSize: '13px' }}>
          💡 Profiler Tips:
        </p>
        {[
          'actualTime > 16ms → Slow hai — optimize karo',
          'Zyada renders → React.memo use karo',
          'Flame chart → Wide bar = slow component',
          'Grey bars → memoized = skip hua ✅',
        ].map((tip, i) => (
          <p key={i} style={{ color: '#666',
            fontSize: '12px', margin: '2px 0' }}>
            → {tip}
          </p>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════
// PART 4 — Common Bugs + Fixes
// ══════════════════════════════════════════
function CommonBugsDemo() {
  const bugs = [
    {
      title: 'Infinite Loop',
      icon:  '🔄',
      bad: [
        '// ❌ Infinite loop — useEffect mein state update',
        'useEffect(() => {',
        '  setCount(count + 1); // baar baar chalta hai!',
        '}, [count]);           // count change → effect → count change',
      ],
      good: [
        '// ✅ Fix — functional update',
        'useEffect(() => {',
        '  setCount(c => c + 1); // sirf ek baar',
        '}, []);                  // empty dependency',
      ],
    },
    {
      title: 'Stale Closure',
      icon:  '🔒',
      bad: [
        '// ❌ Stale closure — purani value',
        'const [count, setCount] = useState(0);',
        'const handleClick = () => {',
        '  setTimeout(() => {',
        '    console.log(count); // purana value! 😫',
        '  }, 1000);',
        '};',
      ],
      good: [
        '// ✅ Fix — useRef ya functional update',
        'const countRef = useRef(count);',
        'countRef.current = count;',
        'const handleClick = () => {',
        '  setTimeout(() => {',
        '    console.log(countRef.current); // latest value ✅',
        '  }, 1000);',
        '};',
      ],
    },
    {
      title: 'Missing Key',
      icon:  '🔑',
      bad: [
        '// ❌ Key nahi — React confuse hoga',
        'items.map(item => (',
        '  <li>{item.name}</li>',
        '))',
      ],
      good: [
        '// ✅ Unique key do',
        'items.map(item => (',
        '  <li key={item.id}>{item.name}</li>',
        '))',
      ],
    },
    {
      title: 'Direct State Mutate',
      icon:  '⚠️',
      bad: [
        '// ❌ Direct mutate — re-render nahi hoga!',
        'const [user, setUser] = useState({ name: "" });',
        'user.name = "Mateen"; // ❌ direct change',
        'setUser(user);        // same reference!',
      ],
      good: [
        '// ✅ New object banao — spread use karo',
        'setUser({ ...user, name: "Mateen" }); // ✅',
        '',
        '// Array ke liye:',
        'setItems([...items, newItem]);  // ✅',
        'setItems(items.filter(...));    // ✅',
      ],
    },
  ];

  return (
    <div style={box('#FEF3C7')}>
      <h3>4️⃣ Common Bugs + Fixes</h3>
      <p style={{ color: '#666', fontSize: '13px',
        marginBottom: '12px' }}>
        Yeh galtiyan React mein zyada hoti hain — yaad rakho!
      </p>

      {bugs.map(bug => (
        <div key={bug.title} style={{ marginBottom: '14px',
          background: 'white', borderRadius: '8px',
          padding: '12px', border: '1px solid #E2E8F0' }}>
          <h4 style={{ margin: '0 0 8px', color: '#1A1A2E',
            fontSize: '14px' }}>
            {bug.icon} {bug.title}
          </h4>
          <div style={{ display: 'grid',
            gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div style={{ background: '#1E293B',
              padding: '8px', borderRadius: '6px' }}>
              {bug.bad.map((line, i) => (
                <p key={i} style={{ margin: '1px 0',
                  fontSize: '11px', fontFamily: 'monospace',
                  color: line.startsWith('// ❌')
                    ? '#F87171' : '#94A3B8' }}>
                  {line}
                </p>
              ))}
            </div>
            <div style={{ background: '#1E293B',
              padding: '8px', borderRadius: '6px' }}>
              {bug.good.map((line, i) => (
                <p key={i} style={{ margin: '1px 0',
                  fontSize: '11px', fontFamily: 'monospace',
                  color: line.startsWith('// ✅')
                    ? '#86EFAC' : '#94A3B8' }}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════
function DevToolsPage() {
  return (
    <div style={{ padding: '20px',
      maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#1A1A2E', marginBottom: '4px' }}>
        🔧 Developer Tools
      </h1>
      <p style={{ color: '#666', marginBottom: '8px' }}>
        React DevTools, Debugging, Performance Profiling
      </p>

      {/* Quick summary */}
      <div style={{ display: 'flex', gap: '8px',
        flexWrap: 'wrap', marginBottom: '20px' }}>
        {[
          { label: 'Components Tab', desc: 'State/Props dekho',
            color: '#2563EB' },
          { label: 'Profiler Tab',   desc: 'Slow parts dhundho',
            color: '#7C3AED' },
          { label: 'console.log',    desc: 'Quick debug',
            color: '#16A34A' },
          { label: 'debugger',       desc: 'Code rok ke dekho',
            color: '#EA580C' },
        ].map(item => (
          <div key={item.label} style={{
            background: 'white',
            border: `2px solid ${item.color}`,
            borderRadius: '8px', padding: '8px 12px',
          }}>
            <p style={{ fontWeight: 'bold', color: item.color,
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

      <DevToolsDemo />
      <DebuggingDemo />
      <ProfilerDemo />
      <CommonBugsDemo />
    </div>
  );
}

export default DevToolsPage;