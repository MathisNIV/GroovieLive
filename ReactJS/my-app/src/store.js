import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/UserSlice.js';
import TokenReducer from './slices/TokenSlice.js'

export default configureStore({
    reducer: {
        userReducer: userReducer,
        TokenReducer: TokenReducer,
    },
})