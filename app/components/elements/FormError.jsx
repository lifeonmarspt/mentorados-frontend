import React from "react"

class FormError extends React.Component {

  constructor(...args) {
    super(...args)
  }

  render() {
    if (!this.props.error) {
      return null;
    }

    return (
      <aside className="error">
        {this.props.error}
      </aside>
    )
  }
}

export default FormError;
