import {
  Routes, Route, Link, NavLink,
  useNavigate, useParams,
  Outlet, Navigate
} from 'react-router-dom';
import { useState } from 'react';

// ── Styles ────────────────────────────────
const btn = (color = '#2563EB') => ({
  background: color, color: 'white',
  border: 'none', borderRadius: '6px',
  padding: '7px 14px', cursor: 'pointer',
  marginRight: '8px', marginTop: '8px',
});

const box = (color = '#EFF6FF') => ({
  background: color, borderRadius: '10px',
  padding: '16px', marginBottom: '16px',
});

// ── Pages ─────────────────────────────────

function RHome() {
  const navigate = useNavigate();
  return (
    <div style={box()}>
      <h3>🏠 Home</h3>
      <p style={{ color: '#666' }}>Yeh Home page hai</p>
      <button style={btn()} onClick={() => navigate('/router/about')}>
        About Pe Jao
      </button>
      <button style={btn('#666')} onClick={() => navigate(-1)}>
        ← Wapas
      </button>
    </div>
  );
}

function RAbout() {
  const navigate = useNavigate();
  return (
    <div style={box('#F0FDF4')}>
      <h3>📋 About</h3>
      <p style={{ color: '#666' }}>useNavigate se aaye yahan</p>
      <button style={btn('#666')} onClick={() => navigate(-1)}>
        ← Wapas
      </button>
    </div>
  );
}

function RUsers() {
  const users = [
    { id: 1, name: 'Mateen', city: 'Lahore'    },
    { id: 2, name: 'Ali',    city: 'Karachi'   },
    { id: 3, name: 'Sara',   city: 'Islamabad' },
  ];
  return (
    <div style={box('#FFF7ED')}>
      <h3>👥 Users — useParams demo</h3>
      <p style={{ color: '#666', fontSize: '13px' }}>
        Click karo — URL mein ID aayegi
      </p>
      {users.map(u => (
        <Link key={u.id}
          to={`/router/users/${u.id}`}
          style={{ display: 'block', padding: '8px',
            marginBottom: '6px', background: 'white',
            borderRadius: '8px', textDecoration: 'none',
            color: '#1A1A2E', border: '1px solid #E2E8F0' }}>
          {u.name} — {u.city} →
        </Link>
      ))}
    </div>
  );
}

function RUserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const users = {
    1: { name: 'Mateen', city: 'Lahore',    role: 'Developer' },
    2: { name: 'Ali',    city: 'Karachi',   role: 'Designer'  },
    3: { name: 'Sara',   city: 'Islamabad', role: 'Manager'   },
  };
  const user = users[id];

  if (!user) return (
    <div style={box('#FEE2E2')}>
      <p>❌ User nahi mila!</p>
      <button style={btn()} onClick={() => navigate('/router/users')}>
        Wapas
      </button>
    </div>
  );

  return (
    <div style={box('#F0FDF4')}>
      <button style={{ ...btn('#666'), marginBottom: '10px' }}
        onClick={() => navigate(-1)}>
        ← Wapas
      </button>
      <h3>{user.name}</h3>
      <p>📍 {user.city}</p>
      <p>💼 {user.role}</p>
      <span style={{ background: '#16A34A', color: 'white',
        padding: '3px 10px', borderRadius: '999px',
        fontSize: '13px' }}>
        URL se ID: {id} ✅
      </span>
    </div>
  );
}

// ── Nested Routes ─────────────────────────

function RDashboard() {
  return (
    <div style={box('#F5F3FF')}>
      <h3>📊 Dashboard — Nested Routes</h3>
      <div style={{ display: 'flex', gap: '8px',
        marginBottom: '12px' }}>
        <NavLink to="/router/dashboard"
          end
          style={({ isActive }) => ({
            ...btn(isActive ? '#7C3AED' : '#C4B5FD'),
            textDecoration: 'none', display: 'inline-block'
          })}>
          Overview
        </NavLink>
        <NavLink to="/router/dashboard/users"
          style={({ isActive }) => ({
            ...btn(isActive ? '#7C3AED' : '#C4B5FD'),
            textDecoration: 'none', display: 'inline-block'
          })}>
          Users
        </NavLink>
        <NavLink to="/router/dashboard/stats"
          style={({ isActive }) => ({
            ...btn(isActive ? '#7C3AED' : '#C4B5FD'),
            textDecoration: 'none', display: 'inline-block'
          })}>
          Stats
        </NavLink>
      </div>
      {/* Child yahan dikhega */}
      <Outlet />
    </div>
  );
}

function ROverview() {
  return (
    <div style={{ background: 'white', padding: '12px',
      borderRadius: '8px' }}>
      <p>📊 Overview — index route hai yeh</p>
      <p style={{ color: '#666', fontSize: '13px' }}>
        /router/dashboard pe aao — yeh dikhega
      </p>
    </div>
  );
}

function RDashUsers() {
  return (
    <div style={{ background: 'white', padding: '12px',
      borderRadius: '8px' }}>
      <p>👥 Dashboard Users</p>
      <p style={{ color: '#666', fontSize: '13px' }}>
        /router/dashboard/users
      </p>
    </div>
  );
}

