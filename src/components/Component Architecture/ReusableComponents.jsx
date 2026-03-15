
// Reusable Components — Kya Hai?
// Simple matlab: Ek component banao — baar baar use karo — sirf data badlo


// // Reusable nahi — har jagah alag alag
// function App() {
//   return (
//     <div>
//       <div style={{ background: 'red', padding: '10px' }}>
//         <h2>Error!</h2>
//         <p>Kuch galat hua</p>
//       </div>

//       <div style={{ background: 'green', padding: '10px' }}>
//         <h2>Success!</h2>
//         <p>Kaam ho gaya</p>
//       </div>
//     </div>
//   );
// }
// // Same structure — baar baar likha 😫

// // Reusable — ek baar banao
// function Alert({ type, title, message }) {
//   const colors = {
//     error:   'red',
//     success: 'green',
//     warning: 'orange'
//   };

//   return (
//     <div style={{ background: colors[type], padding: '10px' }}>
//       <h2>{title}</h2>
//       <p>{message}</p>
//     </div>
//   );
// }

// // Use karo — sirf data badlo
// <Alert type="error"   title="Error!"   message="Kuch galat hua" />
// <Alert type="success" title="Success!" message="Kaam ho gaya"   />
// // Ek component — multiple uses ✅

















import { useState } from 'react';

// ── Reusable Button ──────────────────────────
function Button({ label, onClick, variant = 'primary', size = 'md', disabled = false }) {
  const variants = {
    primary:  { background: '#2563EB', color: 'white' },
    success:  { background: '#16A34A', color: 'white' },
    danger:   { background: '#DC2626', color: 'white' },
    outline:  { background: 'white', color: '#2563EB',
                border: '2px solid #2563EB' },
  };

  const sizes = {
    sm: { padding: '6px 12px',  fontSize: '13px' },
    md: { padding: '10px 20px', fontSize: '15px' },
    lg: { padding: '14px 28px', fontSize: '17px' },
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...variants[variant],
        ...sizes[size],
        border: 'none',
        borderRadius: '8px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        margin: '4px',
      }}
    >
      {label}
    </button>
  );
}

// ── Reusable Input ───────────────────────────
function Input({ label, value, onChange, type = 'text',
  placeholder, error }) {
  return (
    <div style={{ marginBottom: '12px' }}>
      {label && (
        <label style={{ display: 'block', marginBottom: '4px',
          fontWeight: 'bold', color: '#1A1A2E' }}>
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          padding: '8px 12px',
          width: '100%',
          borderRadius: '6px',
          border: `2px solid ${error ? '#DC2626' : '#ddd'}`,
          outline: 'none',
          fontSize: '15px',
        }}
      />
      {error && (
        <p style={{ color: '#DC2626', fontSize: '13px', marginTop: '4px' }}>
          ⚠️ {error}
        </p>
      )}
    </div>
  );
}

// ── Reusable Badge ───────────────────────────
function Badge({ label, color = 'blue' }) {
  const colors = {
    blue:   { bg: '#EFF6FF', text: '#2563EB' },
    green:  { bg: '#F0FDF4', text: '#16A34A' },
    red:    { bg: '#FEE2E2', text: '#DC2626' },
    orange: { bg: '#FFF7ED', text: '#EA580C' },
    purple: { bg: '#F5F3FF', text: '#7C3AED' },
  };

  return (
    <span style={{
      background: colors[color].bg,
      color:      colors[color].text,
      padding: '3px 10px',
      borderRadius: '999px',
      fontSize: '13px',
      fontWeight: 'bold',
      margin: '2px',
      display: 'inline-block',
    }}>
      {label}
    </span>
  );
}

// ── Reusable Card ────────────────────────────
function Card({ title, children, footer }) {
  return (
    <div style={{
      border: '2px solid #E2E8F0',
      borderRadius: '12px',
      overflow: 'hidden',
      margin: '10px 0',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    }}>
      {title && (
        <div style={{ background: '#1A1A2E', color: 'white',
          padding: '12px 16px' }}>
          <h3 style={{ margin: 0 }}>{title}</h3>
        </div>
      )}
      <div style={{ padding: '16px' }}>
        {children}
      </div>
      {footer && (
        <div style={{ borderTop: '1px solid #E2E8F0',
          padding: '10px 16px', background: '#F8FAFC' }}>
          {footer}
        </div>
      )}
    </div>
  );
}

// ── Main Component ───────────────────────────
function ReusableComponents() {
  const [name,  setName]  = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState('');

  const handleCheck = () => {
    if (!name.trim()) {
      setNameError('Naam zaroori hai!');
    } else {
      setNameError('');
      alert('Hello ' + name);
    }
  };

  return (
    <div>
      <h2>Reusable Components</h2>

      {/* Buttons */}
      <Card title="Reusable Buttons">
        <div>
          <h4>Variants:</h4>
          <Button label="Primary" variant="primary" />
          <Button label="Success" variant="success" />
          <Button label="Danger"  variant="danger"  />
          <Button label="Outline" variant="outline" />
          <Button label="Disabled" disabled={true}  />
        </div>
        <div style={{ marginTop: '10px' }}>
          <h4>Sizes:</h4>
          <Button label="Small"  size="sm" />
          <Button label="Medium" size="md" />
          <Button label="Large"  size="lg" />
        </div>
      </Card>

      {/* Badges */}
      <Card title="Reusable Badges">
        <Badge label="React"      color="blue"   />
        <Badge label="Node.js"    color="green"  />
        <Badge label="Error"      color="red"    />
        <Badge label="Warning"    color="orange" />
        <Badge label="TypeScript" color="purple" />
      </Card>

      {/* Input */}
      <Card
        title="Reusable Inputs"
        footer={
          <Button label="Check" onClick={handleCheck} />
        }
      >
        <Input
          label="Naam"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Apna naam likho..."
          error={nameError}
        />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email likho..."
        />
      </Card>

      {/* Real Example — User Cards */}
      <Card title="Reusable User Cards">
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {[
            { name: 'Mateen', role: 'Developer', city: 'Lahore',
              skills: ['React', 'Node'] },
            { name: 'Ali',    role: 'Designer',  city: 'Karachi',
              skills: ['Figma', 'CSS'] },
            { name: 'Sara',   role: 'Manager',   city: 'Islamabad',
              skills: ['PM', 'Agile'] },
          ].map(user => (
            <div key={user.name} style={{
              border: '2px solid #E2E8F0',
              borderRadius: '10px',
              padding: '15px',
              width: '180px',
            }}>
              <div style={{
                width: '50px', height: '50px',
                background: '#2563EB',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center',
                color: 'white', fontWeight: 'bold',
                fontSize: '20px', marginBottom: '10px',
              }}>
                {user.name[0]}
              </div>
              <h3 style={{ margin: '0 0 4px' }}>{user.name}</h3>
              <p style={{ color: '#2563EB', margin: '0 0 8px',
                fontSize: '14px' }}>{user.role}</p>
              <p style={{ color: '#666', fontSize: '13px',
                margin: '0 0 8px' }}>📍 {user.city}</p>
              <div>
                {user.skills.map(s => (
                  <Badge key={s} label={s} color="blue" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default ReusableComponents;