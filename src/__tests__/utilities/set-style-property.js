import { expect } from 'chai';
import sinon from 'sinon';
import * as warning from 'warning';
import setStyleProperty from '../../utilities/set-style-property';
import * as utilities from '../../utilities';

const PROPERTY = '--some-property';
const VALUE = '#FF00FF';

const setProperty = sinon.spy();

const element = { style: { setProperty } };

describe('setStyleProperty', () => {
  before(() => {
    sinon.spy(utilities, 'warning');
  });

  beforeEach(() => {
    setProperty.reset();
  });

  it('it sets the correct property on the given element', () => {
    setStyleProperty(element, PROPERTY, VALUE);

    expect(setProperty.calledWith(PROPERTY, VALUE)).to.equal(true);
  });

  it('does not display any console warnings', () => {
    expect(utilities.warning.called).to.equal(false);
  });

  describe('when an invalid property name is given', () => {
    before(() => {
      sinon.stub(utilities, 'isValidProperty').returns(false);
    });

    it('displays a console warning', () => {
      setStyleProperty(element, PROPERTY, VALUE);

      expect(utilities.warning.calledOnce).to.equal(true);
    });

    it('does not set the property', () => {
      expect(setProperty.called).to.equal(false);
    });
  });
});
