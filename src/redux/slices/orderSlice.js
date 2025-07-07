 import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    placeOrder(state, action) {
      const newOrder = {
        id: Date.now(), // unique ID
        items: action.payload.items,
        total: action.payload.total,
        status: "Pending", // default
        createdAt: new Date().toISOString(),
      };
      state.orders.push(newOrder);
      //  persist to localStorage
      localStorage.setItem("user-orders", JSON.stringify(state.orders));
    },
    updateOrderStatus(state, action) {
      const { id, status } = action.payload;
      const order = state.orders.find((o) => o.id === id);
      if (order) order.status = status;
    },
  },
});

export const { placeOrder, updateOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;
