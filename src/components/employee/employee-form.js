import { LitElement, html, css } from 'lit';
import { departments, positions } from '../../utils/constants.js';
import '../input/text-field.js';
import '../input/date-picker.js';
import '../input/app-select.js';

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

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
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
          <text-field
            name="firstName"
            label="First Name"
            .value=${firstName}
            isRequired
            @input-changed=${this._handleInput}
          ></text-field>
          <text-field
            name="lastName"
            label="Last Name"
            .value=${lastName}
            isRequired
            @input-changed=${this._handleInput}
          ></text-field>
        </div>
        <div class="form-row">
          <date-picker
            id="dateOfEmployment"
            name="dateOfEmployment"
            label="Date of Employment"
            selectedDate=${dateOfEmployment}
            isRequired
            @date-selected=${(e) =>
              this._handleInput({
                target: { name: 'dateOfEmployment', value: e.detail.date },
              })}
          ></date-picker>
          <date-picker
            id="datePicker"
            name="dateOfBirth"
            label="Date of Birth"
            selectedDate=${dateOfBirth}
            isRequired
            @date-selected=${(e) =>
              this._handleInput({
                target: { name: 'dateOfBirth', value: e.detail.date },
              })}
          ></date-picker>
        </div>

        <div class="form-row">
          <text-field
            name="phoneNumber"
            label="Phone Number"
            type="tel"
            .value=${phoneNumber}
            isRequired
            @input-changed=${this._handleInput}
          ></text-field>
          <text-field
            name="email"
            label="Email Address"
            type="email"
            .value=${email}
            isRequired
            @input-changed=${this._handleInput}
          ></text-field>
        </div>

        <div class="form-row">
          <app-select
            label="Department"
            name="department"
            placeholder="Select Department"
            .options=${departments.map((dept) => ({
              value: dept,
              label: dept,
            }))}
            .value=${department}
            @change=${this._handleInput}
          ></app-select>
          <app-select
            label="Position"
            name="position"
            placeholder="Select Position"
            .options=${positions.map((dept) => ({
              value: dept,
              label: dept,
            }))}
            .value=${position}
            @change=${this._handleInput}
          ></app-select>
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
