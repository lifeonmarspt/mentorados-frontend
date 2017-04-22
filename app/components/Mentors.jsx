import React from 'react'

import { list as listMentors } from '../api/mentors'

class Mentors extends React.Component {
  constructor(...args) {
    super(...args)

    this.state = {
      loading: true
    };
  }
  componentDidMount() {
    listMentors().
      then((response) => this.setState({
        mentors: response.data,
        loading: false,
      }));
  }

  render() {
    return (
      !this.state.loading &&
      <div>
        <h1>Mentors</h1>
        <ul>
          {this.state.mentors.map((mentor) =>
            <li>{mentor.name}</li>
          )}
        </ul>
      </div>
    )
  }
}

export default Mentors;
