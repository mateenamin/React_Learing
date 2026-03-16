import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    total: 0,
  },
  reducers: {
    // Action 1 — item add karo
    addItem: (state, action) => {
      const existing = state.items.find(
        i => i.id === action.payload.id
      );
      if (existing) {
        existing.qty += 1; // already hai — qty badhao
      } else {
        state.items.push({ ...action.payload, qty: 1 });
      }
      state.total += action.payload.price;
    },

    // Action 2 — item hatao
    removeItem: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) state.total -= item.price * item.qty;
      state.items = state.items.filter(i => i.id !== action.payload);
    },

    // Action 3 — cart clear karo
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;