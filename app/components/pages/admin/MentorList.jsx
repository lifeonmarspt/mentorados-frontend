import React from "react";

import List from "reactAdmin/components/List";
import resourceDescription from "resources/mentors";


class MentorList extends React.Component {
  render() {
    return (
      <div>
        <div className="posts">
          <h1 className="content-subhead">Admin: Mentor List</h1>
          <section className="post">
            <div className="post-description">
              <div className="pure-g">
                <div className="pure-u-1-1">
                  <List
                    {...resourceDescription}
                    displayFieldNames={["id", "name", "email", "created_at", "updated_at"]}
                  />
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
