import React, { Component } from "react";
import { TimePicker } from "antd";
import { Link } from "react-router-dom";


export default class Station extends Component {
  
  render() {

    const { RangePicker } = TimePicker

    return (
      <form>
      <h3>Add Your Station</h3>

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
        <div><RangePicker bordered={true} /></div>
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
          value = ""
          className="form-control"
          placeholder="Latitude"
          disabled="true"
        />
        <input
          value = ""
          className="form-control"
          placeholder="Longitude"
          disabled="true"
        />
        <Link to="/map">
        Set Your Location Manually
        </Link>
      </div>

      <button type="submit" className="btn btn-primary btn-block">
        Save
      </button>
    </form>
    );
  }
}



