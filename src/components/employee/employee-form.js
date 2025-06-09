import { LitElement, html, css } from 'lit';
import { departments, positions } from '../../services/employee-service.js';

export class EmployeeForm extends LitElement {
  static properties = {
    employee: { type: Object },
  };

  static styles = css`
    :host {
      display: block;
    }

    .form-container {
      background-color: var(--card-background);
      padding: 2rem;
      border-radius: 8px;
      box-shadow: var(--shadow);
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: var(--text-color);
      font-weight: 500;
    }

    input,
    select {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid var(--border-color);
      border-radius: 4px;
      font-size: 1rem;
    }

    input:focus,
    select:focus {
      outline: none;
      border-color: var(--primary-color);
    }

    .buttons {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;
    }

    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
    }

    .save-button {
      background-color: var(--primary-color);
      color: white;
    }

    .cancel-button {
      background-color: var(--background-color);
      color: var(--text-color);
    }

    button:hover {
      opacity: 0.9;
    }
  `;

  constructor() {
    super();
    this.employee = {
      firstName: '',
      lastName: '',
      dateOfEmployment: '',
      dateOfBirth: '',
      phoneNumber: '',
      email: '',
      department: '',
      position: '',
    };
  }

  _handleInput(e) {
    const { name, value } = e.target;
    this.employee = {
      ...this.employee,
      [name]: value,
    };
  }

  _handleSubmit(e) {
    e.preventDefault();
    this.dispatchEvent(
      new CustomEvent('save-employee', {
        detail: this.employee,
      })
    );
  }

  _handleCancel() {
    this.dispatchEvent(new CustomEvent('cancel'));
  }

  render() {
    const {
      firstName,
      lastName,
      dateOfEmployment,
      dateOfBirth,
      phoneNumber,
      email,
      department,
      position,
    } = this.employee;
    return html`
      <form class="form-container" @submit=${this._handleSubmit}>
        <div class="form-row">
          <div class="form-group">
            <label for="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              .value=${firstName}
              @input=${this._handleInput}
              required
            />
          </div>

          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              .value=${lastName}
              @input=${this._handleInput}
              required
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="dateOfEmployment">Date of Employment</label>
            <input
              type="date"
              id="dateOfEmployment"
              name="dateOfEmployment"
              .value=${dateOfEmployment}
              @input=${this._handleInput}
              required
            />
          </div>

          <div class="form-group">
            <label for="dateOfBirth">Date of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              .value=${dateOfBirth}
              @input=${this._handleInput}
              required
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              .value=${phoneNumber}
              @input=${this._handleInput}
              required
            />
          </div>

          <div class="form-group">
            <label for="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              .value=${email}
              @input=${this._handleInput}
              required
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="department">Department</label>
            <select
              id="department"
              name="department"
              .value=${department}
              @input=${this._handleInput}
              required
            >
              <option value="">Select Department</option>
              ${departments.map(
                (dept) => html`<option value=${dept}>${dept}</option>`
              )}
            </select>
          </div>

          <div class="form-group">
            <label for="position">Position</label>
            <select
              id="position"
              name="position"
              .value=${position}
              @input=${this._handleInput}
              required
            >
              <option value="">Select Position</option>
              ${positions.map(
                (pos) => html`<option value=${pos}>${pos}</option>`
              )}
            </select>
          </div>
        </div>

        <div class="buttons">
          <button
            type="button"
            class="cancel-button"
            @click=${this._handleCancel}
          >
            Cancel
          </button>
          <button type="submit" class="save-button">Save</button>
        </div>
      </form>
    `;
  }
}

customElements.define('employee-form', EmployeeForm);
