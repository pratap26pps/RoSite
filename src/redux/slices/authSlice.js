import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showAuthModal: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    AuthModel: (state, actions) => {
      state.showAuthModal = actions.payload;
    },
  },
});

export const { AuthModel } = authSlice.actions;
export default authSlice.reducer;
