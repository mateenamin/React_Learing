// Composition — Kya Hai?
// Simple matlab: Chhote components milake bada component banao

// Lego blocks ki tarah —
// har block alag hai
// sab milao — poori cheez banti hai


// // Chhote components
// function Header()  { return <h1>My App</h1>; }
// function Sidebar() { return <div>Menu</div>; }
// function Footer()  { return <p>Footer</p>; }

// // Sab milao — Composition!
// function App() {
//   return (
//     <div>
//       <Header />
//       <Sidebar />
//       <Footer />
//     </div>
//   );
// }



// Chhote components
function Header() {
  return (
    <header style={{ background: '#1A1A2E', color: 'white', padding: '15px' }}>
      <h1>My React App</h1>
    </header>
  );
}

function Sidebar() {
  return (
    <aside style={{ background: '#EFF6FF', padding: '15px', width: '200px' }}>
      <h3>Menu</h3>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </aside>
  );
}

function MainContent() {
  return (
    <main style={{ padding: '15px', flex: 1 }}>
      <h2>Main Content</h2>
      <p>Yeh composition hai — chhote components milake bada bana!</p>
    </main>
  );
}

function Footer() {
  return (
    <footer style={{ background: '#1A1A2E', color: 'white', padding: '15px', textAlign: 'center' }}>
      <p>Mateen Amin — React 19</p>
    </footer>
  );
}

// Sab milao — Composition!
function Composition() {
  return (
    <div>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <MainContent />
      </div>
      <Footer />
    </div>
  );
}

export default Composition;