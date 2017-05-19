import React from "react";

import Edit from "reactAdmin/components/Edit";
import mentorResources from "resources/mentors";


class MentorEdit extends React.Component {
  render() {
    return (
      <div>
        <div className="posts">
          <h1 className="content-subhead">Admin: Mentor Edit</h1>
          <section className="post">
            <div className="post-description">
              <div className="pure-g">
                <div className="pure-u-1-1">
                  <Edit {...mentorResources} resourceId={this.props.match.params.id} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default MentorEdit;
