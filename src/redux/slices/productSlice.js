import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        fetchProductsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchProductsSuccess(state, action) {
            state.loading = false;
            state.items = action.payload;
        },
        fetchProductsFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        addProduct(state, action) {
            state.items.push(action.payload);
        },
        removeProduct(state, action) {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        updateProduct(state, action) {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
    },
});

export const {
    fetchProductsStart,
    fetchProductsSuccess,
    fetchProductsFailure,
    addProduct,
    removeProduct,
    updateProduct,
} = productSlice.actions;

export default productSlice.reducer;