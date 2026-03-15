import UseActionState from '../hooks/React 19 New Hooks/UseActionState';
import UseFormStatus  from '../hooks/React 19 New Hooks/UseFormStatus';
import UseOptimistic  from '../hooks/React 19 New Hooks/UseOptimistic';
import UseAPI         from '../hooks/React 19 New Hooks/UseAPI';

function React19Page() {
  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ color: '#BE185D', marginBottom: '4px' }}>
        🆕 React 19 New Features
      </h1>
      <p style={{ color: '#666', marginBottom: '24px' }}>
        useActionState, useFormStatus, useOptimistic, use()
      </p>
      <hr />
      <UseActionState />
      <hr />
      <UseFormStatus />
      <hr />
      <UseOptimistic />
      <hr />
      <UseAPI />
    </div>
  );
}

export default React19Page;