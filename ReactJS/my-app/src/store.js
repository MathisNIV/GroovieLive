import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/UserSlice.js';

export default configureStore({
    reducer: {
        userReducer: userReducer,
    },
})