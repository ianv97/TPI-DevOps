import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import { FaGooglePlus, FaTwitter, FaFacebook } from "react-icons/lib/fa";

const SubmitButton = props => {
  let socialNets;

  if (props.type === "signIn") {
    socialNets = (
      <div className="login socialNets">
        <FormControlLabel
          control={
            <Checkbox
              checked={props.sessionRecord}
              onChange={props.handleChange}
              name="sessionRecord"
              value="sessionRecord"
              color="primary"
            />
          }
          label="Mantener iniciada la sesión"
        />
        {/* <FaGooglePlus className="login socialNetsIcon" />
        <FaTwitter className="login socialNetsIcon" />
        <FaFacebook className="login socialNetsIcon" /> */}
      </div>
    );
  }
  return (
    <div className={props.type === "signIn" ? "submitButton" : "signUpSubmitButton"}>
      {socialNets}
      <button className={props.type === "signIn" ? "submitSignIn" : "submitSignUp"}>
        {props.loading ? (
          <CircularProgress color="secondary" />
        ) : (
          <div>
            <i className="login fas fa-arrow-right" />
          </div>
        )}
      </button>
    </div>
  );
};

SubmitButton.propTypes = {
  type: PropTypes.string
};

export default SubmitButton;
