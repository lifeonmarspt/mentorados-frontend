import React from "react";

import Edit from "reactAdmin/components/Edit";
import resourceDescription from "resources/users";


class UserEdit extends React.Component {
  render() {
    return (
      <div>
        <div className="posts">
          <h1 className="content-subhead">Admin: User Details</h1>
          <section className="post">
            <div className="post-description">
              <div className="pure-g">
                <div className="pure-u-1-1">
                  <Edit {...resourceDescription} resourceId={this.props.match.params.id} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default UserEdit;


