import { configureStore } from '@reduxjs/toolkit';
import songReducer from './slices/SongSlice.js';
import userReducer from './slices/UserSlice.js';

export default configureStore({
    reducer: {
        songReducer: songReducer,
        userReducer: userReducer,
    },
})
