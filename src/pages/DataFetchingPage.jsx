import { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery, QueryClient,
         QueryClientProvider } from '@tanstack/react-query';

const API = 'https://jsonplaceholder.typicode.com';

// QueryClient — React Query ke liye
const queryClient = new QueryClient();

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
  marginRight: '6px',
});

// ── User Card ─────────────────────────────
function UserCard({ user }) {
  return (
    <div style={{ padding: '10px', background: 'white',
      borderRadius: '8px', marginBottom: '8px',
      border: '1px solid #E2E8F0' }}>
      <p style={{ fontWeight: 'bold', margin: '0 0 2px' }}>
        {user.name}
      </p>
      <p style={{ color: '#666', fontSize: '13px', margin: 0 }}>
        📧 {user.email} — 📍 {user.address?.city}
      </p>
    </div>
  );
}

// ── Loading Component ─────────────────────
function Loading() {
  return (
    <div style={{ padding: '20px', textAlign: 'center',
      color: '#666' }}>
      ⏳ Loading...
    </div>
  );
}

// ── Error Component ───────────────────────
function ErrorMsg({ message, onRetry }) {
  return (
    <div style={{ background: '#FEE2E2', padding: '12px',
      borderRadius: '8px', color: '#DC2626' }}>
      ❌ Error: {message}
      {onRetry && (
        <button style={{ ...btn('#DC2626'), marginLeft: '10px' }}
          onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}

// ══════════════════════════════════════════
// PART 1 — Fetch API
// ══════════════════════════════════════════
function FetchAPIDemo() {
  const [users,   setUsers]   = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API}/users`);

      // Fetch khud error nahi throw karta — khud check karo
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data.slice(0, 4));

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // hamesha false karo
    }
  };

  const fetchError = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API}/invalid-url`);
      if (!response.ok) throw new Error(`${response.status} Not Found`);
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={box('#EFF6FF')}>
      <h3>1️⃣ Fetch API</h3>
      <p style={{ color: '#666', fontSize: '13px',
        marginBottom: '10px' }}>
        Browser built-in — koi install nahi
      </p>

      {/* Code explanation */}
      <div style={{ background: '#1E293B', padding: '12px',
        borderRadius: '8px', marginBottom: '12px',
        fontSize: '13px', color: '#94A3B8',
        fontFamily: 'monospace' }}>
        <p style={{ margin: '2px 0' }}>const res  = await fetch(url);</p>
        <p style={{ margin: '2px 0' }}>if (!res.ok) throw new Error(...);</p>
        <p style={{ margin: '2px 0' }}>const data = await res.json();</p>
      </div>

      <button style={btn()} onClick={fetchUsers}>
        Fetch Users ✅
      </button>
      <button style={btn('#DC2626')} onClick={fetchError}>
        Error Test ❌
      </button>
      <button style={btn('#666')} onClick={() => {
        setUsers([]); setError(null);
      }}>
        Clear
      </button>

      <div style={{ marginTop: '12px' }}>
        {loading && <Loading />}
        {error   && <ErrorMsg message={error} onRetry={fetchUsers} />}
        {!loading && !error && users.map(u => (
          <UserCard key={u.id} user={u} />
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════
// PART 2 — Axios
// ══════════════════════════════════════════

// Axios instance — base URL set karo
const api = axios.create({
  baseURL: API,
  timeout: 5000, // 5 second timeout
});

// Interceptor — har request mein token add karo
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

function AxiosDemo() {
  const [users,   setUsers]   = useState([]);
  const [posts,   setPosts]   = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);
  const [tab,     setTab]     = useState('users');

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get('/users');
      // Axios automatically JSON parse karta hai ✅
      // Error automatically throw karta hai ✅
      setUsers(data.slice(0, 4));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get('/posts?_limit=4');
      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTab = (t) => {
    setTab(t);
    setUsers([]);
    setPosts([]);
    setError(null);
    if (t === 'users') fetchUsers();
    else fetchPosts();
  };

  return (
    <div style={box('#F0FDF4')}>
      <h3>2️⃣ Axios</h3>
      <p style={{ color: '#666', fontSize: '13px',
        marginBottom: '10px' }}>
        Fetch se better — automatic JSON + error
      </p>

      {/* Fetch vs Axios */}
      <div style={{ display: 'flex', gap: '10px',
        marginBottom: '12px' }}>
        <div style={{ flex: 1, background: '#FEE2E2',
          padding: '10px', borderRadius: '8px',
          fontSize: '12px', fontFamily: 'monospace' }}>
          <p style={{ margin: '0 0 4px', fontWeight: 'bold',
            color: '#DC2626' }}>❌ Fetch</p>
          <p style={{ margin: '2px 0', color: '#666' }}>
            const res = await fetch(url);
          </p>
          <p style={{ margin: '2px 0', color: '#666' }}>
            if (!res.ok) throw...
          </p>
          <p style={{ margin: '2px 0', color: '#666' }}>
            const data = await res.json();
          </p>
        </div>
        <div style={{ flex: 1, background: '#DCFCE7',
          padding: '10px', borderRadius: '8px',
          fontSize: '12px', fontFamily: 'monospace' }}>
          <p style={{ margin: '0 0 4px', fontWeight: 'bold',
            color: '#16A34A' }}>✅ Axios</p>
          <p style={{ margin: '2px 0', color: '#666' }}>
            const {'{ data }'} =
          </p>
          <p style={{ margin: '2px 0', color: '#666' }}>
            await axios.get(url);
          </p>
          <p style={{ margin: '2px 0', color: '#666' }}>
            // bas itna! ✅
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ marginBottom: '10px' }}>
        <button
          style={btn(tab === 'users' ? '#16A34A' : '#86EFAC')}
          onClick={() => handleTab('users')}>
          Users
        </button>
        <button
          style={btn(tab === 'posts' ? '#16A34A' : '#86EFAC')}
          onClick={() => handleTab('posts')}>
          Posts
        </button>
        <button style={btn('#666')} onClick={() => {
          setUsers([]); setPosts([]); setError(null);
        }}>
          Clear
        </button>
      </div>

      {loading && <Loading />}
      {error   && <ErrorMsg message={error} />}

      {tab === 'users' && users.map(u => (
        <UserCard key={u.id} user={u} />
      ))}

      {tab === 'posts' && posts.map(p => (
        <div key={p.id} style={{ padding: '8px', background: 'white',
          borderRadius: '8px', marginBottom: '6px',
          border: '1px solid #E2E8F0' }}>
          <p style={{ fontWeight: 'bold', margin: '0 0 2px',
            fontSize: '14px' }}>
            {p.title.slice(0, 50)}...
          </p>
          <p style={{ color: '#666', fontSize: '12px', margin: 0 }}>
            User ID: {p.userId}
          </p>
        </div>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════
// PART 3 — React Query
// ══════════════════════════════════════════
function ReactQueryDemo() {
  const [userId, setUserId] = useState(1);

  // useQuery — sab automatic! ✅
  const {
    data: users,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey:  ['users'],
    queryFn:   () => api.get('/users').then(r => r.data.slice(0, 4)),
    staleTime: 30000, // 30 sec tak cache rahe
  });

  // Dynamic query — userId change pe refetch
  const {
    data: user,
    isLoading: userLoading,
  } = useQuery({
    queryKey: ['user', userId],
    queryFn:  () => api.get(`/users/${userId}`).then(r => r.data),
  });

  return (
    <div style={box('#F5F3FF')}>
      <h3>3️⃣ React Query (TanStack)</h3>
      <p style={{ color: '#666', fontSize: '13px',
        marginBottom: '10px' }}>
        Sabse powerful — cache + auto refetch + background update
      </p>

      {/* Features */}
      <div style={{ display: 'flex', gap: '6px',
        flexWrap: 'wrap', marginBottom: '12px' }}>
        {['Auto Cache', 'Auto Retry', 'Background Refetch',
          'Loading State', 'Error State'].map(f => (
          <span key={f} style={{ background: '#EDE9FE',
            color: '#7C3AED', padding: '3px 8px',
            borderRadius: '999px', fontSize: '12px' }}>
            ✅ {f}
          </span>
        ))}
      </div>

      {/* Users List */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center', marginBottom: '8px' }}>
          <h4 style={{ margin: 0 }}>Users List:</h4>
          <button style={btn('#7C3AED')} onClick={() => refetch()}>
            {isFetching ? '⏳ Refreshing...' : '🔄 Refresh'}
          </button>
        </div>
        {isLoading && <Loading />}
        {error     && <ErrorMsg message={error.message} />}
        {users?.map(u => <UserCard key={u.id} user={u} />)}
      </div>

      {/* Single User */}
      <div>
        <h4>Single User — queryKey change pe refetch:</h4>
        <div style={{ display: 'flex', gap: '6px',
          marginBottom: '10px' }}>
          {[1, 2, 3, 4].map(id => (
            <button key={id}
              style={btn(userId === id ? '#7C3AED' : '#C4B5FD')}
              onClick={() => setUserId(id)}>
              User {id}
            </button>
          ))}
        </div>
        {userLoading ? <Loading /> : user && (
          <div style={{ background: 'white', padding: '10px',
            borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <p style={{ fontWeight: 'bold', margin: '0 0 4px' }}>
              {user.name}
            </p>
            <p style={{ color: '#666', fontSize: '13px', margin: 0 }}>
              📧 {user.email}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════
// PART 4 — Loading + Error Patterns
// ══════════════════════════════════════════
function LoadingErrorPatterns() {
  const [state, setState] = useState('idle');
  // idle → loading → success / error

  const simulate = (type) => {
    setState('loading');
    setTimeout(() => {
      setState(type);
    }, 1500);
  };

  return (
    <div style={box('#FFF7ED')}>
      <h3>4️⃣ Loading + Error Patterns</h3>
      <p style={{ color: '#666', fontSize: '13px',
        marginBottom: '10px' }}>
        Har API call mein yeh 3 states hoti hain
      </p>

      {/* State diagram */}
      <div style={{ display: 'flex', alignItems: 'center',
        gap: '8px', marginBottom: '16px',
        fontSize: '13px', flexWrap: 'wrap' }}>
        {['idle', '→', 'loading', '→', 'success / error'].map((s, i) => (
          <span key={i} style={{
            background: s === 'idle'    ? '#F1F5F9' :
                        s === 'loading' ? '#FEF3C7' :
                        s.includes('success') ? '#DCFCE7' : 'transparent',
            color: '#1A1A2E',
            padding: s === '→' ? '0' : '4px 10px',
            borderRadius: '6px',
            fontWeight: s !== '→' ? 'bold' : 'normal',
          }}>
            {s}
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '8px',
        marginBottom: '16px', flexWrap: 'wrap' }}>
        <button style={btn()} onClick={() => simulate('success')}>
          ✅ Success Simulate
        </button>
        <button style={btn('#DC2626')} onClick={() => simulate('error')}>
          ❌ Error Simulate
        </button>
        <button style={btn('#666')} onClick={() => setState('idle')}>
          Reset
        </button>
      </div>

      {/* States */}
      {state === 'idle' && (
        <div style={{ padding: '20px', textAlign: 'center',
          color: '#888', border: '2px dashed #E2E8F0',
          borderRadius: '8px' }}>
          Button dabao — state change dekho
        </div>
      )}

      {state === 'loading' && (
        <div style={{ background: '#FEF3C7', padding: '16px',
          borderRadius: '8px', textAlign: 'center' }}>
          <p style={{ margin: 0 }}>⏳ Loading...</p>
          <p style={{ color: '#666', fontSize: '13px',
            margin: '4px 0 0' }}>
            Spinner ya skeleton dikhao
          </p>
        </div>
      )}

      {state === 'success' && (
        <div style={{ background: '#DCFCE7', padding: '16px',
          borderRadius: '8px' }}>
          <p style={{ color: '#16A34A', fontWeight: 'bold',
            margin: '0 0 8px' }}>
            ✅ Data aa gaya!
          </p>
          {[
            { name: 'Mateen', email: 'mateen@gmail.com' },
            { name: 'Ali',    email: 'ali@gmail.com'    },
          ].map(u => (
            <UserCard key={u.name} user={u} />
          ))}
        </div>
      )}

      {state === 'error' && (
        <ErrorMsg
          message="Network error — server se connect nahi hua"
          onRetry={() => simulate('success')}
        />
      )}
    </div>
  );
}

// ══════════════════════════════════════════
// MAIN — QueryClientProvider wrap karo
// ══════════════════════════════════════════
function DataFetchingContent() {
  return (
    <div style={{ padding: '20px',
      maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#2563EB', marginBottom: '4px' }}>
        🌐 Data Fetching
      </h1>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        Fetch API, Axios, React Query, Loading + Error
      </p>

      {/* Comparison */}
      <div style={{ background: '#1E293B', padding: '14px',
        borderRadius: '10px', marginBottom: '20px',
        fontSize: '13px', color: '#94A3B8',
        fontFamily: 'monospace' }}>
        <p style={{ margin: '2px 0', color: '#60A5FA' }}>
          // 4 tarike — same kaam
        </p>
        <p style={{ margin: '2px 0' }}>Fetch API   → built-in</p>
        <p style={{ margin: '2px 0' }}>Axios       → better fetch</p>
        <p style={{ margin: '2px 0' }}>React Query → cache + auto</p>
        <p style={{ margin: '2px 0' }}>RTK Query   → Redux + API</p>
      </div>

      <FetchAPIDemo />
      <AxiosDemo />
      <ReactQueryDemo />
      <LoadingErrorPatterns />
    </div>
  );
}

function DataFetchingPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <DataFetchingContent />
    </QueryClientProvider>
  );
}

export default DataFetchingPage;