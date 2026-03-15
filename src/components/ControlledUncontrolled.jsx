// ## 3️⃣ Controlled vs Uncontrolled — Kya Hai?

// Controlled   = React state se control hota hai
// Uncontrolled = DOM khud control karta hai — useRef


// // Controlled — React jaanta hai value kya hai
// const [name, setName] = useState('');
// <input value={name} onChange={(e) => setName(e.target.value)} />

// // Uncontrolled — seedha DOM se lo
// const nameRef = useRef(null);
// <input ref={nameRef} />
// // value chahiye? — nameRef.current.value




import { useState, useRef } from 'react';

function ControlledUncontrolled() {
  // Controlled — React state mein value hai
  const [name, setName]   = useState('');
  const [email, setEmail] = useState('');
  const [result, setResult] = useState(null);

  // Uncontrolled — DOM mein value hai
  const cityRef    = useRef(null);
  const countryRef = useRef(null);

  const handleControlled = (e) => {
    e.preventDefault();
    setResult({
      type: 'Controlled',
      name,
      email
    });
  };

  const handleUncontrolled = (e) => {
    e.preventDefault();
    setResult({
      type: 'Uncontrolled',
      city:    cityRef.current.value,
      country: countryRef.current.value
    });
  };

  return (
    <div>
      <h2>Controlled vs Uncontrolled</h2>

      {/* Controlled Form */}
      <div style={{ border: '2px solid #16A34A', borderRadius: '10px', padding: '20px', margin: '10px 0' }}>
        <h3 style={{ color: '#16A34A' }}>✅ Controlled Form</h3>
        <p style={{ color: '#666', fontSize: '14px' }}>
          React state mein value hai — React control karta hai
        </p>
        <form onSubmit={handleControlled}>
          <div style={{ marginBottom: '10px' }}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Naam likho..."
              style={{ padding: '8px', marginRight: '10px' }}
            />
            <span style={{ color: '#666' }}>Live: {name}</span>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email likho..."
              style={{ padding: '8px', marginRight: '10px' }}
            />
            <span style={{ color: '#666' }}>Live: {email}</span>
          </div>
          <button type="submit">Submit Controlled</button>
        </form>
      </div>

      {/* Uncontrolled Form */}
      <div style={{ border: '2px solid #2563EB', borderRadius: '10px', padding: '20px', margin: '10px 0' }}>
        <h3 style={{ color: '#2563EB' }}>📌 Uncontrolled Form</h3>
        <p style={{ color: '#666', fontSize: '14px' }}>
          DOM mein value hai — useRef se nikalo — live nahi dikhta
        </p>
        <form onSubmit={handleUncontrolled}>
          <div style={{ marginBottom: '10px' }}>
            <input
              ref={cityRef}
              defaultValue="Lahore"
              placeholder="City likho..."
              style={{ padding: '8px', marginRight: '10px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <input
              ref={countryRef}
              defaultValue="Pakistan"
              placeholder="Country likho..."
              style={{ padding: '8px', marginRight: '10px' }}
            />
          </div>
          <button type="submit">Submit Uncontrolled</button>
        </form>
      </div>

      {/* Result */}
      {result && (
        <div style={{ background: '#F0FDF4', border: '1px solid #16A34A',
          borderRadius: '8px', padding: '15px', marginTop: '10px' }}>
          <h3>Result — {result.type}</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}

      {/* Comparison Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ background: '#1A1A2E', color: 'white' }}>
            <th style={{ padding: '10px' }}>Feature</th>
            <th style={{ padding: '10px' }}>Controlled</th>
            <th style={{ padding: '10px' }}>Uncontrolled</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['Value kahan hai', 'React State mein', 'DOM mein'],
            ['Live update', '✅ Haan', '❌ Nahi'],
            ['Validation easy', '✅ Haan', '❌ Mushkil'],
            ['Kab use karo', 'Hamesha prefer karo', 'Simple forms'],
          ].map(([f, c, u], i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? '#F8FAFC' : 'white' }}>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{f}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{c}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd', textAlign: 'center' }}>{u}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ControlledUncontrolled;