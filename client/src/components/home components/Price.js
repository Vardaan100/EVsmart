import { Avatar } from "@material-ui/core";
import React from "react";
import "./price.css";

function Price() {
  return (
    <div className="price__container">
      <div className="price__text">
        <h3>Our Best Price</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
        </p>
        <br></br>
        <br></br>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
        </p>
        <div className="small">
          <Avatar /> <small>Ev smart</small>
        </div>
      </div>
      <div className="price__image">
        <img
          className="price__list"
          src="./images/price.jpg"
          alt="price list"
        />
      </div>
    </div>
  );
}

export default Price;
