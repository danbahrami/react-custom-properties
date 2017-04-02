# React Custom Properties

A React component for declaratively applying CSS Variables or CSS Custom Properties as the are officially known. For CSS variable usage see [https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables)

## Install

To get started install via npm

```
npm install react-custom-properties
```

You can then import the component into your code using ES5 require
```
var CustomProperties = require('react-custom-properties');
```

or ES6 imports
```
import CustomProperties from 'react-custom-properties';
```

### Usage
  
This module provides a `<CustomProperties />` component. When mounted it will, by default, apply any CSS variables
passed to the `properties` component to its children.

So for example, your stylesheet may contain CSS Variables like this.
```
.header {
  background: var(--branding-color);
}
```

And you can apply values to those variables like this.
```
import React, { Component } from 'react';
import CustomProperties from 'react-custom-properties';

class App extends Component {
  render() {
    return (
      <div>
        <CustomProperties properties={{ '--branding-color': '#FF0000' }}>
          <div className="header">
            this will have the background color #FF0000
          </div>
        </CustomProperties>
      </div>
    );
  }
}
```

### Nesting

The `CustomProperties` component can be nested so that properties set by parent instances are overridden by ones set by child instances. So for example...

*Using the same stylesheet as before*

```
import React, { Component } from 'react';
import CustomProperties from 'react-custom-properties';

class App extends Component {
  render() {
    return (
      <div>
        <CustomProperties properties={{ '--branding-color': '#FF0000' }}>
          <div className="header">
            this will have the background color #FF0000
          </div>
          
          <CustomProperties properties={{ '--branding-color': '#555555' }}>
            <div className="header">
              this will have the background color #555555
            </div>
          </CustomProperties>
        </CustomProperties>
      </div>
    );
  }
}
```

### Global

The `CustomProperties` component accepts a boolean `global` prop. By default the CSS Variables will only apply to the
component's children. When the `global` prop is passed the CSS Variables will be set on the document root and will
therefor be globally applied to all styles.

*Using the same stylesheet as before*

```
import React, { Component } from 'react';
import CustomProperties from 'react-custom-properties';

class App extends Component {
  render() {
    return (
      <div>
        <CustomProperties 
          global
          properties={{ '--branding-color': '#FF0000' }} 
        />

        <div className="header">
          this will have the background color #FF0000
        </div>
      </div>
    );
  }
}
```

*Any properties set by a non-global instance will take precedence over properties set by a global instance*

## Credit

- The idea for this component came from working with @carlmw and @Kliriklara
- This repo was bootstrapped from [npm-react-boilerplate](https://github.com/juliancwirko/react-npm-boilerplate)

## Contribute

1. Fork this repo
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Make sure the tests pass (`npm run test`)
4. Commit your changes (`git commit -am 'Add some feature'`)
5. Push to the branch (`git push origin my-new-feature`)
6. Create new Pull Request

## License

MIT
