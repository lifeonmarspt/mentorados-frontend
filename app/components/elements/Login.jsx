import React from 'react'

class Login extends React.Component {
  render() {
    return (
      <div>
        <h2>Login</h2>
        <form>
          <label>Email</label>
          <input type="email" />
          <label>Password</label>
          <input type="password" />
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }
}

export default Login;