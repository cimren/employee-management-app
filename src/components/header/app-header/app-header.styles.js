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
    z-index: 1000;
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

  .nav-container {
    display: flex;
    gap: 1.5rem;
    align-items: center;
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

  .hamburger-menu {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
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
    .nav-container {
      position: fixed;
      top: 0;
      left: -100%;
      padding-top: 72px;
      background-color: var(--hover-color);
      width: 70%;
      height: 100vh;
      display: flex;
      gap: 1.5rem;
      flex-direction: column;
      align-items: center;
      transition: all 0.3s;
      z-index: 1;
    }

    nav {
      flex-direction: column;
      border-top: 1px solid var(--border-color);
      width: 100%;
      align-items: center;
      padding-top: 1.5rem;
    }

    nav a {
      padding: 0.25rem;
    }
    .hamburger-menu {
      display: flex;
    }

    .show-nav {
      left: 0;
    }
  }
`;

export default styles;
