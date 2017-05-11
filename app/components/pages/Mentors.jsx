import React from 'react'
import Mentor from '../elements/Mentor'

class Mentors extends React.Component {

  constructor(...args) {
    super(...args);
  }

  render() {
    return (
      <div className="posts">
        <h1 className="content-subhead">Mentores</h1>
        {this.props.mentors.map((mentor, n) =>
          <Mentor key={n} mentor={mentor} />
        )}
      </div>
    )
  }

}

export default Mentors;
