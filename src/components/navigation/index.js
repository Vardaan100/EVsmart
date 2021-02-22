import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Menus from "../Menu";
import "./navigation.css";

class Index extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     isLoggedIn: true,
  //   };
  // }
  logout = () => {
    // this.setState({ isLoggedIn: false });
    let action = {
      type: "login",
      payload: !this.props.islogin,
      // payload: setState,
    };
    this.props.dispatch(action);
  };
  render() {
    return this.props.islogin ? (
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
          {!this.props.islogin ? (
            <li>
              <Link className="list" to="/signup">
                Signup
              </Link>
              <Link className="list" to="/sign-in">
                Login
              </Link>
            </li>
          ) : (
            <Link onClick={this.logout} className="list" to="/sign-in">
              Logout
            </Link>
          )}
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

// export default Index;
function msp(state) {
  // console.log("stateee", state);
  return {
    islogin: state.islogin,
  };
}
function mdp(dispatch) {
  // console.log("dispatch", dispatch);
  return {
    dispatch,
  };
}
export default connect(msp, mdp)(Index);
