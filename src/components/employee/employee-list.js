import { LitElement, html, css } from 'lit';
import 'fa-icons';

export class EmployeeList extends LitElement {
  static properties = {
    employees: { type: Array },
    viewMode: { type: String },
    searchQuery: { type: String },
    currentPage: { type: Number },
    itemsPerPage: { type: Number },
  };

  static styles = css`
    :host {
      display: block;
    }

    .controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .view-controls {
      display: flex;
      gap: 0.5rem;
    }

    .view-button {
      padding: 0.5rem;
      border: 1px solid var(--border-color);
      background: none;
      cursor: pointer;
      border-radius: 4px;
    }

    .view-button.active {
      background-color: var(--primary-color);
      color: white;
      border-color: var(--primary-color);
    }

    .search-input {
      padding: 0.5rem;
      border: 1px solid var(--border-color);
      border-radius: 4px;
      width: 300px;
    }

    /* List View */
    .list-view {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .employee-card {
      background-color: var(--card-background);
      padding: 1rem;
      border-radius: 8px;
      box-shadow: var(--shadow);
    }

    .employee-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .employee-name {
      font-size: 1.2rem;
      font-weight: 500;
      color: var(--text-color);
    }

    .employee-details {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.5rem;
      color: var(--text-secondary);
    }

    .detail-item {
      display: flex;
      gap: 0.5rem;
    }

    .detail-label {
      font-weight: 500;
    }

    /* Table View */
    .table-view {
      width: 100%;
      border-collapse: collapse;
      background-color: var(--card-background);
      border: 1px solid var(--border-color);
    }

    .table-view th,
    .table-view td {
      padding: 1rem;
      text-align: center;
    }

    .table-view th {
      color: var(--primary-color);
      font-weight: 500;
      background-color: var(--card-background);
    }

    .table-view tr {
      border: 1px solid var(--border-color);
    }

    .table-view tr:hover {
      background-color: var(--hover-color);
    }

    /* Actions */
    .actions {
      display: flex;
      gap: 0.5rem;
    }

    .action-button {
      padding: 0.25rem 0.5rem;
      cursor: pointer;
      font-size: 0.875rem;
    }

    /* Pagination */
    .pagination {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 2rem;
    }

    .page-button {
      padding: 0.5rem 1rem;
      border: 1px solid var(--border-color);
      background: none;
      cursor: pointer;
      border-radius: 4px;
    }

    .page-button.active {
      background-color: var(--primary-color);
      color: white;
      border-color: var(--primary-color);
    }
  `;

  constructor() {
    super();
    this.employees = [];
    this.viewMode = 'list';
    this.searchQuery = '';
    this.currentPage = 1;
    this.itemsPerPage = 5;
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
        <div class="view-controls">
          <button
            class="view-button ${this.viewMode === 'list' ? 'active' : ''}"
            @click=${() => this._handleViewChange('list')}
          >
            <fa-icon
              class="fas fa-align-justify"
              color="${this.viewMode === 'list' ? 'white' : '#f60'}"
              size="2em"
            ></fa-icon>
          </button>
          <button
            class="view-button ${this.viewMode === 'table' ? 'active' : ''}"
            @click=${() => this._handleViewChange('table')}
          >
            <fa-icon
              class="fas fa-th"
              color="${this.viewMode === 'table' ? 'white' : '#f60'}"
              size="2em"
            ></fa-icon>
          </button>
        </div>
      </div>

      ${this.viewMode === 'list'
        ? this._renderListView()
        : this._renderTableView()}
      ${this._renderPagination()}
    `;
  }

  _renderActionButtons(employee) {
    return html`
      <div class="actions">
        <div class="action-button" @click=${() => this._handleEdit(employee)}>
          <fa-icon class="fas fa-edit" color="#f60" size="2em"></fa-icon>
        </div>
        <div class="action-button" @click=${() => this._handleDelete(employee)}>
          <fa-icon class="fas fa-trash" color="#f60" size="2em"></fa-icon>
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
