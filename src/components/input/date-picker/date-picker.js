import { LitElement, html, css } from 'lit';
import { formStyles } from '../../../utils/formStyles.js';
import styles from './date-picker.styles.js';

/**
 * @typedef {Object} DatePickerProperties
 * @property {string} label - The label for the date picker.
 * @property {string} name - The name attribute for the date input.
 * @property {string} selectedDate - The currently selected date in YYYY-MM-DD format.
 * @property {string} errorMessage - Error message to display if the date is invalid.
 * @property {boolean} isRequired - Whether the date input is required.
 */
export class DatePicker extends LitElement {
  static get styles() {
    return [formStyles, styles];
  }

  static properties = {
    label: { type: String },
    name: { type: String },
    selectedDate: { type: String },
    errorMessage: { type: String },
    isRequired: { type: Boolean },
  };

  constructor() {
    super();
    this.label = 'Select Date';
    this.name = 'date-picker';
    this.selectedDate = '';
    this.errorMessage = '';
    this.isRequired = false;
  }

  render() {
    return html`
      <div class="form-group">
        <label for="${this.name}"
          >${this.label}
          ${this.isRequired
            ? html`<span class="required-indicator">*</span>`
            : ''}</label
        >
        <input
          type="date"
          name="${this.name}"
          .value="${this.selectedDate}"
          @change="${this._handleDateChange}"
          ?required="${this.isRequired}"
          aria-label="${this.label}"
          aria-required="${this.isRequired}"
          aria-invalid="${this.errorMessage ? 'true' : 'false'}"
        />
        ${this.errorMessage
          ? html`<div class="error">${this.errorMessage}</div>`
          : ''}
      </div>
    `;
  }
  _handleDateChange(event) {
    const dateValue = event.target.value;
    if (this._isValidDate(dateValue)) {
      this.selectedDate = dateValue;
      this.errorMessage = '';
      this.dispatchEvent(
        new CustomEvent('date-selected', {
          detail: { date: this.selectedDate },
          bubbles: true,
          composed: true,
        })
      );
    } else {
      this.errorMessage = 'Please select a valid date.';
    }
  }
  _isValidDate(dateString) {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
    return datePattern.test(dateString);
  }
}
customElements.define('date-picker', DatePicker);
