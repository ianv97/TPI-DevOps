import React, { Component } from "react";
import PropTypes from "prop-types";
import { Motion, spring } from "react-motion";
import Input from "./Input";
import SubmitButton from "./SubmitButton";
import { withRouter } from "react-router-dom";
import login from "../../functions/login";
import signUp from "../../functions/signUp";
import handleChange from "../../functions/handleChange";

class SignExpanded extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flexState: false,
      animIsFinished: false,
      warning: "",
      loading: false,
      sessionRecord: false,
      form: {
        username: "",
        password: "",
        passwordV: "",
        name: ""
      }
    };
  }
  login = login.bind(this);
  signUp = signUp.bind(this);
  handleChange = handleChange.bind(this);

  handleCheckboxChange = e => {
    this.setState({
      [e.target.name]: e.target.checked
    });
  };

  componentDidMount() {
    this.setState({ flexState: !this.state.flexState });
  }

  isFinished = () => {
    this.setState({ animIsFinished: true });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ loading: true });
    if (this.props.type === "signIn") {
      this.login(this.state.sessionRecord);
    } else {
      if (this.state.form.password === this.state.form.passwordV) {
        this.setState({ warning: "" });
        this.signUp();
      } else {
        this.setState({ warning: "Las contraseñas no coinciden" });
        this.setState({ loading: false });
      }
    }
  };

  render() {
    return (
      <Motion
        style={{
          flexVal: spring(this.state.flexState ? 8 : 1)
        }}
        onRest={this.isFinished}
      >
        {({ flexVal }) => (
          <div
            className={this.props.type === "signIn" ? "signInExpanded" : "signUpExpanded"}
            style={{
              flexGrow: `${flexVal}`
            }}
          >
            <Motion
              style={{
                opacity: spring(this.state.flexState ? 1 : 0, { stiffness: 300, damping: 17 }),
                y: spring(this.state.flexState ? 0 : 50, { stiffness: 100, damping: 17 })
              }}
            >
              {({ opacity, y }) => (
                <form
                  onSubmit={this.handleSubmit}
                  className="login logForm"
                  style={{
                    WebkitTransform: `translate3d(0, ${y}px, 0)`,
                    transform: `translate3d(0, ${y}px, 0)`,
                    opacity: `${opacity}`
                  }}
                >
                  <h2>{this.props.type === "signIn" ? "INGRESAR" : "REGISTRARSE"}</h2>
                  <Input
                    type="text"
                    placeholder="Usuario"
                    name="username"
                    value={this.state.form.username}
                    onChange={this.handleChange}
                  />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Contraseña"
                    name="password"
                    value={this.state.form.password}
                    onChange={this.handleChange}
                  />
                  {this.props.type !== "signIn" && (
                    <Input
                      type="password"
                      placeholder="Repetir contraseña"
                      name="passwordV"
                      value={this.state.form.passwordV}
                      onChange={this.handleChange}
                    />
                  )}
                  {this.props.type === "signIn" && (
                    <a href="url" className="login forgotPass">
                      ¿Olvidó su contraseña?
                    </a>
                  )}
                  {this.props.type !== "signIn" && (
                    <div>
                      <Input
                        type="text"
                        placeholder="Nombre"
                        name="name"
                        value={this.state.form.name}
                        onChange={this.handleChange}
                      />
                      <label style={{ fontSize: "15px", color: "red", margin: "0px" }}>
                        {this.state.warning}
                      </label>
                    </div>
                  )}
                  <SubmitButton
                    type={this.props.type}
                    loading={this.state.loading}
                    sessionRecord={this.state.sessionRecord}
                    handleChange={this.handleCheckboxChange}
                  />
                </form>
              )}
            </Motion>
          </div>
        )}
      </Motion>
    );
  }
}

SignExpanded.propTypes = {
  type: PropTypes.string
};

export default withRouter(SignExpanded);
