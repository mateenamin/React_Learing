// import { useState } from 'react';
// import useFetch    from '../hooks/useFetch';
// import useAuth     from '../hooks/useAuth';
// import useDebounce from '../hooks/useDebounce';

// // ══════════════════════════════════════
// // PART 1 — useFetch Demo
// // ══════════════════════════════════════
// function UseFetchDemo() {
//   const [userId, setUserId] = useState(1);

//   const { data: user, loading, error, refetch } =
//     useFetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

//   const { data: posts, loading: postsLoading } =
//     useFetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}&_limit=3`);

//   return (
//     <div style={{ border: '2px solid #2563EB',
//       borderRadius: '10px', padding: '20px', marginBottom: '20px' }}>
//       <h3>useFetch Hook</h3>

//       {/* User select */}
//       <div style={{ display: 'flex', gap: '8px',
//         marginBottom: '15px', flexWrap: 'wrap' }}>
//         {[1, 2, 3, 4, 5].map(id => (
//           <button
//             key={id}
//             onClick={() => setUserId(id)}
//             style={{
//               background: userId === id ? '#2563EB' : '#EFF6FF',
//               color:      userId === id ? 'white'   : '#2563EB',
//               border: '2px solid #2563EB',
//               borderRadius: '8px',
//               padding: '6px 14px',
//               cursor: 'pointer',
//             }}
//           >
//             User {id}
//           </button>
//         ))}
//         <button
//           onClick={refetch}
//           style={{ background: '#16A34A', color: 'white',
//             border: 'none', borderRadius: '8px',
//             padding: '6px 14px', cursor: 'pointer' }}
//         >
//           🔄 Refresh
//         </button>
//       </div>

//       {/* User info */}
//       {loading ? (
//         <div style={{ padding: '20px', textAlign: 'center',
//           color: '#666' }}>
//           ⏳ Loading user...
//         </div>
//       ) : error ? (
//         <div style={{ background: '#FEE2E2', padding: '12px',
//           borderRadius: '8px', color: '#DC2626' }}>
//           ❌ Error: {error}
//         </div>
//       ) : user && (
//         <div style={{ background: '#F8FAFC', padding: '15px',
//           borderRadius: '8px', marginBottom: '15px' }}>
//           <h4>{user.name}</h4>
//           <p>📧 {user.email}</p>
//           <p>📍 {user.address?.city}</p>
//           <p>🏢 {user.company?.name}</p>
//         </div>
//       )}

//       {/* Posts */}
//       <h4>Posts:</h4>
//       {postsLoading ? (
//         <p>⏳ Posts load ho rahe hain...</p>
//       ) : (
//         <ul style={{ padding: 0, listStyle: 'none' }}>
//           {posts?.map(post => (
//             <li key={post.id} style={{
//               padding: '8px',
//               marginBottom: '6px',
//               background: '#EFF6FF',
//               borderRadius: '6px',
//               fontSize: '14px',
//             }}>
//               {post.title}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// // ══════════════════════════════════════
// // PART 2 — useAuth Demo
// // ══════════════════════════════════════
// function UseAuthDemo() {
//   const { user, isLoggedIn, loading, login, logout, updateUser } = useAuth();

//   const [email,    setEmail]    = useState('mateen@gmail.com');
//   const [password, setPassword] = useState('12345');
//   const [error,    setError]    = useState('');
//   const [isPending, setIsPending] = useState(false);

//   const handleLogin = async () => {
//     setError('');
//     setIsPending(true);
//     try {
//       await login(email, password);
//     } catch (err) {
//       setError(err);
//     } finally {
//       setIsPending(false);
//     }
//   };

//   if (loading) return <p>⏳ Checking auth...</p>;

//   return (
//     <div style={{ border: '2px solid #16A34A',
//       borderRadius: '10px', padding: '20px', marginBottom: '20px' }}>
//       <h3>useAuth Hook</h3>

//       <div style={{ background: '#EFF6FF', padding: '10px',
//         borderRadius: '8px', marginBottom: '15px' }}>
//         <p>💡 Test credentials:</p>
//         <p>Email: mateen@gmail.com</p>
//         <p>Password: 12345</p>
//       </div>

