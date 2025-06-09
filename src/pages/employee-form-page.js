import { LitElement, html, css } from 'lit';
import '../components/header/page-header.js';
import { employeeService } from '../services/employee-service.js';
import { Router } from '@vaadin/router';

const initialEmployee = {
  firstName: '',
  lastName: '',
  dateOfEmployment: '',
  dateOfBirth: '',
  phoneNumber: '',
  email: '',
  department: '',
  position: '',
};

export class EmployeeFormPage extends LitElement {
  static properties = {
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
    this.selectedEmployee = initialEmployee;
  }

  async _handleSave(event) {
    const employee = event.detail;
    await employeeService.updateEmployee(employee);
    this._navigate('/employees');
  }

  _navigate(path) {
    Router.go(path);
  }

  _handleCancel() {
    this.selectedEmployee = null;
    this._navigate('/employees');
  }

  render() {
    return html`
      <div class="container">
        <page-header title="Add/Edit Employee"></page-header>
        <employee-form
          .employee=${this.selectedEmployee}
          @save-employee=${this._handleSave}
          @cancel=${this._handleCancel}
        ></employee-form>
      </div>
    `;
  }
}

customElements.define('employee-form-page', EmployeeFormPage);
