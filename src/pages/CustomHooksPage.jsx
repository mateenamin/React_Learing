import UseFetch   from '../hooks/Custom Hooks/useFetch';
import UseAuth    from '../hooks/Custom Hooks/UseAuth';
import UseDebounce from '../hooks/Custom Hooks/useDebounce';

function CustomHooksPage() {
  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ color: '#EA580C', marginBottom: '4px' }}>
        ⚙️ Custom Hooks
      </h1>
      <p style={{ color: '#666', marginBottom: '24px' }}>
        useFetch, useAuth, useDebounce
      </p>
      <hr />
      <UseFetch />
      <hr />
      <UseAuth />
      <hr />
      <UseDebounce />
    </div>
  );
}

export default CustomHooksPage;