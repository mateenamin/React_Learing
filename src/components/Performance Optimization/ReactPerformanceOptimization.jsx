// Performance Optimization Kya Hai?
// Simple matlab: App ko fast banao — unnecessary kaam band karo
// Problem:
// Component baar baar re-render hota hai 😫
// List mein 10,000 items — sab render hote hain 😫
// Bundle size badi — app slow load hoti hai 😫

// Solution:
// React.memo  → Component re-render rokna
// useMemo     → Value cache karo
// useCallback → Function cache karo
// Virtualization → Sirf visible items render
// Bundle Opt  → Size chhoti karo






// 1️⃣ React.memo — Kya Hai?
// Normal:
// Parent re-render → Child bhi re-render 😫
// chahe props same ho

// React.memo:
// Parent re-render → Props same? → Child skip ✅
// Props change?   → Child re-render ✅
// jsx// Bina memo
// function Child({ name }) {
//   console.log('Child render!'); // har baar chalta hai
//   return <p>{name}</p>;
// }

// // memo ke saath
// const Child = React.memo(function Child({ name }) {
//   console.log('Child render!'); // sirf name change pe
//   return <p>{name}</p>;
// });

// 1️⃣ React.memo — Kya Hai?
// Normal:
// Parent re-render → Child bhi re-render 😫
// chahe props same ho

// React.memo:
// Parent re-render → Props same? → Child skip ✅
// Props change?   → Child re-render ✅
// jsx// Bina memo
// function Child({ name }) {
//   console.log('Child render!'); // har baar chalta hai
//   return <p>{name}</p>;
// }

// // memo ke saath
// const Child = React.memo(function Child({ name }) {
//   console.log('Child render!'); // sirf name change pe
//   return <p>{name}</p>;
// });





// 2️⃣ useMemo

// useMemo expensive calculations ko cache (memoize) karta hai.

// Example:

// import { useMemo } from "react";

// const result = useMemo(() => {
//   return expensiveCalculation(data);
// }, [data]);

// Use case:

// Sorting

// Filtering

// Large calculations

// Example:

// const sortedUsers = useMemo(() => {
//   return users.sort((a, b) => a.name.localeCompare(b.name));
// }, [users]);



// ## 2️⃣ useMemo — Kya Hai?

// Expensive calculation har render pe mat karo
// Result yaad rakho — sirf dependency change pe recalculate
// jsx// Bina useMemo — har render pe chalta hai 😫
// const result = heavyCalculation(data);

// // useMemo — sirf data change pe ✅
// const result = useMemo(() => {
//   return heavyCalculation(data);
// }, [data]);





// 3️⃣ useCallback

// useCallback function ko memoize karta hai.

// Example:

// import { useCallback } from "react";

// const handleClick = useCallback(() => {
//   console.log("clicked");
// }, []);

// Use case:

// Jab function child component ko prop me pass ho

// Example:

// <UserCard onClick={handleClick} />




// ## 3️⃣ useCallback — Kya Hai?

// Function har render pe naya banta hai
// React.memo child ko wahi function mile — same reference
// useCallback se function cache hota hai
// // Bina useCallback — har render pe naya function 😫
// const handleClick = () => doSomething();

// // useCallback — same function ✅
// const handleClick = useCallback(() => {
//   doSomething();
// }, []);








// 4️⃣ List Virtualization

// Large lists (1000+ items) render karna slow hota hai.

// Solution:

// Sirf visible items render karo.

// Popular library:

// react-window

// react-virtualized

// Example:

// import { FixedSizeList as List } from "react-window";

// <List
//   height={400}
//   itemCount={1000}
//   itemSize={35}
//   width={300}
// >
//   {Row}
// </List>

// Benefit:

// Huge performance improvement





// ## 4️⃣ Virtualization — Kya Hai?

// 10,000 items hain list mein
// Sab render karo? → Browser hang 😫

// Virtualization:
// Sirf screen pe dikhne wale render karo ✅
// Baki items virtual hain — DOM mein nahi

// Screen pe sirf 10 items dikhte hain
// → Sirf 10 render karo
// → User scroll kare → naye 10 render karo
// → 10,000 items → sirf 10 DOM mein ✅










// 5️⃣ Bundle Optimization

// Large bundle → slow loading.

// Solutions:

// Lazy loading
// const Dashboard = lazy(() => import("./Dashboard"));
// Code splitting

// Routes ko split karo.

// Remove unused libraries

// Example:

// ❌

// import _ from "lodash"

// ✅

// import debounce from "lodash/debounce"

// ## 5️⃣ Bundle Optimization — Kya Hai?
// ```
// Bundle = Teri app ka compiled JS file
// Bada bundle → Slow loading 😫

// Optimize karo:
// Tree Shaking → Unused code hatao
// Lazy Loading → Zaroorat pe load karo
// Compression → Code chhota karo














// Technique	                                     Purpose
// React.memo	                              Prevent re-renders
// useMemo	                                     Cache  calculations
// useCallback	                                 Cache functions
// Virtualization                               Optimize large lists
// Bundle optimization                       	Faster loading