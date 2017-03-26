import React, { Component, PropTypes } from 'react';
import { setStyleProperty } from '../utilities';

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

    keys.forEach((key) => {
      if (!(previousProperties && properties[key] === previousProperties[key])) {
        setStyleProperty(this.container, key, properties[key]);
      }
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
