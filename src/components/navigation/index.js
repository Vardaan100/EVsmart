import React, { Component } from "react";
import { Link } from "react-router-dom";
import CustomizedMenus from "../Menu";
import "./navigation.css";
import { logout } from "../../utils/index";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { IconButton } from "@material-ui/core";
import AccountIcon from "@material-ui/icons/SupervisorAccount";
import EjectIcon from "@material-ui/icons/Eject";

import {
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem,
  Jumbotron,
} from "reactstrap";
import { NavLink } from "react-router-dom";

class Index extends Component {
  constructor(props) {
    super(props);

    this.toggleNav = this.toggleNav.bind(this);
    this.state = {
      isNavOpen: false,
    };
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  }
  //   constructor(props) {
  //     super(props);

  //     this.state = {
  //         token: isLoggedin()
  //     }
  // };

  // componentDidUpdate(prevState, prevProps) {
  //   if(!this.state.token){
  //     this.setState({
  //       token : !isLoggedin()
  //     })
  //   }
  // }

  handleLogout = () => {
    logout();
    let action = {
      type: "menu",
      payload: false,
    };
    this.props.dispatch(action);
  };

  render() {
    return !localStorage.getItem("jwt") ? (
      <div>
        {/* <Navbar light expand="md" className="">
          <div className="container">
            <NavbarToggler onClick={this.toggleNav} />
            <NavbarBrand className="mr-auto" href="/dashboard">
              <img className="navigation__logo" src="./logo.png" alt="logo" />
            </NavbarBrand>
            <Collapse isOpen={this.state.isNavOpen} navbar>
              {/* <Nav navbar> */}
        {/* <Nav navbar style={{ background_color: "blue" }}>
                <NavItem>
                  <NavLink className="nav-link white" to="/home">
                    <span className="fa fa-home fa-lg"></span> Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link white" to="/about">
                    <span className="fa fa-info fa-lg"></span> About
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link white" to="/contact">
                    <span className="fa fa-address-card fa-lg"></span> Contact Us
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link white" to="/sign-in">
                    <Button variant="contained" color="primary">
                          Sign In
                        </Button>
                  </NavLink>
                  <NavItem>
                  <NavLink className="nav-link white" to="/sign-up">
                    <Button variant="contained" color="primary">
                    Sign up
                        </Button>
                  </NavLink>
                </NavItem> */}
        {/* <div
                  style={{ background_color: "red" }}
                  className="nav-container "
                > */}
        {/* <ul className="lists "> */}
        {/* <li>
                  <Link className="navbar-brand" to="/dashboard">
                    <img
                      className="navigation__logo"
                      src="./logo.png"
                      alt="logo"
                    />
                  </Link>
                </li> */}

        {/* <li>
                  <Link className="list" to="/home">
                    Home
                  </Link>
                </li> */}

        {/* <li className="nav-item">
                  <Link className="list nav-link white" to="/about">
                    About
                  </Link>
                </li> */}

        {/* <li className="nav-item">
                      <Link className="list nav-link white" to="/contact">
                        Contact Us
                      </Link>
                    </li> */}

        {/* <li className="nav-item">
                      <Link className="nav-link white" to={"/sign-in"}>
                        <Button variant="contained" color="primary">
                          Sign In
                        </Button>
                      </Link>
                    </li> */}

        {/* <li className="nav-item">
                      <Link className="nav-link white" to={"/sign-up"}>
                        <Button variant="contained" color="primary">
                          Sign up
                        </Button>
                      </Link>
                    </li> */}
        {/* </ul> */}
        {/* </div> */}
        {/* </Nav>
            </Collapse>
          </div>
        </Navbar>
      </div> */}

        <Navbar light expand="md" className="ml-auto nav-container">
          <div className="container">
            <NavbarToggler onClick={this.toggleNav} />

            <NavbarBrand className="me-auto" to="/">
              <img className="navigation__logo" src="./logo.png" alt="logo" />
            </NavbarBrand>

            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav navbar className="ml-auto me-auto">
                <NavItem>
                  <NavLink className="nav-link white" to="/home">
                    <span className="fa fa-home fa-lg"></span> Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link white white" to="/about">
                    <span className="fa fa-info fa-lg"></span> About
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link white" to="/contact">
                    <span className="fa fa-address-card fa-lg"></span> Contact
                    Us
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link white" to="/sign-in">
                    <Button variant="contained" color="primary">
                      <AccountIcon />
                      Sign In
                    </Button>
                    {/* <IconButton aria-label="delete"> */}
                    {/* </IconButton> */}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link white " to="/sign-up">
                    <Button variant="contained" color="primary">
                      <AccountIcon />
                      Sign up
                    </Button>
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
      </div>
    ) : (
      <div style={{ background_color: "red" }} className="nav-container">
        <Navbar light expand="md" className="ml-auto">
          <div className="container">
            <NavbarToggler onClick={this.toggleNav} />

            <NavbarBrand className="me-auto" to="/dashboard">
              <img className="navigation__logo" src="./logo.png" alt="logo" />
            </NavbarBrand>

            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav navbar className="ml-auto me-auto">
                <NavItem>
                  <NavLink className="nav-link white" to="/home">
                    <span className="fa fa-home fa-lg"></span> Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link white" to="/about">
                    <span className="fa fa-info fa-lg"></span> About
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link white" to="/contact">
                    <span className="fa fa-address-card fa-lg"></span> Contact
                    Us
                  </NavLink>
                </NavItem>
                <NavItem className="nav-link white">
                  <CustomizedMenus />
                </NavItem>
                <NavbarBrand href="/sign-in">
                  {/* <NavLink className="nav-link white " to="/sign-in"> */}
                  <Button
                    onClick={this.handleLogout}
                    variant="contained"
                    color="primary"
                  >
                    <EjectIcon />
                    Log Out
                  </Button>
                  {/* </NavLink> */}
                </NavbarBrand>
              </Nav>
            </Collapse>
          </div>
        </Navbar>

        {/* <ul className="lists">
          <li>
            <Link to="/dashboard">
              <img className="navigation__logo" src="./logo.png" alt="logo" />
            </Link>
          </li>

          <li>
            <Link className="list" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="list" to="/about">
              About
            </Link>
          </li>

          <li>
            <Link className="list" to="/contact">
              Contact us
            </Link>
          </li>

          <li className="menu">
            <CustomizedMenus />
          </li>

          <li>
            <Link onClick={this.handleLogout} className="list" to="/sign-in">
              <Button variant="contained" color="primary">
                Logout
              </Button>
            </Link>
          </li>
        </ul>
      </div> */}
      </div>
    );
  }
}

function msp(state) {
  return {
    menu: state.menu,
  };
}
function mdp(dispatch) {
  return {
    dispatch,
  };
}

export default connect(msp, mdp)(Index);
