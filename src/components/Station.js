import React, { Component } from "react";
import { TimePicker } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Station extends Component {
  render() {
    const { RangePicker } = TimePicker;

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
          <div>
            <RangePicker bordered={true} />
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
          <Link to="/map">Set Your Location Manually</Link>
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Save
        </button>
      </form>
    );
  }
}
// const msp = async (state) => {
//   return await {
//     clg: console.log("station state", state),
//     location: state.location,
//   };
// };
const msp = (state) => ({
  clg: console.log("station state", state),
  location: state.location,
});
// async function msp(state) {
//   console.log("station state", state);
//   return await {
//     location: state.location,
//   };
// }

export default connect(msp, null)(Station);
