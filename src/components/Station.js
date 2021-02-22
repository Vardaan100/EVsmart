import React, { Component } from "react";
import { TimePicker } from "antd"

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
          placeholder="Enter phone number"
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
          className="form-control"
          placeholder="Location"
        />
      </div>

      <button type="submit" className="btn btn-primary btn-block">
        Save
      </button>
    </form>
    );
  }
}

