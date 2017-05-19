import React from "react";

import New from "reactAdmin/components/New";
import mentorResources from "resources/mentors";

class MentorNew extends React.Component {

  render() {
    return (
      <div>
        <div className="posts">
          <h1 className="content-subhead">Admin: Create New Mentor</h1>
          <section className="post">
            <div className="post-description">
              <div className="pure-g">
                <div className="pure-u-1-1">
                  <New {...mentorResources} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

}

export default MentorNew;
