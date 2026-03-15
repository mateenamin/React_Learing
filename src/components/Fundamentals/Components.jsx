

// Components — Kya Hain?
// Simple matlab: Reusable UI pieces — ek baar banao, baar baar use karo
// Bina Components ke — Problem:




function UserCard({ name, role, city }) {
  return (
    <div style={{
      border: '2px solid #2563EB',
      borderRadius: '10px',
      padding: '15px',
      margin: '8px',
      width: '220px'
    }}>
      <h3>{name}</h3>
      <p style={{ color: '#2563EB' }}>{role}</p>
      <p>📍 {city}</p>
    </div>
  );
}

// Parent Component
function Components() {
  return (
    <div>
      <h2>Components Demo</h2>
      <div style={{ display: 'flex' }}>
        <UserCard name="Mateen Amin" role="Developer" city="Lahore" />
        <UserCard name="Ali Hassan"  role="Designer"  city="Karachi" />
        <UserCard name="Sara Khan"   role="Manager"   city="Islamabad" />
      </div>
    </div>
  );
}

export default Components;








// Props Change Pe — Re-render



// function UserCard1({ name }) {
//   return <h2>{name}</h2>;
// }

// Parent ne naya name diya  →  UserCard dobara render hua




// ## Render Ka Process — Step by Step:

// 1. State/Props change hoti hai
//          ↓
// 2. React Virtual DOM banata hai
//    (asli DOM ka copy — memory mein)
//          ↓
// 3. Purane Virtual DOM se compare karta hai
//    (Diffing — kya badla?)
//          ↓
// 4. Sirf jo badla — woh update karta hai
//    (Real DOM mein)
//          ↓
// 5. Screen update hoti hai




// ## Virtual DOM Kya Hai?

// Real DOM     =  Asli ghar
// Virtual DOM  =  Ghar ka blueprint

// React pehle blueprint mein change karta hai
// Phir sirf woh walls todta hai jo badli hain
// Poora ghar nahi todta — fast hai! 