//       {!isLoggedIn ? (
//         // Login Form
//         <div>
//           <div style={{ marginBottom: '10px' }}>
//             <input
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email..."
//               style={{ padding: '8px', width: '100%',
//                 borderRadius: '6px', border: '1px solid #ddd',
//                 marginBottom: '8px' }}
//             />
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Password..."
//               style={{ padding: '8px', width: '100%',
//                 borderRadius: '6px', border: '1px solid #ddd' }}
//             />
//           </div>

//           {error && (
//             <p style={{ color: '#DC2626', marginBottom: '8px' }}>
//               ❌ {error}
//             </p>
//           )}

//           <button
//             onClick={handleLogin}
//             disabled={isPending}
//             style={{
//               background: isPending ? '#93C5FD' : '#16A34A',
//               color: 'white', border: 'none',
//               borderRadius: '8px', padding: '10px 20px',
//               cursor: 'pointer', width: '100%',
//             }}
//           >
//             {isPending ? '⏳ Logging in...' : 'Login'}
//           </button>
//         </div>
//       ) : (
//         // Logged in — Profile
//         <div>
//           <div style={{ background: '#F0FDF4', padding: '15px',
//             borderRadius: '8px', marginBottom: '15px' }}>
//             <div style={{
//               width: '60px', height: '60px',
//               background: '#16A34A', borderRadius: '50%',
//               display: 'flex', alignItems: 'center',
//               justifyContent: 'center', color: 'white',
//               fontSize: '24px', fontWeight: 'bold',
//               marginBottom: '10px',
//             }}>
//               {user.name[0]}
//             </div>
//             <h4>✅ {user.name}</h4>
//             <p>📧 {user.email}</p>
//             <p>📍 {user.city}</p>
//             <p>🔐 Role: {user.role}</p>
//           </div>

//           <div style={{ display: 'flex', gap: '8px' }}>
//             <button
//               onClick={() => updateUser({ city: 'Karachi' })}
//               style={{ background: '#2563EB', color: 'white',
//                 border: 'none', borderRadius: '8px',
//                 padding: '8px 16px', cursor: 'pointer' }}
//             >
//               City Update
//             </button>
//             <button
//               onClick={logout}
//               style={{ background: '#DC2626', color: 'white',
//                 border: 'none', borderRadius: '8px',
//                 padding: '8px 16px', cursor: 'pointer' }}
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // ══════════════════════════════════════
// // PART 3 — useDebounce Demo
// // ══════════════════════════════════════

// const allUsers = [
//   { id: 1, name: 'Mateen Amin',  city: 'Lahore'    },
//   { id: 2, name: 'Ali Hassan',   city: 'Karachi'   },
//   { id: 3, name: 'Sara Khan',    city: 'Islamabad' },
//   { id: 4, name: 'Ahmed Raza',   city: 'Lahore'    },
//   { id: 5, name: 'Zara Sheikh',  city: 'Karachi'   },
//   { id: 6, name: 'Usman Malik',  city: 'Peshawar'  },
// ];

// function UseDebounceDemo() {
//   const [search,   setSearch]   = useState('');
//   const [apiCalls, setApiCalls] = useState(0);
//   const [lastCall, setLastCall] = useState('');

//   // Debounced value — 600ms delay
//   const debouncedSearch = useDebounce(search, 600);

//   // Sirf debouncedSearch change pe "API call" hoga
//   useState(() => {
//     if (debouncedSearch) {
//       setApiCalls(prev => prev + 1);
//       setLastCall(debouncedSearch);
//     }
//   });

//   // Filter users
//   const filtered = allUsers.filter(u =>
//     u.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
//     u.city.toLowerCase().includes(debouncedSearch.toLowerCase())
//   );

//   return (
//     <div style={{ border: '2px solid #7C3AED',
//       borderRadius: '10px', padding: '20px' }}>
//       <h3>useDebounce Hook</h3>

