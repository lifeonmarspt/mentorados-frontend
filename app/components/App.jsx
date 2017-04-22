import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Home from './Home'
import Mentors from './Mentors'

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/mentors">Mentors</Link></li>
            </ul>
          </nav>
          <Route exact path="/" component={Home}/>
          <Route exact path="/mentors" component={Mentors}/>
        </div>
      </Router>
    )
  }
}

export default App;
