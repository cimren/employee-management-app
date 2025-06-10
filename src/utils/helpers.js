import { Router } from '@vaadin/router';

/**
 * Navigate to a specific path using Vaadin Router.
 * @param {string} path - The path to navigate to.
 */
export const navigate = (path) => {
  Router.go(path);
};
