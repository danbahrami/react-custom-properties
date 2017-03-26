import { isValidProperty, warning } from './';

/**
 * A helper utility to abstract directly setting style properties
 * on DOM elements. This is mainly to help with testing.
 *
 * @param {object} element - The DOM element to be styled
 * @param {string} property - The name of the property to set
 * @param {string} value - The value of the property
 *
 * @return {void}
 */
const setStyleProperty = (element, property, value) => {
  if (!isValidProperty(property)) {
    warning(`Tried to apply an invalid Custom Property: ${property}`);
  } else {
    element.style.setProperty(property, value);
  }
};

export default setStyleProperty;
