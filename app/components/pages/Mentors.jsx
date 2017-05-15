import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Mentor from '../elements/Mentor'
import PageMessage from '../elements/PageMessage'

import { getMentors } from '../../api/mentors'

class Mentors extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object,
    session: React.PropTypes.object
  }

  constructor(...args) {
    super(...args);

    this.state = {
      loading: true,
      mentors: []
    }
  }

  componentWillMount() {

  }

  componentDidMount() {

    if (!this.context.session) {
      this.context.router.history.replace('/');
      return;
    }

    getMentors(this.props.filters).then((response) => this.setState({
      mentors: response.data,
      loading: false,
    }));

  }

  render() {

    let content = this.state.mentors.length > 0 ?
      this.state.mentors.map((mentor, n) => <Mentor key={n} mentor={mentor} />) :
      <PageMessage title="Oops...">
        <p>No mentors found for the specified criteria</p>
      </PageMessage>;


    return !this.state.loading && (
      <div className="posts">
        <h1 className="content-subhead">Mentores</h1>
        {content}
      </div>
    )
  }

}

export default Mentors;
