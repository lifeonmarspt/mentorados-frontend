import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Helmet } from "react-helmet";

import { loadSession, persistSession } from '../lib/session';
import { getMentors, getCareers } from '../api/mentors'

import Layout from './Layout.jsx'
import Home from './pages/Home'
import Mentors from './pages/Mentors'

class App extends React.Component {

  constructor(...args) {
    super(...args)

    this.doFilters = this.doFilters.bind(this);
    this.doLogin = this.doLogin.bind(this);
    this.doLogout = this.doLogout.bind(this);

    this.state = {
      session: null,
      loading: true,
      mentors: [],
      careers: []
    };
  }

  doLogin(session) {
    persistSession(session);
    this.setState({ session: session })
  }

  doLogout() {
    persistSession(null);
    this.setState({ session: null })
  }

  doFilters() {
    this.setState({ loading: true });

    getMentors().then((response) => this.setState({
        mentors: response.data,
        loading: false,
      }));
  }


  componentDidMount() {

    let session = loadSession();
    if (session) {
      this.setState({ session: session });
    }

    getCareers().
      then((response) => this.setState({
        careers: response.data,
        loading: false
      }));

    if (!this.state.session) {
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      !this.state.loading && <Router>
        <Layout appState={this.state} doFilters={this.doFilters} doLogin={this.doLogin} doLogout={this.doLogout}>
          <Route exact path="/" component={Home} />
          <Route exact path="/mentors" component={() => <Mentors mentors={this.state.mentors} />} />
        </Layout>
      </Router>
    )
  }

}

export default App;
