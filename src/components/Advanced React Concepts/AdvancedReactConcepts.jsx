// Portals — Kya Hai?
// Simple matlab: Component ko DOM mein kisi aur jagah render karo
// Normal rendering:
// App → div#root → component yahan dikhta hai

// Portal:
// App → div#root → component
//               ↘ document.body → Modal yahan dikhta hai ✅



// Kab use karo:
// Modal     → Poori screen pe dikhana
// Tooltip   → Kisi element ke upar
// Dropdown  → Overflow issues se bachna


// 1️⃣ Portals

// Normally React DOM ko root element ke andar render karta hai.

// Example:

// <div id="root"></div>

// Lekin kabhi kabhi hume UI ko root ke bahar render karna hota hai.

// Example:

// Modal

// Popup

// Tooltip

// Iske liye React Portal use hota hai.

// Example:

// import { createPortal } from "react-dom";

// function Modal({ children }) {
//   return createPortal(
//     <div className="modal">{children}</div>,
//     document.body
//   );
// }
// Use Cases

// Modals

// Dropdown menus

// Tooltips













// 2️⃣ Error Boundaries — Kya Hai?
// Simple matlab: Component crash ho — poori app crash nahi ho — sirf us hisse mein error dikhao
// Bina Error Boundary:
// Ek component crash → Poori app band 😫

// Error Boundary ke saath:
// Ek component crash → Sirf woh hissa → Error message ✅
// Baaki app chalta rehta hai ✅



// 2️⃣ Error Boundaries

// React me agar component crash ho jaye to poora app crash ho sakta hai.

// Error Boundary ek component hota hai jo errors catch karta hai.

// Example:

// import React from "react";

// class ErrorBoundary extends React.Component {
//   state = { hasError: false };

//   static getDerivedStateFromError() {
//     return { hasError: true };
//   }

//   render() {
//     if (this.state.hasError) {
//       return <h1>Something went wrong</h1>;
//     }

//     return this.props.children;
//   }
// }

// Use:

// <ErrorBoundary>
//   <App />
// </ErrorBoundary>






// 3️⃣ Suspense — Kya Hai?
// Simple matlab: Kuch load ho raha hai — tab tak fallback dikhao
// jsx<Suspense fallback={<p>Loading...</p>}>
//   <SlowComponent />   // load ho raha hai
// </Suspense>
// // SlowComponent ready hone tak "Loading..." dikhega ✅

// 3️⃣ Suspense

// Suspense ka use loading UI handle karne ke liye hota hai.

// Example:

// import { Suspense } from "react";

// <Suspense fallback={<p>Loading...</p>}>
//   <MyComponent />
// </Suspense>

// Ye mostly use hota hai:

// Lazy loading

// Server components

// Data fetching libraries






// ## 4️⃣ Lazy Loading — Kya Hai?

// **Simple matlab:** Component sirf tab load karo jab zaroorat ho

// Normal:
// Page khulte hi — sab components download hote hain 😫
// App slow hoti hai

// Lazy Loading:
// Sirf woh component load karo jo user dekh raha hai ✅
// App fast hoti hai ✅

// 4️⃣ Lazy Loading

// Lazy loading ka matlab:

// Component ko tab load karo jab uski zarurat ho.

// Example:

// import { lazy } from "react";

// const Dashboard = lazy(() => import("./Dashboard"));

// Use:

// <Suspense fallback={<p>Loading...</p>}>
//   <Dashboard />
// </Suspense>

// Benefits:

// Faster page load

// Smaller bundle


// ## 5️⃣ Code Splitting — Kya Hai?

// **Simple matlab:** App ka code chhote chhote pieces mein tod do

// Bina Code Splitting:
// bundle.js = 5MB → User ko sab ek saath download karna parta hai 😫

// Code Splitting ke saath:
// main.js    = 100kb → Pehle yeh load ho
// dashboard.js = 50kb → Sirf tab jab dashboard pe jao ✅


// 5️⃣ Code Splitting

// Code splitting ka matlab:

// JavaScript bundle ko small parts me divide karna.

// Default:

// app.js → 2MB

// Code splitting ke baad:

// home.js
// dashboard.js
// profile.js

// Example:

// const Profile = lazy(() => import("./Profile"));





// Concept	                          Use
// Portals                    	Modals / Popups
// Error Boundaries	         Catch UI errors
// Suspense	                 Loading fallback
// Lazy	                     Component lazy loading
// Code Splitting	               Smaller bundles


