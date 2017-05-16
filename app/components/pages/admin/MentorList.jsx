import React from "react";
import { Link } from "react-router-dom";

import { getMentors } from "lib/api";
import DataTable from "components/elements/DataTable";

class MentorList extends React.Component {

  constructor(...args) {
    super(...args);

    this.state = {
      loading: true,
      fields: [
        {
          label: "id",
          get: (r) => <Link to={`/admin/mentors/${r.id}`}>{r.id}</Link>
        },
        {
          label: "name",
          get: (r) => r.name
        },
        {
          label: "email",
          get: (r) => r.email
        },
        {
          label: "user id",
          get: (r) => r.user && <Link to={`/admin/users/${r.user.id}`}>{r.user.id}</Link>
        },
        {
          label: "created at",
          get: (r) => r.created_at
        },
        {
          label: "updated at",
          get: (r) => r.updated_at
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
          <section className="post">
            <header className="post-header">
              <h2 className="post-title">Programa de Mentorados de Engenharia Informática - FEUP</h2>
            </header>
            <div className="post-description">
              <div className="pure-g">
                <div className="pure-u-1-1">
                  <DataTable fields={this.state.fields} data={this.state.data} />
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
