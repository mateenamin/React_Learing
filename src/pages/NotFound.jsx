import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '80px', color: '#2563EB' }}>404</h1>
      <h2>Page nahi mila!</h2>
      <button onClick={() => navigate('/')}
        style={{ background: '#2563EB', color: 'white',
          border: 'none', borderRadius: '8px',
          padding: '12px 24px', cursor: 'pointer',
          marginTop: '16px', fontSize: '16px' }}>
        Home Pe Jao
      </button>
    </div>
  );
}

export default NotFound;