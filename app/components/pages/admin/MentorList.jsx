import React from "react";
import { Link } from "react-router-dom";

import { getMentors } from "lib/api";
import EditableHorizontal from "components/elements/editable/Horizontal";

class MentorList extends React.Component {

  constructor(...args) {
    super(...args);

    this.state = {
      loading: true,
      fields: [
        {
          label: "id",
          displayAs: (r) => <Link to={`/admin/mentors/${r.id}`}>{r.id}</Link>
        },
        {
          label: "name",
          displayAs: (r) => r.name
        },
        {
          label: "email",
          displayAs: (r) => r.email
        },
        {
          label: "user id",
          displayAs: (r) => r.user && <Link to={`/admin/users/${r.user.id}`}>{r.user.id}</Link>
        },
        {
          label: "created at",
          displayAs: (r) => r.created_at
        },
        {
          label: "updated at",
          displayAs: (r) => r.updated_at
        }
      ],
      data: []
    };
  }


  componentDidMount() {
    getMentors()
      .then((response) => {
        this.state.loading = false;
        this.state.data = response.data;
        this.setState(this.state);
      });
  }

  render() {
    return !this.state.loading && (
      <div>
        <div className="posts">
          <h1 className="content-subhead">Admin: Mentor List</h1>
          <section className="post">
            <div className="post-description">
              <div className="pure-g">
                <div className="pure-u-1-1">
                  <EditableHorizontal fields={this.state.fields} data={this.state.data} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

}

export default MentorList;
