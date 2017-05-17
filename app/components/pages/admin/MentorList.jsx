import React from "react";
import { Link } from "react-router-dom";

import { getMentors } from "lib/api";
import List from "components/elements/editable/List";
import mentorResources from "resources/mentors";

class MentorList extends React.Component {

  constructor(...args) {
    super(...args);

    this.state = {
      loading: true,
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
                  <List {...mentorResources} displayFieldNames={["id", "name", "email", "created_at", "updated_at"]} data={this.state.data} />
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
