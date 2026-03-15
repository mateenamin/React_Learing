// ## 3️⃣ useDebounce — Kya Karta Hai?

// **Debounce matlab:** User likhna band kare — tab kaam karo — har key pe nahi

// Bina debounce:
// User "M" likhta hai    → API call ❌
// User "Ma" likhta hai   → API call ❌
// User "Mat" likhta hai  → API call ❌
// User "Mate" likhta hai → API call ❌
// 4 unnecessary calls! 😫

// Debounce ke saath:
// User "Mateen" likhta hai → 500ms wait karo → 1 API call ✅
//    function useDebounce(value, delay = 500) {
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   useEffect(() => {
//     // Timer lagao
//     const timer = setTimeout(() => {
//       setDebouncedValue(value);  // delay ke baad update karo
//     }, delay);

//     // Cleanup — agar value phir se change ho toh timer reset
//     return () => clearTimeout(timer);
//   }, [value, delay]);

//   return debouncedValue;
// }

// // Use karo
// function Search() {
//   const [search, setSearch] = useState('');
//   const debouncedSearch = useDebounce(search, 500);

//   useEffect(() => {
//     // Sirf debouncedSearch change pe API call
//     if (debouncedSearch) {
//       console.log('API call:', debouncedSearch);
//     }
//   }, [debouncedSearch]);

//   return (
//     <input
//       value={search}
//       onChange={(e) => setSearch(e.target.value)}
//       placeholder="Search..."
//     />
//   );
// }






import { useState, useEffect } from 'react';

function UseDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Delay ke baad value update karo
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup — value phir se change ho toh timer cancel karo
    return () => clearTimeout(timer);

  }, [value, delay]);

  return debouncedValue;
}

export default UseDebounce;