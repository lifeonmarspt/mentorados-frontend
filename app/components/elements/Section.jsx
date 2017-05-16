import React from "react";

class Section extends React.Component {

  constructor(...args) {
    super(...args);
  }

  componentDidMount() {

  }

  render() {
    return (
      <section className="post">
        <header className="post-header">
          <h2 className="post-title">{this.props.title}</h2>
        </header>

        <div className="post-description">
          {this.props.children}
        </div>

      </section>
    );
  }
}

export default Section;
