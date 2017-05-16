import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { loadSession, doLogin, doLogout } from "lib/session";
import Layout from "components/Layout";
import AnonymousRoute from "components/core/AnonymousRoute";
import AuthenticatedRoute from "components/core/AuthenticatedRoute";
import AdminRoute from "components/core/AdminRoute";
import SignUp from "components/pages/SignUp";
import Confirmation from "components/pages/Confirmation";
import Home from "components/pages/Home";
import AdminHome from "components/pages/admin/Home";
import AdminUserList from "components/pages/admin/UserList";
import AdminUserView from "components/pages/admin/UserView";
import AdminMentorList from "components/pages/admin/MentorList";
import AdminMentorView from "components/pages/admin/MentorView";
import Mentors from "components/pages/Mentors";
import NotFound from "components/pages/NotFound";

class App extends React.Component {

  static childContextTypes = {
    session: PropTypes.object
  }

  static contextTypes = {
    router: PropTypes.object
  }

  constructor(...args) {
    super(...args);

    this.state = {
      session: null,
      filters: {
        careers: []
      },
      loading: true
    };

    this.loadSession = loadSession.bind(this);
    this.doLogin = doLogin.bind(this);
    this.doLogout = doLogout.bind(this);
  }

  getChildContext() {
    return {
      session: {
        state: this.state.session,
        doLogin: this.doLogin,
        doLogout: this.doLogout,
      }
    };
  }

  doFilters(filters) {
    this.setState({ filters: filters });
  }

  componentWillMount() {
    this.loadSession();

    if (!this.state.session) {
      this.setState({ loading: false });
    }
  }

  render() {
    return !this.state.loading && (
      <Router>
        <Layout doFilters={this.doFilters.bind(this)}>
          <Switch>
            <AnonymousRoute exact path="/" component={Home} />
            <AnonymousRoute exact path="/signup" component={SignUp} />
            <AnonymousRoute exact path="/users/:id/confirm/:token" component={({ ...args }) => <Confirmation doLogin={this.doLogin.bind(this)} {...args} />} />
            <AuthenticatedRoute exact path="/mentors" component={({ ...args }) => <Mentors filters={this.state.filters} {...args} />} />
            <AdminRoute exact path="/admin" component={AdminHome} />
            <AdminRoute exact path="/admin/users" component={AdminUserList} />
            <AdminRoute exact path="/admin/users/:id" component={AdminUserView} />
            <AdminRoute exact path="/admin/mentors" component={AdminMentorList} />
            <AdminRoute exact path="/admin/mentors/:id" component={AdminMentorView} />
            <Route exact path="*" component={NotFound} />
          </Switch>
        </Layout>
      </Router>
    );
  }

}

export default App;
