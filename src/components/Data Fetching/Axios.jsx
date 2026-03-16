
// Axios (Intermediate)

// Axios ek popular HTTP client library hai jo Fetch se easy hoti hai.

// Advantages:

// Automatic JSON parsing

// Interceptors

// Request cancel

// Better error handling











// Concept 2 — Axios

// Simple matlab: Fetch se better — automatic JSON, error handling
// Axios
// const { data } = await axios.get('/users');
// ✅ Automatic JSON parse
// ✅ Error automatic throw karta hai
// ✅ Request cancel kar sakte ho
// ✅ Interceptors — token automatically add


// **Fetch vs Axios:**

// Fetch:
// const res  = await fetch('/users');
// const data = await res.json();       // extra step
// if (!res.ok) throw new Error(...);   // khud check karo

// Axios:
// const { data } = await axios.get('/users'); // bas itna! ✅




// ## Concept 3 — Loading + Error States

// **Har API call mein yeh 3 states hoti hain:**

// Loading = true  → Data aa raha hai ⏳
// Loading = false → Data aa gaya ✅
// Error   = msg   → Kuch galat hua ❌
// jsxconst [data,    setData]    = useState(null);
// const [loading, setLoading] = useState(true);
// const [error,   setError]   = useState(null);

// Yeh pattern hamesha same rahega!

// Learn:

// GET

// POST

// PUT

// DELETE

// Interceptors