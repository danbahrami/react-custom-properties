import React from 'react';
import { findDOMNode } from 'react-dom';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import CustomProperties from '../../components/custom-properties';
import * as utilities from '../../utilities';

const FAKE_ROOT_NODE = {
  style: {
    setProperty: () => {},
    removeProperty: () => {},
  },
};

describe('<CustomProperties />', () => {
  before(() => {
    sinon.spy(utilities, 'setStyleProperty');
    sinon.spy(utilities, 'removeStyleProperty');
    sinon.stub(utilities, 'getRoot').returns(FAKE_ROOT_NODE);
  });

  beforeEach(() => {
    utilities.setStyleProperty.reset();
    utilities.removeStyleProperty.reset();
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
      const wrapper = mount(
        <CustomProperties properties={{
          '--foo': 'bar',
          '--baz': 'bat',
        }} />
      );

      const container = wrapper.instance().container;

      wrapper.setProps({
        properties: {
          '--foo': 'bar',
        }
      });

      expect(utilities.removeStyleProperty.callCount).to.equal(1);
      expect(utilities.removeStyleProperty.calledWith(container, '--baz')).to.equal(true);
    });
  });

  describe('when the global flag is passed', () => {
    describe('on mount', () => {
      it('sets the correct custom properties on the document root', () => {
        mount(
          <CustomProperties
            properties={{ '--foo': 'bar', '--baz': 'bat' }}
            global
          />
        );

        expect(utilities.setStyleProperty.callCount).to.equal(2);
        expect(utilities.setStyleProperty.calledWith(FAKE_ROOT_NODE, '--foo', 'bar')).to.equal(true);
        expect(utilities.setStyleProperty.calledWith(FAKE_ROOT_NODE, '--baz', 'bat')).to.equal(true);
      });
    });

    describe('on unmount', () => {
      it('removes all the current style properties from the document root', () => {
        const wrapper = mount(
          <CustomProperties
            properties={{ '--foo': 'bar', '--baz': 'bat' }}
            global
          />
        );

        wrapper.unmount();

        expect(utilities.removeStyleProperty.callCount).to.equal(2);
        expect(utilities.removeStyleProperty.calledWith(FAKE_ROOT_NODE, '--foo')).to.equal(true);
        expect(utilities.removeStyleProperty.calledWith(FAKE_ROOT_NODE, '--baz')).to.equal(true);
      });
    });

    describe('when the properties are updated', () => {
      it('sets only the custom properties that have changed', () => {
        const wrapper = mount(
          <CustomProperties
            properties={{ '--foo': 'bar', '--baz': 'bat' }}
            global
          />
        );

        utilities.setStyleProperty.reset();

        wrapper.setProps({
          properties: {
            '--foo': 'bar',
            '--baz': 'updated',
            '--new': 'value',
          }
        });

        expect(utilities.setStyleProperty.callCount).to.equal(2);
        expect(utilities.setStyleProperty.calledWith(FAKE_ROOT_NODE, '--baz', 'updated')).to.equal(true);
        expect(utilities.setStyleProperty.calledWith(FAKE_ROOT_NODE, '--new', 'value')).to.equal(true);
      });

      it('removes any custom properties that are no longer present', () => {
        const wrapper = mount(
          <CustomProperties
            properties={{ '--foo': 'bar', '--baz': 'bat' }}
            global
          />
        );

        wrapper.setProps({
          properties: {
            '--foo': 'bar',
          }
        });

        expect(utilities.removeStyleProperty.callCount).to.equal(1);
        expect(utilities.removeStyleProperty.calledWith(FAKE_ROOT_NODE, '--baz')).to.equal(true);
      });
    });
  });
});
