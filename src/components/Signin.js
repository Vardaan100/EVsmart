import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { signin } from "../fetchingData/api_calls";
import { authenticate } from "../utils/index";
import "./signin.css";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, loading, error, redirectToReferrer } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (
        data == "User doesnt exsist" ||
        data == "Password or Email is incorrect" ||
        data == "Please Enter email and password" ||
        data == "Invalid Email" ||
        data == undefined
      ) {
        if(data==undefined){
          data = "Down for Maintenance";
        }
        setValues({ ...values, error: data, loading: false });
      } else {
        authenticate(data);
        setValues({
          ...values,
          redirectToReferrer: true,
        });
        console.log("Login Succesfull");
      }
    });
  };

  const signInForm = () => (
    <form className="sign__container">
      <h3>Login</h3>
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
      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferrer) {
      return <Redirect to="/dashboard" />;
    }
  };

  return (
    <div className="login">
      {showLoading()}
      {showError()}
      {redirectUser()}
      {signInForm()}
    </div>
  );
};

export default Signin;
