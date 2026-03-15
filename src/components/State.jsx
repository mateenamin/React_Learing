import { useState } from 'react';

function State() {
  const [count, setCount] = useState(0);
  const [step, setStep]   = useState(1);

  return (
    <div>
      <h2>State Demo</h2>

      <h1 style={{
        fontSize: '60px',
        color: count > 0 ? 'green' : count < 0 ? 'red' : 'black'
      }}>
        {count}
      </h1>

      <div>
        <label>Step: </label>
        <select onChange={(e) => setStep(Number(e.target.value))}>
          <option value={1}>1</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
      </div>

      <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
        <button onClick={() => setCount(count + step)}>+ {step}</button>
        <button onClick={() => setCount(count - step)}>- {step}</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
    </div>
  );
}

export default State;


// State — Kya Hai?
// Simple matlab: Component ki yaaddasht — jo change hoti rehti hai






function Counter() {
  const [count, setCount] = useState(0);
  //     👆value  👆update fn  👆start value

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>+</button>
      {/* setCount call karo → count badhta hai → screen update hoti hai  */}
    </div>
  );
}


// **State ka rule:**

// Value change karo  →  setCount() call karo
// setCount() chala   →  React screen dobara render karta hai
// Screen dobara render  →  Naya value dikhai deta hai


// **Real life examples:**

// Cart mein items count        → State
// Like button — liked/unliked  → State
// Form input ki value          → State
// Loading true/false           → State
// Dark/Light mode              → State


// > **Yaad rakho:** Jab bhi screen pe kuch change dikhana ho — State use karo!



// Render Kya Hota Hai?
// Simple matlab: React screen pe dikhata hai — yeh process "render" hai


// Tu code likhta hai  →  React process karta hai  →  Browser pe dikhta hai
//      JSX           →       Render               →      HTML



//      React Mein Render Kab Hota Hai:


//      Pehli Baar — Initial Render

// App pehli baar khulti hai
// React sab components render karta hai


// function App() {
//   return <h1>Hello!</h1>;  // yeh screen pe dikhta hai
// }




// State Change Pe — Re-render


// function Counter() {
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <h1>{count}</h1>
//       <button onClick={() => setCount(count + 1)}>+</button>
//     </div>
//   );
// }

// Button dabaya        →  setCount(1) chala
// State change hui     →  React dobara render kiya
// Screen update hui    →  1 dikhne laga


function App() {
  const [count, setCount] = useState(0);
  const [name, setName]   = useState('Mateen');

  console.log('App render hua!');  // har render pe print hoga

  return (
    <div>
      <h1>{count}</h1>
      <h2>{name}</h2>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

// Button dabao  →  console mein "App render hua!" dikhega
// Sirf count wali h1 update hogi — h2 same rahegi


// ## Important Rules:

//  State change  →  Component render hota hai
//  Props change  →  Component render hota hai
//  Normal variable change  →  Render nahi hota

// Isliye useState use karte hain — normal variable se screen update nahi hoti!
