import { css } from 'lit';
export const formStyles = css`
  .form-group {
    display: flex;
    flex-direction: column;
    margin: 0.5rem 0;
  }

  input,
  select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    font-size: 1rem;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  input:focus,
  select:focus {
    outline: none;
    border-color: var(--primary-color);
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--text-color);
    font-weight: 500;
  }

  .required-indicator {
    font-size: 0.875rem;
    margin-left: 0.05rem;
    font-weight: bold;
    color: red;
  }
  .error {
    color: red;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
`;
