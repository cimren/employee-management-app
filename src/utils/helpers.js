import { Router } from '@vaadin/router';

/**
 * Navigate to a specific path using Vaadin Router.
 * @param {string} path - The path to navigate to.
 */
export const navigate = (path) => {
  Router.go(path);
};

/**
 * Validate an email address.
 * @param {string} email - The email address to validate
 * @returns {boolean} - True if the email is valid, false otherwise
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate a phone number.
 * @param {string} phoneNumber - The phone number to validate
 * @returns {boolean} - True if the phone number is valid, false otherwise
 */
export const isValidPhoneNumber = (phoneNumber) => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phoneNumber);
};
