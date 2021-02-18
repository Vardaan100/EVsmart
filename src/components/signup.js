import React, { Component } from "react";
import UserSignup from "./UserSignup";
import ProviderSignup from "./ProviderSignup";

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: true,
    };
  }

  clickHandler = (e) => {
    this.setState({
      user: !this.state.user,
    });
  };

  render() {
    const buttonText = this.state.user ? "Provider" : "User";
    return (
      <div>
        <button
          className="btn btn-primary btn-block"
          onClick={this.clickHandler}
        >
          {buttonText}
        </button>
        {this.state.user ? <UserSignup /> : <ProviderSignup />}
      </div>
    );
  }
}
