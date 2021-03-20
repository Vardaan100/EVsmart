import { Button } from "@material-ui/core";
import React from "react";
import "./start.css";
import { Container, Row, Col } from "reactstrap";

function Start() {
  return (
    <Container className="start__component">
      <Row>
        <Col>
          <h4>Ready To start?</h4>
          <br></br>
          <p>
            Our motto is to provide charging stations at best prices, which will
            be available throughout the world
          </p>
          <Button> Start With us </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Start;
