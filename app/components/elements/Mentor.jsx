import React from "react";
import { compose } from "recompose";
import { translate } from "react-i18next";

class Mentor extends React.Component {
  render() {
    const { t, mentor, mentor: { year_in, year_out, location } } = this.props;

    return (
      <section className="post">
        <header className="post-header">
          <img width="96" height="96" className="post-avatar" src={mentor.picture} />
          <h2 className="post-title">{mentor.name}</h2>
          <p className="post-meta">
            <a href={`mailto: ${mentor.email}`} className="post-author">{mentor.email}</a>
          </p>
          <p>
            {mentor.careers.map(career => <span key={career.id} className="post-category">{career.description}</span>)}
          </p>
          <p>
            {mentor.traits.map(trait => <span key={trait.id} className="post-category post-trait">{trait.description}</span>)}
          </p>

          <p>
            <span>
              {mentor.links.map((link, n) => <a href={link} target="_blank" key={n} className="post-category post-category-pure">{link}</a>)}
            </span>
          </p>

          {location && <p className="post-description">{t("resource.living_working", { location })}</p>}

          <p className="post-description">
            {year_out ? t("resource.graduated", { year_in, year_out }) : t("resource.attending", { year_in })}
          </p>
        </header>

        <div className="post-description">
          {mentor.bio && mentor.bio.split("\n").map((line, n) => <p key={n}>{line}</p>)}
        </div>
      </section>
    );
  }
}

export default compose(
  translate([ "mentors" ]),
)(Mentor);
