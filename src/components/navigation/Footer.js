import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import { Container, Row, Col } from "reactstrap";

function Footer() {
  return (
    <Container className="footer_container col-12 my-4">
      <Row className="footer__media" style={{marginLeft:"8%"}}>
        {/* <Col> */}
        {/* <ul className="footer_lists"> */}
        <Col>
          <Link className="footer_list" to="/home">
            Home
          </Link>
        </Col>
        <Col>
          <Link className="footer_list" to="/about">
            About
          </Link>
        </Col>
        <Col>
          <Link to="/">
            <img className="footer_logo" src="./logo.png" alt="logo" />
          </Link>
        </Col>
        <Col>
          <Link className="footer_list" to="/contact">
            Contact us
          </Link>
        </Col>

        <Col>
          <Link className="footer_list" to="/sign-up">
            Signup
          </Link>
        </Col>
      </Row>
      <hr></hr>
      <div className="privacy">&copy; 2020-2021 privacy - Terms</div>
    </Container>
  );
}

export default Footer;
