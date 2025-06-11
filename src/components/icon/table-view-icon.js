import { LitElement, html, css } from 'lit';

export class TableViewIcon extends LitElement {
  static properties = {
    color: { type: String },
  };
  constructor() {
    super();
    this.color = '#f60'; // Default color
  }
  static styles = css`
    svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  `;

  render() {
    return html`<svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="24"
      height="24"
      fill="${this.color}"
    >
      <rect x="10" y="10" width="20" height="20" />
      <rect x="40" y="10" width="20" height="20" />
      <rect x="70" y="10" width="20" height="20" />

      <rect x="10" y="40" width="20" height="20" />
      <rect x="40" y="40" width="20" height="20" />
      <rect x="70" y="40" width="20" height="20" />

      <rect x="10" y="70" width="20" height="20" />
      <rect x="40" y="70" width="20" height="20" />
      <rect x="70" y="70" width="20" height="20" />
    </svg> `;
  }
}

customElements.define('table-view-icon', TableViewIcon);
