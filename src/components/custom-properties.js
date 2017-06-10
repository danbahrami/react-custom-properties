import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
  setStyleProperty,
  removeStyleProperty,
  getRoot,
  isValidProperty,
} from '../utilities';

class CustomProperties extends Component {
  constructor(props) {
    super(props);

    this.container = null;
    this.containerRef = this.containerRef.bind(this);
    this.getContainer = this.getContainer.bind(this);
    this.handleNewProperties = this.handleNewProperties.bind(this);
  }

  componentDidMount() {
    const { properties } = this.props;
    const keys = Object.keys(properties);

    keys.forEach(key => {
      setStyleProperty(this.getContainer(), key, properties[key]);
    });
  }

  componentWillReceiveProps(nextProps) {
    const { properties } = this.props;

    if (nextProps.properties !== properties) {
      this.handleNewProperties(nextProps.properties, properties);
    }
  }

  componentWillUnmount() {
    const { global, properties } = this.props;

    if (!global) {
      return;
    }

    const keys = Object.keys(properties);

    keys.forEach(key => {
      removeStyleProperty(this.getContainer(), key);
    });
  }

  containerRef(element) {
    this.container = element;
  }

  getContainer() {
    const { global } = this.props;

    return global ? getRoot() : this.container;
  }

  handleNewProperties(next, previous) {
    const nextKeys = Object.keys(next);
    const previousKeys = Object.keys(previous);
    const removedKeys = previousKeys
      .filter(key => typeof next[key] === 'undefined');

    nextKeys
      .filter(key => next[key] !== previous[key])
      .forEach(key => {
        setStyleProperty(this.getContainer(), key, next[key]);
      });

    removedKeys.forEach(key => {
      removeStyleProperty(this.getContainer(), key);
    });
  }

  render() {
    return (
      <div ref={this.containerRef}>
        {this.props.children}
      </div>
    );
  }
}

CustomProperties.propTypes = {
  global: propTypes.bool,
  properties: propTypes.objectOf((value, key, componentName) => {
    if (!isValidProperty(key)) {
      return new Error(`
<${componentName} /> could not set the property "${key}: ${value[key]};".
Custom Property names must be a string starting with two dashes, for example "--theme-background".
      `.trim());
    }
  }),
};

CustomProperties.defaultProps = {
  global: false,
  properties: {},
};

export default CustomProperties;
