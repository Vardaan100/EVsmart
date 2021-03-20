import React, { Component } from "react";
// import { TimePicker } from "antd";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import "./station.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { addCS } from "../fetchingData/api_calls";
import { UncontrolledAlert } from "reactstrap";

class Station extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      open: "",
      close: "",
      location: this.props.location,
      cost: "",
      error: "",
      success: false,
    };
  }

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
        data == "NOT AUTHORISED"
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
      }
    });
  };
  render() {
    return (
      <div className="station">
        <form className="station__container">
          {this.showSuccess()}
          {this.showError()}
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
