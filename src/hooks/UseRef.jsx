
// useRef — DOM Access
// Simple matlab: Element ko seedha pakdo — ya value yaad rakho bina render ke



// const inputRef = useRef(null);

// // DOM access
// inputRef.current.focus();      // focus karo
// inputRef.current.value;        // value lo
// inputRef.current.scrollIntoView(); // scroll karo

// // Value yaad rakho — re-render nahi hoga
// const countRef = useRef(0);
// countRef.current = countRef.current + 1;
// // useState se farq — screen update nahi hogi



























import { useState, useRef, useEffect } from 'react';

function UseRef() {
  const inputRef    = useRef(null);
  const renderCount = useRef(0);      // renders count — no re-render
  const [text, setText] = useState('');
  const [prevText, setPrevText] = useState('');

  // Har render pe count badhao
  useEffect(() => {
    renderCount.current += 1;
  });

  // Text change pe previous yaad rakho
  useEffect(() => {
    setPrevText(text);
  }, [text]);

  return (
    <div>
      <h2>useRef Demo</h2>

      {/* DOM Access */}
      <div style={{ marginBottom: '15px', padding: '15px',
        border: '2px solid #2563EB', borderRadius: '10px' }}>
        <h3>DOM Access</h3>
        <input
          ref={inputRef}
          placeholder="Main focus hounga..."
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <button onClick={() => inputRef.current.focus()}>
          Focus Input
        </button>
        <button onClick={() => inputRef.current.value = ''}>
          Clear Input
        </button>
      </div>

      {/* Render count — bina re-render */}
      <div style={{ marginBottom: '15px', padding: '15px',
        border: '2px solid #16A34A', borderRadius: '10px' }}>
        <h3>Render Count — bina re-render</h3>
        <p>Renders: {renderCount.current}</p>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Likho — renders count hoga..."
        />
        <p>Current: {text}</p>
        <p>Previous: {prevText}</p>
      </div>
    </div>
  );
}

export default UseRef;