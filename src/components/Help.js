import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router";

class Help extends Component {
    render() {
        
        if (!this.props.islogin) {
            return <Redirect to={"/sign-in"} />;
          };

        return (
            <div>
                <h1>Help</h1>
            </div>
        )
    }
}

function msp(state) {
    return {
      islogin: state.islogin,
    };
  }
  
  
  export default connect(msp, null)(Help);
