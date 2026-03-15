


// Prop Drilling — Kya Hai?

// **Simple matlab:** Data upar se neeche pass karna — har component se guzarna

// App (data hai yahan)
//  ↓ props pass karo
//   Header (use nahi karta — sirf pass karta hai 😫)
//    ↓ props pass karo
//     Navbar (use nahi karta — sirf pass karta hai 😫)
//      ↓ props pass karo
//       UserAvatar (yahan actually use hota hai)


// **Problem:**

// Header aur Navbar ko data ki zaroorat nahi
// Lekin sirf pass karne ke liye likhna parta hai
// Yeh Prop Drilling hai — bad practice 😫


// **Solution — useContext:**

// App (data hai yahan — Context mein daalo)
//  ↓
//   UserAvatar (seedha Context se lo — drilling nahi!) ✅





















import { useState, useContext, createContext } from 'react';

// ══════════════════════════════════════
// PART 1 — Prop Drilling Problem
// ══════════════════════════════════════

// Data: App → Layout → Sidebar → UserInfo
// Har component sirf pass karta hai 😫

function UserInfo({ user }) {
  return (
    <div style={{ background: '#F0FDF4', padding: '10px',
      borderRadius: '8px' }}>
      <p>👤 {user.name}</p>
      <p>📍 {user.city}</p>
    </div>
  );
}

function Sidebar({ user }) {
  // Sidebar ko user ki zaroorat nahi
  // Sirf UserInfo ko dene ke liye receive kar raha hai 😫
  return (
    <div style={{ background: '#EFF6FF', padding: '10px',
      borderRadius: '8px', width: '200px' }}>
      <h4>Sidebar</h4>
      <p style={{ color: '#666', fontSize: '13px' }}>
        (sirf pass kar raha hoon 😫)
      </p>
      <UserInfo user={user} />
    </div>
  );
}

function Layout({ user }) {
  // Layout ko bhi user ki zaroorat nahi
  // Sirf Sidebar ko dene ke liye 😫
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <Sidebar user={user} />
      <div style={{ flex: 1, background: '#F8FAFC',
        padding: '10px', borderRadius: '8px' }}>
        <h4>Main Content</h4>
        <p>Yahan content hai</p>
      </div>
    </div>
  );
}

// ══════════════════════════════════════
// PART 2 — Context Solution
// ══════════════════════════════════════

const UserContext = createContext();

// Context se — seedha lo, drilling nahi!
function UserInfoWithContext() {
  const { user } = useContext(UserContext);
  return (
    <div style={{ background: '#F0FDF4', padding: '10px',
      borderRadius: '8px' }}>
      <p>👤 {user.name}</p>
      <p>📍 {user.city}</p>
      <Badge label="Context se liya!" color="green" />
    </div>
  );
}

function SidebarWithContext() {
  // Ab props nahi chahiye! Context se seedha lega ✅
  return (
    <div style={{ background: '#EFF6FF', padding: '10px',
      borderRadius: '8px', width: '200px' }}>
      <h4>Sidebar</h4>
      <p style={{ color: '#666', fontSize: '13px' }}>
        (props nahi chahiye! ✅)
      </p>
      <UserInfoWithContext />
    </div>
  );
}

function LayoutWithContext() {
  // Props nahi chahiye! ✅
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <SidebarWithContext />
      <div style={{ flex: 1, background: '#F8FAFC',
        padding: '10px', borderRadius: '8px' }}>
        <h4>Main Content</h4>
        <p>Props drilling nahi! ✅</p>
      </div>
    </div>
  );
}

// Badge helper
function Badge({ label, color = 'blue' }) {
  const colors = {
    blue:  { bg: '#EFF6FF', text: '#2563EB' },
    green: { bg: '#F0FDF4', text: '#16A34A' },
    red:   { bg: '#FEE2E2', text: '#DC2626' },
  };
  return (
    <span style={{
      background: colors[color].bg,
      color: colors[color].text,
      padding: '2px 8px', borderRadius: '999px',
      fontSize: '12px', fontWeight: 'bold',
    }}>
      {label}
    </span>
  );
}

