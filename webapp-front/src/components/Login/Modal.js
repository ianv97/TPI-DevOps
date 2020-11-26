import React, { Component } from "react";
import PropTypes from "prop-types";
import Sign from "./Sign";
import SignExpanded from "./SignExpanded";
import SignCollapsed from "./SignCollapsed";
import { withRouter } from "react-router-dom";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wasClickedLeft: false,
      wasClickedRight: false
    };
  }

  onReset = () => {
    this.setState({
      wasClickedLeft: false,
      wasClickedRight: false
    });
  };

  onClickLeft = () => {
    this.setState({ wasClickedLeft: !this.state.wasClickedLeft }, function() {
      if (this.state.wasClickedRight === true && this.state.wasClickedLeft === true) {
        this.setState({ wasClickedRight: false });
      }
    });
  };

  onClickRight = () => {
    this.setState({ wasClickedRight: !this.state.wasClickedRight }, function() {
      if (this.state.wasClickedRight === true && this.state.wasClickedLeft === true) {
        this.setState({ wasClickedLeft: false });
      }
    });
  };

  render() {
    let modalContent = null;

    if (this.state.wasClickedLeft === false && this.state.wasClickedRight === false) {
      modalContent = (
        <div className="login Modal">
          <Sign type="signIn" onChange={this.onClickLeft} />
          <Sign type="signUp" onChange={this.onClickRight} />
        </div>
      );
    } else if (this.state.wasClickedLeft === false && this.state.wasClickedRight === true) {
      modalContent = (
        <div className="login Modal">
          <SignCollapsed type="signIn" onChange={this.onClickLeft} />
          <SignExpanded type="signUp" />
        </div>
      );
    } else if (this.state.wasClickedLeft === true && this.state.wasClickedRight === false) {
      modalContent = (
        <div className="login Modal">
          <SignExpanded type="signIn" />
          <SignCollapsed type="signUp" onChange={this.onClickRight} />
        </div>
      );
    }

    return <div className="login Modal">{modalContent}</div>;
  }
}

Modal.propTypes = {
  onSubmit: PropTypes.func
};

export default withRouter(Modal);
