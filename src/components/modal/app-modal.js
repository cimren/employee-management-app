import { LitElement, html, css } from 'lit';

export class AppModal extends LitElement {
  static properties = {
    isOpen: { type: Boolean },
    title: { type: String },
    message: { type: String },
    confirmText: { type: String },
    cancelText: { type: String },
  };

  static styles = css`
    :host {
      display: none;
    }

    :host([isOpen]) {
      display: block;
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-container {
      background-color: var(--card-background);
      border-radius: 6px;
      padding: 1rem;
      min-width: 342px;
      max-width: 500px;
      box-shadow: var(--shadow);
    }

    .modal-header {
      margin-bottom: 1rem;
    }

    .modal-title {
      color: var(--primary-color);
      font-size: 1.5rem;
      font-weight: 500;
      margin: 0;
    }

    .modal-content {
      margin-bottom: 2rem;
      color: var(--text-secondary);
    }

    .modal-actions {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      transition: opacity 0.3s ease;
    }

    button:hover {
      opacity: 0.9;
    }

    .confirm-button {
      background-color: var(--primary-color);
      color: white;
    }

    .cancel-button {
      background-color: var(--background-color);
      color: var(--text-color);
    }
  `;

  constructor() {
    super();
    this.isOpen = false;
    this.title = '';
    this.message = '';
    this.confirmText = 'Confirm';
    this.cancelText = 'Cancel';
  }

  _handleConfirm() {
    this.dispatchEvent(new CustomEvent('confirm'));
    this.isOpen = false;
  }

  _handleCancel() {
    this.dispatchEvent(new CustomEvent('cancel'));
    this.isOpen = false;
  }

  render() {
    return html`
      <div class="modal-overlay" @click=${this._handleCancel}>
        <div class="modal-container" @click=${(e) => e.stopPropagation()}>
          <div class="modal-header">
            <h2 class="modal-title">${this.title}</h2>
          </div>
          <div class="modal-content">
            <p>${this.message}</p>
          </div>
          <div class="modal-actions">
            <button class="confirm-button" @click=${this._handleConfirm}>
              ${this.confirmText}
            </button>
            <button class="cancel-button" @click=${this._handleCancel}>
              ${this.cancelText}
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('app-modal', AppModal);
