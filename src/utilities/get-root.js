/**
 * An abstraction around the document object to
 * help mocking in tests.
 *
 * @return {object} - the root document element
 */
const getRoot = () => document.documentElement;

export default getRoot;
