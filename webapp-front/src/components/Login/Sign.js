import React from "react";
import PropTypes from "prop-types";
// import { MdAccountCircle, MdAddCircle } from "react-icons/lib/md";

const Sign = props => {
  let icon = null;

  if (props.type === "signIn") {
    icon = <i className="login icons fas fa-user-circle" />;
  } else {
    icon = <i className="login icons fas fa-user-plus" />;
  }

  return (
    <div onClick={props.onChange} className={props.type === "signIn" ? "signIn" : "signUp"}>
      <div className="login center">
        {icon}
        <p>{props.type === "signIn" ? "INGRESAR" : "REGISTRARSE"}</p>
      </div>
    </div>
  );
};

Sign.propTypes = {
  type: PropTypes.string,
  onChange: PropTypes.func
};

export default Sign;
