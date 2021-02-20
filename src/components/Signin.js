import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Signin extends Component {
  user = (props) => {
    let username = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    if (username && password) {
      let actions = {
        type: "login",
        payload: !this.props.islogin,
      };
      this.props.dispatch(actions);
      //   console.log("success");
    } else {
      //   console.log("fail");
    }
  };

  render() {
    return (
      <form>
        <h3>Sign In</h3>

        <div className="form-group">
          <label>Email address</label>
          <input
            id="email"
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            id="password"
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>

        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        <Link to={"./Dashboard"}>
          <button
            onClick={this.user}
            type="submit"
            // onSubmit={this.submitHandler}
            className="btn btn-primary btn-block"
          >
            Submit
          </button>
        </Link>
      </form>
    );
  }
}
function msp(state) {
  console.log("propss", state);
  return {
    islogin: state.islogin,
  };
}
function mdp(dispatch) {
  //   console.log("dispatch", dispatch);
  return {
    dispatch,
  };
}

export default connect(null, mdp)(Signin);
