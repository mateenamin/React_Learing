// Concept 1 — BrowserRouter
// Pehle se done hai main.jsx mein:

// import { BrowserRouter } from 'react-router-dom';

// <BrowserRouter>
//   <App />
// </BrowserRouter>


// **Matlab:** Sirf ek baar wrap karo — poori app mein routing on! ✅



// Concept 2 — Routes + Route

// **Simple matlab:**

// Routes = container
// Route  = ek URL ka ek page


// <Routes>
//   <Route path="/router"       element={<Home />}  />
//   <Route path="/router/about" element={<About />} />
// </Routes>

// // /router       → Home dikhega
// // /router/about → About dikhega



// Concept 3 — Link


// // HTML wala — page reload hota hai ❌
// <a href="/router/about">About</a>

// // React wala — reload nahi ✅
// <Link to="/router/about">About</Link>



// Concept 4 — NavLink



// // Link + active style automatic
// <NavLink
//   to="/router/about"
//   style={({ isActive }) => ({
//     color: isActive ? 'blue' : 'black'
//   })}
// >
//   About
// </NavLink>
// // Active page pe color blue ✅





// Concept 5 — useNavigate


// const navigate = useNavigate();

// navigate('/router/about'); // us page pe jao
// navigate(-1);              // wapas jao




// Concept 6 — useParams

// // Route
// <Route path="/router/users/:id" element={<Detail />} />

// // Component
// function Detail() {
//   const { id } = useParams();
//   return <h2>User: {id}</h2>;
// }

// // URL /router/users/5 → id = "5" ✅








// Concept 7 — Nested Routes

// // Parent route ke andar child routes
// <Route path="/router/dashboard" element={<Dashboard />}>
//   <Route index        element={<Overview />} />
//   <Route path="users" element={<Users />}    />
// </Route>

// // Dashboard mein Outlet lagao
// function Dashboard() {
//   return (
//     <div>
//       <h2>Dashboard</h2>
//       <Outlet /> {/* child yahan dikhega */}
//     </div>
//   );
// }










// Concept 8 — Protected Routes


// // Login check karo
// function ProtectedRoute({ children }) {
//   const isLoggedIn = localStorage.getItem('token');
//   if (!isLoggedIn) return <Navigate to="/router/login" />;
//   return children;
// }

// // Use karo
// <Route path="/router/secret" element={
//   <ProtectedRoute>
//     <SecretPage />
//   </ProtectedRoute>
// } />