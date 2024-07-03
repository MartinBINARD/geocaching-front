import { configureStore } from '@reduxjs/toolkit';

import authReducer from './reducers/auth';
import circuitsReducer from '../domain/usecases/circuits';
import userReducer from '../domain/usecases/user';

const store = configureStore({
  reducer: {
    auth: authReducer,
    circuits: circuitsReducer,
    user: userReducer,
  },
});

export default store;

// Safely extract RootState and Dispatch type from store
// https://redux-toolkit.js.org/tutorials/typescript#define-root-state-and-dispatch-types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
