import { LitElement, html, css } from 'lit';
import { departments, positions } from '../../../utils/constants.js';
import '../../input/text-field/text-field.js';
import '../../input/date-picker/date-picker.js';
import '../../input/select-box/select-box.js';
import styles from './employee-form.styles.js';

export class EmployeeForm extends LitElement {
  static properties = {
    employee: { type: Object },
  };

  static styles = [styles];

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
    if (value) {
      this.employee = {
        ...this.employee,
        [name]: value,
      };
    }
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
          <custom-select
            label="Department"
            name="department"
            placeholder="Select Department"
            isRequired
            .options=${departments.map((dept) => ({
              value: dept,
              label: dept,
            }))}
            .value=${department}
            @change=${this._handleInput}
          ></custom-select>
          <custom-select
            label="Position"
            name="position"
            placeholder="Select Position"
            isRequired
            .options=${positions.map((pos) => ({
              value: pos,
              label: pos,
            }))}
            .value=${position}
            @change=${this._handleInput}
          ></custom-select>
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
