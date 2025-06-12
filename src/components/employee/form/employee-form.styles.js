import { css } from 'lit';

const styles = css`
  :host {
    display: block;
  }

  .form-container {
    background-color: var(--card-background);
    padding: 2rem;
    border-radius: 8px;
    box-shadow: var(--shadow);
  }

  .form-row {
    display: grid;
    gap: 1rem;
  }

  @media (min-width: 768px) {
    .form-row {
      grid-template-columns: 1fr 1fr;
    }
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
  }

  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
  }

  .save-button {
    background-color: var(--primary-color);
    color: white;
  }

  .cancel-button {
    background-color: var(--background-color);
    color: var(--text-color);
  }

  button:hover {
    opacity: 0.9;
  }
`;

export default styles;
