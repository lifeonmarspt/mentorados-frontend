import React from 'react'

class Mentor extends React.Component {
  constructor(...args) {
    super(...args)
  }

  componentDidMount() {
  }

  render() {
    return (
      <section className="post">
        <header className="post-header">
          <img width="48" height="48" className="post-avatar" src={this.props.mentor.picture} />
          <h2 className="post-title">{this.props.mentor.name}</h2>
          <p className="post-meta">
            <a href={this.props.mentor.email} className="post-author">{this.props.mentor.email}</a>
          </p>
        </header>

        <div className="post-description">
          <p>
            {this.props.mentor.bio}
          </p>
        </div>
      </section>
    )
  }
}

export default Mentor;
