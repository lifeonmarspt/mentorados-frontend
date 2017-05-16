import React from "react";

class Conditional extends React.Component {

  constructor(...args) {
    super(...args);
  }

  render() {
    return this.props.condition ? (<span>{this.props.children}</span>) : null;
  }

}

export default Conditional;