// ══════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════
function PropDrilling() {
  const user = {
    name: 'Mateen Amin',
    city: 'Lahore',
    role: 'Developer'
  };

  return (
    <div>
      <h2>Prop Drilling</h2>

      {/* Problem */}
      <div style={{ border: '2px solid #DC2626',
        borderRadius: '10px', padding: '15px', marginBottom: '15px' }}>
        <h3 style={{ color: '#DC2626' }}>
          ❌ Problem — Prop Drilling
        </h3>
        <p style={{ color: '#666', marginBottom: '10px' }}>
          App → Layout → Sidebar → UserInfo
          (har jagah props pass karo 😫)
        </p>

        {/* Flow diagram */}
        <div style={{ background: '#FEE2E2', padding: '10px',
          borderRadius: '8px', marginBottom: '10px',
          fontFamily: 'monospace', fontSize: '13px' }}>
          <p>App (user data hai)</p>
          <p style={{ paddingLeft: '20px' }}>↓ user pass karo</p>
          <p style={{ paddingLeft: '20px' }}>Layout (use nahi karta 😫)</p>
          <p style={{ paddingLeft: '40px' }}>↓ user pass karo</p>
          <p style={{ paddingLeft: '40px' }}>Sidebar (use nahi karta 😫)</p>
          <p style={{ paddingLeft: '60px' }}>↓ user pass karo</p>
          <p style={{ paddingLeft: '60px' }}>UserInfo (yahan use hota hai)</p>
        </div>

        <Layout user={user} />
      </div>

      {/* Solution */}
      <div style={{ border: '2px solid #16A34A',
        borderRadius: '10px', padding: '15px' }}>
        <h3 style={{ color: '#16A34A' }}>
          ✅ Solution — useContext
        </h3>
        <p style={{ color: '#666', marginBottom: '10px' }}>
          Context mein daalo — seedha lo — drilling nahi!
        </p>

        {/* Flow diagram */}
        <div style={{ background: '#DCFCE7', padding: '10px',
          borderRadius: '8px', marginBottom: '10px',
          fontFamily: 'monospace', fontSize: '13px' }}>
          <p>App (Context Provider)</p>
          <p style={{ paddingLeft: '20px' }}>Layout (props nahi ✅)</p>
          <p style={{ paddingLeft: '40px' }}>Sidebar (props nahi ✅)</p>
          <p style={{ paddingLeft: '60px' }}>
            UserInfo → useContext ✅
          </p>
        </div>

        <UserContext.Provider value={{ user }}>
          <LayoutWithContext />
        </UserContext.Provider>
      </div>

      {/* Summary Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse',
        marginTop: '15px' }}>
        <thead>
          <tr style={{ background: '#1A1A2E', color: 'white' }}>
            <th style={{ padding: '10px' }}>Feature</th>
            <th style={{ padding: '10px' }}>Prop Drilling</th>
            <th style={{ padding: '10px' }}>useContext</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['Code', 'Zyada — har component mein', 'Kam — seedha lo'],
            ['Maintenance', 'Mushkil 😫', 'Easy ✅'],
            ['Performance', 'Same', 'Same'],
            ['Kab use karo', '1-2 level deep', '3+ levels deep'],
          ].map(([f, p, c], i) => (
            <tr key={f} style={{
              background: i % 2 === 0 ? '#F8FAFC' : 'white'
            }}>
              <td style={{ padding: '8px', border: '1px solid #ddd',
                fontWeight: 'bold' }}>{f}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd',
                textAlign: 'center', color: '#DC2626' }}>{p}</td>
              <td style={{ padding: '8px', border: '1px solid #ddd',
                textAlign: 'center', color: '#16A34A' }}>{c}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PropDrilling;