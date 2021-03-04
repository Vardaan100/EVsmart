import React, { Component } from "react";
import { updateUser, userData } from "../fetchingData/api_calls";
import "./profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      password: "",
      error: false,
      edit: true,
    };
  }

  componentDidMount() {
    const token = localStorage
      .getItem("jwt", JSON.stringify())
      .replaceAll('"', "");
    userData(token).then((data) => {
      this.setState((state) => ({
        firstname: data[0].user_firstname,
        lastname: data[0].user_lastname,
        phone: data[0].user_phone,
        email: data[0].user_email,
      }));
    });
  }

  clickHandler = (e) => {
    this.setState((state) => ({
      edit: !this.state.edit,
    }));
  };

  handleChange = (name) => (event) => {
    this.setState((state) => ({ [name]: event.target.value }));
  };

  clickSubmit = (e) => {
    e.preventDefault();
    const { firstname, lastname, email, phone } = this.state;
    const token = localStorage
      .getItem("jwt", JSON.stringify())
      .replaceAll('"', "");
      console.log(token);
    updateUser({firstname, lastname, phone, email},token).then((data) => {
      if (data.length==16 || data=="Phone no. in use") {
        console.log(data);
        console.log("Error Updating");
      } else {
        this.setState({
          firstname: firstname,
          lastname: lastname,
          email: email,
          phone: phone,
        });
        console.log("Profile Updated");
      }
    });
  };
  render() {
    // if (!this.props.islogin) {
    //   return <Redirect to={"/sign-in"} />;
    // }
    const buttonText = this.state.edit
      ? "Edit your profile"
      : "Back to profile";
    return (
      <div className="profile">
        <div className="profiles">
          <button onClick={this.clickHandler}>{buttonText}</button>

          {this.state.edit ? (
            <form>
              <div className="form-group">
                <label className="text-muted">First name</label>
                <input
                  type="name"
                  className="form-control"
                  disabled={true}
                  placeholder={this.state.firstname}
                />
              </div>

              <div className="form-group">
                <label className="text-muted">Last Name</label>
                <input
                  type="name"
                  className="form-control"
                  disabled={true}
                  placeholder={this.state.lastname}
                />
              </div>

              <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                  type="email"
                  className="form-control"
                  disabled={true}
                  placeholder={this.state.email}
                />
              </div>

              <div className="form-group">
                <label className="text-muted">Phone Number</label>
                <input
                  type="number"
                  className="form-control"
                  disabled={true}
                  placeholder={this.state.phone}
                />
              </div>
            </form>
          ) : (
            <form>
              <div className="form-group">
                <label className="text-muted">First name</label>
                <input
                  type="name"
                  className="form-control"
                  value={this.state.firstname}
                  onChange={this.handleChange("firstname")}
                />
              </div>

              <div className="form-group">
                <label className="text-muted">Last Name</label>
                <input
                  type="name"
                  className="form-control"
                  value={this.state.lastname}
                  onChange={this.handleChange("lastname")}
                />
              </div>

              <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={this.state.email}
                  disabled={true}
                />
              </div>

              <div className="form-group">
                <label className="text-muted">Phone Number</label>
                <input
                  type="number"
                  className="form-control"
                  value={this.state.phone}
                  onChange={this.handleChange("phone")}
                />
              </div>

              <button className="btn btn-primary" onClick={this.clickSubmit}>
                Save Changes
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }
}

export default Profile;
