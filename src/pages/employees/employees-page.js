import { LitElement, html, css } from 'lit';
import { store } from '../../store/store.js';
import { navigate } from '../../utils/helpers.js';
import { deleteEmployee } from '../../store/employeeSlice.js';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import '../../components/header/page-header/page-header.js';
import '../../components/employee/list/employee-list.js';
import '../../components/modal/app-modal.js';
import styles from './employees-page.styles.js';

export class EmployeesPage extends LitElement {
  static properties = {
    employees: { type: Array },
    selectedEmployee: { type: Object },
    showDeleteModal: { type: Boolean },
  };

  static styles = [styles];

  constructor() {
    super();
    updateWhenLocaleChanges(this);
    this.employees = [];
    this.selectedEmployee = null;
    this.showDeleteModal = false;
  }

  connectedCallback() {
    super.connectedCallback();
    // Get data from the store
    this._updateFromStore();
    // Subscribe to store updates
    store.subscribe(() => this._updateFromStore());
  }

  _updateFromStore() {
    const state = store.getState();
    this.employees = state.employee.employees;
  }

  _handleEdit(employee) {
    const path = `/employee-form?id=${employee.detail.id}`;
    navigate(path);
  }

  _handleDeleteConfirm() {
    // Perform the delete operation
    store.dispatch(deleteEmployee(this.selectedEmployee.id));
    this.showDeleteModal = false;
  }

  _handleDeleteCancel() {
    this.showDeleteModal = false;
  }

  _handleDelete(employee) {
    this.selectedEmployee = employee.detail;
    this.showDeleteModal = true;
  }

  render() {
    return html`
      <div class="container">
        <page-header title="${msg('Employee List')}"></page-header>
        <employee-list
          .employees=${this.employees}
          @edit-employee=${this._handleEdit}
          @delete-employee=${this._handleDelete}
        ></employee-list>
      </div>
      <app-modal
        ?isOpen=${this.showDeleteModal}
        title="${msg('Are you sure?')}"
        message="${msg('Selected employee will be deleted.')}"
        confirmText="${msg('Proceed')}"
        cancelText="${msg('Cancel')}"
        @confirm=${this._handleDeleteConfirm}
        @cancel=${this._handleDeleteCancel}
      ></app-modal>
    `;
  }
}

customElements.define('employees-page', EmployeesPage);
