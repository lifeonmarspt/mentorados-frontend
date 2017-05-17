import React from "react";
import { Link } from "react-router-dom";

import { getMentor, putMentor, postMentor, deleteMentor } from "lib/api";
import EditableVertical from "components/elements/editable/Vertical";

const temp_careers = [
  {
    "id": 1,
    "description": "Entrepreneurship"
  },
  {
    "id": 2,
    "description": "Freelance"
  },
  {
    "id": 3,
    "description": "Academia"
  },
  {
    "id": 4,
    "description": "Management"
  },
  {
    "id": 5,
    "description": "Startup/Scaleup"
  },
  {
    "id": 6,
    "description": "Established Company"
  }
];

const fields = [
  {
    id: "id",
    label: "#",
    displayAs: (r) => <Link to={`/admin/mentors/${r.id}`}>{r.id}</Link>
  },
  {
    id: "user_id",
    label: "User #",
    displayAs: (r) => r.user && <Link to={`/admin/users/${r.user.id}`}>{r.user.id}</Link>
  },
  {
    id: "name",
    label: "Name",
    editableAs: "text",
    displayAs: (r) => r.name
  },
  {
    id: "email",
    label: "Email",
    editableAs: "text",
    displayAs: (r) => r.email
  },
  {
    id: "gender",
    label: "Gender",
    editableAs: "radio",
    editableChoices: [
      { id: "F", description: "Female" },
      { id: "M", description: "Male" },
    ],
    displayAs: (r) => r.gender
  },
  {
    id: "bio",
    label: "Bio",
    editableAs: "textarea",
    displayAs: (r) => r.bio.split("\n").map((l, n) => <p key={n}>{l}</p>),
    getValue: (r) => r.bio
  },
  {
    id: "year_in",
    label: "Enrolled In",
    editableAs: "text",
    displayAs: (r) => r.year_in
  },
  {
    id: "year_out",
    label: "Graduated In",
    editableAs: "text",
    displayAs: (r) => r.year_out
  },
  {
    id: "careers",
    sendAs: "career_ids",
    label: "Careers",
    editableAs: "checkbox",
    // @todo load this data from api, context or wtv
    editableChoices: temp_careers,
    displayAs: (r) => (r.careers || []).filter((c) => c.checked).map((c, n) => <p key={n}>{c.description}</p>),
    getValue: (r) => (r.careers || []).map((c) => c.id),
  },
  {
    id: "locations",
    sendAs: "location_ids",
    label: "Locations",
    editableAs: "choice",
    displayAs: (r) => (r.locations || []).map((l, n) => <p key={n}>{l.description}</p>),
  },
  {
    label: "Created At",
    displayAs: (r) => r.created_at,
  },
  {
    label: "Updated At",
    displayAs: (r) => r.updated_at,
  }
];

class MentorView extends React.Component {

  constructor(...args) {
    super(...args);
    this.state = {

    };
  }

  render() {
    let remoteActions = {
      load: getMentor,
      save: putMentor,
      create: postMentor,
      destroy: deleteMentor
    };

    return (
      <div>
        <div className="posts">
          <h1 className="content-subhead">Admin: Mentor Details</h1>
          <section className="post">
            <div className="post-description">
              <div className="pure-g">
                <div className="pure-u-1-1">
                  <EditableVertical fields={fields} resourceId={this.props.match.params.id} remoteActions={remoteActions} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

}

export default MentorView;
