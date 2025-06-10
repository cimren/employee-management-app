import { LitElement, html, css } from 'lit';
import '../components/header/page-header.js';

export class HomePage extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .container {
      max-width: 1440px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }
  `;

  render() {
    return html`
      <div class="container">
        <page-header title="Employee Management System"></page-header>
        <p>Welcome to the Employee Management System!</p>
      </div>
    `;
  }
}

customElements.define('home-page', HomePage);
