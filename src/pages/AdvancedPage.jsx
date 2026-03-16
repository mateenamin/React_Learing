import {
  useState, lazy, Suspense,
  Component, createPortal
} from 'react';

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
// PART 1 — Portals
// ══════════════════════════════════════════

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  // createPortal — document.body mein render karo
  return createPortal(
    <div style={{
      // Overlay — poori screen
      position: 'fixed', top: 0, left: 0,
      width: '100%', height: '100%',
      background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'center',
      justifyContent: 'center', zIndex: 1000,
    }}
      onClick={onClose} // bahar click → close
    >
      <div style={{
        background: 'white', borderRadius: '12px',
        padding: '24px', width: '400px',
        maxWidth: '90vw',
      }}
        onClick={e => e.stopPropagation()} // andar click → nahi close
      >
        <div style={{ display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0 }}>{title}</h3>
          <button onClick={onClose}
            style={{ background: 'none', border: 'none',
              fontSize: '20px', cursor: 'pointer',
              color: '#666' }}>
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body // ← yahan render karo — #root ke bahar!
  );
}

function PortalDemo() {
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);

  return (
    <div style={box('#EFF6FF')}>
      <h3>1️⃣ Portals</h3>
      <p style={{ color: '#666', fontSize: '13px',
        marginBottom: '12px' }}>
        Component ko DOM mein kisi aur jagah render karo
      </p>

      {/* Code note */}
      <div style={{ background: '#1E293B', padding: '10px',
        borderRadius: '8px', marginBottom: '12px',
        fontSize: '12px', color: '#94A3B8',
        fontFamily: 'monospace' }}>
        <p style={{ margin: '2px 0', color: '#60A5FA' }}>
          // Portal — document.body mein render
        </p>
        <p style={{ margin: '2px 0' }}>
          createPortal(
        </p>
        <p style={{ margin: '2px 0', paddingLeft: '12px' }}>
          {'<Modal />,'}
        </p>
        <p style={{ margin: '2px 0', paddingLeft: '12px' }}>
          document.body  {'// ← yahan render hoga'}
        </p>
        <p style={{ margin: '2px 0' }}>)</p>
      </div>

      <button style={btn()} onClick={() => setModal1(true)}>
        Info Modal
      </button>
      <button style={btn('#16A34A')} onClick={() => setModal2(true)}>
        Confirm Modal
      </button>

      {/* Modal 1 — Info */}
      <Modal
        isOpen={modal1}
        onClose={() => setModal1(false)}
        title="ℹ️ Information"
      >
        <p style={{ color: '#666', marginBottom: '16px' }}>
          Yeh modal document.body mein render ho raha hai
          — #root ke bahar! DevTools mein dekho.
        </p>
        <button style={btn()} onClick={() => setModal1(false)}>
          OK
        </button>
      </Modal>

      {/* Modal 2 — Confirm */}
      <Modal
        isOpen={modal2}
        onClose={() => setModal2(false)}
        title="⚠️ Confirm Karo"
      >
        <p style={{ color: '#666', marginBottom: '16px' }}>
          Kya aap sure hain? Yeh action undo nahi hoga.
        </p>
        <button style={btn('#DC2626')}
          onClick={() => setModal2(false)}>
          Delete Karo
        </button>
        <button style={btn('#666')}
          onClick={() => setModal2(false)}>
          Cancel
        </button>
      </Modal>
    </div>
  );
}

// ══════════════════════════════════════════
// PART 2 — Error Boundary
// ══════════════════════════════════════════

