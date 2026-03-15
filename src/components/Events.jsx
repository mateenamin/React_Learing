import { useState } from 'react';

function Events() {
  const [text, setText]           = useState('');
  const [submitted, setSubmitted] = useState('');
  const [color, setColor]         = useState('black');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === '') return;
    setSubmitted(text);
    setText('');
  };

  return (
    <div>
      <h2>Events Demo</h2>

      {/* onClick */}
      <button onClick={() => alert('Clicked!')}>
        Click Me!
      </button>

      {/* onChange — live */}
      <div style={{ marginTop: '10px' }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Kuch likho..."
        />
        <span> Live: {text}</span>
      </div>

      {/* onSubmit */}
      <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Submit karo..."
        />
        <button type="submit">Submit</button>
      </form>

      {submitted && (
        <p style={{ color: 'green' }}>✅ Submitted: {submitted}</p>
      )}

      {/* onMouseOver */}
      <div
        onMouseOver={() => setColor('blue')}
        onMouseOut={()  => setColor('black')}
        style={{ marginTop: '10px', padding: '10px',
          background: '#f0f0f0', color, cursor: 'pointer' }}
      >
        Hover karo — color change hoga!
      </div>
    </div>
  );
}

export default Events;


// Events kaise kaam karte hain:


function EventDemo() {
  const [text, setText] = useState('');

  return (
    <div>
      {/* onClick — button daba */}
      <button onClick={() => alert('Dabaya!')}>
        Dabao
      </button>

      {/* onChange — input mein likho */}
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        // e = event object
        // e.target = input element
        // e.target.value = jo likha hai
      />
      <p>Tu ne likha: {text}</p>

      {/* onSubmit — form submit */}
      <form onSubmit={(e) => {
        e.preventDefault();  // page reload rokta hai
        alert('Form submit hua: ' + text);
      }}>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}




// ##Events — Kya Hain?

// **Simple matlab:** User ne kuch kiya — React ko batao

// User ne button dabaya    →  onClick
// User ne kuch likha       →  onChange
// User ne form submit kiya →  onSubmit
// User ne hover kiya       →  onMouseOver