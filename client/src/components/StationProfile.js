import React, { Component } from "react";
import { TimePicker } from "antd";
import { Link } from "react-router-dom";

export default class StationProfile extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             edit: true
        }
    }

    clickHandler = (e) => {
        this.setState({
            edit: !this.state.edit
        })
    }
    
    render() {
        const { RangePicker } = TimePicker

        const buttonText = this.state.edit ? "Edit your profile" : "Back to profile"
        return(
    <div>
            <button onClick={this.clickHandler}>{buttonText}</button>

            {this.state.edit ? ( 
            <form>
            <h3>Station Profile</h3>

              <div className="form-group">
              <label>Phone Number</label>
              <input
                type="number"
              className="form-control"
              disabled="true"
                />
              </div>

              <div className="form-group">
              <label>Working Hours</label>
              <input
                type="number"
                className="form-control"
                disabled="true"
                />
              </div>

              <div className="form-group">
              <label>Charges per Hour (in Rs)</label>
                <input
                type="number"
                className="form-control"
                disabled="true"
                />
            </div>
          </form>
    )  : 
    ( <form>
      <h3>Edit your profile</h3>

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
          className="form-control"
          placeholder="Location"
          disabled="true"
        />
        <Link to="/map">
        Set Your Location Manually
        </Link>
      </div>

      <button type="submit" className="btn btn-primary btn-block">
        Save changes
      </button>
    </form>
    ) }
     </div>
      )
    }
}