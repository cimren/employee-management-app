import { css } from 'lit';

const styles = css`
  :host {
    display: block;
  }

  .controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .view-controls {
    display: flex;
    gap: 0.5rem;
  }

  .view-button {
    padding: 0.5rem;
    border: 1px solid var(--border-color);
    background: none;
    cursor: pointer;
    border-radius: 4px;
  }

  .view-button.active {
    background-color: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
  }

  .search-input {
    padding: 0.5rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    width: 300px;
  }

  /* List View */
  .list-view {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .employee-card {
    background-color: var(--card-background);
    padding: 1rem;
    border-radius: 8px;
    box-shadow: var(--shadow);
  }

  .employee-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.25rem;
  }

  .employee-name {
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--text-color);
  }

  .employee-details {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
    color: var(--text-secondary);
  }

  @media (max-width: 600px) {
    .employee-details {
      grid-template-columns: 1fr;
    }
  }

  .detail-item {
    padding-top: 4px;
  }

  .detail-label {
    font-weight: 500;
  }

  /* Table View */
  .table-view {
    width: 100%;
    border-collapse: collapse;
    background-color: var(--card-background);
    border: 1px solid var(--border-color);
  }

  .table-view th,
  .table-view td {
    padding: 0.75rem 0.25rem;
    text-align: center;
    font-size: 0.875rem;
  }

  .table-view th {
    color: var(--primary-color);
    font-weight: 500;
    background-color: var(--card-background);
  }

  .table-view tr {
    border: 1px solid var(--border-color);
  }

  .table-view tr:hover {
    background-color: var(--hover-color);
  }

  /* Actions */
  .actions {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
  }

  .action-button {
    padding: 0.25rem;
    cursor: pointer;
    font-size: 0.875rem;
  }

  /* Pagination */
  .pagination {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 2rem;
  }

  .page-button {
    padding: 0.5rem 1rem;
    border: 1px solid var(--border-color);
    background: none;
    cursor: pointer;
    border-radius: 4px;
  }

  .page-button.active {
    background-color: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
  }
`;

export default styles;
