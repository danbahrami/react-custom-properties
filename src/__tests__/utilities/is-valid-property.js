import { expect } from 'chai';
import isValidProperty from '../../utilities/is-valid-property';

describe('isValidProperty', () => {
  it('it returns true for valid property names', () => {
    expect(isValidProperty('--foo')).to.equal(true);
    expect(isValidProperty('--foo-bar')).to.equal(true);
    expect(isValidProperty('--foo$_bar%^&123')).to.equal(true);
  });

  it('returns false for invalid property names', () => {
    expect(isValidProperty('foo')).to.equal(false);
    expect(isValidProperty('-foo')).to.equal(false);
    expect(isValidProperty('--')).to.equal(false);
    expect(isValidProperty('--foo bar')).to.equal(false);
    expect(isValidProperty('')).to.equal(false);
  });

  it('returns false for non-string values', () => {
    expect(isValidProperty()).to.equal(false);
    expect(isValidProperty(null)).to.equal(false);
    expect(isValidProperty(false)).to.equal(false);
    expect(isValidProperty(true)).to.equal(false);
    expect(isValidProperty(123)).to.equal(false);
    expect(isValidProperty(NaN)).to.equal(false);
    expect(isValidProperty(() => {})).to.equal(false);
  });
});
