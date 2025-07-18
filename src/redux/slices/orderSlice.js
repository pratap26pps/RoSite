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
        id: Date.now(),   
        items: action.payload.items,
        total: action.payload.total,
        status: "Pending",  
        createdAt: new Date().toISOString(),
      };
      state.orders.push(newOrder);
     
      localStorage.setItem("user-orders", JSON.stringify(state.orders));
    },
    updateOrderStatus(state, action) {
      const { id, status } = action.payload;
      const order = state.orders.find((o) => o.id === id);
      if (order) order.status = status;
    },
    setOrders(state, action) {
      state.orders = action.payload;
    },
  },
});

export const { placeOrder, updateOrderStatus, setOrders } = orderSlice.actions;
export default orderSlice.reducer;
