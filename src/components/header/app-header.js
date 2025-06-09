import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';

export class AppHeader extends LitElement {
  static properties = {
    title: { type: String },
  };

  static styles = css`
    :host {
      display: block;
      background-color: var(--card-background);
      box-shadow: var(--shadow);
    }

    header {
      max-width: 1440px;
      margin: 0 auto;
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--text-color);
      text-decoration: none;
      cursor: pointer;
    }

    nav {
      display: flex;
      gap: 1rem;
    }

    nav a {
      color: var(--primary-color);
      text-decoration: none;
      padding: 0.5rem;
      border-radius: 4px;
      transition: background-color 0.3s ease;
      cursor: pointer;
    }

    nav a:hover {
      background-color: var(--primary-hover);
    }
  `;

  constructor() {
    super();
    this.title = 'ING';
  }

  _navigate(path) {
    Router.go(path);
  }

  render() {
    return html`
      <header>
        <a class="logo" @click=${() => this._navigate('/')}>${this.title}</a>
        <nav>
          <a href="/employees">Employees</a>
          <a href="/employee-form">Add New</a>
          <a @click=${() => this._navigate('/')}>TR</a>
        </nav>
      </header>
    `;
  }
}

customElements.define('app-header', AppHeader);
