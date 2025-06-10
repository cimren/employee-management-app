import { LitElement, html, css } from 'lit';
import { formStyles } from '../../utils/formStyles.js';

export class DatePicker extends LitElement {
  static styles = [
    formStyles,
    css`
      :host {
        display: block;
      }

      input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        font-size: 1rem;
      }
    `,
  ];

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
