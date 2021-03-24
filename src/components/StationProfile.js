import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./stationprofile.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { getCS, updateCS } from "../fetchingData/api_calls";
import { API } from "../config";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { UncontrolledAlert } from "reactstrap";

class StationProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: "",
      user:[],
      open: "",
      close: "",
      cost: "",
      lat: "",
      longi: "",
      edit: true,
      error: "",
      success: false,
      popupOpen: false,
      otp: "",
      phoneVerification: ""
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("jwt");
    getCS(token).then((data) => {
      // console.log(data);
      if (data == 16 ||
        data == "YOU HAVE NO CHARGING STATION ADDED")
          {
            this.setState({
              error: data,
            });
            this.showError();
          } else {
      this.setState((state) => ({
        user: data,
        phone: data[0].cs_phone,
        open: data[0].cs_openat,
        close: data[0].cs_closeat,
        cost: data[0].cs_cost,
        lat: data[0].cs_latitude,
        longi: data[0].cs_longitude,
        // location: data[0].cs_latitude + "," + data[0].cs_longitude,
      }))};
    });
  }

  handleVerify = () => {
    const { phone, otp } = this.state;

    fetch(`${API}/message/otpVerify/?h=cs`, {
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
        // console.log(data);
        if (
          data.length == 16 ||
          data == "OTP is invalid"
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
    fetch(`${API}/message/otpPhone/?h=cs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone: phone }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        if (
          data.length == 16 ||
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

  showSuccess = () => (
    <div style={{ display: this.state.success ? "" : "none" }}>
      <UncontrolledAlert color="info">Profile Updated</UncontrolledAlert>
    </div>
  );
  showError = () => (
    <div style={{ display: this.state.error ? "" : "none" }}>
      {/*   {this.state.error} */}
      <UncontrolledAlert color="danger">{this.state.error}</UncontrolledAlert>
    </div>
  );

  handleChange = (name) => (event) => {
    this.setState((state) => ({ [name]: event.target.value }));
  };

  clickHandler = (e) => {
    this.setState({
      edit: !this.state.edit,
    });
    if (this.props.location !== undefined) {
      this.setState((state) => ({
        lat: this.props.location[0],
        longi: this.props.location[1],
      }));
    } else {
      this.setState((state) => ({
        lat: this.state.lat,
        longi: this.state.longi,
      }));
    }
    // console.log(this.state.lat, this.state.longi);
    // console.log(this.props.location);
  };

  locationDirect = (e) => {
    e.preventDefault();
    this.props.history.push({
      pathname: "/map",
      state: { detail: false },
    });
  };

  clickSubmit = (e) => {
    e.preventDefault();

    const { phone, open, close, lat, longi, cost } = this.state;
    const token = localStorage.getItem("jwt");
    const lati = lat;
    const long = longi;
    updateCS({ phone, open, close, long, lati, cost }, token).then((data) => {
      // console.log(data);
      if (
        data.length == 16 ||
        data == "YOU CAN ONLY ADD ONE CHARGING STATION." ||
        data == "Charging Station Already Exist" ||
        data == "YOU HAVE NO CHARGING STATION ADDED" ||
        data == "Charging Station DOESNT Exist" ||
        data == "Charging Station Already Exist" ||
        data == "phone no. not verified,Please verify your No."
      ) {
        this.setState({
          error: data,
        });
        this.showError();
      } else {
        this.setState({
          phone: phone,
          open: open,
          close: close,
          lat: lati,
          longi: long,
          cost: cost,
          success: true,
        });
        // console.log("Station Updated");
      }
    });
  };

  render() {
    const buttonText = this.state.edit ? (
      <Button variant="contained" color="primary">
        Edit your profile
      </Button>
    ) : (
      <Button variant="contained" color="primary">
        Back to profile
      </Button>
    );
    return (
      <div className="station__profile">
        <div className="station__profiles">
          <button onClick={this.clickHandler}>{buttonText}</button>

          {this.state.edit ? (
            <form className="station__container">
              <h3>Station Profile</h3>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="number"
                  className="form-control"
                  disabled={true}
                  placeholder={this.state.phone}
                />
              </div>

              <div className="form-group">
                <label>Working Hours</label>
                <input
                  type="number"
                  className="form-control"
                  disabled={true}
                  placeholder={this.state.open + " till " + this.state.close}
                />
              </div>

              <div className="form-group">
                <label>Charges per Hour (in Rs)</label>
                <input
                  type="number"
                  className="form-control"
                  disabled={true}
                  placeholder={this.state.cost}
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

              <h3>Edit your station profile</h3>
              <div className="form-group">
                <label>Location</label>
                <input
                  className="form-control"
                  placeholder="Location"
                  disabled={true}
                  value={this.state.lat + "," + this.state.longi}
                />
                <Button
                  className="station__setlocation station__location"
                  variant="contained"
                  color="primary"
                  onClick={this.locationDirect}
                >
                  Set Your Location Manually
                </Button>{" "}
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter phone number for station (optional)"
                  onChange={this.handleChange("phone")}
                  value={this.state.phone}
                />
                {(this.state.user[0].cs_phone !== this.state.phone) ?
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

              <div className="form-group">
                <label>Working Hours</label>

                <div>
                  From:
                  <TextField
                    id="time"
                    ampm="false"
                    type="time"
                    defaultValue="00:00"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                    onChange={this.handleChange("open")}
                    value={this.state.open}
                  />
                  To:
                  <TextField
                    id="time"
                    ampm="false"
                    type="time"
                    defaultValue="00:00"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      step: 300, // 5 min
                    }}
                    onChange={this.handleChange("close")}
                    value={this.state.close}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Charges per Hour (in Rs)</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter charges"
                  value={this.state.cost}
                  onChange={this.handleChange("cost")}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block"
                onClick={this.clickSubmit}
              >
                Save changes
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }
}

const msp = (state) => ({
  location: state.location,
});

export default connect(msp, null)(StationProfile);
