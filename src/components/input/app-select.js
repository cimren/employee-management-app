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

  static styles = [
    formStyles,
    css`
      .select-container {
        position: relative;
      }

      select {
        appearance: none;
        width: 100%;
        font-size: 1.15rem;
        padding: 0.675em 6em 0.675em 1em;
        background-color: #fff;
        border: 1px solid #caced1;
        border-radius: 0.25rem;
        color: #000;
        cursor: pointer;
      }

      select-container::before,
      .select-container::after {
        --size: 0.3rem;
        position: absolute;
        content: '';
        right: 1rem;
        pointer-events: none;
      }

      .select-container::before {
        border-left: var(--size) solid transparent;
        border-right: var(--size) solid transparent;
        border-bottom: var(--size) solid black;
        top: 40%;
      }

      .select-container::after {
        border-left: var(--size) solid transparent;
        border-right: var(--size) solid transparent;
        border-top: var(--size) solid black;
        top: 55%;
      }
    `,
  ];

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
      <div class="form-group select-container">
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
