import React from 'react'
import Mentor from '../elements/Mentor'

import { getMentors } from '../../api/mentors'

class Mentors extends React.Component {

  constructor(...args) {
    super(...args)

    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    getMentors().
      then((response) => this.setState({
        mentors: response.data,
        loading: false,
      }));
  }

  render() {
    return (
      !this.state.loading &&
      <div className="posts">
        <h1 className="content-subhead">Mentores</h1>
        {this.state.mentors.map((mentor, n) =>
          <Mentor key={n} mentor={mentor} />
        )}
      </div>
    )
  }

}

export default Mentors;
