// Concepts Samjho:

// Store — Kya Hai?
// Store = App ka data warehouse
// Sab data yahan rakho
// Koi bhi component yahan se le sakta hai



// Soch — ek central database
Store = {
  user:    { name: 'Mateen', isLoggedIn: true },
  cart:    { items: [], total: 0 },
  theme:   'dark',
}


// ### Slice — Kya Hai?

// Store ka ek hissa
// user ka alag slice
// cart ka alag slice
// theme ka alag slice


// Cart slice
// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: { items: [], total: 0 },
//   reducers: { ... }
// });




// ### Actions — Kya Hain?

// Actions = "Kya karna hai" ka message

// addToCart    → cart mein item daalo
// removeItem   → item hatao
// login        → user login hua



// ### Reducers — Kya Hain?

// Reducers = "Kaise update karo" ka function
// Action aaya → Reducer decide karta hai state kaise badle

// reducers: {
//   addToCart: (state, action) => {
//     state.items.push(action.payload); // item add karo
//     state.total += action.payload.price;
//   },
// }



// ### useSelector — Kya Hai?

// Store se data lo component mein

const cartItems = useSelector(state => state.cart.items);


// ### useDispatch — Kya Hai?

// Store ko action bhejo — state update karo

const dispatch = useDispatch();
dispatch(addToCart(product));