function RStats() {
  return (
    <div style={{ background: 'white', padding: '12px',
      borderRadius: '8px' }}>
      <p>📈 Stats Page</p>
      <p style={{ color: '#666', fontSize: '13px' }}>
        /router/dashboard/stats
      </p>
    </div>
  );
}

// ── Protected Route ───────────────────────

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('router_token');
  if (!token) return <Navigate to="/router/login" replace />;
  return children;
}

function RLogin() {
  const navigate = useNavigate();
  const [pass, setPass] = useState('');
  const [err,  setErr]  = useState('');

  const handleLogin = () => {
    if (pass === '1234') {
      localStorage.setItem('router_token', 'abc');
      navigate('/router/secret');
    } else {
      setErr('Password galat! (hint: 1234)');
    }
  };

  return (
    <div style={box('#FFF7ED')}>
      <h3>🔐 Login</h3>
      <p style={{ color: '#666', fontSize: '13px' }}>
        Password: 1234
      </p>
      <input
        value={pass}
        onChange={e => setPass(e.target.value)}
        placeholder="Password..."
        type="password"
        style={{ padding: '7px', borderRadius: '6px',
          border: '1px solid #ddd', marginRight: '8px' }}
      />
      <button style={btn()} onClick={handleLogin}>
        Login
      </button>
      {err && <p style={{ color: 'red', marginTop: '8px' }}>{err}</p>}
    </div>
  );
}

function RSecret() {
  const navigate = useNavigate();
  return (
    <div style={box('#F0FDF4')}>
      <h3>🔓 Secret Page</h3>
      <p>Sirf logged in users dekh sakte hain! ✅</p>
      <button style={btn('#DC2626')} onClick={() => {
        localStorage.removeItem('router_token');
        navigate('/router/login');
      }}>
        Logout
      </button>
    </div>
  );
}

function R404() {
  const navigate = useNavigate();
  return (
    <div style={box('#FEE2E2')}>
      <h3>❌ 404 — Page nahi mila!</h3>
      <button style={btn()} onClick={() => navigate('/router')}>
        Home Pe Jao
      </button>
    </div>
  );
}

// ── Main Component ────────────────────────

function RouterPage() {
  const navLink = ({ isActive }) => ({
    padding: '6px 12px', borderRadius: '6px',
    textDecoration: 'none', fontWeight: 'bold',
    fontSize: '13px',
    background: isActive ? '#0D9488' : '#F0FDFA',
    color:      isActive ? 'white'   : '#0D9488',
    border: '1px solid #0D9488',
  });

  return (
    <div style={{ padding: '20px', maxWidth: '800px',
      margin: '0 auto' }}>

      <h1 style={{ color: '#0D9488', marginBottom: '4px' }}>
        🔗 React Router
      </h1>

      {/* Concepts chips */}
      <div style={{ display: 'flex', gap: '6px',
        flexWrap: 'wrap', marginBottom: '16px' }}>
        {['Route','Link','NavLink','useNavigate',
          'useParams','Nested','Protected'].map(c => (
          <span key={c} style={{ background: '#F0FDFA',
            color: '#0D9488', border: '1px solid #99F6E4',
            padding: '3px 10px', borderRadius: '999px',
            fontSize: '12px', fontWeight: 'bold' }}>
            {c}
          </span>
        ))}
      </div>

      {/* Navbar */}
      <div style={{ display: 'flex', gap: '6px',
        flexWrap: 'wrap', marginBottom: '16px',
        padding: '10px', background: '#1A1A2E',
        borderRadius: '10px' }}>
        <NavLink to="/router"            style={navLink} end>Home</NavLink>
        <NavLink to="/router/about"      style={navLink}>About</NavLink>
        <NavLink to="/router/users"      style={navLink}>Users</NavLink>
        <NavLink to="/router/dashboard"  style={navLink}>Dashboard</NavLink>
        <NavLink to="/router/login"      style={navLink}>Login</NavLink>
        <NavLink to="/router/secret"     style={navLink}>Secret 🔐</NavLink>
      </div>

      {/* Routes */}
      <Routes>
        {/* Basic */}
        <Route path="/router"              element={<RHome />}    />
        <Route path="/router/about"        element={<RAbout />}   />

        {/* useParams */}
        <Route path="/router/users"        element={<RUsers />}      />
        <Route path="/router/users/:id"    element={<RUserDetail />} />

        {/* Nested Routes */}
        <Route path="/router/dashboard"    element={<RDashboard />}>
          <Route index                     element={<ROverview />}  />
          <Route path="users"              element={<RDashUsers />} />
          <Route path="stats"              element={<RStats />}     />
        </Route>

        {/* Protected Routes */}
        <Route path="/router/login"        element={<RLogin />} />
        <Route path="/router/secret"       element={
          <ProtectedRoute>
            <RSecret />
          </ProtectedRoute>
        } />

        {/* 404 */}
        <Route path="*"                    element={<R404 />} />
      </Routes>

    </div>
  );
}

export default RouterPage;


