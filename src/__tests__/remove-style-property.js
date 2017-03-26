import { expect } from 'chai';
import sinon from 'sinon';
import removeStyleProperty from '../utilities/remove-style-property';

const PROPERTY = '--some-property';

describe('removeStyleProperty', () => {
  it('it removes the correct property from the given element', () => {
    const removeProperty = sinon.spy();

    const element = {
      style: {
        removeProperty,
      },
    };

    removeStyleProperty(element, PROPERTY);

    expect(removeProperty.calledWith(PROPERTY)).to.equal(true);
  });
});
