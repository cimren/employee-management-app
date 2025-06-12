import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import { setLocale } from '../../../localization.js';
import '../../icon/list-view-icon.js';
import styles from './app-header.styles.js';

export class AppHeader extends LitElement {
  static properties = {
    title: { type: String },
    showMenu: { type: Boolean },
  };

  static styles = [styles];

  constructor() {
    super();
    updateWhenLocaleChanges(this);
    this.setLocale = setLocale;
    this.showMenu = false;

    this.title = 'ING';
  }

  _handleClick(e) {
    e.preventDefault();
    this.showMenu = false;
    this._navigate(e.target.href);
  }

  _navigate(path) {
    Router.go(path);
  }

  async setLanguage(locale) {
    await setLocale(locale);
    this.requestUpdate();
  }

  render() {
    return html`
      <header>
        <div
          class="logo-container"
          @click=${() => {
            this.showMenu = false;
            this._navigate('/');
          }}
        >
          <img src="src/assets/images/ing-logo.png" alt="ING Logo" />
          <span>${this.title}</span>
        </div>
        <div class="nav-container ${this.showMenu ? 'show-nav' : ''}">
          <nav>
            <a href="/employees" @click=${this._handleClick}
              >${msg('Employees')}</a
            >
            <a href="/employee-form" @click=${this._handleClick}
              >${msg('Add New')}</a
            >
          </nav>
          <div class="language-selector">
            <select-box
              .options=${[
                { label: 'EN', value: 'en' },
                { label: 'TR', value: 'tr' },
              ]}
              @change=${(e) => this.setLanguage(e.detail.value)}
              .value=${'en'}
            ></select-box>
          </div>
        </div>
        <div
          class="hamburger-menu"
          @click=${() => (this.showMenu = !this.showMenu)}
        >
          <list-view-icon color="#f60"></list-view-icon>
        </div>
      </header>
    `;
  }
}

customElements.define('app-header', AppHeader);
