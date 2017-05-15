import React from "react"
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import { postRegistration } from "../../api/mentors";

import FormErrors from "../elements/FormErrors"

class Home extends React.Component {

  static contextTypes = {
    router: PropTypes.object,
    session: PropTypes.object
  }

  constructor(...args) {
    super(...args);

    this.state = {
      fields: {
        email: "",
        password: "",
        password_confirmation: ""
      },
      errors: {},
    };
  }

  componentDidMount() {
    if (this.context.session) {
      this.context.router.history.replace('/mentors');
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextContext.session) {
      this.context.router.history.replace('/mentors');
    }
  }

  onChange(field, event) {
      this.state.fields[field] = event.target.value;
      this.setState(this.state);
  }

  onSubmit(event) {
      event.preventDefault();
      this.setState({ errors: {} })

      postRegistration(this.state.fields)
        .then((result) => {
          this.props.doLogin(result.data);
        })
        .catch((error) => {
          if (error.response && error.response.status == 400) {
            console.log(error.response);
            this.setState({ errors: error.response.data })
          } else if (error.response) {
            this.setState({ errors: { "": error.response.statusText } })
          } else {
            this.setState({ errors: { "": error } })
          }
        });
  }

  render() {
    return (
      <div className="page-registration">
        <div className="posts">

          <section className="post">
            <header className="post-header">
              <h2 className="post-title">Programa de Mentorados de Engenharia Informática - FEUP</h2>
            </header>
            <div className="post-description">
              <p>O registo é obrigatório e requer um endereço de email <code>fe.up.pt</code>. Coisas.</p>
            </div>
          </section>
        </div>

        <div className="posts">
          <div className="post-description">
            <div className="pure-g">
              <div className="pure-u-1-5">
                <form className="pure-form" onSubmit={this.onSubmit.bind(this)}>
                  <h1 className="content-subhead">Registration</h1>
                  <FormErrors errors={this.state.errors} />
                  <fieldset>
                    <input onChange={this.onChange.bind(this, "email")} type="email" placeholder="Email" />
                  </fieldset>
                  <fieldset>
                    <input onChange={this.onChange.bind(this, "password")} type="password" placeholder="Password" />
                  </fieldset>
                  <fieldset>
                    <input onChange={this.onChange.bind(this, "password_confirmation")} type="password" placeholder="Confirm Password" />
                  </fieldset>
                  <fieldset>
                    <button type="submit" className="pure-button pure-button-primary">Sign Up</button>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }

}

export default Home;
