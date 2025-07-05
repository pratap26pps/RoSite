import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    promos: [],
    loading: false,
    error: null,
};

const promoSlice = createSlice({
    name: 'promo',
    initialState,
    reducers: {
        fetchPromosStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchPromosSuccess(state, action) {
            state.loading = false;
            state.promos = action.payload;
        },
        fetchPromosFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        addPromo(state, action) {
            state.promos.push(action.payload);
        },
        removePromo(state, action) {
            state.promos = state.promos.filter(promo => promo.id !== action.payload);
        },
        clearPromos(state) {
            state.promos = [];
        },
    },
});

export const {
    fetchPromosStart,
    fetchPromosSuccess,
    fetchPromosFailure,
    addPromo,
    removePromo,
    clearPromos,
} = promoSlice.actions;

export default promoSlice.reducer;