import React from "react";
import PropTypes from "prop-types";

import { getMeta } from "lib/api";


class MetaProvider extends React.Component {
  static childContextTypes = {
    meta: PropTypes.object,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  state = {
    loading: true,
    careers: [],
    error: null,
  }

  componentWillMount() {
    getMeta().then(
      (response) => this.setState({
        loading: false,
        careers: response.data.careers,
        genders: response.data.genders,
      }),
    ).catch(error => {
      this.setState({
        error: error.response.status,
        loading: false,
      });
    });
  }

  getChildContext() {
    return {
      meta: {
        careers: this.state.careers,
      },
    };
  }

  render() {
    if (this.state.loading) {
      return null;
    }

    return React.Children.only(this.props.children);
  }
}

export default MetaProvider;
