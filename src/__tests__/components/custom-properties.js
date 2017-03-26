import React from 'react';
import { findDOMNode } from 'react-dom';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import CustomProperties from '../../components/custom-properties';
import * as utilities from '../../utilities';

describe('<CustomProperties />', () => {
  before(() => {
    sinon.spy(utilities, 'setStyleProperty');
  });

  beforeEach(() => {
    utilities.setStyleProperty.reset();
  });

  it('renders it`s children', () => {
    const wrapper = shallow(
      <CustomProperties>Hey</CustomProperties>
    );

    expect(wrapper.text()).to.equal('Hey');
  });

  describe('on mount', () => {
    it('sets the correct custom properties on it`s container', () => {
      const wrapper = mount(
        <CustomProperties properties={{
          '--foo': 'bar',
          '--baz': 'bat',
        }} />
      );

      const container = wrapper.instance().container;

      expect(utilities.setStyleProperty.callCount).to.equal(2);
      expect(utilities.setStyleProperty.calledWith(container, '--foo', 'bar')).to.equal(true);
      expect(utilities.setStyleProperty.calledWith(container, '--baz', 'bat')).to.equal(true);
    });
  });

  describe('when the properties are updated', () => {
    it('sets only the custom properties that have changed', () => {
      const wrapper = mount(
        <CustomProperties properties={{
          '--foo': 'bar',
          '--baz': 'bat',
        }} />
      );

      const container = wrapper.instance().container;

      utilities.setStyleProperty.reset();

      wrapper.setProps({
        properties: {
          '--foo': 'bar',
          '--baz': 'updated',
          '--new': 'value',
        }
      });

      expect(utilities.setStyleProperty.callCount).to.equal(2);
      expect(utilities.setStyleProperty.calledWith(container, '--baz', 'updated')).to.equal(true);
      expect(utilities.setStyleProperty.calledWith(container, '--new', 'value')).to.equal(true);
    });

    it('removes any custom properties that are no longer present', () => {

    });
  });
});
