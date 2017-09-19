import "./styles.scss";

import React from "react";
import { connect } from "react-redux";

export const Toaster = ({ toasts }) => (
  <ul className="Toaster">
    {toasts.map(toast => (
      <li className={`Toast Toast--${toast.level}`} key={toast.id}>{toast.content}</li>
    ))}
  </ul>
);

export default connect(
  ({ toasts }) => ({ toasts }),
)(Toaster);
