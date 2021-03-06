import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./stationprofile.css";
import TextField from "@material-ui/core/TextField";
import { getCS } from "../fetchingData/api_calls";

export default class StationProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: "",
      open: "",
      close:"",
      cost: "",
      location: "",
      edit: true,
    };
  }

  componentDidMount() {
    const token = localStorage
      .getItem("jwt", JSON.stringify())
      .replaceAll('"', "");
    getCS(token).then((data) => {
      console.log(data);

      this.setState((state) => ({
        phone: data[0].cs_phone,
        open:data[0].cs_openat,
        close: data[0].cs_closeat,
        cost: data[0].cs_cost,
        location: (data[0].cs_latitude +"," +data[0].cs_longitude)
      }));
    });
  }

  handleChange = (name) => (event) => {
    this.setState((state) => ({ [name]: event.target.value }));
  };

  clickHandler = (e) => {
    this.setState({
      edit: !this.state.edit,
    });
  };

  render() {
    const buttonText = this.state.edit
      ? "Edit your profile"
      : "Back to profile";
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
                  disabled="true"
                  placeholder={this.state.phone}
                />
              </div>

              <div className="form-group">
                <label>Working Hours</label>
                <input
                  type="number"
                  className="form-control"
                  disabled="true"
                  placeholder={this.state.open + " till " +this.state.close}
                />
              </div>

              <div className="form-group">
                <label>Charges per Hour (in Rs)</label>
                <input
                  type="number"
                  className="form-control"
                  disabled="true"
                  placeholder={this.state.cost}
                />
              </div>
            </form>
          ) : (
            <form>

              
              <h3>Edit your station profile</h3>
              <div className="form-group">
                <label>Location</label>
                <input
                  className="form-control"
                  placeholder="Location"
                  disabled="true"
                  value={this.state.location}
                />
                <Link to="/map">Set Your Location Manually</Link>
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
                    onChange={this.handleChange("open")}
                    value={this.state.open}
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
                />
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
