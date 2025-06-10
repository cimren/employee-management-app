// Redux store configuration for employee management
import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './employeeSlice';

export const store = configureStore({
  reducer: {
    employee: employeeReducer,
  },
});
