import React from "react";

import EditableSingle from "components/elements/editable/Single";
import { fields, actions } from "resources/mentors";

class MentorView extends React.Component {

  render() {
    return (
      <div>
        <div className="posts">
          <h1 className="content-subhead">Admin: Mentor Details</h1>
          <section className="post">
            <div className="post-description">
              <div className="pure-g">
                <div className="pure-u-1-1">
                  <EditableSingle fields={fields} resourceId={this.props.match.params.id} actions={actions} />
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