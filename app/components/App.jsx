import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Helmet } from "react-helmet";

import { getCareers } from '../api/mentors'
import Layout from './Layout.jsx'
import Home from './pages/Home'
import Mentors from './pages/Mentors'

class App extends React.Component {

  constructor(...args) {
    super(...args)

    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    getCareers().
      then((response) => this.setState({
        careers: response.data,
        loading: false
      }));
  }

  render() {
    return (
      !this.state.loading && <Router>
        <Layout careers={this.state.careers}>
          <Route exact path="/" component={Home} />
          <Route exact path="/mentors" component={Mentors} />
        </Layout>
      </Router>
    )
  }

}

export default App;
