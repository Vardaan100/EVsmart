import { Button } from "@material-ui/core";
import { Container, Row, Col } from "reactstrap";
import React from "react";
import { Link } from "react-router-dom";
import Footer from "../navigation/Footer";
import Customer from "./customer";
import "./Home.css";
import Price from "./Price";
import Start from "./Start";
let TOKEN_KEY = "jwt";

function Home() {
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <div className="home__text11 ">
              <h1 className="">Charging location near me</h1>
              <br></br>

              <p>
                EV Smart aims to provide service for people who needs to charge
                their vehicle away from home. At EV Smart service is given by
                people to people. Sign up with us and locate charging station
                near you. You can also add your own station as well, just head
                to the station option fill out the form and your station will be
                added to stations list
                <br></br>
                <br></br>
                Be the change for better tomorrow
              </p>
              {localStorage.getItem(TOKEN_KEY) ? (
                <Link style={{ textDecoration: "none" }} to="/dashboard">
                  <Button className="home__chargingpoint" vairent="contained">
                    locate charging station
                  </Button>
                </Link>
              ) : (
                <Link style={{ textDecoration: "none" }} to="/sign-in">
                  <Button className="home__chargingpoint" vairent="contained">
                    Find Charging point
                  </Button>
                </Link>
              )}
            </div>
          </Col>
          <Col className="home__image11 ">
            {/* <div className="home__image11 "> */}
            <img
              className="home__charging11 "
              src="./images/car2.jpg"
              alt="car_image"
            />
            {/* </div> */}
          </Col>
        </Row>
      </Container>
      <Customer />
      <Price />
      <Start />
    </div>
  );
}

export default Home;
