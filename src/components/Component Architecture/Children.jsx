// Children — Kya Hai?
// Simple matlab: Component ke andar jo daalo — woh children hai

// // Real life:
// // Soch — gift box
// // Box = Component
// // Jo andar daala = children

// function Box({ children }) {
//   return (
//     <div style={{ border: '2px solid blue', padding: '10px' }}>
//       {children}  {/* jo bhi andar daala — yahan aayega */}
//     </div>
//   );
// }

// // Use karo
// <Box>
//   <h2>Main andar hoon!</h2>
//   <p>Main bhi andar hoon!</p>
// </Box>


// Card — children accept karta hai
function Card({ title, children }) {
  return (
    <div style={{
      border: '2px solid #2563EB',
      borderRadius: '10px',
      padding: '20px',
      margin: '10px',
      maxWidth: '400px'
    }}>
      <h2 style={{ color: '#1A1A2E', borderBottom: '1px solid #ddd', paddingBottom: '8px' }}>
        {title}
      </h2>
      <div>{children}</div>
    </div>
  );
}

// Alert Box — type se color change
function AlertBox({ type = 'info', children }) {
  const colors = {
    info:    { bg: '#EFF6FF', border: '#2563EB', text: '#1d4ed8' },
    success: { bg: '#F0FDF4', border: '#16A34A', text: '#15803d' },
    error:   { bg: '#FEE2E2', border: '#DC2626', text: '#b91c1c' },
  };
  const style = colors[type];

  return (
    <div style={{
      background: style.bg,
      border: `2px solid ${style.border}`,
      borderRadius: '8px',
      padding: '12px',
      margin: '8px 0',
      color: style.text
    }}>
      {children}
    </div>
  );
}

// Layout — children left aur right
function TwoColumn({ left, right }) {
  return (
    <div style={{ display: 'flex', gap: '20px', margin: '10px 0' }}>
      <div style={{ flex: 1, background: '#F8FAFC', padding: '15px', borderRadius: '8px' }}>
        {left}
      </div>
      <div style={{ flex: 1, background: '#F8FAFC', padding: '15px', borderRadius: '8px' }}>
        {right}
      </div>
    </div>
  );
}

function Children() {
  return (
    <div>
      <h2>Children Demo</h2>

      {/* Card mein kuch bhi daal sakte ho */}
      <Card title="User Profile">
        <p>Name: Mateen Amin</p>
        <p>Role: Developer</p>
        <p>City: Lahore</p>
      </Card>

      <Card title="Skills">
        <ul>
          <li>React</li>
          <li>Node.js</li>
          <li>MongoDB</li>
        </ul>
      </Card>

      {/* AlertBox */}
      <AlertBox type="info">
        ℹ️ Yeh info message hai
      </AlertBox>
      <AlertBox type="success">
        ✅ Kaam ho gaya!
      </AlertBox>
      <AlertBox type="error">
        ❌ Kuch galat ho gaya!
      </AlertBox>

      {/* Two Column */}
      <TwoColumn
        left={<div><h3>Left Side</h3><p>Yeh left column hai</p></div>}
        right={<div><h3>Right Side</h3><p>Yeh right column hai</p></div>}
      />
    </div>
  );
}

export default Children;