import JWTdecode from "jwt-decode";

import { setAuthorization } from "../lib/api";

/* `loadSession`, `doLogin` and `doLogout` are expected to have .bind called upon it in the component we want to keep session state in */

export const persistSession = function(session) {
  localStorage.setItem('session', JSON.stringify(session));
}

export const loadSession = function() {
  let storedSession = localStorage.getItem('session');
  storedSession = storedSession == null ? null : JSON.parse(storedSession);

  if (storedSession) {
    doLogin.bind(this)(storedSession);
  }
}

export const doLogin = function(session) {
  session = {
    jwt: session.jwt,
    user: JWTdecode(session.jwt)
  };
  setAuthorization(session.jwt);
  persistSession(session);
  this.setState({ session: session })
}

export const doLogout = function() {
  persistSession(null);
  this.setState({ session: null })
}
