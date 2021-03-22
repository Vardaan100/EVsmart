import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sendOTP, signup, verifyOTP } from "../fetchingData/api_calls";
import { UncontrolledAlert } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import "./signup.css";
import { compose } from "redux";

const Signup = () => {
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    error: "",
    success: false,
    otp: "",
    phoneVerification: "",
  });
  const [popup, setPopup] = useState({
    popupOpen: false,
  });

  const {
    firstname,
    lastname,
    email,
    phone,
    password,
    error,
    success,
    otp,
    phoneVerification,
  } = values;

  const { popupOpen } = popup;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const handleClickOpen = () => {
    setValues({ ...values, error: false });
    setPopup({ popupOpen: true });
    console.log(phone);
    sendOTP(phone).then((data) => {
      console.log(data);
      if (
        data.length == 16 ||
        data == "Phone no. in use" ||
        data == "Invalid Phone no." ||
        data == "missing Email password phone no. or name"
      ) {
        setValues({
          error: data,
        });
        showError();
      }
    });
  };

  const handleClose = () => {
    setPopup({
      popupOpen: false,
    });
  };

  const handleVerify = () => {
    setValues({ ...values, error: false });
    verifyOTP(phone, otp).then((data) => {
      console.log(data);
      if (
        data.length == 16 ||
        data == "OTP is invalid" ||
        data == "server error" ||
        data == "OTP expired"
      ) {
        setValues({
          error: data,
        });
        showError();
      } else if (data == true) {
        setValues({
          phoneVerification: "Number has been verified successfully",
        });
      }
    });
    setPopup({
      popupOpen: false,
    });
  };
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ firstname, lastname, email, phone, password }).then((data) => {
      console.log(data);
      if (
        data == undefined ||
        data.length == 16 ||
        data == "missing Email password phone no. or name" ||
        data == "USER ALREADY EXSIST" || 
        data == "Invalid Phone no." ||
        data == "phone no. not verified,Please verify your No."
      )
       {
        if (data == "phone no. not verified,Please verify your No.") {
          data = "Please verify your phone number.";
        }
        if (data == "missing Email password phone no. or name") {
          data = "Missing Fields";
        }
        if (data == undefined) {
          data = "Down for Maintenance";
        }
        if (data == "Invalid Phone no.") {
          data = "Enter Valid Number";
        }
        setValues({ ...values, error: data, success: false });
      } else {
        setValues({
          ...values,
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          password: "",
          error: "",
          success: true,
        });
        console.log("SignUp Successfully");
      }
    });
  };

  const signUpForm = () => (
    <form className="signup__container">
      <h3>Sign Up</h3>

      <div className="form-group">
        <label>First name</label>
        <input
          onChange={handleChange("firstname")}
          type="text"
          className="form-control"
          placeholder="First name"
          value={firstname}
        />
      </div>

      <div className="form-group">
        <label>Last name</label>
        <input
          onChange={handleChange("lastname")}
          type="text"
          className="form-control"
          placeholder="Last name"
          value={lastname}
        />
      </div>

      <div className="form-group">
        <label>Phone Number</label>
        <input
          onChange={handleChange("phone")}
          type="number"
          className="form-control"
          placeholder="Enter phone number"
          value={phone}
        />
        <Button
          className="station__setlocation station__location"
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
        >
          Verify your phone number
        </Button>
        <Dialog
          open={popupOpen}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Verify</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the otp recieved on your phone number
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="One Time Password"
              type="number"
              onChange={handleChange("otp")}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleVerify} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <div className="form-group">
        <label>Email address</label>
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          onChange={handleChange("password")}
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
        />
      </div>

      <button
        onClick={clickSubmit}
        type="submit"
        className="btn btn-primary btn-block"
      >
        Sign Up
      </button>
      <p className="forgot-password text-right">
        Already registered{" "}
        <Link className="nav-link" to={"/sign-in"}>
          <span className="signup__login"> sign in?</span>
        </Link>
      </p>
    </form>
  );
  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      New account is created. Please <Link to="/sign-in">Signin</Link>
    </div>
  );
  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  return (
    <div className="signup">
       <div style={{ display: phoneVerification ? "" : "none" }}>
            <UncontrolledAlert color="info"> {phoneVerification} </UncontrolledAlert>
          </div>
      {showSuccess()}
      {showError()}
      {signUpForm()}
    </div>
  );
};

export default Signup;
