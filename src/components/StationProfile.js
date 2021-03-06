import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./stationprofile.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default class StationProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: true,
    };
  }

  clickHandler = (e) => {
    this.setState({
      edit: !this.state.edit,
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
                <input type="number" className="form-control" disabled="true" />
              </div>

              <div className="form-group">
                <label>Working Hours</label>
                <input type="number" className="form-control" disabled="true" />
              </div>

              <div className="form-group">
                <label>Charges per Hour (in Rs)</label>
                <input type="number" className="form-control" disabled="true" />
              </div>
            </form>
          ) : (
            <form>
              <h3>Edit your station profile</h3>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter phone number for station (optional)"
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
                  className="form-control"
                  placeholder="Location"
                  disabled="true"
                />
                <Link to="/map">Set Your Location Manually</Link>
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                Save changes
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }
}
