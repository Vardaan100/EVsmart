import React from "react";
import { Route, Redirect } from "react-router-dom";
import { validToken } from "../../fetchingData/api_calls";
import { isAdmin } from "../../utils/index";
const TOKEN_KEY = "jwt";
const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    // Show the component only when the admin is logged in
    // Otherwise, redirect the user to /dashboard page
    <Route
      {...rest}
      render={(props) =>
        validToken(localStorage.getItem(TOKEN_KEY)) && isAdmin() ? <Component {...props} /> : <Redirect to="/dashboard" />
      }
    />
  );
};

export default AdminRoute;
