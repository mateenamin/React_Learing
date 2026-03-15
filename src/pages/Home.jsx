import { Link } from 'react-router-dom';

function Home() {
  const topics = [
    {
      to: '/fundamentals',
      icon: '📝',
      title: 'React Fundamentals',
      desc: 'JSX, Components, Props, State, Events, Lists',
      color: '#2563EB',
      done: true,
    },
    {
      to: '/architecture',
      icon: '🏗️',
      title: 'Component Architecture',
      desc: 'Composition, Children, Reusable, PropDrilling',
      color: '#16A34A',
      done: true,
    },
    {
      to: '/hooks',
      icon: '🪝',
      title: 'Core Hooks',
      desc: 'useState, useEffect, useRef, useContext, useMemo',
      color: '#7C3AED',
      done: true,
    },
    {
      to: '/custom-hooks',
      icon: '⚙️',
      title: 'Custom Hooks',
      desc: 'useFetch, useAuth, useDebounce',
      color: '#EA580C',
      done: true,
    },
    {
      to: '/react19',
      icon: '🆕',
      title: 'React 19 Features',
      desc: 'useActionState, useOptimistic, use(), useFormStatus',
      color: '#BE185D',
      done: true,
    },
    {
      to: '/router',
      icon: '🔗',
      title: 'React Router',
      desc: 'Routes, Link, NavLink, useParams, Protected',
      color: '#0D9488',
      done: false,
    },
  ];

  return (
    <div style={{ padding: '40px 20px',
      maxWidth: '800px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '40px', color: '#1A1A2E',
          margin: '0 0 8px' }}>
          ⚛️ React 19 Learning
        </h1>
        <p style={{ color: '#666', fontSize: '16px', margin: 0 }}>
          Mateen Amin — Lahore 🇵🇰
        </p>
      </div>

      {/* Topics Grid */}
      <div style={{ display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
        {topics.map(t => (
          <Link key={t.to} to={t.to}
            style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'white',
              border: `2px solid ${t.done ? t.color : '#E2E8F0'}`,
              borderRadius: '12px',
              padding: '20px',
              transition: 'all 0.2s',
            }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start' }}>
                <span style={{ fontSize: '32px' }}>{t.icon}</span>
                <span style={{
                  fontSize: '12px',
                  fontWeight: 'bold',
                  padding: '3px 10px',
                  borderRadius: '999px',
                  background: t.done ? '#DCFCE7' : '#FEF3C7',
                  color:      t.done ? '#16A34A' : '#92400E',
                }}>
                  {t.done ? '✅ Done' : '🔄 Current'}
                </span>
              </div>
              <h3 style={{ color: t.color,
                margin: '10px 0 4px', fontSize: '16px' }}>
                {t.title}
              </h3>
              <p style={{ color: '#666',
                fontSize: '13px', margin: 0 }}>
                {t.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;