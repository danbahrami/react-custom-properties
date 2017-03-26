const pattern = /^--\S+$/;

/**
 * Checks that a property name matches the
 * custom properties --* syntax format.
 *
 * Valid examples:
 * --foo
 * --foo-bar
 * --foo$_bar%^&123
 *
 * Invalid examples:
 * foo
 * -foo
 * --
 * --foo bar
 *
 * @param {string} property - The property name to validate
 *
 * @return {bool} true if the property name is valid
 */
const isValidProperty = property => pattern.test(property);

export default isValidProperty;
