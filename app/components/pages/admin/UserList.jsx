import React from "react";
import { Link } from "react-router-dom";

import { getUsers } from "lib/api";
import List from "components/elements/editable/List";

class UserList extends React.Component {

  constructor(...args) {
    super(...args);

    this.state = {
      loading: true,
      fields: [
        {
          label: "id",
          get: (r) => (<Link to={`/admin/users/${r.id}`}>{r.id}</Link>),
        },
        {
          label: "email",
          get: (r) => r.email
        },
        {
          label: "admin",
          get: (r) => r.admin ? "yes" : "no"
        },
        {
          label: "mentor id",
          get: (r) => r.mentor && <Link to={`/admin/mentors/${r.mentor.id}`}>{r.mentor.id}</Link>
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

    getUsers()
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
          <h1 className="content-subhead">Admin: User List</h1>
          <section className="post">
            <div className="post-description">
              <div className="pure-g">
                <div className="pure-u-1-1">
                  <List fields={this.state.fields} data={this.state.data} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

}

export default UserList;
