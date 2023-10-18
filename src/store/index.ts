import { configureStore } from '@reduxjs/toolkit';

import settingsReducer from './reducers/settings';
import circuitsReducer from './reducers/circuits';
import userReducer from './reducers/user';
import adminReducer from './reducers/admin';

const store = configureStore({
  reducer: {
    settings: settingsReducer,
    circuits: circuitsReducer,
    user: userReducer,
    admin: adminReducer,
  },
});

export default store;

// Safely extract RootState and Dispatch type from store
// https://redux-toolkit.js.org/tutorials/typescript#define-root-state-and-dispatch-types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
