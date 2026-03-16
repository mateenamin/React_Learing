// Developer Tools Kya Hain?
// Simple matlab: App ke andar dekho — kya ho raha hai — bugs fix karo — performance check karo
// Bina DevTools:
// Bug aaya → andhere mein dhoondho 😫

// DevTools ke saath:
// Bug aaya → exactly dekho kahan hai ✅
// Re-renders check karo ✅
// State/Props live dekho ✅
// Performance measure karo ✅

// 3 Parts Hain:
// 1. React DevTools     → Components, State, Props dekho
// 2. Debugging          → Bugs dhundho aur fix karo
// 3. Performance Profiler → Slow parts dhundho

// 1️⃣ React DevTools — Kya Hai?
// Simple matlab: Browser extension — React app ke andar dekho
// Install karo:
// Chrome → Extensions → "React Developer Tools" → Add

// 2 new tabs aayenge:
// ⚛️ Components → Component tree, state, props
// ⚛️ Profiler   → Performance measure karo
// Components Tab:
// App
// ├── Navbar
// ├── Routes
// │   ├── Home
// │   └── Counter ← select karo
// │       state: { count: 5 }    ← live dekho
// │       props: { step: 1 }     ← live dekho

// 2️⃣ Debugging — Kya Hai?
// Simple matlab: Bug dhundho — fix karo
// 3 tarike:
// console.log  → Simple — value print karo
// debugger     → Code rok ke dekho
// Browser DevTools → Sources tab — breakpoints

// 3️⃣ Performance Profiler — Kya Hai?
// Simple matlab: App record karo — slow components dhundho
// Profiler tab mein:
// Record → App use karo → Stop
// → Flame chart dikhega
// → Kaunsa component slow hai pata chalega
// → Kitni baar render hua pata chalega









// CHATGPT








// 🛠 React Developer Tools
// 1️⃣ React DevTools

// Ye Chrome / Edge browser extension hota hai jo React apps ko inspect karne ke liye use hota hai.

// Features:

// Component tree dekh sakte ho

// Props aur State inspect kar sakte ho

// Hooks values check kar sakte ho

// Context values inspect kar sakte ho

// Example:

// Agar component hai:

// <UserCard name="Mateen" age={22} />

// React DevTools me tum dekh sakte ho:

// Props
// name: Mateen
// age: 22
// Install

// Chrome extension store se install karo:

// React Developer Tools
// 🐞 Debugging React Apps

// Debugging ka matlab hai bugs find aur fix karna.

// Common methods:

// 1️⃣ Console Debugging
// console.log(data)

// Example:

// useEffect(() => {
//   console.log("Component mounted");
// }, []);
// 2️⃣ Browser Debugger

// Chrome DevTools me:

// Sources → Breakpoints

// Example:

// function handleClick() {
//   debugger;
// }

// Browser execution yahan pause ho jayega.

// 3️⃣ Network Debugging

// Chrome DevTools → Network tab

// Check kar sakte ho:

// API requests

// Response data

// Error status

// ⚡ Performance Profiling

// Performance issues detect karne ke liye React Profiler use hota hai.

// React DevTools me Profiler tab hota hai.

// Isse pata chalta hai:

// Kaunsa component re-render ho raha hai

// Kitna time lag raha hai

// Performance bottleneck

// Example problem:

// ProductList re-rendering 50 times

// Solution:

// React.memo

// useMemo

// useCallback


// Tab	             Use
// Components	Component tree inspect
// Profiler	Performance analyze