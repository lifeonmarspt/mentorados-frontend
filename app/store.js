import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import persistState from "redux-localstorage";

import reducer from "./reducers";

export default createStore(
  reducer,
  compose(
    persistState("jwt"),
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  ),
);
