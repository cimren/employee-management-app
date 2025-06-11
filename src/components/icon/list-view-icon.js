import { LitElement, html, css } from 'lit';

export class ListViewIcon extends LitElement {
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
      height="24"
      width="24"
      fill="${this.color}"
      viewBox="0 0 24 24"
    >
      <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
    </svg> `;
  }
}

customElements.define('list-view-icon', ListViewIcon);
