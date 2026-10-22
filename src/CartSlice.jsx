
import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',

  initialState: {
    items: [],
  },

  reducers: {
    addItem: (state, action) => {
      const plant = action.payload;

      // If the plant is already in the cart, increase its quantity.
      const existingItem = state.items.find(
        (item) => item.id === plant.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...plant,
          quantity: 1,
        });
      }
    },

    removeItem: (state, action) => {
      const plantId = action.payload;

      state.items = state.items.filter(
        (item) => item.id !== plantId
      );
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      const item = state.items.find(
        (plant) => plant.id === id
      );

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(
            (plant) => plant.id !== id
          );
        } else {
          item.quantity = quantity;
        }
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } =
  CartSlice.actions;

export default CartSlice.reducer;
