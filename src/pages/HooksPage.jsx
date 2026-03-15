import UseState    from '../hooks/UseState';
import UseEffect   from '../hooks/UseEffect';
import UseRef      from '../hooks/UseRef';
import UseContext  from '../hooks/UseContext';
import UseMemo     from '../hooks/UseMemo';
import UseCallback from '../hooks/UseCallback';

function HooksPage() {
  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ color: '#7C3AED', marginBottom: '4px' }}>
        🪝 Core Hooks
      </h1>
      <p style={{ color: '#666', marginBottom: '24px' }}>
        useState, useEffect, useRef, useContext, useMemo, useCallback
      </p>
      <hr />
      <UseState />
      <hr />
      <UseEffect />
      <hr />
      <UseRef />
      <hr />
      <UseContext />
      <hr />
      <UseMemo />
      <hr />
      <UseCallback />
    </div>
  );
}

export default HooksPage;