import React from "react"

class FormError extends React.Component {

  constructor(...args) {
    super(...args)
  }

  render() {
    if (Object.keys(this.props.errors).length === 0) {
      return <span></span>;
    }

    return (
      <aside className="error">
        <ul className="pure-menu-list">
          {Object.keys(this.props.errors).map((key, n) =>
              [].concat(this.props.errors[key]).map((error, n) =>
                <li key={n} className="pure-menu-item">{key} {error}</li>))}
        </ul>
      </aside>
    )
  }
}

export default FormError;
