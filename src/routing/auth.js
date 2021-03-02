import { API } from "../config";

// Post data to API for signup
export const signup = (user) => {
  // console.log(name,email, password);
  return fetch(`${API}/auth/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

//Post data to API for signin
export const signin = (user) => {
  return fetch(`${API}/auth/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

// Creating token and local storage in the browser
export const authenticate = (data, next) => {
    if(typeof window !=='undefined' ) {
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
};
