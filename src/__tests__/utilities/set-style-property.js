import { expect } from 'chai';
import sinon from 'sinon';
import setStyleProperty from '../../utilities/set-style-property';
import * as utilities from '../../utilities';

const PROPERTY = '--some-property';
const VALUE = '#FF00FF';

const setProperty = sinon.spy();
const element = { style: { setProperty } };

describe('setStyleProperty', () => {
  before(() => {
    sinon.stub(utilities, 'isValidProperty');
  });

  beforeEach(() => {
    setProperty.reset();
  });

  describe('when a valid property name is given', () => {
    it('it sets the correct property on the given element', () => {
      utilities.isValidProperty.returns(true);

      setStyleProperty(element, PROPERTY, VALUE);

      expect(setProperty.calledWith(PROPERTY, VALUE)).to.equal(true);
    });
  });

  describe('when an invalid property name is given', () => {
    it('does not set the property', () => {
      utilities.isValidProperty.returns(false);

      setStyleProperty(element, PROPERTY, VALUE);

      expect(setProperty.called).to.equal(false);
    });
  });
});
