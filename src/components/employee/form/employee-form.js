import { LitElement, html, css } from 'lit';
import { departments, positions } from '../../../utils/constants.js';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
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
    updateWhenLocaleChanges(this);
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
            label=${msg('First Name')}
            .value=${firstName}
            isRequired
            @input-changed=${this._handleInput}
          ></text-field>
          <text-field
            name="lastName"
            label=${msg('Last Name')}
            .value=${lastName}
            isRequired
            @input-changed=${this._handleInput}
          ></text-field>
        </div>
        <div class="form-row">
          <date-picker
            id="dateOfEmployment"
            name="dateOfEmployment"
            label=${msg('Date of Employment')}
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
            label=${msg('Date of Birth')}
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
            label=${msg('Phone')}
            type="tel"
            .value=${phoneNumber}
            isRequired
            @input-changed=${this._handleInput}
          ></text-field>
          <text-field
            name="email"
            label=${msg('Email')}
            type="email"
            .value=${email}
            isRequired
            @input-changed=${this._handleInput}
          ></text-field>
        </div>

        <div class="form-row">
          <select-box
            label=${msg('Department')}
            name="department"
            placeholder=${msg('Select Department')}
            isRequired
            .options=${departments.map((dept) => ({
              value: dept,
              label: dept,
            }))}
            .value=${department}
            @change=${this._handleInput}
          ></select-box>
          <select-box
            label=${msg('Position')}
            name="position"
            placeholder=${msg('Select Position')}
            isRequired
            .options=${positions.map((pos) => ({
              value: pos,
              label: pos,
            }))}
            .value=${position}
            @change=${this._handleInput}
          ></select-box>
        </div>

        <div class="buttons">
          <button
            type="button"
            class="cancel-button"
            @click=${this._handleCancel}
          >
            ${msg('Cancel')}
          </button>
          <button type="submit" class="save-button">${msg('Save')}</button>
        </div>
      </form>
    `;
  }
}

customElements.define('employee-form', EmployeeForm);
