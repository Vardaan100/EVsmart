import React, { Component } from "react";
// import { TimePicker } from "antd";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import "./station.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { addCS, userData } from "../fetchingData/api_calls";
import { UncontrolledAlert } from "reactstrap";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { API } from "../config";

class Station extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:[],
      phone: "",
      open: "",
      close: "",
      location: this.props.location,
      cost: "",
      error: "",
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
        user: data,
        phone: data[0].user_phone,
      }));
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
        console.log(data);
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
        console.log(data)
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
      <UncontrolledAlert color="info"> station added </UncontrolledAlert>
    </div>
  );

  showError = () => (
    <div style={{ display: this.state.error ? "" : "none" }}>
      <UncontrolledAlert color="danger"> {this.state.error} </UncontrolledAlert>
    </div>
  );

  handleChange = (name) => (event) => {
    this.setState((state) => ({ [name]: event.target.value }));
  };

  locationDirect = (e) => {
    e.preventDefault();
    this.props.history.push({
      pathname: "/map",
      state: { detail: true },
    });
  };

  clickSubmit = (e) => {
    e.preventDefault();
    this.setState((state) => ({ location: this.props.location }));
    const { phone, open, close, location, cost } = this.state;
    const token = localStorage.getItem("jwt");
    const lati = location[0];
    const long = location[1];
    addCS({ phone, open, close, long, lati, cost }, token).then((data) => {
      console.log(data);
      if (
        data.length == 16 ||
        data == "YOU CAN ONLY ADD ONE CHARGING STATION." ||
        data == "Charging Station Already Exist" ||
        data == "NOT AUTHORISED" ||
        data == "phone no. not verified,Please verify your No."
      ) {
        this.setState({
          error: data,
        });
        this.showError();
      } else {
        this.setState({
          phone: "",
          open: "",
          close: "",
          location: "",
          cost: "",
          success: true,
        });
        console.log("Station added");
        setTimeout(function(){ window.location.reload() }, 2000);
      }
    });
  };
  render() {
    return (
      <div className="station">
        <form className="station__container">
          {this.showSuccess()}
          {this.showError()}
          <div style={{ display: this.state.phoneVerification ? "" : "none" }}>
            <UncontrolledAlert color="info"> {this.state.phoneVerification} </UncontrolledAlert>
          </div>
          <h3>Add Your Station</h3>

          <div className="form-group">
            <label>Location</label>
            <input
              value={this.props.location}
              className="form-control"
              placeholder="Latitude, Longitude"
              disabled={true}
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
              placeholder="Enter phone number for station"
              value={this.state.phone}
              onChange={this.handleChange("phone")}
            />
            {/* {(this.state.user[0].user_phone !== this.state.phone) ? */}
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
                </div> 
                 {/* : null }  */}
           </div>

          <div className="form-group">
            <label>Working Hours</label>

            <div>
              From :
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
              onChange={this.handleChange("cost")}
              value={this.state.cost}
            />
          </div>
          {this.props.location === undefined ? (
            <button
              type="button"
              disabled
              className="btn btn-primary btn-block"
              onClick={this.clickSubmit}
            >
              save
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-primary btn-block"
              onClick={this.clickSubmit}
            >
              Save
            </button>
          )}
        </form>
      </div>
    );
  }
}
const msp = (state) => ({
  clg: console.log("station state", state),
  location: state.location,
  station: state.station,
  stat: console.log(state.station),
});

export default connect(msp, null)(Station);
