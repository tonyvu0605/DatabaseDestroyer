import storage from 'redux-persist/lib/storage';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PURGE,
  PERSIST,
  REGISTER,
  REHYDRATE,
  persistStore,
  persistReducer,
} from 'redux-persist';

import authReducer from './authSlice';
import teamReducer from './teamSlice';
import playerReducer from './playerSlice';
import darkModeReducer from './darkModeSlice';
import teamPerformanceReducer from './teamPerformanceSlice'
import teamSalariesReducer from './teamSalariesByYearSlice'
import topPlayerSalariesReducer from './topPlayerSalariesSlice';
import averagePlayerSalariesReducer from './averagePlayerSalariesSlice';
import seasonalPointsAverageReducer from './seasonalPointsAverageSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  darkMode: darkModeReducer,
  auth: authReducer,
  player: playerReducer,
  team: teamReducer,
  topPlayerSalaries: topPlayerSalariesReducer,
  teamSalaries: teamSalariesReducer,
  averagePlayerSalaries: averagePlayerSalariesReducer,
  teamPerformance: teamPerformanceReducer,
  seasonalPointsAverage: seasonalPointsAverageReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
