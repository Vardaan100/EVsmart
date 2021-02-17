import React from "react";
import { Link } from "react-router-dom";
import "./navigation.css";

function Index() {
  return (
    <div className="nav-container">
      <ul className="lists">
        <li>
          <Link to="/">
            <img className="navigation__logo" src="./logo.png" alt="logo" />
          </Link>
        </li>
        <li>
          <Link className="list" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="list" to="/about">
            About
          </Link>
        </li>
        <li>
          <Link className="list" to="/contact">
            Contact us
          </Link>
        </li>
        <li>
          <Link className="list" to="/find">
            Find
          </Link>
        </li>
        <li>
          <Link className="list" to="/signup">
            Signup
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Index;
