import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import Footer from "../navigation/Footer";
import Customer from "./customer";
import "./Home.css";
import Price from "./Price";
import Start from "./Start";

function Home() {
  return (
    <div>
      <div className="home ">
        <div className="home__text">
          <h1>Charging location near me</h1>
          <br></br>
          <br></br>
          <p>
          EV Smart aims to provide service for people who needs to charge their vehicle
          away from home. At EV Smart service is given by people to people.
          Sign up with us and locate charging station near you.
          You can also add your own station as well, just head to the station option fill out the
          form and your station will be added to stations list
          <br></br>
          <br></br>
          Be the change for better tomorrow
          </p>
          <Link to="/sign-in">
          <Button vairent="contained">Find Charging point</Button>
          </Link>
        </div>
        <div className="home__image">
          <img
            className="home__charging"
            src="./images/car.jpg"
            alt="car_image"
          />
        </div>
      </div>
      <Customer />
      <Price />
      <Start />
      {/* <h1>hello</h1> */}
      {/* <Footer /> */}
    </div>
  );
}

export default Home;