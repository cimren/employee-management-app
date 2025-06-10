import { LitElement, html, css } from 'lit';
import { formStyles } from '../../utils/formStyles.js';

export class TextField extends LitElement {
  static properties = {
    label: { type: String },
    name: { type: String },
    type: { type: String },
    value: { type: String },
    placeholder: { type: String },
    errorMessage: { type: String },
    isRequired: { type: Boolean },
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
          ?required="${this.required}"
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
