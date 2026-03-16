
// # Concept 3 — Loading + Error States

// **Har API call mein yeh 3 states hoti hain:**

// Loading = true  → Data aa raha hai ⏳
// Loading = false → Data aa gaya ✅
// Error   = msg   → Kuch galat hua ❌
// jsxconst [data,    setData]    = useState(null);
// const [loading, setLoading] = useState(true);
// const [error,   setError]   = useState(null);

// // Yeh pattern hamesha same rahega!













// React Query (Advanced)

// React Query server state manage karta hai.

// Features:

// Caching

// Background refetch

// Loading state automatic

// Error handling automatic

// Install:   npm install @tanstack/react-query



const { data, isLoading, error } = useQuery({
  queryKey: ["posts"],
  queryFn: () =>
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
});


// React Query
// Simple matlab: Server state ke liye best — cache, refetch, background update
// jsx// Use karo
// const { data, isLoading, error } = useQuery({
//   queryKey: ['users'],
//   queryFn:  () => axios.get('/users').then(r => r.data),
// });

// Automatic:
// ✅ Cache — baar baar call nahi
// ✅ Background refetch — tab change pe
// ✅ Loading + Error state
// ✅ Retry on fail



// Learn:

// useQuery

// useMutation

// Query cache

// Refetching
