import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import MyComponent from '../index';

describe('<MyComponent />', () => {
  it('contains the text `Hello World!`', () => {
    const wrapper = shallow(<MyComponent />);
    expect(wrapper.text()).to.equal('Hello World!');
  });
});