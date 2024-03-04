import { configureStore } from '@reduxjs/toolkit';
import searchResultSlice from './slices/searchResultSlice';

export const store = configureStore({
    reducer: {
        searchResultSlice: searchResultSlice
    }
})