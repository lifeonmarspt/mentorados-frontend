import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Mentor from '../elements/Mentor'

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
    console.log(this.context.router);
    if (!this.context.session) {
      this.context.router.history.replace('/');
    }
  }

  componentDidMount() {
    getMentors(this.props.filters).then((response) => this.setState({
      mentors: response.data,
      loading: false,
    }));
  }

  render() {
    return !this.state.loading && (
      <div className="posts">
        <h1 className="content-subhead">Mentores</h1>
        {this.state.mentors.map((mentor, n) => <Mentor key={n} mentor={mentor} />)}
      </div>
    )
  }

}

export default Mentors;
