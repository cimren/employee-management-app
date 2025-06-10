import { LitElement, html, css } from 'lit';
import { formStyles } from '../../utils/formStyles.js';

export class Select extends LitElement {
  static properties = {
    label: { type: String },
    options: { type: Array },
    value: { type: String },
    name: { type: String },
    placeholder: { type: String },
    isRequired: { type: Boolean },
  };

  static styles = [formStyles];

  constructor() {
    super();
    this.label = '';
    this.options = [];
    this.value = '';
    this.name = '';
    this.placeholder = 'Select an option';
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
        <select
          id="${this.name}"
          name="${this.name}"
          .value="${this.value}"
          @change="${this._handleChange}"
        >
          <option value="" disabled selected>${this.placeholder}</option>
          ${this.options.map(
            (option) => html`
              <option value="${option.value}">${option.label}</option>
            `
          )}
        </select>
      </div>
    `;
  }

  _handleChange(event) {
    this.value = event.target.value;
    this.dispatchEvent(new CustomEvent('change', { detail: this.value }));
  }
}

customElements.define('app-select', Select);
