import React from "react"
import PropTypes from "prop-types";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { Helmet } from "react-helmet";
import JWTdecode from "jwt-decode";

import { loadSession, persistSession } from "../lib/session";
import { setAuthorization } from "../api/mentors";
import Layout from "./Layout";
import AuthenticatedRoute from "./core/AuthenticatedRoute";
import AnonymousRoute from "./core/AnonymousRoute";
import SignUp from "./pages/SignUp";
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

    /* @todo filter state is kept internally in Filters component.
       I don"t like keeping a copy of it here, but I don"t know any other
       way of passing them to the Mentors component */
    this.state = {
      session: null,
      filters: {},
      loading: true
    };
  }

  getChildContext() {
    return {
      session: this.state.session
    }
  }

  doFilters(filters) {
    this.setState({ filters: filters });
  }

  doLogin(session) {
    session = {
      jwt: session.jwt,
      user: JWTdecode(session.jwt)
    };
    setAuthorization(session.jwt);
    this.setState({ session: session })
    persistSession(session);
  }

  doLogout() {
    this.setState({ session: null })
    persistSession(null);
  }

  componentDidMount() {

    let session = loadSession();
    if (session) {
      this.setState({ session: session });
      setAuthorization(session.jwt);
    }

    if (!this.state.session) {
      this.setState({ loading: false });
    }

  }

  render() {
    return (
      !this.state.loading &&
      <Router>
        <Layout doFilters={this.doFilters.bind(this)} doLogin={this.doLogin.bind(this)} doLogout={this.doLogout.bind(this)}>
          <Switch>
            <AnonymousRoute exact path="/" component={Home} />
            <AnonymousRoute exact path="/signup" component={SignUp} />
            <AuthenticatedRoute exact path="/mentors" component={() => <Mentors filters={this.state.filters} />} />
            <Route exact path="*" component={NotFound} />
          </Switch>
        </Layout>
      </Router>
    )
  }

}

export default App;
