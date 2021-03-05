import React, { Component } from "react";
import { Link } from "react-router-dom";
import Menus from "../Menu";
import "./navigation.css";
import { logout } from "../../utils/index";
import { connect } from "react-redux";

class Index extends Component {
  handleLogout = () => {
    logout();
    let action = {
      type: "menu",
      payload: false,
    };
    this.props.dispatch(action);
  };

  render() {
    return this.props.menu ? (
      <div style={{ background_color: "red" }} className="nav-container">
        <ul className="lists">
          <li>
            <Link to="/">
              <img className="navigation__logo" src="./logo.png" alt="logo" />
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
            <Menus />
          </li>
          <li>
            <Link onClick={this.handleLogout} className="list" to="/sign-in">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    ) : (
      <nav className="">
        <div>
          <div style={{ background_color: "blue" }}>
            <div style={{ background_color: "red" }} className="nav-container ">
              <ul className="lists ">
                <li>
                  <Link className="navbar-brand" to="/">
                    <img
                      className="navigation__logo"
                      src="./logo.png"
                      alt="logo"
                    />
                  </Link>
                </li>
                <li>
                  <Link className="list" to="/home">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="list nav-link" to="/about">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="list nav-link" to="/contact">
                    Contact Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-in"}>
                    Sign In
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
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
