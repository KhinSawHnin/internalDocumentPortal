import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';

import { baseApi } from './baseApi';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';
import documentReducer from '../features/docs/documentSlice';
import persistStorage from './persistStorage';


const authPersistConfig = {
  key: 'auth',
  storage: persistStorage,
  whitelist: ['token', 'user', 'role'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  users: userReducer,
  documents: documentReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);