// Error Boundary — class component hona zaroori
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // Error pakdo
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // Error log karo
  componentDidCatch(error, info) {
    console.log('Error pakda:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ background: '#FEE2E2', padding: '16px',
          borderRadius: '8px', border: '2px solid #DC2626' }}>
          <h4 style={{ color: '#DC2626', margin: '0 0 8px' }}>
            ❌ Kuch galat ho gaya!
          </h4>
          <p style={{ color: '#666', fontSize: '13px',
            margin: '0 0 12px' }}>
            {this.state.error?.message}
          </p>
          <button
            style={btn('#DC2626')}
            onClick={() => this.setState({
              hasError: false, error: null
            })}>
            Dobara Try Karo
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Buggy Component — error throw karega
function BuggyComponent({ shouldCrash }) {
  if (shouldCrash) {
    throw new Error('Component crash ho gaya! 💥');
  }
  return (
    <div style={{ background: '#DCFCE7', padding: '12px',
      borderRadius: '8px' }}>
      ✅ Component theek chal raha hai!
    </div>
  );
}

function ErrorBoundaryDemo() {
  const [crash, setCrash] = useState(false);

  return (
    <div style={box('#FFF7ED')}>
      <h3>2️⃣ Error Boundary</h3>
      <p style={{ color: '#666', fontSize: '13px',
        marginBottom: '12px' }}>
        Component crash ho — poori app nahi — sirf woh hissa ✅
      </p>

      {/* Code note */}
      <div style={{ background: '#1E293B', padding: '10px',
        borderRadius: '8px', marginBottom: '12px',
        fontSize: '12px', color: '#94A3B8',
        fontFamily: 'monospace' }}>
        <p style={{ margin: '2px 0', color: '#60A5FA' }}>
          // Error Boundary — class component
        </p>
        <p style={{ margin: '2px 0' }}>
          {'<ErrorBoundary>'}
        </p>
        <p style={{ margin: '2px 0', paddingLeft: '12px' }}>
          {'<BuggyComponent />  // crash ho sakta hai'}
        </p>
        <p style={{ margin: '2px 0' }}>{'</ErrorBoundary>'}</p>
        <p style={{ margin: '2px 0', color: '#86EFAC' }}>
          // Crash hone pe ErrorBoundary fallback dikhayega ✅
        </p>
      </div>

      <button
        style={btn(crash ? '#16A34A' : '#DC2626')}
        onClick={() => setCrash(!crash)}>
        {crash ? '✅ Fix Karo' : '💥 Crash Karo'}
      </button>

      <div style={{ marginTop: '12px' }}>
        <ErrorBoundary>
          <BuggyComponent shouldCrash={crash} />
        </ErrorBoundary>
      </div>

      <p style={{ color: '#666', fontSize: '12px',
        marginTop: '8px' }}>
        💡 Crash karo — Error Boundary fallback dikhayega
        — baaki page theek rahega ✅
      </p>
    </div>
  );
}

// ══════════════════════════════════════════
// PART 3 — Suspense + Lazy Loading
// ══════════════════════════════════════════

// Fake heavy components — lazy load honge
const HeavyComponent1 = lazy(() =>
  new Promise(resolve =>
    setTimeout(() =>
      resolve({
        default: () => (
          <div style={{ background: '#DCFCE7', padding: '12px',
            borderRadius: '8px' }}>
            <h4>📦 Heavy Component 1</h4>
            <p style={{ color: '#666', fontSize: '13px' }}>
              Yeh 2 second baad load hua — Lazy Loading! ✅
            </p>
          </div>
        )
      }), 2000)
  )
);

const HeavyComponent2 = lazy(() =>
  new Promise(resolve =>
    setTimeout(() =>
      resolve({
        default: () => (
          <div style={{ background: '#EDE9FE', padding: '12px',
            borderRadius: '8px' }}>
            <h4>📦 Heavy Component 2</h4>
            <p style={{ color: '#666', fontSize: '13px' }}>
              Yeh 1.5 second baad load hua! ✅
            </p>
          </div>
        )
      }), 1500)
  )
);

function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div style={{ padding: '20px', textAlign: 'center',
      color: '#666' }}>
      <div style={{
        width: '32px', height: '32px',
        border: '3px solid #E2E8F0',
        borderTop: '3px solid #2563EB',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 8px',
      }} />
      <p style={{ margin: 0, fontSize: '13px' }}>{message}</p>
    </div>
  );
}

