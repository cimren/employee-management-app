import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';
import './components/header/app-header/app-header.js';
import './pages/home/home-page.js';
import './pages/employees/employees-page.js';
import './pages/employee-form/employee-form-page.js';

export class MyApp extends LitElement {
  static styles = css`
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    main {
      flex: 1;
      padding-top: 72px;
    }
  `;

  firstUpdated() {
    const router = new Router(this.shadowRoot.querySelector('main'));
    router.setRoutes([
      { path: '/', component: 'home-page' },
      { path: '/employees', component: 'employees-page' },
      { path: '/employee-form', component: 'employee-form-page' },
      { path: '/employee-form/:id', component: 'employee-form-page' },
      { path: '(.*)', redirect: '/' },
    ]);
  }

  render() {
    return html`
      <app-header></app-header>
      <main></main>
    `;
  }
}

customElements.define('my-app', MyApp);
