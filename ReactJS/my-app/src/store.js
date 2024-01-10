import { configureStore } from '@reduxjs/toolkit';
import songReducer from './slices/SongSlice.js';

export default configureStore({
    reducer: {
        songReducer: songReducer,
    },
})
