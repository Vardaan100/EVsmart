import { Avatar } from "@material-ui/core";
import React from "react";
import "./price.css";
import { Container, Row, Col } from "reactstrap";

function Price() {
  return (
    <Container fluid={true} className="price__container">
      <Row>
        <Col className="price__text">
          <h3>Our Best Price</h3>
          <p>
            EV Smart provides you best price to charge your car, it gives access
            to not only commercial stations but also to house stations.{" "}
          </p>
          <br></br>
          <br></br>
          <p>
            Just sign up with EV smart and get started to explore new world of
            charging stations. Click on sign up to start{" "}
          </p>
          <div className="small">
            <Avatar /> <small>Ev smart</small>
          </div>
        </Col>
        <Col className="price__image">
          <img
            className="price__list img-fluid"
            src="./images/price.jpg"
            alt="price list"
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Price;
