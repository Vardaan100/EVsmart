const TOKEN_KEY = "jwt";

export const authenticate = (data) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY,data.token);
    console.log("Setting token");
  }
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem("user");
};

export const getToken = () => {
  if (localStorage.getItem(TOKEN_KEY)) {
    return true;
  }
  return false;
};

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

export const isAdmin = () => {
  if(localStorage.getItem("user")){
    return true;
  }
  return false;
}