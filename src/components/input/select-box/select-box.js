import { LitElement, html, css } from 'lit';
import { formStyles } from '../../../utils/formStyles';
import styles from './select-box.styles.js';

class CustomSelect extends LitElement {
  static properties = {
    label: { type: String },
    name: { type: String },
    isRequired: { type: Boolean },
    options: { type: Array },
    value: { type: String },
    placeholder: { type: String },
    _open: { type: Boolean },
  };

  static styles = [formStyles, styles];

  constructor() {
    super();
    this.options = [];
    this.value = '';
    this.placeholder = '';
    this._open = false;
    this.label = '';
    this.name = '';
    this.isRequired = false;
    this._handleOutsideClick = this._handleOutsideClick.bind(this);
  }

  toggleDropdown() {
    this._open = !this._open;

    if (this._open) {
      document.addEventListener('click', this._handleOutsideClick);
    } else {
      document.removeEventListener('click', this._handleOutsideClick);
    }
  }

  _handleOutsideClick(e) {
    const path = e.composedPath();
    if (path.includes(this) || path.includes(this.shadowRoot)) return;

    this._open = false;
    document.removeEventListener('click', this._handleOutsideClick);
  }

  selectOption(option) {
    this.value = option.value;
    this._open = false;
    document.removeEventListener('click', this._handleOutsideClick);
    this.dispatchEvent(new CustomEvent('change', { detail: option }));
  }

  getSelectedLabel() {
    const found = this.options.find((opt) => opt.value === this.value);
    return found?.label ?? '';
  }

  _renderArrow() {
    return html`
      <svg
        class="arrow ${this._open ? 'open' : ''}"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        aria-hidden="true"
      >
        <path d="M7 10l5 5 5-5H7z" />
      </svg>
    `;
  }

  _renderOptions() {
    return html`
      <div class="dropdown" role="listbox" tabindex="-1">
        ${this.options.map(
          (option) => html`
            <div
              class="option"
              role="option"
              @click=${() => this.selectOption(option)}
              tabindex="0"
            >
              ${option.label}
            </div>
          `
        )}
      </div>
    `;
  }

  render() {
    return html`
      <div class="form-group">
        ${this.label &&
        html`<label for="${this.name}"
          >${this.label}
          ${this.isRequired
            ? html`<span class="required-indicator">*</span>`
            : ''}</label
        >`}
        <div
          class="select-box"
          @click=${this.toggleDropdown}
          role="combobox"
          aria-expanded="${this._open}"
          tabindex="0"
          aria-haspopup="listbox"
          aria-activedescendant=${this.value || ''}
        >
          <span>${this.getSelectedLabel() || this.placeholder}</span>
          ${this._renderArrow()}
        </div>
        ${this._open ? this._renderOptions() : ''}
      </div>
    `;
  }
}

customElements.define('custom-select', CustomSelect);
