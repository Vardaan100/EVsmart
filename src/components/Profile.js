import React, { Component } from "react";
import { updateUser, userData } from "../fetchingData/api_calls";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./profile.css";
import { UncontrolledAlert } from "reactstrap";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { API } from "../config"

// const Token_key = 'jwt'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:[],
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      password: "",
      error: "",
      edit: true,
      success: false,
      popupOpen: false,
      otp: "",
      phoneVerification: ""
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("jwt");
    userData(token).then((data) => {
      this.setState((state) => ({
        user:data,
        firstname: data[0].user_firstname,
        lastname: data[0].user_lastname,
        phone: data[0].user_phone,
        email: data[0].user_email,
      }));
    });
  }

  handleVerify = () => {
    const { phone, otp } = this.state;

    fetch(`${API}/message/otpVerify/?h=user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        phone:phone,
        otpToken: otp
       }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (
          data == "OTP is invalid" ||
          data == "server error" ||
          data == "OTP expired"
        ) {
          this.setState({
            error: data,
          });
          this.showError();
        } else if (data == true) {
          this.setState({
            phoneVerification: "Number has been verified successfully"
          });
        }
      });
      
      this.setState({
        popupOpen:false
      })
  }

  handleClickOpen = () => {
    this.setState({
      popupOpen: true
    });

    const { phone } = this.state;
    fetch(`${API}/message/otpPhone/?h=user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone: phone }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (
          data == "Phone no. in use" ||
          data == "Invalid Phone no." ||
          data == "missing Email password phone no. or name"
        ) {
          this.setState({
            error: data,
          });
          this.showError();
        }
      })
  };

  handleClose = () => {
    this.setState({
      popupOpen: false
    })
  };

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
    const token = localStorage.getItem("jwt");
    updateUser({ firstname, lastname, phone, email }, token).then((data) => {
      if (
        data.length == 16 ||
        data == "Phone no. in use" ||
        data == "missing Email password phone no. or name" ||
        data == "USER ALREADY EXSIST" ||
        data == "Invalid Phone no." ||
        data == "Invalid Email" ||
        data == "phone no. not verified,Please verify your No."
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
      setTimeout(function(){ window.location.reload() }, 2000);
    });
  };

  showSuccess = () => (
    <div style={{ display: this.state.success ? "" : "none" }}>
      <UncontrolledAlert color="info"> Profile Updated </UncontrolledAlert>
    </div>
  );

  showError = () => (
    <div
      style={{ display: this.state.error ? "" : "none" }}
    >
      <UncontrolledAlert color="danger"> {this.state.error} </UncontrolledAlert>
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

              <div style={{ display: this.state.phoneVerification ? "" : "none" }}>
                <UncontrolledAlert color="info"> {this.state.phoneVerification} </UncontrolledAlert>
              </div>

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
                {(this.state.user[0].user_phone !== this.state.phone) ?
              <div>
                <Button 
                className="station__setlocation station__location"
                variant="contained" color="primary" onClick={this.handleClickOpen}>
                  Verify your phone number
                </Button>
                <Dialog open={this.state.popupOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Verify</DialogTitle>
                <DialogContent>
                <DialogContentText>
                  Please enter the otp recieved on your phone number
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="One Time Password"
                  type="number"
                  onChange={this.handleChange("otp")}
                  fullWidth
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.handleVerify} color="primary">
                  Ok
                </Button>
                </DialogActions>
                </Dialog>
                </div> : null }
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
