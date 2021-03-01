import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { userData } from "../fetchingData/api_calls";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname:"",
      phone: "",
      email: "",
      password: "",
      error: false,
    };
  }

  async componentDidMount() {
    const token = localStorage
      .getItem("jwt", JSON.stringify())
      .replaceAll('"', "");
    userData(token).then((data) => {
      console.log(data);
      try {
      } catch {}
    });
  }

  render() {
    // if (!this.props.islogin) {
    //   return <Redirect to={"/sign-in"} />;
    // }

    return (
      <div>
        <form>
          <div className="form-group">
            <label className="text-muted">First name</label>
            <input type="name" className="form-control" value="Vardaan" />
          </div>
          <div className="form-group">
            <label className="text-muted">Last Name</label>
            <input type="name" className="form-control" value="Magon" />
          </div>
          <div className="form-group">
            <label className="text-muted">Email</label>
            <input
              type="email"
              className="form-control"
              value="vardaanmagon@yahoo.com"
            />
          </div>
          <div className="form-group">
            <label className="text-muted">Phone Number</label>
            <input type="number" className="form-control" value="9999640326" />
          </div>
          <div className="form-group">
            <label className="text-muted">Password</label>
            <input
              type="password"
              className="form-control"
              value="hellohello"
            />
          </div>
          <button className="btn btn-primary">Update</button>
        </form>
      </div>
    );
  }
}

function msp(state) {
  return {
    islogin: state.islogin,
  };
}

export default connect(msp, null)(Profile);
