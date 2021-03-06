import React, { Component } from "react";
import { getAllDash } from "../fetchingData/api_calls";
import "./profile.css";
import { JsonToTable } from "react-json-to-table";

class AdminDash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    const token = localStorage
      .getItem("jwt", JSON.stringify())
      .replaceAll('"', "");
    getAllDash(token).then((data) => {
      if (data.users == "admin") {
        data.map((user_id, idx) => {
          return this.setState({
            users: data,
          });
        });
      }
    });
  }

  render() {
    return (
      <div className="adminDash">
        <JsonToTable json={this.state.users} />
      </div>
    );
  }
}

export default AdminDash;
