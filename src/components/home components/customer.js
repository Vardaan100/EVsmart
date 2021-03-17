import { Avatar } from "@material-ui/core";
import React from "react";
import "./customer.css";

function Customer() {
  return (
    <div className="customer__container">
      <h4 className="customer__text"> Trusted By Customer </h4>
      <div className="customer__avatar">
        <Avatar style={{ marginRight: "10px" }} src="./images/man.jpg" />
        <Avatar style={{ marginRight: "10px" }} src="./images/man2.jpg" />
        <Avatar style={{ marginRight: "10px" }} src="./images/girl.jpg" />
        <Avatar style={{ marginRight: "10px" }} src="./images/truck.jpg" />
        <Avatar style={{ marginRight: "10px" }} src="./images/girl.jpg" />
      </div>
    </div>
  );
}

export default Customer;
