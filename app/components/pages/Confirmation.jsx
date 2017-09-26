import React from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { translate } from "react-i18next";
import { connect } from "react-redux";

import { errorTransform }  from "lib/errorTransform";
import FormError from "components/elements/FormError";

import { confirmAccount } from "actions/users";

class Confirmation extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  state = {
    confirmed: false,
    errors: {},
  }

  confirm = () => {
    const { confirmAccount, match: { params } } = this.props;

    confirmAccount(params.id, params.token)
    .then(() => this.setState({ confirmed: true }))
    .catch(error => {
      this.setState({ errors: errorTransform(error, { 404: "confirmation token not found" }) });
    });
  }

  render() {
    const { t } = this.props;
    const { confirmed, errors } = this.state;

    return (
      <div>
        <div className="posts">
          <section className="post">
            <header className="post-header">
              <h2 className="post-title">{t("title")}</h2>
            </header>
            <div className="post-description">
              <div className="pure-g">
                <div className="pure-u-1-3">
                  <p>{t("cta")}</p>
                </div>
                <div className="pure-u-2-3" />
              </div>
              <div className="pure-g">
                <div className="pure-u-1-3">
                  {!errors.serverError && !confirmed && <button className="pure-button" onClick={this.confirm}>{t("button")}</button>}
                  {!errors.serverError && confirmed && <p>{t("success")}</p>}
                  {errors.serverError && <FormError error={errors.serverError} />}
                </div>
                <div className="pure-u-2-3" />
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

}

export default compose(
  translate([ "confirmation" ]),

  connect(
    () => ({}),
    {
      confirmAccount,
    }
  )
)(Confirmation);
