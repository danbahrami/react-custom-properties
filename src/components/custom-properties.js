import React, { Component, PropTypes } from 'react';
import { pullAll } from 'lodash';
import { setStyleProperty, removeStyleProperty } from '../utilities';

class CustomProperties extends Component {
  constructor(props) {
    super(props);

    this.container = null;
    this.containerRef = this.containerRef.bind(this);
    this.handleNewProperties = this.handleNewProperties.bind(this);
  }

  componentDidMount() {
    const { properties } = this.props;
    const keys = Object.keys(properties);

    keys.forEach(key => {
      setStyleProperty(this.container, key, properties[key]);
    });
  }

  componentWillReceiveProps(nextProps) {
    const { properties } = this.props;

    if (nextProps.properties !== properties) {
      this.handleNewProperties(nextProps.properties, properties);
    }
  }

  containerRef(element) {
    this.container = element;
  }

  handleNewProperties(next, previous) {
    const nextKeys = Object.keys(next);
    const previousKeys = Object.keys(previous);
    const removedKeys = pullAll(previousKeys, nextKeys);

    nextKeys
      .filter(key => next[key] !== previous[key])
      .forEach(key => {
        setStyleProperty(this.container, key, next[key]);
      });

    removedKeys.forEach(key => {
      removeStyleProperty(this.container, key);
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
  properties: PropTypes.object,
};

CustomProperties.defaultProps = {
  properties: {},
};

export default CustomProperties;
