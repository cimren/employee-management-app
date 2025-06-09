// Sample employee data
const employees = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    dateOfEmployment: '15/01/2023',
    dateOfBirth: '20/05/1990',
    phoneNumber: '+90 555 123 4567',
    email: 'john.doe@example.com',
    department: 'Tech',
    position: 'Senior',
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    dateOfEmployment: '10/03/2023',
    dateOfBirth: '15/08/1992',
    phoneNumber: '+90 555 987 6543',
    email: 'jane.smith@example.com',
    department: 'Analytics',
    position: 'Medior',
  },
  {
    id: 3,
    firstName: 'Mike',
    lastName: 'Johnson',
    dateOfEmployment: '01/06/2023',
    dateOfBirth: '30/11/1995',
    phoneNumber: '+90 555 456 7890',
    email: 'mike.johnson@example.com',
    department: 'Tech',
    position: 'Junior',
  },
  {
    id: 4,
    firstName: 'Cihan',
    lastName: 'İmren',
    dateOfEmployment: '01/06/2023',
    dateOfBirth: '01/09/1991',
    phoneNumber: '+90 555 456 7890',
    email: 'cihan.imren@example.com',
    department: 'Tech',
    position: 'Senior',
  },
];

// Predefined lists
export const departments = ['Analytics', 'Tech'];
export const positions = ['Junior', 'Medior', 'Senior'];

export const employeeService = {
  /**
   * Get all employees
   * @returns {Promise<Array>} List of employees
   */
  getEmployees: async () => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => resolve([...employees]), 500);
    });
  },

  /**
   * Update an employee
   * @param {Object} employee - Employee to update
   * @returns {Promise<Object>} Updated employee
   */
  updateEmployee: async (employee) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = employees.findIndex((e) => e.id === employee.id);
        if (index !== -1) {
          employees[index] = { ...employee };
        } else {
          employees.push({
            ...employee,
            id: employees.length + 1,
          });
        }
        resolve(employee);
      }, 500);
    });
  },

  /**
   * Delete an employee
   * @param {number} id - Employee ID
   * @returns {Promise<boolean>} Success status
   */
  deleteEmployee: async (id) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = employees.findIndex((e) => e.id === id);
        if (index !== -1) {
          employees.splice(index, 1);
        }
        resolve();
      }, 500);
    });
  },
};
