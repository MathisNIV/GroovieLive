import { configureStore } from '@reduxjs/toolkit';
import songReducer from './slices/SongSlice.js';
import TrackListReducer from './slices/TrackListSlice.js';
import userReducer from './slices/UserSlice.js';

export default configureStore({
    reducer: {
        songReducer: songReducer,
        TrackListReducer: TrackListReducer,
        userReducer: userReducer,
    },
})
