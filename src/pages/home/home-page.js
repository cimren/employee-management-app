import { LitElement, html, css } from 'lit';
import { msg, updateWhenLocaleChanges } from '@lit/localize';
import '../../components/header/page-header/page-header.js';
import styles from './home-page.styles.js';

export class HomePage extends LitElement {
  static styles = [styles];

  constructor() {
    super();
    updateWhenLocaleChanges(this);
  }

  render() {
    return html`
      <div class="container">
        <page-header title="${msg('Employee Management System')}"></page-header>
        <p>${msg('Welcome to the Employee Management System!')}</p>
      </div>
    `;
  }
}

customElements.define('home-page', HomePage);
