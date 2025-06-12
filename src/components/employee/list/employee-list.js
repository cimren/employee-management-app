import { LitElement, html } from 'lit';
import styles from './employee-list.styles.js';
import '../../icon/list-view-icon.js';
import '../../icon/table-view-icon.js';
import '../../icon/pencil-icon.js';
import '../../icon/trash-icon.js';

export class EmployeeList extends LitElement {
  static properties = {
    employees: { type: Array },
    viewMode: { type: String },
    searchQuery: { type: String },
    currentPage: { type: Number },
    itemsPerPage: { type: Number },
    isMobile: { type: Boolean },
  };

  static styles = [styles];

  constructor() {
    super();
    this.employees = [];
    this.viewMode = 'list';
    this.searchQuery = '';
    this.currentPage = 1;
    this.itemsPerPage = 5;
    this.isMobile = false;
    this._mediaQuery = window.matchMedia('(max-width: 768px)');
    this._handleResize = this._handleResize.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this._mediaQuery.addEventListener('change', this._handleResize);
    this._handleResize(this._mediaQuery); // initial check
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._mediaQuery.removeEventListener('change', this._handleResize);
  }

  _handleResize(e) {
    this.isMobile = e.matches;
  }

  _handleViewChange(mode) {
    this.viewMode = mode;
  }

  _handleSearch(e) {
    this.searchQuery = e.target.value;
    this.currentPage = 1;
  }

  _handleEdit(employee) {
    this.dispatchEvent(
      new CustomEvent('edit-employee', {
        detail: employee,
      })
    );
  }

  _handleDelete(employee) {
    this.dispatchEvent(
      new CustomEvent('delete-employee', {
        detail: employee,
      })
    );
  }

  _handlePageChange(page) {
    this.currentPage = page;
  }

  get filteredEmployees() {
    return this.employees.filter((employee) => {
      const searchLower = this.searchQuery.toLowerCase();
      return (
        employee.firstName.toLowerCase().includes(searchLower) ||
        employee.lastName.toLowerCase().includes(searchLower) ||
        employee.email.toLowerCase().includes(searchLower) ||
        employee.department.toLowerCase().includes(searchLower) ||
        employee.position.toLowerCase().includes(searchLower)
      );
    });
  }

  get paginatedEmployees() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredEmployees.slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
  }

  render() {
    return html`
      <div class="controls">
        <input
          type="text"
          class="search-input"
          placeholder="Search employees..."
          .value=${this.searchQuery}
          @input=${this._handleSearch}
        />
        ${this.isMobile
          ? ''
          : html`
              <div class="view-controls">
                <button
                  class="view-button ${this.viewMode === 'list'
                    ? 'active'
                    : ''}"
                  @click=${() => this._handleViewChange('list')}
                >
                  <list-view-icon
                    color="${this.viewMode === 'list' ? 'white' : '#f60'}"
                  ></list-view-icon>
                </button>
                <button
                  class="view-button ${this.viewMode === 'table'
                    ? 'active'
                    : ''}"
                  @click=${() => this._handleViewChange('table')}
                >
                  <table-view-icon
                    color="${this.viewMode === 'table' ? 'white' : '#f60'}"
                  ></table-view-icon>
                </button>
              </div>
            `}
      </div>

      ${this.viewMode === 'list' || this.isMobile
        ? this._renderListView()
        : this._renderTableView()}
      ${this._renderPagination()}
    `;
  }

  _renderActionButtons(employee) {
    return html`
      <div class="actions">
        <div class="action-button" @click=${() => this._handleEdit(employee)}>
          <pencil-icon></pencil-icon>
        </div>
        <div class="action-button" @click=${() => this._handleDelete(employee)}>
          <trash-icon></trash-icon>
        </div>
      </div>
    `;
  }

  _renderListView() {
    return html`
      <div class="list-view">
        ${this.paginatedEmployees.map((employee) => {
          const {
            firstName,
            lastName,
            dateOfEmployment,
            dateOfBirth,
            phoneNumber,
            email,
            department,
            position,
          } = employee;
          return html`
            <div class="employee-card">
              <div class="employee-header">
                <div class="employee-name">${firstName} ${lastName}</div>
                ${this._renderActionButtons(employee)}
              </div>
              <div class="employee-details">
                <div class="detail-item">
                  <span class="detail-label">Department:</span>
                  <span>${department}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Position:</span>
                  <span>${position}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Email:</span>
                  <span>${email}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Phone:</span>
                  <span>${phoneNumber}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Employment Date:</span>
                  <span>${dateOfEmployment}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Date of Birth:</span>
                  <span>${dateOfBirth}</span>
                </div>
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }

  _renderTableView() {
    return html`
      <table class="table-view">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Employment</th>
            <th>Date of Birth</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Department</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${this.paginatedEmployees.map((employee) => {
            const {
              firstName,
              lastName,
              dateOfEmployment,
              dateOfBirth,
              phoneNumber,
              email,
              department,
              position,
            } = employee;
            return html`
              <tr>
                <td>${firstName}</td>
                <td>${lastName}</td>
                <td>${dateOfEmployment}</td>
                <td>${dateOfBirth}</td>
                <td>${phoneNumber}</td>
                <td>${email}</td>
                <td>${department}</td>
                <td>${position}</td>
                <td>${this._renderActionButtons(employee)}</td>
              </tr>
            `;
          })}
        </tbody>
      </table>
    `;
  }

  _renderPagination() {
    return html`
      <div class="pagination">
        ${Array.from({ length: this.totalPages }, (_, i) => i + 1).map(
          (page) => html`
            <button
              class="page-button ${page === this.currentPage ? 'active' : ''}"
              @click=${() => this._handlePageChange(page)}
            >
              ${page}
            </button>
          `
        )}
      </div>
    `;
  }
}

customElements.define('employee-list', EmployeeList);
