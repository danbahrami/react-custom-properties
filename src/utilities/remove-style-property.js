/**
 * A helper utility to abstract directly removing style properties
 * from DOM elements. This is mainly to help with testing.
 *
 * @param {object} element - The DOM element to be styled
 * @param {string} property - The name of the property to set
 *
 * @return {void}
 */
const removeStyleProperty = (element, property) => {
  element.style.removeProperty(property);
};

export default removeStyleProperty;
