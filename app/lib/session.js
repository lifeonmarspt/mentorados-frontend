import JWTdecode from "jwt-decode";


export const save = function(session) {
  if (session.jwt) {
    window.localStorage.setItem('session', session.jwt);
  } else {
    window.localStorage.removeItem('session');
  }
}

export const load = function() {
  let jwt = window.localStorage.getItem('session');


  if (!jwt) {
    return {};
  }

  return unpack(jwt);
}

export const unpack = function(jwt) {
  return {
    jwt: jwt,
    user: JWTdecode(jwt),
  }
}

export default { save, load, unpack };
