import warningLib from 'warning';

/**
 * Wraps the 'warning' library and always forces the warning.
 * This is mainly for testing purposes so that we have
 * something to spy on.
 *
 * @param {string} message - what to print to the console
 *
 * @return {void}
 */
const warning = message => warningLib(true, message);

export default warning;
