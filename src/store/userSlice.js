import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    name: '',
    role: '',
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.name       = action.payload.name;
      state.role       = action.payload.role;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.name       = '';
      state.role       = '';
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;