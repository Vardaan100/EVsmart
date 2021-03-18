import React, { Component } from "react";
import { updateUser, userData } from "../fetchingData/api_calls";
import Button from "@material-ui/core/Button";
import "./profile.css";

// const Token_key = 'jwt'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      password: "",
      error: "",
      edit: true,
      success: false,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("jwt");
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
    const { firstname, lastname, email, phone } = this.state;
    const token = localStorage.getItem("jwt");
    updateUser({ firstname, lastname, phone, email }, token).then((data) => {
      if (
        data.length == 16 ||
        data == "Phone no. in use" ||
        data == "missing Email password phone no. or name" ||
        data == "USER ALREADY EXSIST" ||
        data == "Invalid Phone no." ||
        data == "Invalid Email"
      ) {
        this.setState({
          error: data,
        });
        this.showError();
      } else {
        this.setState({
          firstname: firstname,
          lastname: lastname,
          email: email,
          phone: phone,
          success: true,
        });
        console.log("Profile Updated");
      }
    });
  };

  showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: this.state.success ? "" : "none" }}
    >
      Profile Updated
    </div>
  );
  showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: this.state.error ? "" : "none" }}
    >
      {this.state.error}
    </div>
  );

  render() {
    const buttonText = this.state.edit ? (
      // <button className="profile__edit profile__editbutton">Edit your profile</button>
      <Button
        className="profile__editbutton"
        variant="contained"
        color="primary"
      >
        Edit your profile
      </Button>
    ) : (
      <Button
        className="profile__editbutton"
        variant="contained"
        color="primary"
      >
        Back to profile
      </Button>
    );
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
              {this.showSuccess()}
              {this.showError()}

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

              <Button
                className="profile__editbutton"
                variant="contained"
                color="primary"
                onClick={this.clickSubmit}
              >
                Save Changes
              </Button>
            </form>
          )}
        </div>
      </div>
    );
  }
}

export default Profile;
