

// | | Context API | Redux Toolkit | Zustand |
// |---|---|---|---|
// | **Install** | Built-in | npm install | npm install |
// | **Code** | Thoda | Zyada | Kam ✅ |
// | **Kab use** | Small app | Large app | Medium app |
// | **DevTools** | ❌ | ✅ | ✅ |






// State management ka matlab:

// App ke data ko multiple components me share aur control karna

// Example:

// User login data

// Shopping cart

// Theme (dark/light)

// Global settings



// 1️⃣ Local State (React Basic)

// Sabse pehle component level state samjho.

// Hook:

const [count, setCount] = useState(0)


function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  )
}



// 2️⃣ Context API (First Global State)

// Agar data multiple components me share karna ho.

// Example:

// App
//  ├ Navbar
//  ├ Sidebar
//  └ Dashboard

// Agar user data sab ko chahiye → Context API.


// Example:

const UserContext = createContext()

Provider:

<UserContext.Provider value={user}>
  <App />
</UserContext.Provider>

// Use:

const user = useContext(UserContext)







// 3️⃣ Redux Toolkit (Large Apps)

// Jab app bohat large ho to Redux use hota hai.

// Redux Toolkit = modern Redux



// Redux Concepts
// Store

// Global state container.

// const store = configureStore({
//   reducer: counterReducer
// })


// Slice

// State + reducers ka combination.

// const counterSlice = createSlice({
//   name: "counter",
//   initialState: { value: 0 },
//   reducers: {
//     increment: (state) => {
//       state.value++
//     }
//   }
// })



// Actions

// State change karne ke commands.

// Example:

// dispatch(increment())




// Reducer

// State ko update karta hai.

// Redux Toolkit me reducer slice ke andar hota hai.

// useDispatch

// Action bhejne ke liye.

// const dispatch = useDispatch()




// useSelector

// Store se data lene ke liye.

// const count = useSelector(state => state.counter.value)


// Example Redux Flow
// Component
//    ↓
// dispatch(action)
//    ↓
// Reducer
//    ↓
// Store update
//    ↓
// Component re-render











// 4️⃣ Zustand (Modern Alternative)

// Zustand Redux ka lightweight alternative hai.

// Advantages:

// Easy setup

// No boilerplate

// Small size


// Example:

// import { create } from "zustand"

// const useStore = create((set) => ({
//   count: 0,
//   increase: () => set((state) => ({ count: state.count + 1 }))
// }))

//  Use:

// const count = useStore(state => state.count)







// 📊 Comparison
// Tool	                        Difficulty	             Best Use
// useState                        	Easy	            Local state
// Context API                  	Medium	Small           global state
// Redux Toolkit	                  Medium	             Large apps
// Zustand	Easy	                  Modern                 lightweight apps