// Custom Hooks — Kya Hain?

// Simple matlab: Apna khud ka hook banao — logic reuse karo
// Built-in hooks:
// useState, useEffect, useRef — React ne banaye

// Custom hooks:
// useFetch, useAuth, useDebounce — TU banayega!



// Kyun Chahiye Custom Hooks?
// // Problem — bina custom hook
// // Har component mein same fetch code likhna parta hai 

// function UserList() {
//   const [data, setData]       = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError]     = useState(null);

//   useEffect(() => {
//     fetch('/api/users')
//       .then(r => r.json())
//       .then(d => { setData(d); setLoading(false); })
//       .catch(e => { setError(e); setLoading(false); });
//   }, []);

//   // ... same code
// }


// function ProductList() {
//   const [data, setData]       = useState(null);  // same!
//   const [loading, setLoading] = useState(true);  // same!
//   const [error, setError]     = useState(null);  // same!

//   useEffect(() => {
//     fetch('/api/products')  // same logic!
//       .then(r => r.json())
//       .then(d => { setData(d); setLoading(false); })
//       .catch(e => { setError(e); setLoading(false); });
//   }, []);
// }

// // Solution — Custom Hook! ✅
// function useFetch(url) {
//   // Logic ek jagah
// }

// Use karo — kitni bhi jagah!
// const { data, loading, error } = useFetch('/api/users');
// const { data, loading, error } = useFetch('/api/products');




// ## Custom Hook Ka Rule:

// 1. Naam "use" se shuru hona chahiye — useFetch, useAuth
// 2. Andar hooks use kar sakte ho — useState, useEffect
// 3. Jo chahiye return karo
// 4. Koi bhi component mein use karo



// ##  useFetch — Kya Karta Hai?

// API call karo → data, loading, error return karo
// function useFetch(url) {
//   const [data, setData]       = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError]     = useState(null);

//   useEffect(() => {
//     fetch(url)
//       .then(r  => r.json())
//       .then(d  => { setData(d);    setLoading(false); })
//       .catch(e => { setError(e.message); setLoading(false); });
//   }, [url]);

//   return { data, loading, error };
//   //       ^^^^ yeh component mein milega
// }

// // Use karo — simple!
// function UserList() {
//   const { data, loading, error } = useFetch('/api/users');

//   if (loading) return <p>Loading...</p>;
//   if (error)   return <p>Error: {error}</p>;
//   return <ul>{data?.map(u => <li>{u.name}</li>)}</ul>;
// }






import { useState, useEffect, useCallback } from 'react';

function UseFetch(url) {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const fetchData = useCallback(async () => {
    // Reset karo
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url);

      // Response check karo
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const result = await response.json();
      setData(result);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url]);

  // URL change pe fetch karo
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // refetch bhi return karo — manual refresh ke liye
  return { data, loading, error, refetch: fetchData };
}

export default UseFetch;