import { LitElement, html, css } from 'lit';
import { employeeService } from '../services/employee-service.js';
import '../components/header/page-header.js';
import 'fa-icons';

export class EmployeesPage extends LitElement {
  static properties = {
    employees: { type: Array },
    selectedEmployee: { type: Object },
  };

  static styles = css`
    :host {
      display: block;
    }

    .container {
      max-width: 1440px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }
  `;

  constructor() {
    super();
    this.employees = [];
    this.selectedEmployee = null;
  }

  async firstUpdated() {
    await this._loadEmployees();
  }

  async _loadEmployees() {
    this.employees = await employeeService.getEmployees();
  }

  _handleEdit(employee) {
    this.selectedEmployee = { ...employee.detail };
    //TODO: Navigate to employee form page with selected employee data
  }

  async _handleDelete(employee) {
    if (confirm('Are you sure you want to delete this employee?')) {
      await employeeService.deleteEmployee(employee.id);
      await this._loadEmployees();
    }
  }

  render() {
    return html`
      <div class="container">
        <page-header title="Employee List"></page-header>
        <employee-list
          .employees=${this.employees}
          @edit-employee=${this._handleEdit}
          @delete-employee=${this._handleDelete}
        ></employee-list>
      </div>
    `;
  }
}

customElements.define('employees-page', EmployeesPage);
