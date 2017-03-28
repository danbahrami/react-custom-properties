import React, { Component, PropTypes } from 'react';
import { pullAll } from 'lodash';
import { setStyleProperty, removeStyleProperty, getRoot } from '../utilities';

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
    const removedKeys = pullAll(previousKeys, nextKeys);

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
  global: PropTypes.bool,
  properties: PropTypes.object,
};

CustomProperties.defaultProps = {
  global: false,
  properties: {},
};

export default CustomProperties;
