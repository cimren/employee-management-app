import { LitElement, html } from 'lit';
import { formStyles } from '../../../utils/formStyles.js';

/**
 * @typedef {Object} TextFieldProperties
 * @property {string} label - The label for the text field.
 * @property {string} name - The name attribute for the text input.
 * @property {string} type - The type of the text input (e.g., "text", "email", "password").
 * @property {string} value - The current value of the text input.
 * @property {string} placeholder - Placeholder text for the input.
 * @property {string} errorMessage - Error message to display if the input is invalid.
 * @property {boolean} isRequired - Whether the input is required.
 */
export class TextField extends LitElement {
  static properties = {
    label: { type: String },
    name: { type: String },
    type: { type: String },
    value: { type: String },
    placeholder: { type: String },
    errorMessage: { type: String },
    isRequired: { type: Boolean },
    invalid: { type: Boolean },
  };

  static styles = [formStyles];

  constructor() {
    super();
    this.name = '';
    this.label = '';
    this.type = 'text';
    this.value = '';
    this.placeholder = '';
    this.errorMessage = '';
    this.isRequired = false;
    this.invalid = false;
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
          type=${this.type}
          id="text-field"
          .value="${this.value}"
          placeholder="${this.placeholder}"
          @input="${this._handleInputChange}"
          ?required="${this.isRequired}"
        />
        ${this.errorMessage
          ? html`<div class="error">${this.errorMessage}</div>`
          : ''}
      </div>
    `;
  }
  _handleInputChange(event) {
    this.value = event.target.value;
    this.dispatchEvent(
      new CustomEvent('input-changed', { detail: this.value })
    );
  }
}
customElements.define('text-field', TextField);
