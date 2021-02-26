import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import "./start.css";

function Start() {
  return (
    <div className="start__component">
      <h4>Ready To start?</h4>
      <br></br>
      <p>
        Our motto is to provide charging stations at best prices, which will be available throughout
        the world
      </p>
      <Link to="/signup">
      <Button> Start Free Trail </Button>
      </Link>
    </div>
  );
}

export default Start;
