import React, { Component, PropTypes } from 'react';
import { pullAll } from 'lodash';
import { setStyleProperty, removeStyleProperty } from '../utilities';

class CustomProperties extends Component {
  constructor(props) {
    super(props);

    this.container = null;
    this.containerRef = this.containerRef.bind(this);
    this.applyProperties = this.applyProperties.bind(this);
  }

  componentDidMount() {
    this.applyProperties(this.props.properties);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.properties !== this.props.properties) {
      this.applyProperties(nextProps.properties, this.props.properties);
    }
  }

  containerRef(element) {
    this.container = element;
  }

  applyProperties(properties, previousProperties) {
    const keys = Object.keys(properties);

    if (!previousProperties) {
      keys.forEach((key) => {
        setStyleProperty(this.container, key, properties[key]);
      });

      return;
    }

    const previousKeys = Object.keys(previousProperties);
    const removedKeys = pullAll(previousKeys, keys);

    keys.forEach((key) => {
      if (properties[key] !== previousProperties[key]) {
        setStyleProperty(this.container, key, properties[key]);
      }
    });

    removedKeys.forEach((key) => {
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
