import { createSlice } from '@reduxjs/toolkit';

const initialState = {
     showAuthModal: true,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
       closeAuthModal: (state) => {
      state.showAuthModal = false;
    },
    },
});

export const {closeAuthModal } = authSlice.actions;
export default authSlice.reducer;