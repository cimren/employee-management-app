import { LitElement, html, css } from 'lit';

export class PageHeader extends LitElement {
  static properties = {
    title: { type: String },
  };

  static styles = css`
    .container {
      max-width: 1440px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }

    .header {
      margin-bottom: 2rem;
    }

    .header h1 {
      color: var(--primary-color);
    }
  `;

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
