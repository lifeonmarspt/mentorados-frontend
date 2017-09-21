import "./styles";

import React from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { translate } from "react-i18next";

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
      <ul className="SelectionList">
        {this.props.items.map(item => (
          <li key={item.id}>
            <label>
              <input
                type="checkbox"
                checked={this.props.checked.includes(item.id)}
                value={item.id}
                onChange={this.onChange}
              />
              {item.description}
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
    let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    if (e.target.name === "traits_list") value = value.split(",");

    this.setState({
      changes: {
        ...this.state.changes,
        [e.target.name]: value,
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
    const { t } = this.props;
    const isMentor = this.context.session.user.mentor;

    return (
      <div className="Account pure-g">
        <div className="pure-u-1-1">
        <h1>{t("title")}</h1>
        <form className="pure-form pure-form-aligned" onSubmit={this.onSubmit}>
          <fieldset>
            <div className="pure-control-group">
              <label htmlFor="password">{t("form.password.label")}</label>
              <input type="password" minLength="6" name="password" placeholder={t("form.password.placeholder")} onChange={this.onInputChange} />
            </div>
          </fieldset>

          {isMentor &&
            <div>
              <fieldset>
                <div className="pure-control-group">
                  <label htmlFor="email">{t("form.email.label")}</label>
                  <input type="email" id="email" name="email" required placeholder={t("form.email.placeholder")} value={this.formValue("email")} onChange={this.onInputChange} />
                </div>

                <div className="pure-control-group">
                  <label htmlFor="email">{t("form.name.label")}</label>
                  <input type="text" id="name" name="name" required placeholder={t("form.name.placeholder")} value={this.formValue("name")} onChange={this.onInputChange} />
                </div>

                <div className="pure-control-group">
                  <label htmlFor="bio">{t("form.bio.label")}</label>
                  <textarea name="bio" id="bio" required placeholder={t("form.bio.placeholder")} value={this.formValue("bio")} onChange={this.onInputChange} />
                </div>

                <div className="pure-control-group">
                  <label htmlFor="year_in">{t("form.year_in.label")}</label>
                  <input type="number" id="year_in" name="year_in" required placeholder={t("form.year_in.placeholder")} value={this.formValue("year_in")} onChange={this.onInputChange} />
                </div>

                <div className="pure-control-group">
                  <label htmlFor="year_out">{t("form.year_out.label")}</label>
                  <input type="number" id="year_out" name="year_out" placeholder={t("form.year_out.placeholder")} value={this.formValue("year_out")} onChange={this.onInputChange} />
                </div>

                <div className="pure-control-group">
                  <label htmlFor="picture_url">{t("form.picture_url.label")}</label>
                  <input type="url" id="picture_url" name="picture_url" placeholder={t("form.picture_url.placeholder")} value={this.formValue("picture_url")} onChange={this.onInputChange} />
                  <div>
                    <label />
                    <span className="pure-form-message-inline">{t("form.picture_url.notice")}</span>
                  </div>
                  <div>
                    <label />
                    <img src={this.context.session.user.picture} />
                  </div>
                </div>

                <div className="pure-control-group">
                  <label htmlFor="links">{t("form.links.label")}</label>
                  <textarea id="links" name="links" placeholder={t("form.links.placeholder")} value={this.formValue("links")} onChange={this.onInputChange} />
                </div>

                <div className="pure-control-group">
                  <label htmlFor="location">{t("form.location.label")}</label>
                  <input type="text" name="location" placeholder={t("form.location.placeholder")} value={this.formValue("location")} onChange={this.onInputChange} />
                </div>
              </fieldset>

              <fieldset>
                <div className="pure-control-group selection-list">
                  <label>{t("form.career_ids.label")}</label>
                  <SelectionList
                    items={this.context.meta.careers}
                    checked={this.formValue("career_ids")}
                    onChange={this.onListChange}
                  />
                </div>

                <div className="pure-control-group">
                  <label html="traits_list">{t("form.traits_list.label")}</label>
                  <input type="text" name="traits_list" placeholder={t("form.traits_list.placeholder")} value={this.formValue("traits_list").join(",")} onChange={this.onInputChange} />
                </div>

              </fieldset>

              <fieldset>
                <div className="pure-control-group">
                  <label htmlFor="active">{t("form.active.label")}</label>
                  <input type="checkbox" id="active" name="active" checked={this.formValue("active")} onChange={this.onInputChange} />
                  <span className="pure-form-message-inline">{t("form.active.notice")}</span>
                </div>
              </fieldset>
            </div>
          }

          <div className="pure-controls">
            <input type="submit" value={t("form.submit")} className="pure-button pure-button-primary" />
          </div>
        </form>
        </div>
      </div>
    );
  }
}

export default compose(
  translate([ "account" ]),
)(Account);
