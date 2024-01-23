import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/UserSlice.js';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
    reducer: {
        userReducer: persistedReducer,
    },
})

export const persistor = persistStore(store);