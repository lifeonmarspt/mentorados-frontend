import React from "react";
import { Link } from "react-router-dom";


class AdminHome extends React.Component {
  render() {
    return (
      <div>
        <div className="posts">
          <section className="post">
            <header className="post-header">
              <h2 className="post-title">
                Admin backoffice
              </h2>
            </header>
          </section>
        </div>
      </div>
    );
  }
}

export default AdminHome;
