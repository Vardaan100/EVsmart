const TOKEN_KEY = "jwt";

// Setting token to the local storage
export const authenticate = (data) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY,data.token);
    // console.log("Setting token");
  }
};

// Logout and removing token from local storage 
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem("user");
};

// Check if token is present
export const getToken = () => {
  if (localStorage.getItem(TOKEN_KEY)) {
    return true;
  }
  return false;
};

// Checking if logged in or not
export const isLoggedin = () => {
  if (localStorage.getItem(TOKEN_KEY)) {
    return true;
  }
};

export const getToke = () => {
  if (typeof window !== "undefined") {
    localStorage.getItem(TOKEN_KEY);
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

// check if user is Admin or not
export const isAdmin = () => {
  if (localStorage.getItem("user")) {
    return true;
  }
  return false;
};
