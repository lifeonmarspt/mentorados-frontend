import React from "react";

class Mentor extends React.Component {
  render() {
    return (
      <section className="post">
        <header className="post-header">
          <img width="96" height="96" className="post-avatar" src={this.props.mentor.picture} />
          <h2 className="post-title">{this.props.mentor.name}</h2>
          <p className="post-meta">
            <a href={"mailto:" + this.props.mentor.email} className="post-author">{this.props.mentor.email}</a>
          </p>
          <p>
            <span>
              {this.props.mentor.careers.map((career, n) => <span key={n} className="post-category post-category">{career.description}</span>)}
            </span>
          </p>
          <p>
            <span>
              {this.props.mentor.links.map((link, n) => <a href={link} key={n} className="post-category post-category-pure">{link}</a>)}
            </span>
          </p>

          {this.props.mentor.location && <p className="post-description">Living/Working in {this.props.mentor.location}</p>}

          <p className="post-description">
            {this.props.mentor.year_out ?
              "Attended from " + this.props.mentor.year_in + " to " + this.props.mentor.year_out :
              "Enrolled in " + this.props.mentor.year_in}
          </p>
        </header>

        <div className="post-description">
          {this.props.mentor.bio.split("\n").map((line, n) => <p key={n}>{line}</p>)}
        </div>
      </section>
    );
  }
}

export default Mentor;