function SuspenseLazyDemo() {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [showBoth, setShowBoth] = useState(false);

  return (
    <div style={box('#F5F3FF')}>
      <h3>3️⃣ Suspense + Lazy Loading</h3>
      <p style={{ color: '#666', fontSize: '13px',
        marginBottom: '12px' }}>
        Component sirf tab load karo jab zaroorat ho ✅
      </p>

      {/* Code note */}
      <div style={{ background: '#1E293B', padding: '10px',
        borderRadius: '8px', marginBottom: '12px',
        fontSize: '12px', color: '#94A3B8',
        fontFamily: 'monospace' }}>
        <p style={{ margin: '2px 0', color: '#60A5FA' }}>
          // Lazy — sirf jab chahiye tab load
        </p>
        <p style={{ margin: '2px 0' }}>
          const Heavy = lazy(() ={'>'} import('./Heavy'));
        </p>
        <p style={{ margin: '2px 0', color: '#60A5FA',
          marginTop: '6px' }}>
          // Suspense — load hone tak fallback
        </p>
        <p style={{ margin: '2px 0' }}>
          {'<Suspense fallback={<Loading />}>'}
        </p>
        <p style={{ margin: '2px 0', paddingLeft: '12px' }}>
          {'<Heavy />'}
        </p>
        <p style={{ margin: '2px 0' }}>{'</Suspense>'}</p>
      </div>

      {/* Buttons */}
      <div style={{ marginBottom: '12px' }}>
        <button style={btn()} onClick={() => {
          setShow1(true); setShow2(false); setShowBoth(false);
        }}>
          Load Component 1
        </button>
        <button style={btn('#7C3AED')} onClick={() => {
          setShow2(true); setShow1(false); setShowBoth(false);
        }}>
          Load Component 2
        </button>
        <button style={btn('#16A34A')} onClick={() => {
          setShowBoth(true); setShow1(false); setShow2(false);
        }}>
          Load Both
        </button>
        <button style={btn('#666')} onClick={() => {
          setShow1(false); setShow2(false); setShowBoth(false);
        }}>
          Reset
        </button>
      </div>

      {/* Component 1 */}
      {show1 && (
        <Suspense fallback={
          <LoadingSpinner message="Component 1 load ho raha hai..." />
        }>
          <HeavyComponent1 />
        </Suspense>
      )}

      {/* Component 2 */}
      {show2 && (
        <Suspense fallback={
          <LoadingSpinner message="Component 2 load ho raha hai..." />
        }>
          <HeavyComponent2 />
        </Suspense>
      )}

      {/* Both */}
      {showBoth && (
        <Suspense fallback={
          <LoadingSpinner message="Sab load ho rahe hain..." />
        }>
          <HeavyComponent1 />
          <div style={{ marginTop: '8px' }}>
            <HeavyComponent2 />
          </div>
        </Suspense>
      )}
    </div>
  );
}

