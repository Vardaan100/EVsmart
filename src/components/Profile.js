import React, { Component } from "react";
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
      edit: true
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

  clickHandler = (e) => {
    this.setState({
        edit: !this.state.edit
    })
}

  render() {
    // if (!this.props.islogin) {
    //   return <Redirect to={"/sign-in"} />;
    // }
    const buttonText = this.state.edit ? "Edit your profile" : "Back to profile"
    return (
      <div>

      <button onClick={this.clickHandler}>{buttonText}</button>
        
      {this.state.edit ? (

        <form>

          <div className="form-group">
            <label className="text-muted">First name</label>
            <input type="name" className="form-control" disabled="true" />
          </div>

          <div className="form-group">
            <label className="text-muted">Last Name</label>
            <input type="name" className="form-control" disabled="true" />
          </div>

          <div className="form-group">
            <label className="text-muted">Email</label>
            <input
              type="email"
              className="form-control"
              disabled="true"
            />
          </div>

          <div className="form-group">
            <label className="text-muted">Phone Number</label>
            <input type="number" className="form-control" disabled="true" />
          </div>

        </form>
    ) : (
      <form>

      <div className="form-group">
        <label className="text-muted">First name</label>
        <input type="name" className="form-control"  />
      </div>

      <div className="form-group">
        <label className="text-muted">Last Name</label>
        <input type="name" className="form-control"  />
      </div>

      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          type="email"
          className="form-control"
          value=""
          disabled="true"
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Phone Number</label>
        <input type="number" className="form-control" value="" />
      </div>

      <button className="btn btn-primary">Save Changes</button>

    </form>)}

      </div>
    );
  }
}

export default Profile;
