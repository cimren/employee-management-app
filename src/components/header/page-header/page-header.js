import { LitElement, html } from 'lit';
import styles from './page-header.styles.js';

export class PageHeader extends LitElement {
  static properties = {
    title: { type: String },
  };

  static styles = [styles];

  constructor() {
    super();
    this.title = '';
  }

  render() {
    return html` <div class="header">
      <h1>${this.title}</h1>
    </div>`;
  }
}

customElements.define('page-header', PageHeader);
