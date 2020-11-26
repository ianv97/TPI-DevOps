import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// import { Link, NavLink } from "react-router-dom";
import {
  // Badge,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav
  // NavItem
} from "reactstrap";
import PropTypes from "prop-types";

// import { AppAsideToggler } from "@coreui/react";
import { AppNavbarBrand, AppSidebarToggler } from "@coreui/react";
import logoh from "../img/logoh.png";
import logo from "../img/logo.png";
import getCookie from "../../functions/getCookie";
import Context from "../../Context";

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class DefaultHeader extends Component {
  componentDidMount() {
    this.getData();
  }

  async getData() {
    try {
      if (!this.context.img) {
        const response = await fetch(window.ApiUrl + "UserImage/" + getCookie("id"), {
          headers: {
            Authorization: "BEARER " + getCookie("token")
          }
        });
        if (response.ok) {
          const data = await response.json();
          this.context.setImg("data:image/jpeg;base64," + data.img);
        }
      }
    } catch (error) {}
  }

  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logoh, width: 89, height: 25, alt: "CoreUI logoh" }}
          minimized={{ src: logo, width: 30, height: 30, alt: "CoreUI logoh" }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        {/* <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link">
              Dashboard
            </NavLink>
          </NavItem>
          <NavItem className="px-3">
            <Link to="/users" className="nav-link">
              Users
            </Link>
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="#" className="nav-link">
              Settings
            </NavLink>
          </NavItem>
        </Nav> */}
        <Nav className="ml-auto" navbar>
          {/* <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link">
              <i className="icon-bell" />
              <Badge pill color="danger">
                5
              </Badge>
            </NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link">
              <i className="icon-list" />
            </NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link">
              <i className="icon-location-pin" />
            </NavLink>
          </NavItem> */}
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <Context.Consumer>
                {({ img }) =>
                  img ? (
                    <img src={img} className="img-avatar mb-2" alt="user-img" />
                  ) : (
                    <img src={"/img/user.png"} className="img-avatar mb-2" alt="user-img" />
                  )
                }
              </Context.Consumer>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center">
                <strong>Cuenta</strong>
              </DropdownItem>
              {/* <DropdownItem>
                <i className="fa fa-bell-o" /> Updates<Badge color="info">42</Badge>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-envelope-o" /> Messages<Badge color="success">42</Badge>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-tasks" /> Tasks<Badge color="danger">42</Badge>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-comments" /> Comments<Badge color="warning">42</Badge>
              </DropdownItem>
              <DropdownItem header tag="div" className="text-center">
                <strong>Settings</strong>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-user" /> Profile
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-wrench" /> Settings
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-usd" /> Payments<Badge color="secondary">42</Badge>
              </DropdownItem>
              <DropdownItem>
                <i className="fa fa-file" /> Projects<Badge color="primary">42</Badge>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                <i className="fa fa-shield" /> Lock Account
              </DropdownItem> */}
              <DropdownItem onClick={() => this.props.history.push("/user/" + getCookie("id"))}>
                <i className="fa fa-id-card" /> Perfil
              </DropdownItem>
              <DropdownItem onClick={() => this.props.history.push("/change-password/" + getCookie("id"))}>
                <i className="fa fa-lock" /> Cambiar contraseña
              </DropdownItem>
              <DropdownItem onClick={e => this.props.signOut(e)}>
                <i className="fas fa-sign-out-alt" /> Cerrar sesión
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        {/* <AppAsideToggler className="d-md-down-none" /> */}
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}
DefaultHeader.contextType = Context.Context;

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default withRouter(DefaultHeader);
