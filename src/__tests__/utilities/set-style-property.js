import { expect } from 'chai';
import sinon from 'sinon';
import setStyleProperty from '../../utilities/set-style-property';

const PROPERTY = '--some-property';
const VALUE = '#FF00FF';

describe('setStyleProperty', () => {
  it('it sets the correct property on the given element', () => {
    const setProperty = sinon.spy();

    const element = {
      style: {
        setProperty,
      },
    };

    setStyleProperty(element, PROPERTY, VALUE);

    expect(setProperty.calledWith(PROPERTY, VALUE)).to.equal(true);
  });
});
