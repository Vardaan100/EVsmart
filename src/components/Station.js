import React, { Component } from "react";
// import { TimePicker } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./station.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class Station extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      open: "",
      close: "",
      long: "",
      lati: "",
      cost: "",
    };
  }

  render() {
    return (
      <div className="station">
        <form className="station__container">
          <h3>Add Your Station</h3>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter phone number for station"
            />
          </div>

          <div className="form-group">
            <label>Working Hours</label>

            <div>
              <TextField
                id="time"
                ampm={false}
                type="time"
                defaultValue="00:00"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
              <TextField
                id="time"
                ampm={false}
                type="time"
                defaultValue="00:00"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Charges per Hour (in Rs)</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter charges"
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              value={this.props.location}
              className="form-control"
              placeholder="Latitude, Longitude"
              disabled={true}
            />
            {/* <input
            value={this.props.location}
            className="form-control"
            placeholder="Longitude"
            disabled={true}
          /> */}
            <Button
              className="station__setlocation station__location"
              variant="contained"
              color="primary"
            >
              <Link to="/map"> Set Your Location Manually</Link>
            </Button>{" "}
          </div>

          <button
            onClick={(e) => e.preventDefault()}
            type="submit"
            className="btn btn-primary btn-block"
          >
            Save
          </button>
        </form>
      </div>
    );
  }
}
const msp = (state) => ({
  clg: console.log("station state", state),
  location: state.location,
});

export default connect(msp, null)(Station);
