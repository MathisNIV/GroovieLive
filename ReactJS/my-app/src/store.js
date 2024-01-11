import { configureStore } from '@reduxjs/toolkit';
import songReducer from './slices/SongSlice.js';
import TrackListReducer from './slices/TrackListSlice.js';

export default configureStore({
    reducer: {
        songReducer: songReducer,
        TrackListReducer: TrackListReducer,
    },
})
