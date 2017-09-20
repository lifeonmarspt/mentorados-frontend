import React from "react";

class Mentor extends React.Component {
  render() {
    const { mentor } = this.props;

    return (
      <section className="post">
        <header className="post-header">
          <img width="96" height="96" className="post-avatar" src={mentor.picture} />
          <h2 className="post-title">{mentor.name}</h2>
          <p className="post-meta">
            <a href={"mailto:" + mentor.email} className="post-author">{mentor.email}</a>
          </p>
          <p>
            {mentor.careers.map(career => <span key={career.id} className="post-category">{career.description}</span>)}
          </p>
          <p>
            {mentor.traits.map(trait => <span key={trait.id} className="post-category">{trait.description}</span>)}
          </p>

          <p>
            <span>
              {mentor.links.map((link, n) => <a href={link} key={n} className="post-category post-category-pure">{link}</a>)}
            </span>
          </p>

          {mentor.location && <p className="post-description">Living/Working in {mentor.location}</p>}

          <p className="post-description">
            {mentor.year_out ?
              "Attended from " + mentor.year_in + " to " + mentor.year_out :
              "Enrolled in " + mentor.year_in}
          </p>
        </header>

        <div className="post-description">
          {mentor.bio.split("\n").map((line, n) => <p key={n}>{line}</p>)}
        </div>
      </section>
    );
  }
}

export default Mentor;
