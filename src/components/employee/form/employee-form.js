import { LitElement, html, css } from 'lit';
import { departments, positions } from '../../../utils/constants.js';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import '../../input/text-field/text-field.js';
import '../../input/date-picker/date-picker.js';
import '../../input/select-box/select-box.js';
import styles from './employee-form.styles.js';

const formFields = {
  firstName: {
    label: msg('First Name'),
    type: 'text',
    isRequired: true,
    errorMessage: '',
  },
  lastName: {
    label: msg('Last Name'),
    type: 'text',
    isRequired: true,
    errorMessage: '',
  },
  dateOfEmployment: {
    label: msg('Date of Employment'),
    type: 'date',
    isRequired: true,
    errorMessage: '',
  },
  dateOfBirth: {
    label: msg('Date of Birth'),
    type: 'date',
    isRequired: true,
    errorMessage: '',
  },
  phoneNumber: {
    label: msg('Phone'),
    type: 'tel',
    isRequired: true,
    errorMessage: '',
  },
  email: {
    label: msg('Email'),
    type: 'email',
    isRequired: true,
    errorMessage: '',
  },
  department: {
    label: msg('Department'),
    type: 'select',
    isRequired: true,
    errorMessage: '',
  },
  position: {
    label: msg('Position'),
    type: 'select',
    isRequired: true,
    errorMessage: '',
  },
};

export class EmployeeForm extends LitElement {
  static properties = {
    employee: { type: Object },
    formFields: { type: Object },
    invalid: { type: Boolean },
  };

  static styles = [styles];

  constructor() {
    super();
    updateWhenLocaleChanges(this);
    this.formFields = formFields;
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
    if (value !== undefined && value !== null) {
      // Clear error message if the field is filled
      this.formFields[name].errorMessage = '';

      this.employee = {
        ...this.employee,
        [name]: value,
      };
    }
  }

  _handleSubmit(e) {
    e.preventDefault();
    // Validate required fields
    this.invalid = false;

    Object.entries(this.formFields).map(([fieldName, item]) => {
      if (item.isRequired && !this.employee[fieldName]) {
        item.errorMessage = msg(`${item.label} is required`);
        this.invalid = true;
      }
    });

    if (!this.invalid) {
      this.dispatchEvent(
        new CustomEvent('save-employee', {
          detail: this.employee,
        })
      );
    }
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
            label=${formFields.firstName.label}
            .value=${firstName}
            isRequired=${formFields.firstName.isRequired}
            errorMessage=${formFields.firstName.errorMessage}
            @input-changed=${this._handleInput}
          ></text-field>
          <text-field
            name="lastName"
            label=${formFields.lastName.label}
            .value=${lastName}
            isRequired=${formFields.lastName.isRequired}
            errorMessage=${formFields.lastName.errorMessage}
            @input-changed=${this._handleInput}
          ></text-field>
        </div>
        <div class="form-row">
          <date-picker
            id="dateOfEmployment"
            name="dateOfEmployment"
            label=${formFields.dateOfEmployment.label}
            selectedDate=${dateOfEmployment}
            isRequired=${formFields.dateOfEmployment.isRequired}
            errorMessage=${formFields.dateOfEmployment.errorMessage}
            @date-selected=${(e) =>
              this._handleInput({
                target: { name: 'dateOfEmployment', value: e.detail.date },
              })}
          ></date-picker>
          <date-picker
            id="datePicker"
            name="dateOfBirth"
            label=${formFields.dateOfBirth.label}
            selectedDate=${dateOfBirth}
            isRequired=${formFields.dateOfBirth.isRequired}
            errorMessage=${formFields.dateOfBirth.errorMessage}
            @date-selected=${(e) =>
              this._handleInput({
                target: { name: 'dateOfBirth', value: e.detail.date },
              })}
          ></date-picker>
        </div>

        <div class="form-row">
          <text-field
            name="phoneNumber"
            label=${formFields.phoneNumber.label}
            type="tel"
            .value=${phoneNumber}
            isRequired=${formFields.phoneNumber.isRequired}
            errorMessage=${formFields.phoneNumber.errorMessage}
            @input-changed=${this._handleInput}
          ></text-field>
          <text-field
            name="email"
            label=${formFields.email.label}
            type="email"
            .value=${email}
            isRequired=${formFields.email.isRequired}
            errorMessage=${formFields.email.errorMessage}
            @input-changed=${this._handleInput}
          ></text-field>
        </div>

        <div class="form-row">
          <select-box
            label=${formFields.department.label}
            name="department"
            placeholder=${msg('Select Department')}
            isRequired=${formFields.department.isRequired}
            errorMessage=${formFields.department.errorMessage}
            .options=${departments.map((dept) => ({
              value: dept,
              label: dept,
            }))}
            .value=${department}
            @change=${this._handleInput}
          ></select-box>
          <select-box
            label=${formFields.position.label}
            name="position"
            placeholder=${msg('Select Position')}
            isRequired=${formFields.position.isRequired}
            errorMessage=${formFields.position.errorMessage}
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
