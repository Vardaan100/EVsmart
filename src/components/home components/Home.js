import { Button } from "@material-ui/core";
import React from "react";
import Footer from "../navigation/Footer";
import Customer from "./customer";
import "./Home.css";
import Price from "./Price";
import Start from "./Start";

function Home() {
  return (
    <div>
      <div className="home">
        <div className="home__text">
          <h1>Charging location near me</h1>
          <br></br>
          <br></br>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Mi
            bibendum neque egestas congue quisque egestas diam in. Fermentum
            odio eu feugiat pretium nibh ipsum consequat nisl.
          </p>
          <Button vairent="contained">Find Charginh point</Button>
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
