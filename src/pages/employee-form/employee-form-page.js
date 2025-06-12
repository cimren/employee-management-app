import { LitElement, html, css } from 'lit';
import '../../components/header/page-header/page-header.js';
import { store } from '../../store/store.js';
import { addEmployee, updateEmployee } from '../../store/employeeSlice.js';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import { navigate } from '../../utils/helpers.js';
import '../../components/employee/form/employee-form.js';
import '../../components/modal/app-modal.js';
import styles from './employee-form-page.styles.js';

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
    employee: { type: Object },
    showSaveModal: { type: Boolean },
  };

  static styles = [styles];

  constructor() {
    super();
    updateWhenLocaleChanges(this);
    this.employee = initialEmployee;
    this.showSaveModal = false;
  }

  connectedCallback() {
    super.connectedCallback();
    const state = store.getState();

    // Get query parameters from the URL using Router
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    // If an ID is provided, find the employee in the state
    if (id) {
      const employee = state.employee.employees.find(
        (emp) => emp.id === parseInt(id)
      );
      if (employee) {
        this.employee = { ...employee };
      }
    }
  }

  _handleSave(event) {
    this.employee = event.detail;
    this.showSaveModal = true;
  }

  _handleSaveConfirm() {
    if (this.employee.id) {
      store.dispatch(updateEmployee(this.employee));
    } else {
      store.dispatch(addEmployee(this.employee));
    }

    navigate('/employees');
  }

  _handleSaveCancel() {
    this.showSaveModal = false;
  }

  _handleCancel() {
    navigate('/employees');
  }

  render() {
    return html`
      <div class="container">
        <page-header
          title="${this.employee.id
            ? msg('Update Employee')
            : msg('Add Employee')}"
        ></page-header>
        <employee-form
          .employee=${this.employee}
          @save-employee=${this._handleSave}
          @cancel=${this._handleCancel}
        ></employee-form>
      </div>

      <app-modal
        ?isOpen=${this.showSaveModal}
        title=${this.employee.id ? msg('Update Employee') : msg('Add Employee')}
        message=${this.employee.id
          ? msg('Are you sure you want to update this employee?')
          : msg('Are you sure you want to add this employee?')}
        confirmText="${msg('Save')}"
        cancelText="${msg('Cancel')}"
        @confirm=${this._handleSaveConfirm}
        @cancel=${this._handleSaveCancel}
      ></app-modal>
    `;
  }
}

customElements.define('employee-form-page', EmployeeFormPage);
