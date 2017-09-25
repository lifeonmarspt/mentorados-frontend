import "purecss/build/pure.css";
import "purecss/build/grids-responsive.css";

import "stylesheets/layout";
import "stylesheets/buttons";

import React from "react";
import ReactDOM from "react-dom";
import { I18nextProvider } from "react-i18next";
import { Provider as ReduxProvider } from "react-redux";

import App from "components/App.jsx";

import i18n from "./i18n";
import store from "./store";

ReactDOM.render((
  <ReduxProvider store={store}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </ReduxProvider>
), document.getElementById("root"));
