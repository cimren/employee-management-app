import { css } from 'lit';

const styles = css`
  :host {
    display: inline-block;
    font-family: sans-serif;
    position: relative;
    min-width: 160px;
    user-select: none;
  }

  .select-box {
    border: 1px solid #ccc;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    background: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    outline: none;
  }

  svg.arrow {
    margin-left: 8px;
    transition: transform 0.3s ease;
    fill: #555;
    pointer-events: none;
  }

  svg.arrow.open {
    transform: rotate(180deg);
  }

  .dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #ccc;
    border-top: none;
    z-index: 1000;
    max-height: 150px;
    overflow-y: auto;
    box-sizing: border-box;
  }

  .option {
    padding: 8px 12px;
    cursor: pointer;
  }

  .option:hover,
  .option:focus {
    background: #f0f0f0;
    outline: none;
  }
`;

export default styles;
