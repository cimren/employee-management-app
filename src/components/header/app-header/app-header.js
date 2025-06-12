import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import { setLocale } from '../../../localization.js';
import styles from './app-header.styles.js';

export class AppHeader extends LitElement {
  static properties = {
    title: { type: String },
  };

  static styles = [styles];

  constructor() {
    super();
    updateWhenLocaleChanges(this);
    this.setLocale = setLocale;

    this.title = 'ING';
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
        <a class="logo" href="/">${this.title}</a>
        <nav>
          <a href="/employees">${msg('Employees')}</a>
          <a href="/employee-form">${msg('Add New')}</a>
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
      </header>
    `;
  }
}

customElements.define('app-header', AppHeader);
