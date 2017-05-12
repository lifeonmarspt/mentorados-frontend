import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Helmet } from "react-helmet";

import { loadSession, persistSession } from '../lib/session';

import Layout from './Layout.jsx'
import Home from './pages/Home'
import Mentors from './pages/Mentors'

class App extends React.Component {

  constructor(...args) {
    super(...args)

    /* @todo filter state is kept internally in Filters component.
       I don't like keeping a copy of it here, but I don't know any other
       way of passing them to the Mentors component */
    this.state = {
      session: null,
      filters: {},
      loading: true
    };
  }

  doFilters(filters) {
    this.setState({ filters: filters });
  }

  doLogin(session) {
    persistSession(session);
    this.setState({ session: session })
  }

  doLogout() {
    persistSession(null);
    this.setState({ session: null })
  }

  componentDidMount() {

    let session = loadSession();
    if (session) {
      this.setState({ session: session });
    }

    if (!this.state.session) {
      this.setState({ loading: false });
    }

  }

  render() {
    return (
      !this.state.loading &&
      <Router>
        <Layout appState={this.state} doFilters={this.doFilters.bind(this)} doLogin={this.doLogin.bind(this)} doLogout={this.doLogout.bind(this)}>
          <Route exact path="/" component={Home} />
          <Route exact path="/mentors" component={() => <Mentors filters={this.state.filters} />} />
        </Layout>
      </Router>
    )
  }

}

export default App;
