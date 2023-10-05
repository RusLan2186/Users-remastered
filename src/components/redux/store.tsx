import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 

export type RootState = ReturnType<typeof store.getState>;
