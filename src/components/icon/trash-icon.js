import { LitElement, html, css } from 'lit';

export class TrashIcon extends LitElement {
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
      viewBox="0 0 448 512"
      width="24"
      height="24"
      fill="${this.color}"
    >
      <path
        d="M53.2 467c1.7 25.2 22.6 45 47.8 45h246c25.2 0 46.1-19.8 47.8-45L416 128H32l21.2 339zM432 32h-82l-34-34c-6-6-14.1-9.4-22.6-9.4H154.6c-8.5 0-16.6 3.4-22.6 9.4L98 32H16C7.2 32 0 39.2 0 48s7.2 16 16 16h416c8.8 0 16-7.2 16-16s-7.2-16-16-16z"
      />
    </svg> `;
  }
}

customElements.define('trash-icon', TrashIcon);
