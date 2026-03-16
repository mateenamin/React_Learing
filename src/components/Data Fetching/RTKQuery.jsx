// RTK Query (Redux Apps)

// Agar tum Redux Toolkit use kar rahe ho to RTK Query best hai.

// Features:

// API caching

// Automatic loading

// Redux integration

// Less boilerplate




// Define karo ek baar
const usersApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getUsers: builder.query({ query: () => '/users' }),
  }),
});

// Use karo — bahut simple!
const { data, isLoading, error } = useGetUsersQuery();
// Loading, error, data — sab automatic! ✅




// Learn:

// createApi

// baseQuery

// endpoints

// caching