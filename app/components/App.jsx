import React from "react"
import PropTypes from "prop-types";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

import { loadSession, doLogin, doLogout } from "../lib/session";
import Layout from "./Layout";
import AuthenticatedRoute from "./core/AuthenticatedRoute";
import AnonymousRoute from "./core/AnonymousRoute";
import SignUp from "./pages/SignUp";
import Confirmation from "./pages/Confirmation";
import Home from "./pages/Home";
import Mentors from "./pages/Mentors";
import NotFound from "./pages/NotFound";

class App extends React.Component {

  static childContextTypes = {
    session: PropTypes.object
  }

  static contextTypes = {
    router: PropTypes.object
  }

  constructor(...args) {
    super(...args)

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
    }
  }

  doFilters(filters) {
    this.setState({ filters: filters });
  }

  componentDidMount() {
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
            <Route exact path="*" component={NotFound} />
          </Switch>
        </Layout>
      </Router>
    )
  }

}

export default App;
