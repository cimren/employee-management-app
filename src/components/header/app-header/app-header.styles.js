import { css } from 'lit';

const styles = css`
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

  .logo-container {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .logo-container img {
    width: 40px;
    height: 40px;
    margin-right: 0.5rem;
  }

  .logo-container span {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--text-color);
    cursor: pointer;
  }
  .logo-container span:hover {
    opacity: 0.8;
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
    background-color: var(--hover-color);
  }

  .language-selector {
    display: flex;
    align-items: center;
  }

  .language-selector select {
    padding: 0.5rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
  }

  .language-selector select:focus {
    outline: none;
    border-color: var(--primary-color);
  }

  @media (max-width: 768px) {
    nav {
      gap: 0.5rem;
    }

    nav a {
      padding: 0.25rem;
    }
  }
`;

export default styles;
