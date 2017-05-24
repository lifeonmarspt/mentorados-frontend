import React from "react";

class Page extends React.Component {
  render() {
    return (
      <div>
        <div className="posts">
          <h1 className="content-subhead">Admin: {this.props.resource.name}</h1>
          <section className="post">
            <div className="post-description">
              <div className="pure-g">
                <div className="pure-u-1-1">
                  <this.props.Component {...this.props.resource} resourceId={this.props.id} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default Page;
