import React, { Component } from "react";
import { getAllDash } from "../fetchingData/api_calls";
import "./profile.css";

class AdminDash extends Component {
  
  componentDidMount() {
    const token = localStorage
      .getItem("jwt", JSON.stringify())
      .replaceAll('"', "");
      getAllDash(token).then((data) => {
          console.log(data);
    
    });
  }

  render() {
    return (
      <div className="adminDash">

      </div>
    );
  }
}


export default AdminDash;
