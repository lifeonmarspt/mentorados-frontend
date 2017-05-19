import React from "react";
import { Link } from "react-router-dom";


class AdminHome extends React.Component {
  render() {
    return (
      <div>
        <div className="posts">
          <section className="post">
            <header className="post-header">
              <h2 className="post-title">Programa de Mentorados de Engenharia Informática - FEUP</h2>
            </header>
            <div className="post-description">
              <div className="pure-g">
                <div className="pure-u-1-1">
                  <ul>
                    <li><Link to="/admin/users">Users</Link></li>
                    <li><Link to="/admin/mentors">Mentors</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default AdminHome;
