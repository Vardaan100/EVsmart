import React, { Component,Fragment } from "react";
import { Link } from "react-router-dom";
import CustomizedMenus from "../Menu";
import "./navigation.css";
import { isAuthenticated, logout } from "../../utils/index";


class Index extends Component {
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
  };

  render() {
    return (
      <nav className="">
        <div>
          <div style={{ background_color: "blue" }}>
            <div style={{ background_color: "red" }} className="nav-container ">
              <ul className="lists ">
                <li className="nav-item">
                  <Link className="navbar-brand" to="/dashboard">
                    <img
                      className="navigation__logo"
                      src="./logo.png"
                      alt="logo"
                    />
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="list" to="/home" >
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

                {!isAuthenticated() && (
                  <Fragment>
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
                  </Fragment>
                )}
                {isAuthenticated() && (
                  <Fragment>
                    <li className="menu">
                      <CustomizedMenus />
                    </li>

                    <li>
                      <Link
                        onClick={this.handleLogout}
                        className="list"
                        to="/sign-in"
                      >
                        Logout
                      </Link>
                    </li>
                  </Fragment>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Index;
