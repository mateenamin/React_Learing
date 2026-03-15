// React Router Kya Hai?
// Simple matlab: Alag alag pages banana — URL se control karo
// Bina Router — Single page
// localhost:3000 → sirf ek page dikhta hai

// Router ke saath — Multiple pages
// localhost:3000/          → Home page
// localhost:3000/about     → About page
// localhost:3000/users/5   → User 5 ka profile
// localhost:3000/dashboard → Dashboard




// Install Karo Pehle:
// bashnpm install react-router-dom


// Concepts Ek Ek Kar Ke:




// 1️⃣ BrowserRouter — Kya Hai?
// Simple matlab: Poori app ko wrap karo — Router enable hoga

// // main.jsx mein
// import { BrowserRouter } from 'react-router-dom';

// <BrowserRouter>
//   <App />      // ab poori app mein routing kaam karega
// </BrowserRouter>






// 2️⃣ Routes + Route — Kya Hai?
// Simple matlab: URL se component match karo


// <Routes>
//   <Route path="/"       element={<Home />}    />
//   <Route path="/about"  element={<About />}   />
//   <Route path="/users"  element={<Users />}   />
//   <Route path="*"       element={<NotFound />}/> // koi bhi match na ho
// </Routes>

// URL /about pe jaao → About component dikhega
// URL / pe jaao     → Home component dikhega






// 3️⃣ Link + NavLink — Kya Hai?
// Simple matlab: Page reload nahi hota — SPA rehta hai


// // HTML <a> tag — page reload hota hai ❌
// <a href="/about">About</a>

// // Link — page reload nahi ✅
// <Link to="/about">About</Link>

// // NavLink — active class automatically lagti hai ✅
// <NavLink
//   to="/about"
//   className={({ isActive }) => isActive ? 'active' : ''}
// >
//   About
// </NavLink>




// 3️⃣ Link + NavLink — Kya Hai?
// Simple matlab: Page reload nahi hota — SPA rehta hai

// const navigate = useNavigate();

// // Login ke baad dashboard pe bhejo
// navigate('/dashboard');

// // Wapas jao
// navigate(-1);

// // Replace — history mein nahi jayega
// navigate('/home', { replace: true });




// 5️⃣ useParams — Kya Hai?
// Simple matlab: URL se ID nikalo

// // Route define karo
// <Route path="/users/:id" element={<UserDetail />} />

// // Component mein ID lo
// function UserDetail() {
//   const { id } = useParams();
//   // URL /users/5 pe id = "5"
//   return <h1>User ID: {id}</h1>;
// }




// 6️⃣ Nested Routes — Kya Hai?
// Simple matlab: Route ke andar route — layout share karo


// // Dashboard ka layout same rehta hai
// // Sirf content badlta hai

// <Route path="/dashboard" element={<DashboardLayout />}>
//   <Route index         element={<Overview />}  />
//   <Route path="users"  element={<Users />}     />
//   <Route path="stats"  element={<Stats />}     />
// </Route>

// // DashboardLayout mein Outlet — child yahan dikhega
// function DashboardLayout() {
//   return (
//     <div>
//       <Sidebar />
//       <Outlet />  // ← child route yahan aayega
//     </div>
//   );
// }



// 7️⃣ Protected Routes — Kya Hai?
// Simple matlab: Login check karo — nahi hai toh login page pe bhejo



// function ProtectedRoute({ children }) {
//   const isLoggedIn = localStorage.getItem('token');

//   if (!isLoggedIn) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }

// // Use karo
// <Route path="/dashboard" element={
//   <ProtectedRoute>
//     <Dashboard />
//   </ProtectedRoute>
// } />
// ```

// ---

// ## Ab Code Karo:

// Pehle `src/pages/` folder mein files banao:
// ```
// src/
// ├── pages/
// │   ├── Home.jsx
// │   ├── About.jsx
// │   ├── Users.jsx
// │   ├── UserDetail.jsx
// │   ├── Dashboard.jsx
// │   ├── Login.jsx
// │   └── NotFound.jsx
// ├── components/
// │   ├── Navbar.jsx
// │   └── ProtectedRoute.jsx
// └── App.jsx