// ══════════════════════════════════════════
// PART 4 — Code Splitting
// ══════════════════════════════════════════
function CodeSplittingDemo() {
  const [tab,     setTab]     = useState(null);
  const [loading, setLoading] = useState(false);

  const tabs = [
    { id: 'dashboard', label: '📊 Dashboard', color: '#2563EB' },
    { id: 'settings',  label: '⚙️ Settings',  color: '#16A34A' },
    { id: 'profile',   label: '👤 Profile',   color: '#7C3AED' },
  ];

  const tabContent = {
    dashboard: (
      <div style={{ background: '#EFF6FF', padding: '12px',
        borderRadius: '8px' }}>
        <h4>📊 Dashboard</h4>
        <p style={{ color: '#666', fontSize: '13px' }}>
          Yeh chunk sirf tab load hua jab Dashboard pe aaye ✅
        </p>
        <p style={{ color: '#666', fontSize: '13px' }}>
          dashboard.chunk.js — sirf 50kb
        </p>
      </div>
    ),
    settings: (
      <div style={{ background: '#F0FDF4', padding: '12px',
        borderRadius: '8px' }}>
        <h4>⚙️ Settings</h4>
        <p style={{ color: '#666', fontSize: '13px' }}>
          Yeh chunk sirf tab load hua jab Settings pe aaye ✅
        </p>
        <p style={{ color: '#666', fontSize: '13px' }}>
          settings.chunk.js — sirf 30kb
        </p>
      </div>
    ),
    profile: (
      <div style={{ background: '#F5F3FF', padding: '12px',
        borderRadius: '8px' }}>
        <h4>👤 Profile</h4>
        <p style={{ color: '#666', fontSize: '13px' }}>
          Yeh chunk sirf tab load hua jab Profile pe aaye ✅
        </p>
        <p style={{ color: '#666', fontSize: '13px' }}>
          profile.chunk.js — sirf 40kb
        </p>
      </div>
    ),
  };

  const handleTab = (id) => {
    setLoading(true);
    setTab(null);
    // Fake loading — code splitting simulate
    setTimeout(() => {
      setTab(id);
      setLoading(false);
    }, 800);
  };

  return (
    <div style={box('#F0FDF4')}>
      <h3>4️⃣ Code Splitting</h3>
      <p style={{ color: '#666', fontSize: '13px',
        marginBottom: '12px' }}>
        App ka code chhote pieces mein todo — fast loading ✅
      </p>

      {/* Before / After */}
      <div style={{ display: 'flex', gap: '10px',
        marginBottom: '12px' }}>
        <div style={{ flex: 1, background: '#FEE2E2',
          padding: '10px', borderRadius: '8px',
          fontSize: '12px' }}>
          <p style={{ fontWeight: 'bold', color: '#DC2626',
            margin: '0 0 4px' }}>
            ❌ Bina Code Splitting
          </p>
          <p style={{ color: '#666', margin: '2px 0' }}>
            bundle.js = 5MB
          </p>
          <p style={{ color: '#666', margin: '2px 0' }}>
            Sab ek saath download
          </p>
          <p style={{ color: '#666', margin: '2px 0' }}>
            First load slow 😫
          </p>
        </div>
        <div style={{ flex: 1, background: '#DCFCE7',
          padding: '10px', borderRadius: '8px',
          fontSize: '12px' }}>
          <p style={{ fontWeight: 'bold', color: '#16A34A',
            margin: '0 0 4px' }}>
            ✅ Code Splitting ke saath
          </p>
          <p style={{ color: '#666', margin: '2px 0' }}>
            main.js = 100kb
          </p>
          <p style={{ color: '#666', margin: '2px 0' }}>
            Chunks zaroorat pe load
          </p>
          <p style={{ color: '#666', margin: '2px 0' }}>
            First load fast ✅
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '6px',
        marginBottom: '12px' }}>
        {tabs.map(t => (
          <button key={t.id}
            style={btn(tab === t.id ? t.color : '#E2E8F0')}
            onClick={() => handleTab(t.id)}>
            <span style={{
              color: tab === t.id ? 'white' : '#666'
            }}>
              {t.label}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      {!tab && !loading && (
        <div style={{ padding: '20px', textAlign: 'center',
          color: '#888', border: '2px dashed #E2E8F0',
          borderRadius: '8px', fontSize: '13px' }}>
          Tab select karo — chunk load hoga
        </div>
      )}

      {loading && (
        <LoadingSpinner message="Chunk download ho raha hai..." />
      )}

      {tab && !loading && tabContent[tab]}
    </div>
  );
}

// ══════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════
function AdvancedPage() {
  return (
    <div style={{ padding: '20px',
      maxWidth: '800px', margin: '0 auto' }}>

      {/* Spinner animation */}
      <style>{`
        @keyframes spin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <h1 style={{ color: '#1A1A2E', marginBottom: '4px' }}>
        ⚡ Advanced React
      </h1>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        Portals, Error Boundary, Suspense, Lazy, Code Splitting
      </p>

      <PortalDemo />
      <ErrorBoundaryDemo />
      <SuspenseLazyDemo />
      <CodeSplittingDemo />
    </div>
  );
}

export default AdvancedPage;