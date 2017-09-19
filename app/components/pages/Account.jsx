import React from "react";
import PropTypes from "prop-types";

import { users } from "lib/api";


class SelectionList extends React.Component {
  onChange = (e) => {
    const { onChange, checked } = this.props;
    const toggledId = parseInt(e.target.value, 10);

    if (e.target.checked) {
      onChange(checked.concat([ toggledId ]));
    } else {
      onChange(checked.filter(id => id !== toggledId));
    }
  }

  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.id}>
            <label>
              <input
                type="checkbox"
                checked={this.props.checked.includes(item.id)}
                value={item.id}
                onChange={this.onChange}
              /> {item.description}
            </label>
          </li>
        ))}
      </ul>
    );
  }
}


class Account extends React.Component {
  static contextTypes = {
    session: PropTypes.object,
    meta: PropTypes.object,
  }

  state = {
    errors: {},
    changes: {},
  };

  onInputChange = (e) => {
    this.setState({
      changes: {
        ...this.state.changes,
        [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
      }
    });
  }

  onListChange = (career_ids) => {
    this.setState({
      changes: {
        ...this.state.changes,
        career_ids,
      }
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    users.update(this.context.session.user.id, {
      ...this.context.session.user,
      ...this.state.changes
    }).then(response => this.context.session.refreshUser(response.data));
  }

  formValue(field) {
    return (
      this.state.changes[field] === undefined ? this.context.session.user[field] : this.state.changes[field]
    ) || "";
  }

  render() {
    const isMentor = this.context.session.user.mentor;

    return (
      <div>
        <h1>Detalhes da tua conta</h1>
        <form className="pure-form" onSubmit={this.onSubmit}>
          <fieldset>
            <input type="password" minLength="6" name="password" placeholder="New password" onChange={this.onInputChange} />
          </fieldset>

          { isMentor && <fieldset>
            <input type="email" name="email" required placeholder="Email" value={this.formValue("email")} onChange={this.onInputChange} />
            <input type="text" name="name" required placeholder="Nome" value={this.formValue("name")} onChange={this.onInputChange} />
            <textarea name="bio" required placeholder="Historia da tua vida" value={this.formValue("bio")} onChange={this.onInputChange} />
            <input type="number" required name="year_in" placeholder="Ano de entrada" value={this.formValue("year_in")} onChange={this.onInputChange} />
            <input type="number" name="year_out" placeholder="Ano de conclusão" value={this.formValue("year_out")} onChange={this.onInputChange} />

            <p>
              Nos usamos gravatar, mas bota ai se quiseres. Vamos por a imagem
              no esconderijo, se quiseres anda aqui outra vez.
            </p>
            <input type="url" name="picture_url" value={this.formValue("picture_url")} onChange={this.onInputChange} />
            <img src={this.context.session.user.picture} />

            <p>Links de programacao, um por linha:</p>
            <textarea name="links" value={this.formValue("links")} onChange={this.onInputChange} />

            <input type="text" name="location" placeholder="Localização" value={this.formValue("location")} onChange={this.onInputChange} />

            <SelectionList
              items={this.context.meta.careers}
              checked={this.formValue("career_ids")}
              onChange={this.onListChange}
            />

            <p>Se quiseres sair da programacao:</p>

            <input type="checkbox" name="active" checked={this.formValue("active")} onChange={this.onInputChange} />
          </fieldset>
          }

          <input type="submit" value="Gravar" />
        </form>
      </div>
    );
  }
}

export default Account;
