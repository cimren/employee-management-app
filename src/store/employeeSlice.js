// This file defines a Redux slice for managing employee data in the application.
// It includes actions for setting, adding, updating, deleting, and selecting employees.
// It uses Redux Toolkit's createSlice function to simplify the creation of the slice and its actions.
import { createSlice } from '@reduxjs/toolkit';
import { employees } from '../data/employeeData';

const initialState = {
  /* Initial employee data */
  employees: employees, // This can be replaced with an empty array if you want to start with no employees
  /* Selected employee for editing or viewing details */
  selectedEmployee: null,
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      const lastElement = state.employees[state.employees.length - 1];
      const newEmployee = {
        ...action.payload,
        id: lastElement ? lastElement.id + 1 : 1, // Generate a new ID based on the last employee's ID
      };
      state.employees.push(newEmployee);
    },
    updateEmployee: (state, action) => {
      const index = state.employees.findIndex(
        (emp) => emp.id === action.payload.id
      );
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    },
    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter(
        (emp) => emp.id !== action.payload
      );
    },
  },
});

export const {
  setEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  selectEmployee,
} = employeeSlice.actions;
export default employeeSlice.reducer;
