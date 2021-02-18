import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

function Footer() {
  return (
    <div className="footer_container fixed-bottom col-12">
      <ul className="footer_lists">
        <li>
          <Link className="footer_list" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="footer_list" to="/about">
            About
          </Link>
        </li>
        <li>
          <Link to="/">
            <img className="footer_logo" src="./logo.png" alt="logo" />
          </Link>
        </li>
        <li>
          <Link className="footer_list" to="/contact">
            Contact us
          </Link>
        </li>

        <li>
          <Link className="footer_list" to="/signup">
            Signup
          </Link>
        </li>
      </ul>
      {/* <br> </br> */}
      <hr></hr>
      <div className="privacy">&copy; 2020-2021 privacy - Terms</div>
    </div>
  );
}

export default Footer;