//       <div style={{ display: 'flex', gap: '15px',
//         marginBottom: '15px', flexWrap: 'wrap' }}>
//         <div style={{ flex: 1, background: '#FEE2E2',
//           padding: '12px', borderRadius: '8px' }}>
//           <h4 style={{ color: '#DC2626' }}>❌ Bina Debounce</h4>
//           <p style={{ fontSize: '13px' }}>
//             Har key press pe API call
//           </p>
//           <p style={{ fontSize: '13px' }}>
//             "Mateen" likhne pe = 6 calls 😫
//           </p>
//         </div>
//         <div style={{ flex: 1, background: '#DCFCE7',
//           padding: '12px', borderRadius: '8px' }}>
//           <h4 style={{ color: '#16A34A' }}>✅ Debounce ke saath</h4>
//           <p style={{ fontSize: '13px' }}>
//             600ms ruk ke sirf 1 call
//           </p>
//           <p style={{ fontSize: '13px' }}>
//             "Mateen" likhne pe = 1 call ✅
//           </p>
//         </div>
//       </div>

//       {/* Search Input */}
//       <input
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         placeholder="Search users... (600ms debounce)"
//         style={{
//           padding: '10px',
//           width: '100%',
//           borderRadius: '8px',
//           border: '2px solid #7C3AED',
//           marginBottom: '12px',
//           fontSize: '15px',
//         }}
//       />

//       {/* Stats */}
//       <div style={{ display: 'flex', gap: '10px',
//         marginBottom: '12px' }}>
//         <div style={{ background: '#F8FAFC', padding: '10px',
//           borderRadius: '8px', flex: 1, textAlign: 'center' }}>
//           <div style={{ fontSize: '24px', fontWeight: 'bold',
//             color: '#2563EB' }}>
//             {search.length}
//           </div>
//           <div style={{ fontSize: '13px', color: '#666' }}>
//             Key Presses
//           </div>
//         </div>
//         <div style={{ background: '#F8FAFC', padding: '10px',
//           borderRadius: '8px', flex: 1, textAlign: 'center' }}>
//           <div style={{ fontSize: '24px', fontWeight: 'bold',
//             color: '#16A34A' }}>
//             {apiCalls}
//           </div>
//           <div style={{ fontSize: '13px', color: '#666' }}>
//             API Calls
//           </div>
//         </div>
//         <div style={{ background: '#F8FAFC', padding: '10px',
//           borderRadius: '8px', flex: 2 }}>
//           <div style={{ fontSize: '13px', color: '#666' }}>
//             Debounced value:
//           </div>
//           <div style={{ fontWeight: 'bold', color: '#7C3AED' }}>
//             "{debouncedSearch}"
//           </div>
//         </div>
//       </div>

//       {/* Results */}
//       {debouncedSearch && (
//         <div>
//           <p style={{ color: '#666', fontSize: '14px',
//             marginBottom: '8px' }}>
//             {filtered.length} results mile:
//           </p>
//           {filtered.length === 0 ? (
//             <p style={{ textAlign: 'center', color: '#888',
//               padding: '20px' }}>
//               Koi result nahi mila
//             </p>
//           ) : (
//             <ul style={{ listStyle: 'none', padding: 0 }}>
//               {filtered.map(user => (
//                 <li key={user.id} style={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   padding: '10px',
//                   marginBottom: '6px',
//                   background: '#F5F3FF',
//                   borderRadius: '8px',
//                   border: '1px solid #DDD6FE',
//                 }}>
//                   <span style={{ fontWeight: 'bold' }}>
//                     {user.name}
//                   </span>
//                   <span style={{ color: '#7C3AED' }}>
//                     📍 {user.city}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// // ══════════════════════════════════════
// // MAIN COMPONENT
// // ══════════════════════════════════════
// function CustomHooks() {
//   return (
//     <div>
//       <h2>Custom Hooks</h2>

//       <div style={{ background: '#EFF6FF', padding: '12px',
//         borderRadius: '8px', marginBottom: '20px' }}>
//         <p>💡 Custom Hook = Logic ek jagah — baar baar use karo</p>
//         <p>✅ Naam "use" se shuru hona zaroori</p>
//         <p>✅ Andar useState, useEffect use kar sakte ho</p>
//       </div>

//       <UseFetchDemo />
//       <UseAuthDemo />
//       <UseDebounceDemo />
//     </div>
//   );
// }

// export default CustomHooks;