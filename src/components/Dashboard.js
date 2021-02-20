import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

class Dashboard extends Component {
  render() {
    if (!this.props.islogin) {
      return <Redirect to={"/sign-in"} />;
    }
    return (
      <div>
        <h2>DashBoard</h2>
      </div>
    );
  }
}

function msp(state) {
  return {
    islogin: state.islogin,
  };
}

export default connect(msp, null)(Dashboard);
